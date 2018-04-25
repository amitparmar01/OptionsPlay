using System.Collections.Generic;
using System.Linq;
using System;
using System.Threading.Tasks;
using AutoMapper;
using OptionsPlay.Aspects;
using OptionsPlay.BusinessLogic.Common;
using OptionsPlay.BusinessLogic.Common.Cache;
using OptionsPlay.Common.ServiceResponses;
using OptionsPlay.DAL.SZKingdom.Common;
using OptionsPlay.DAL.SZKingdom.Common.Entities;
using OptionsPlay.DAL.SZKingdom.Common.Enums;
using OptionsPlay.Model;
using OptionsPlay.Common.Options;
using OptionsPlay.Optimization;

namespace OptionsPlay.BusinessLogic.MarketData
{
    public class MarketDataProviderCache : IMarketDataProviderQueryable
    {
        private readonly IMarketDataProvider _marketDataProvider;
        private readonly IDatabaseCacheService _databaseCacheService;

        public MarketDataProviderCache(IMarketDataProvider marketDataProvider, IDatabaseCacheService databaseCacheService)
        {
            _marketDataProvider = marketDataProvider;
            _databaseCacheService = databaseCacheService;
        }

        #region Implementation of IMarketDataProvider

        /// <summary>
        /// NOTE: Cached.
        /// </summary>
        public EntityResponse<List<SecurityInformation>> GetSecuritiesInformation(StockBoard stockBoard = null, string securityCode = null)
        {
            //lock (MemoryCache.SecurityInformationCache)
            //{
            
                if (!MemoryCache.IsSecurityInformationCacheExpired(securityCode))
                {
                    // memory cache working.
                    return MemoryCache.SecurityInformationCache[securityCode].SecurityInformations;
                }
             
                DBCacheStatus status;
                IQueryable<SecurityInformationCache> databaseCache = _databaseCacheService.Get<SecurityInformationCache>(out status);
                if (status != DBCacheStatus.Ok)
                {
                    EntityResponse<List<SecurityInformation>> info = GetAllSecuritiesInformationFromLibrary();
                    if (info.IsSuccess)
                    {
                        List<SecurityInformationCache> mapped = Mapper.Map<List<SecurityInformation>, List<SecurityInformationCache>>(info);
                        _databaseCacheService.UpdateCache(mapped);
                        List<SecurityInformation> result = info.Entity.Where(si => (stockBoard == null || si.TradeSector == stockBoard) &&
                            (securityCode == null || si.SecurityCode == securityCode)).ToList();
                        MemoryCache.AddOrUpdateSecurityInformationCache(securityCode, result);
                        return result;

                    }
                    return info;
                }


                if (stockBoard != null)
                {
                    string tradeSectorCode = stockBoard.ToString();
                    databaseCache = databaseCache.Where(si => si.TradeSector == tradeSectorCode);
                }
                if (securityCode != null)
                {
                    databaseCache = databaseCache.Where(si => si.SecurityCode == securityCode);
                }
                List<SecurityInformation> mappedResult = Mapper.Map<List<SecurityInformationCache>, List<SecurityInformation>>(databaseCache.ToList());
                MemoryCache.AddOrUpdateSecurityInformationCache(securityCode, mappedResult);
                return mappedResult;
            //}
        }

        // todo: for test purpose, delete after RTQ is confirmed working.
        public EntityResponse<QuotationInformation> GetQuotationInformation(string securityCode)
        {
            EntityResponse<QuotationInformation> result = _marketDataProvider.GetQuotationInformation(securityCode);
            return result;
        }

        private OptionBasicInformation ConvertExpirationDate(OptionBasicInformation basic)
        {
            //if (basic.ExpireDate.DayOfYear == 365 || basic.ExpireDate.DayOfYear == 366)
            //{
            string expiryStr = basic.OptionCode.Substring(basic.OptionCode.IndexOf(basic.OptionType == OptionType.Call ? "C" : "P") + 1, 4);
            int year = 2000 + Convert.ToInt32(expiryStr.Substring(0, 2));
            int month = Convert.ToInt32(expiryStr.Substring(2, 2));
            DateTime date = new DateTime(year, month, 1);
            int nthOfThursday = 0;

            while (nthOfThursday < 4)
            {
                if (date.DayOfWeek == DayOfWeek.Wednesday)
                {
                    nthOfThursday++;
                }
                date = date.AddDays(1);
            }
            date = date.AddDays(-1);
            basic.ExpireDate = date;
            //}
            return basic;
        }

        /// <summary>
        /// NOTE: Cached.
        /// </summary>
        public EntityResponse<List<OptionBasicInformation>> GetOptionBasicInformation(string underlyingCode = null, string optionNumber = null)
        {
            //lock (MemoryCache.OptionBasicInformationCache)
            //{
            
                if (!MemoryCache.IsOptionBasicInfomationCacheExpired(underlyingCode))
                {
                    // memory cache working.
                    var index = underlyingCode == null ? MemoryCache.ALL_OPTIONS : underlyingCode;
                    var infos =  MemoryCache.OptionBasicInformationCache[index].OptionBasicInformations;
                    return optionNumber == null ? infos : infos.Where(x => x.OptionNumber == optionNumber).ToList();
                }


                DBCacheStatus status;
                IQueryable<OptionBasicInformationCache> databaseCache = _databaseCacheService.Get<OptionBasicInformationCache>(out status);  
                if (status != DBCacheStatus.Ok)
                {
                    EntityResponse<List<OptionBasicInformation>> info = GetAllOptionBasicInformationFromLibrary();
                    if (info.IsSuccess)
                    {
                        var list = info.Entity.Select(x => ConvertExpirationDate(x)).ToList();
                        List<OptionBasicInformationCache> mapped = Mapper.Map<List<OptionBasicInformation>, List<OptionBasicInformationCache>>(list);
                        _databaseCacheService.UpdateCache(mapped);
                        // Add condition to filter non-affective options.
                        List<OptionBasicInformation> result = list
                            .Where(obi => (underlyingCode == null || obi.OptionUnderlyingCode == underlyingCode)
                                            && (optionNumber == null || obi.OptionNumber == optionNumber)
                                            && obi.OptionStatus != " ")
                            .ToList();

                        if (optionNumber==null)
                            MemoryCache.AddOrUpdateOptionBasicInformationCache(underlyingCode, result);
                        return result;
                    }
                    return info;
                }


                if (underlyingCode != null)
                {
                    databaseCache = databaseCache.Where(obi => (obi.OptionUnderlyingCode == underlyingCode && obi.OptionStatus != " "));
                }
                if (optionNumber != null)
                {
                    databaseCache = databaseCache.Where(obi => obi.OptionNumber == optionNumber);
                }

                List<OptionBasicInformation> mappedResult = Mapper.Map<List<OptionBasicInformationCache>, List<OptionBasicInformation>>(databaseCache.ToList());

                mappedResult = mappedResult.Select(x => ConvertExpirationDate(x)).ToList();

                if (optionNumber == null)
                    MemoryCache.AddOrUpdateOptionBasicInformationCache(underlyingCode, mappedResult);
                return mappedResult;
            //}
        }

        #endregion

        #region Implementation of IMarketDataProviderQueryable

        /// <summary>
        /// NOTE: Cached.
        /// </summary>
        public IQueryable<SecurityInformationCache> GetAllSecuritiesInformation()
        {
            DBCacheStatus status;
            IQueryable<SecurityInformationCache> result = _databaseCacheService.Get<SecurityInformationCache>(out status);
            if (status == DBCacheStatus.Ok)
            {
                return result;
            }

            List<SecurityInformation> info = GetAllSecuritiesInformationFromLibrary();
            List<SecurityInformationCache> mapped = Mapper.Map<List<SecurityInformation>, List<SecurityInformationCache>>(info);
            _databaseCacheService.UpdateCache(mapped);
            return mapped.AsQueryable();
        }

        /// <summary>
        /// NOTE: Cached.
        /// </summary>
        public IQueryable<OptionBasicInformationCache> GetAllOptionBasicInformation()
        {
            //lock (MemoryCache.OptionBasicInformationCache)
            //{
                if (!MemoryCache.IsOptionBasicInfomationCacheExpired(null))
                {
                    // memory cache working
                    List<OptionBasicInformation> OptionBasicInformationFromMemoryCache = MemoryCache.OptionBasicInformationCache[MemoryCache.ALL_OPTIONS].OptionBasicInformations;
                    return Mapper.Map<List<OptionBasicInformation>, List<OptionBasicInformationCache>>(OptionBasicInformationFromMemoryCache).AsQueryable();
                }
                else
                {
                    DBCacheStatus status;
                    IQueryable<OptionBasicInformationCache> result = _databaseCacheService.Get<OptionBasicInformationCache>(out status);
                    if (status == DBCacheStatus.Ok)
                    {
                        List<OptionBasicInformation> mappedResult = Mapper.Map<List<OptionBasicInformationCache>, List<OptionBasicInformation>>(result.ToList());
                        mappedResult = mappedResult.Select(x => ConvertExpirationDate(x)).ToList();
                        MemoryCache.AddOrUpdateOptionBasicInformationCache(null, mappedResult);
                        return result;
                    }

                    // If Cannot get information from DB.
                    List<OptionBasicInformation> info = GetAllOptionBasicInformationFromLibrary();
                    List<OptionBasicInformation> list = info.Select(x => ConvertExpirationDate(x)).ToList();
                    List<OptionBasicInformationCache> mapped = Mapper.Map<List<OptionBasicInformation>, List<OptionBasicInformationCache>>(list);
                    _databaseCacheService.UpdateCache(mapped);
                    MemoryCache.AddOrUpdateOptionBasicInformationCache(null, list);
                    return mapped.AsQueryable();
                }
            //}
        }

        #endregion

        [Cache]
        private EntityResponse<List<SecurityInformation>> GetAllSecuritiesInformationFromLibrary()
        {
            var tradeSectorA = Task.Run(() => _marketDataProvider.GetSecuritiesInformation(StockBoard.SHAShares));
            //var tradeSectorB = Task.Run(() => _marketDataProvider.GetSecuritiesInformation(StockBoard.SHBShares));

            //Task.WaitAll(tradeSectorA, tradeSectorB);
            Task.WaitAll(tradeSectorA);

            //if (!tradeSectorA.Result.IsSuccess)
            //{
            //    Logging.Logger.Debug("thread ID:" + System.Threading.Thread.CurrentThread.ManagedThreadId.ToString() + ", GetAllSecuritiesInformationFromLibrary tradeSectorA.Result.IsSuccess: " + tradeSectorA.Result.IsSuccess + ", errorCode is" + tradeSectorA.Result.ErrorCode + ", class is MarketDataProviderCache");
            //    return tradeSectorA.Result;
            //}
            //Logging.Logger.Debug("thread ID:" + System.Threading.Thread.CurrentThread.ManagedThreadId.ToString() + ", GetAllSecuritiesInformationFromLibrary tradeSectorB.Result.IsSuccess: " + tradeSectorB.Result.IsSuccess + ", errorCode is" + tradeSectorB.Result.ErrorCode + ", class is MarketDataProviderCache");
            //if (!tradeSectorB.Result.IsSuccess)
            //{
            //    Logging.Logger.Debug("thread ID:" + System.Threading.Thread.CurrentThread.ManagedThreadId.ToString() + ", GetAllSecuritiesInformationFromLibrary tradeSectorB.Result.IsSuccess: " + tradeSectorB.Result.IsSuccess + ", errorCode is" + tradeSectorB.Result.ErrorCode + ", class is MarketDataProviderCache");
            //    return tradeSectorB.Result;
            //}

            List<SecurityInformation> result = new List<SecurityInformation>();

            if (tradeSectorA.Result.IsSuccess)
            {
                result.AddRange(tradeSectorA.Result.Entity);
            }

            if (result.Count == 0)
            {
                return tradeSectorA.Result;
            }
            //List<SecurityInformation> result = tradeSectorA.Result.Entity;
            //result.AddRange(tradeSectorB.Result.Entity);
            return result;
        }

        [Cache]
        private EntityResponse<List<OptionBasicInformation>> GetAllOptionBasicInformationFromLibrary()
        {
            EntityResponse<List<OptionBasicInformation>> result = _marketDataProvider.GetOptionBasicInformation();
            Logging.Logger.Debug("thread ID:" + System.Threading.Thread.CurrentThread.ManagedThreadId.ToString() + "GetAllOptionBasicInformationFromLibrary result isSuccess:" + result.IsSuccess.ToString() + ",errorCode is " + result.ErrorCode.ToString() + ",count is " + result.Entity.Count.ToString() + ", class is MarketDataProviderCache");
            return result;
        }
    }
}
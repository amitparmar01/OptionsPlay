using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using OptionsPlay.BusinessLogic.Common;
using OptionsPlay.BusinessLogic.Common.Entities;
using OptionsPlay.Common.Helpers;
using OptionsPlay.Common.ServiceResponses;
using OptionsPlay.DAL.Interfaces;
using OptionsPlay.DAL.SZKingdom.Common.Entities;
using OptionsPlay.DAL.SZKingdom.Common.Enums;
using OptionsPlay.Model;
using OptionsPlay.TechnicalAnalysis;
using OptionsPlay.TechnicalAnalysis.Entities;
using OptionsPlay.Optimization;

namespace OptionsPlay.BusinessLogic.MarketData
{
	public class MarketDataService : IMarketDataService
	{
		private readonly IMarketDataProviderQueryable _marketDataProvider;
		private readonly IRiskFreeRateProvider _riskFreeRateProvider;
		private readonly IMarketWorkTimeService _marketWorkTimeService;
		private readonly IOptionsPlayUow _uow;

		public MarketDataService(IMarketDataProviderQueryable marketDataProvider, IRiskFreeRateProvider riskFreeRateProvider, IMarketWorkTimeService marketWorkTimeService, IOptionsPlayUow uow)
		{
			_marketDataProvider = marketDataProvider;
			_riskFreeRateProvider = riskFreeRateProvider;
			_marketWorkTimeService = marketWorkTimeService;
			_uow = uow;
		}

        public Option GetOptionTradingInformation(string optionNo)
        {
            // Get OptionBasicInfo
            EntityResponse<List<OptionBasicInformation>> r = _marketDataProvider.GetOptionBasicInformation(null, optionNo);
            if (!r.IsSuccess)
            {
                return null;
            }
            OptionBasicInformation optionBasicInformation = r.Entity.Single();

            // Get OptionQuotation
            List<string> optionNums = new List<string>();
            optionNums.Add(optionNo);
            EntityResponse<List<OptionQuotation>> optionQuotesResponse = GetOptionQuotesByOptionNumbers(optionNums);
            OptionQuotation optionQuotation = optionQuotesResponse.Entity.Single();

            // Combine the Quotation with BasicInfo
            Option option = new Option(null, optionBasicInformation.OptionNumber, optionBasicInformation.OptionCode){
			    Name = optionBasicInformation.OptionName,
                OptionName = optionBasicInformation.OptionName,
				OpenInterest = optionBasicInformation.UncoveredPositionQuantity,
				SecurityCode = optionBasicInformation.OptionUnderlyingCode,
				PreviousClose = (double)optionBasicInformation.PreviousClosingPrice,

                // Additional Information from OptionBasicInformation
                TypeOfOption = optionBasicInformation.OptionType,
                LimitDownPrice = optionBasicInformation.LimitDownPrice,
                LimitUpPrice = optionBasicInformation.LimitUpPrice,
                OptionUnit = optionBasicInformation.OptionUnit,
                OptionUnderlyingCode = optionBasicInformation.OptionUnderlyingCode,
                OptionUnderlyingName = optionBasicInformation.OptionUnderlyingName,
			};
            Mapper.Map(optionQuotation, option);

            return option;
        }

		#region OptionChains

		public EntityResponse<OptionChain> GetOptionChain(string underlying)
		{
            EntityResponse<StockQuoteInfo> stockQuote = GetStockQuote(underlying);
            if (!stockQuote.IsSuccess)
            {
                return EntityResponse<OptionChain>.Error(stockQuote);
            }

            EntityResponse<List<OptionBasicInformation>> optionBasicInformationResponse = _marketDataProvider.GetOptionBasicInformation(underlying);
            if (!optionBasicInformationResponse.IsSuccess)
            {
                return EntityResponse<OptionChain>.Error(optionBasicInformationResponse);
            }

            double interestRate = _riskFreeRateProvider.GetRiskFreeRate();

            decimal spotPrice = stockQuote.Entity.LastPrice == 0
                ? (stockQuote.Entity.PreviousClose ?? 0)
                : (stockQuote.Entity.LastPrice ?? 0);

            //filtering OptionBasicInformation and get all not expired
            DateTime nowInmarketTimeZone = _marketWorkTimeService.NowInMarketTimeZone.Date;
            List<OptionBasicInformation> optionsBasicInformation = optionBasicInformationResponse.Entity
                .Where(item => item.ExpireDate.Date >= nowInmarketTimeZone.Date)
                .ToList();

            List<string> optionNumbers = optionsBasicInformation.Select(item => item.OptionNumber).Distinct().ToList();

            EntityResponse<List<OptionQuotation>> optionQuotesResponse = GetOptionQuotesByOptionNumbers(optionNumbers);
            if (!optionQuotesResponse.IsSuccess)
            {
                return EntityResponse<OptionChain>.Error(optionQuotesResponse);
            }
            
            // To filter the optionBasicInformation
            Dictionary<string, OptionQuotation> optionQuotesDict = new Dictionary<string, OptionQuotation>();
            foreach (OptionQuotation itemOptionQuotation in optionQuotesResponse.Entity)
            {
                optionQuotesDict.Add(itemOptionQuotation.OptionNumber, itemOptionQuotation);
            }

            if(!MemoryCache.IsOptionChainCacheExpired(underlying))
            {
                // memory cache working.
                MemoryCache.OptionChainCache[underlying].OptionChains.UpdateQuotation((double)spotPrice, interestRate, optionQuotesResponse.Entity);
                return MemoryCache.OptionChainCache[underlying].OptionChains;
            }

			// todo: 4 requests here. Big problem with performance

			SecurityInformationCache securityInfo = _marketDataProvider
				.GetAllSecuritiesInformation().FirstOrDefault(s => s.SecurityCode == underlying);
			if (securityInfo == null)
			{
				return ErrorCode.SZKingdomLibraryNoRecords;
			}

			HashSet<OptionPair> chains = new HashSet<OptionPair>();

            foreach (OptionBasicInformation optionBasicInformation in optionsBasicInformation)
			{
                // Filter the option if the quotation of the specified options cannot be found 
                if (!optionQuotesDict.ContainsKey(optionBasicInformation.OptionNumber))
                    continue;

				DateAndNumberOfDaysUntil expiry = _marketWorkTimeService
					.GetNumberOfDaysLeftUntilExpiry(optionBasicInformation.ExpireDate);

				OptionPair pair = new OptionPair
				{
					Expiry = expiry,
					StrikePrice = (double)optionBasicInformation.StrikePrice,
					PremiumMultiplier = optionBasicInformation.OptionUnit,
					SecurityCode = optionBasicInformation.OptionUnderlyingCode,
					SecurityName = optionBasicInformation.OptionUnderlyingName
				};

				if (!chains.Contains(pair))
				{
					chains.Add(pair);
				}
				else
				{
					pair = chains.Single(c => c.Equals(pair));
				}

				Option op = new Option(pair, optionBasicInformation.OptionNumber, optionBasicInformation.OptionCode)
				{
					Name = optionBasicInformation.OptionName,
                    OptionName = optionBasicInformation.OptionName,
					OpenInterest = optionBasicInformation.UncoveredPositionQuantity,
					SecurityCode = optionBasicInformation.OptionUnderlyingCode,
					PreviousClose = (double)optionBasicInformation.PreviousClosingPrice,
                    Greeks = new Greeks()
				};
				if (optionBasicInformation.OptionType == OptionType.Call)
				{
					op.LegType = LegType.Call;
					pair.CallOption = op;
				}
				else
				{
					op.LegType = LegType.Put;
					pair.PutOption = op;
				}
			}

			OptionChain chain = new OptionChain(chains, (double)spotPrice, interestRate, optionQuotesResponse.Entity);
            MemoryCache.AddOrUpdateOptionChainCache(underlying, chain);
			return chain;
		}

		public EntityResponse<OptionQuotation> GetOptionQuotation(string optionNo)
		{
			EntityResponse<OptionQuoteInfo> r = GetOptionQuote(optionNo);
			if (!r.IsSuccess)
			{
				return EntityResponse<OptionQuotation>.Error(r);
			}

			OptionQuotation optionQuotation = ConvertToOptionQuotation(r);
			return optionQuotation;
		}

		public EntityResponse<OptionQuoteInfo> GetOption5LevelQuotation(string optionNumber)
		{
			EntityResponse<OptionQuoteInfo> r = GetOptionQuote(optionNumber);
			if (!r.IsSuccess)
			{
				return EntityResponse<OptionQuoteInfo>.Error(r);
			}
			return r;
		}

        


		public EntityResponse<OptionBasicInformation> GetOptionInformation(string optionNo)
		{
			EntityResponse<List<OptionBasicInformation>> r = _marketDataProvider.GetOptionBasicInformation(null, optionNo);
			if (!r.IsSuccess)
			{
				return EntityResponse<OptionBasicInformation>.Error(r);
			}

            OptionBasicInformation optionInformation = r.Entity.Single();
            return optionInformation;
		}

      

		private static OptionQuotation ConvertToOptionQuotation(OptionQuoteInfo info)
		{
			OptionQuotation result = new OptionQuotation(info.OptionNumber)
			{
				PreviousSettlementPrice = (double)info.PreviousSettlementPrice,
				UncoveredPositionQuantity = info.UncoveredPositionQuantity,
				Turnover = (double)info.Turnover,
				OpeningPrice = (double)info.OpeningPrice,
				AuctionReferencePrice = (double)info.AuctionReferencePrice,
				AuctionReferenceQuantity = info.AuctionReferenceQuantity,
				HighestPrice = (double)info.HighestPrice,
				LowestPrice = (double)info.LowestPrice,
				LatestTradedPrice = (double)info.LatestTradedPrice,

				Volume = info.TradeQuantity,

				Ask = (double)info.SellPrice1,
				AskVolume = info.SellQuantity1,
				Bid = (double)info.BuyPrice1,
				BidVolume = info.BuyQuantity1,

				Ask2 = (double)info.SellPrice2,
				AskVolume2 = info.SellQuantity2,
				Bid2 = (double)info.BuyPrice2,
				BidVolume2 = info.BuyQuantity2,

				Ask3 = (double)info.SellPrice3,
				AskVolume3 = info.SellQuantity3,
				Bid3 = (double)info.BuyPrice3,
				BidVolume3 = info.BuyQuantity3,

				Ask4 = (double)info.SellPrice4,
				AskVolume4 = info.SellQuantity4,
				Bid4 = (double)info.BuyPrice4,
				BidVolume4 = info.BuyQuantity4,

				Ask5 = (double)info.SellPrice5,
				AskVolume5 = info.SellQuantity5,
				Bid5 = (double)info.BuyPrice5,
				BidVolume5 = info.BuyQuantity5,

                TradeDate = info.TradeDate,
			};
			return result;
		}

		#endregion OptionChains

		#region SecurityQuotation

		public EntityResponse<SecurityQuotation> GetSecurityQuotation(string securityCode)
		{
			EntityResponse<List<SecurityInformation>> securityInfoList = _marketDataProvider.GetSecuritiesInformation(null, securityCode);
			if (!securityInfoList.IsSuccess)
			{
				return EntityResponse<SecurityQuotation>.Error(securityInfoList);
			}

			SecurityInformation securityInfo = securityInfoList.Entity.Single();

			EntityResponse<StockQuoteInfo> stockQuotes = GetStockQuote(securityInfo.SecurityCode);
			if (!stockQuotes.IsSuccess)
			{
				return EntityResponse<SecurityQuotation>.Error(stockQuotes);
			}

			SecurityQuotation model = Mapper.Map<SecurityQuotation>(securityInfo);
			model = Mapper.Map(stockQuotes.Entity, model);
            //model.HasOptions = _marketDataProvider.GetAllOptionBasicInformation().Any(cache => cache.OptionUnderlyingCode == securityCode && cache.OptionStatus != " ");
            model.HasOptions = isSecurityHasOptions(securityCode);
			return model;
		}

        private bool isSecurityHasOptions(string securityCode) {

            var entity = _marketDataProvider.GetOptionBasicInformation(securityCode).Entity;
            return entity.Count >= 0;
        }

		public List<EntityResponse<SecurityQuotation>> GetSecurityQuotations(List<string> securityCodes)
		{
			List<EntityResponse<SecurityQuotation>> result = securityCodes.Select(GetSecurityQuotation).ToList();
			return result;
		}

		public List<SecurityInformation> GetOptionableSecurities()
		{
			string[] optionableSecurities = _marketDataProvider.GetAllOptionBasicInformation().Where(cache => cache.OptionStatus != " ").Select(obi => obi.OptionUnderlyingCode).Distinct().ToArray();
			List<SecurityInformationCache> info =
				_marketDataProvider.GetAllSecuritiesInformation().Where(si => optionableSecurities.Contains(si.SecurityCode)).ToList();
			List<SecurityInformation> model = Mapper.Map<List<SecurityInformationCache>, List<SecurityInformation>>(info);
			return model;
		}

		public EntityResponse<List<SecurityInformation>> GetCompanies(string filter)
		{
			EntityResponse<List<SecurityInformation>> result = GetOptionableSecurities()
				.Where(x => x.SecurityCode.Contains(filter) ||
					x.SecurityName.Contains(filter)).Take(10).ToList();
			return result;
		}

		public EntityResponse<List<OptionBasicInformation>> GetOptions(string filter)
		{
			EntityResponse<List<OptionBasicInformation>> response = _marketDataProvider.GetOptionBasicInformation();
			if (!response.IsSuccess)
			{
				return EntityResponse<List<OptionBasicInformation>>.Error(response);
			}

			EntityResponse<List<OptionBasicInformation>> result = response.Entity.Where(x => x.OptionNumber.Contains(filter)).ToList();
			return result;
		}

		#endregion SecurityQuotation

		#region HistoricalQuotes

		public EntityResponse<List<HistoricalQuote>> GetHistoricalQuotes(string securityCode, string timeframe = null)
		{
			DateTime fromDate = ApiTimeFrameHelper.ConvertTimeframeToDateTimeUsingConfig(timeframe);

			List<HistoricalQuote> historicalQuotes = _uow.HistoricalQuotes
				.Get(securityCode, fromDate)
				.OrderBy(item => item.TradeDate)
				.ToList();

			return historicalQuotes;
		}

		#endregion

		public EntityResponse<List<OptionQuoteInfo>> GetOptionQuotes()
		{
			List<OptionQuoteInfo> result = _uow.OptionQuotesInfo.GetAll().ToList();
			return result;
		}

		public EntityResponse<List<OptionQuotation>> GetOptionQuotes(List<string> optionNumbers)
		{
			EntityResponse<List<OptionQuotation>> results = GetOptionQuotesByOptionNumbers(optionNumbers);
			if (!results.IsSuccess)
			{
				return results;
			}

			foreach (OptionQuotation quote in results.Entity)
			{
				EntityResponse<OptionBasicInformation> basic = GetOptionInformation(quote.OptionNumber);
				if (basic.IsSuccess)
				{
					
					quote.SecurityCode = basic.Entity.OptionUnderlyingCode;
                    decimal? stockPrice;
					double daysToMaturity = _marketWorkTimeService.GetNumberOfDaysLeftUntilExpiry(basic.Entity.ExpireDate).TotalNumberOfDaysUntilExpiry;

                    if (!MemoryCache.IsStockQuoteInfoCacheExpired(quote.SecurityCode))
                    {
                        stockPrice = MemoryCache.StockQuoteInfoCache[quote.SecurityCode].StockQuoteInfos.LastPrice;
                    }
                    else 
                    {
                        var stockQuoteInfo = GetStockQuote(basic.Entity.OptionUnderlyingCode).Entity;
                        stockPrice = stockQuoteInfo.LastPrice;
                        MemoryCache.AddOrUpdateStockQuoteInfoCache(quote.SecurityCode, stockQuoteInfo);
                    }
					//decimal? stockPrice = GetStockQuote(basic.Entity.OptionUnderlyingCode).Entity.LastPrice;
					double spotPrice = 0;
					if (stockPrice != null)
					{
						spotPrice = (double)stockPrice;
					}
					quote.Greeks = MarketMath.GetGreeks(daysToMaturity, (double)basic.Entity.StrikePrice,
						_riskFreeRateProvider.GetRiskFreeRate(), spotPrice, quote.Ask, quote.Bid, quote.LatestTradedPrice,
						basic.Entity.OptionType == OptionType.Call ? LegType.Call : LegType.Put);
				}
			}

			return results;
		}

        public EntityResponse<List<OptionQuoteInfo>> GetOptionQuotesInfoPerMinute(string optionNumber, DateTime beginTime, DateTime endTime)
        {
            return _uow.OptionQuotePerMinuteRepository.GetAll().Where(x => x.OptionNumber == optionNumber && x.TradeDate > beginTime && x.TradeDate <= endTime).OrderBy(c => c.TradeDate).ToList();
            //return _uow.OptionQuotePerMinuteRepository.GetAll().Where(x => x.OptionNumber == optionNumber && x.TradeDate > beginTime ).ToList();
        }

        public EntityResponse<List<StockQuoteInfo>> GetStockQuotesInfoPerMinute(string securityCode, DateTime beginTime, DateTime endTime)
        {
            return _uow.StockQuotePerMinuteRepository.GetAll().Where(x => x.SecurityCode == securityCode && x.TradeDate > beginTime && x.TradeDate <= endTime).OrderBy(c => c.TradeDate).ToList();
            //return _uow.StockQuotePerMinuteRepository.GetAll().Where(x => x.SecurityCode == securityCode && x.TradeDate > beginTime).ToList();
            
        }
		public EntityResponse<List<StockQuoteInfo>> GetStockQuotes()
		{
			List<StockQuoteInfo> result = _uow.StockQuotesInfo.GetAll().ToList();
			return result;
		}

		public EntityResponse<StockQuoteInfo> GetStockQuote(string securityCode)
		{
			StockQuoteInfo result = _uow.StockQuotesInfo.GetAll().FirstOrDefault(item => item.SecurityCode.Equals(securityCode));
			return result;
		}

		private EntityResponse<OptionQuoteInfo> GetOptionQuote(string optionNumber)
		{
			OptionQuoteInfo result = _uow.OptionQuotesInfo.GetAll().FirstOrDefault(item => item.OptionNumber.Equals(optionNumber));
			return result;
		}

		private EntityResponse<List<OptionQuotation>> GetOptionQuotesByOptionNumbers(IEnumerable<string> optionNumbers)
		{
			EntityResponse<List<OptionQuoteInfo>> optionQuotes = GetOptionQuotes();
			if (!optionQuotes.IsSuccess)
			{
				return EntityResponse<List<OptionQuotation>>.Error(optionQuotes);
			}
			IEnumerable<OptionQuoteInfo> entities =
				optionQuotes.Entity.Where(item => optionNumbers.Contains(item.OptionNumber));

			List<OptionQuotation> quotations = entities.Select(ConvertToOptionQuotation).ToList();
			return quotations;
		}

	}
}

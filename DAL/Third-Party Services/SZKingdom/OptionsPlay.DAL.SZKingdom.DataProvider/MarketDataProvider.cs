using System.Collections.Generic;
using OptionsPlay.Aspects;
using OptionsPlay.Common.ServiceResponses;
using OptionsPlay.DAL.SZKingdom.Common;
using OptionsPlay.DAL.SZKingdom.Common.Entities;
using OptionsPlay.DAL.SZKingdom.Common.Enums;
using OptionsPlay.DAL.SZKingdom.DataProvider.Entities;
using System;

namespace OptionsPlay.DAL.SZKingdom.DataProvider
{
    public class MarketDataProvider : IMarketDataProvider
    {
        private readonly IMarketDataLibrary _marketDataLibrary;

        public MarketDataProvider(IMarketDataLibrary marketDataLibrary)
        {
            _marketDataLibrary = marketDataLibrary;
        }

        public EntityResponse<List<SecurityInformation>> GetSecuritiesInformation(StockBoard stockBoard = null, string securityCode = null)
        {
            try
            {
                List<SZKingdomArgument> arguments = new List<SZKingdomArgument>
			    {
				    SZKingdomArgument.StockBoard(stockBoard),
				    SZKingdomArgument.SecurityCode(securityCode)
			    };
                var retFromKingdom = _marketDataLibrary.ExecuteCommandList<SecurityInformation>(SZKingdomRequest.SecuritiesInformation, arguments);
                EntityResponse<List<SecurityInformation>> result = CheckForEmptyResult(retFromKingdom);
                //EntityResponse<List<SecurityInformation>> result =
                //    CheckForEmptyResult(_marketDataLibrary.ExecuteCommandList<SecurityInformation>(SZKingdomRequest.SecuritiesInformation, arguments));
                if (securityCode != null && result.IsSuccess && result.Entity.Count != 1)
                {
                    Logging.Logger.Debug("thread ID:" + System.Threading.Thread.CurrentThread.ManagedThreadId.ToString() + ", GetSecuritiesInformation return SZKingdomLibraryNoRecords," + ", class is MarketDataProvider");
                    return ErrorCode.SZKingdomLibraryNoRecords;
                }
                return result;
            }
            catch (Exception ex)
            {
                Logging.Logger.Debug("thread ID:" + System.Threading.Thread.CurrentThread.ManagedThreadId.ToString() + "Exception is" + ex.StackTrace.ToString() + ", class is MarketDataProvider");
                return null;
            }
        }

        // todo: for test purpose, delete after RTQ is confirmed working.
        [Cache(CacheExpirationInSeconds = 30)]
        public EntityResponse<QuotationInformation> GetQuotationInformation(string securityCode)
        {
            List<SZKingdomArgument> arguments = new List<SZKingdomArgument>
			{
				SZKingdomArgument.StockBoard(StockBoard.SHAShares),
				SZKingdomArgument.SecurityCode(securityCode)
			};

            EntityResponse<QuotationInformation> result =
                _marketDataLibrary.ExecuteCommandSingleEntity<QuotationInformation>(SZKingdomRequest.QuotationInformation, arguments);
            return result;
        }

        public EntityResponse<List<OptionBasicInformation>> GetOptionBasicInformation(string underlyingCode = null, string optionNumber = null)
        {
            List<SZKingdomArgument> arguments = new List<SZKingdomArgument>
			{
				SZKingdomArgument.StockBoard(StockBoard.SHStockOptions),
				SZKingdomArgument.OptionNumber(optionNumber),
				SZKingdomArgument.OptionUnderlyingCode(underlyingCode)
			};
            EntityResponse<List<OptionBasicInformation>> result =
                CheckForEmptyResult(_marketDataLibrary.ExecuteCommandList<OptionBasicInformation>(SZKingdomRequest.OptionBasicInformation, arguments));
            return result;
        }

        //[Cache(CacheExpirationInSeconds = 30)]
        //public EntityResponse<OptionQuotationInformation> GetOptionQuotationInformation(string optionNo)
        //{
        //	List<SZKingdomArgument> arguments = new List<SZKingdomArgument>
        //	{
        //		SZKingdomArgument.StockBoard(StockBoard.SHStockOptions),
        //		SZKingdomArgument.OptionNumber(optionNo)
        //	};

        //	EntityResponse<OptionQuotationInformation> result =
        //		_marketDataLibrary.ExecuteCommandSingleEntity<OptionQuotationInformation>(SZKingdomRequest.OptionQuotationInformation, arguments);
        //	return result;
        //}

        //[Cache(CacheExpirationInSeconds = 30)]
        //public EntityResponse<List<OptionQuotationInformation>> GetOptionQuotationInformation()
        //{
        //	List<SZKingdomArgument> arguments = new List<SZKingdomArgument>
        //	{
        //		SZKingdomArgument.StockBoard(StockBoard.SHStockOptions),
        //	};

        //	EntityResponse<List<OptionQuotationInformation>> result =
        //		CheckForEmptyResult(_marketDataLibrary.ExecuteCommandList<OptionQuotationInformation>(SZKingdomRequest.OptionQuotationInformation, arguments));
        //	return result;
        //}

        private static EntityResponse<List<T>> CheckForEmptyResult<T>(EntityResponse<List<T>> response)
        {
            if (response.IsSuccess && response.Entity.Count == 0)
            {
                return ErrorCode.SZKingdomLibraryNoRecords;
            }
            return response;
        }
    }
}
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using AutoMapper;
using OptionsPlay.Common.ServiceResponses;
using OptionsPlay.Common.Utilities;
using OptionsPlay.DAL.SZKingdom.Common.Entities;
using OptionsPlay.MarketData.Common;
using OptionsPlay.BusinessLogic.MarketDataProcessing;
using OptionsPlay.BusinessLogic.Common.Entities;
using OptionsPlay.Model;
using OptionsPlay.Model.Enums;
using OptionsPlay.Web.Infrastructure.Attributes.Api;
using OptionsPlay.Web.ViewModels.MarketData;
using OptionsPlay.BusinessLogic.Common;
using OptionsPlay.Web.ViewModels.MarketData.SZKingdom;
using OptionsPlay.Web.ViewModels.Providers.Helpers;
using OptionsPlay.Web.ViewModels.ViewModels.MarketData;
using System;
using System.Globalization;

namespace OptionsPlay.Web.Controllers.Api
{
	[RoutePrefix("api/marketdata")]
	[ApiAuthorize]
	public class MarketDataController : ApiController
	{
		private readonly IMarketDataService _marketDataService;
		private readonly SignalHelpers _signalHelpers;

		public MarketDataController(IMarketDataService marketDataService, SignalHelpers signalHelpers)
		{
			_marketDataService = marketDataService;
			_signalHelpers = signalHelpers;
		}


        [Route("getoptiontradinginfo/{optionNum}")]
        public OptionViewModel GetOptionsTradingInfo(String optionNum) {

            Option option = _marketDataService.GetOptionTradingInformation(optionNum);
            OptionViewModel optionViewModel = Mapper.Map<Option, OptionViewModel>(option);
            return optionViewModel;
        }

		[Route("getcompanies/{filter}")]
		public IEnumerable<CompanyViewModel> GetCompanies(string filter)
		{
			EntityResponse<List<SecurityInformation>> securityInfomationList = _marketDataService.GetCompanies(filter);
			List<CompanyViewModel> companies = 
				Mapper.Map<List<SecurityInformation>, List<CompanyViewModel>>(securityInfomationList);
			return companies;
		}

		[Route("getoptions/{filter}")]
		public IEnumerable<OptionBasicInformationViewModel> GetOptions(string filter)
		{
			EntityResponse<List<OptionBasicInformation>> options = _marketDataService.GetOptions(filter);
			return Mapper.Map<List<OptionBasicInformation>, List<OptionBasicInformationViewModel>>(options);
		}

		[Route("optionBaisc/{optionNo}")]
		public OptionBasicInformationViewModel GetOptionBasicInformation(string optionNo)
		{
			OptionBasicInformation r = _marketDataService.GetOptionInformation(optionNo);
			return Mapper.Map<OptionBasicInformation, OptionBasicInformationViewModel>(r);
		}
		[Route("optionQuote/{optionNo}")]
		public OptionQuotationInformationViewModel GetOptionQuotationInformation(string optionNo)
		{
			OptionQuoteInfo r = _marketDataService.GetOption5LevelQuotation(optionNo);
			return Mapper.Map<OptionQuoteInfo, OptionQuotationInformationViewModel>(r);
		}

        [Route("optionQuotesPerMinute/{optionNo}/{beginTime?}/{endTime?}")]
       public IEnumerable<OptionQuotationInformationPerMinuteViewModel> GetOptionQuotationInformation(string optionNo, string beginTime = "", string endTime = "")
        {
            DateTime dtBeginTime;
            if (beginTime.IsNullOrEmpty())
            {
                dtBeginTime = DateTime.Today.ToUniversalTime();
            }
            else
            {
                dtBeginTime = Convert.ToDateTime(beginTime).ToUniversalTime();
            }
            DateTime dtEndTime = endTime != ""
                ? Convert.ToDateTime(endTime).ToUniversalTime()
                : DateTime.Now.ToUniversalTime();
            EntityResponse<List<OptionQuoteInfo>> optionQuotationInfomationList = _marketDataService.GetOptionQuotesInfoPerMinute(optionNo, dtBeginTime, dtEndTime);
           
            List<OptionQuotationInformationPerMinuteViewModel> optionQuotationInformationPerMinute =
                Mapper.Map<List<OptionQuoteInfo>, List<OptionQuotationInformationPerMinuteViewModel>>(optionQuotationInfomationList);
            return optionQuotationInformationPerMinute;
        }

        //public EntityResponse<List<OptionQuoteInfo>> GetOptionQuotationInformation(string optionNo, string beginTime = "", string endTime = "")
        //{
        //    DateTime dtBeginTime = Convert.ToDateTime(beginTime);
        //    DateTime dtEndTime;
        //    if (endTime != "")

        //        dtEndTime = Convert.ToDateTime(endTime);
        //    else
        //        dtEndTime = DateTime.Now;
        //    return _marketDataService.GetOptionQuotesInfoPerMinute(optionNo, dtBeginTime, dtEndTime);
        //}

        [Route("stockQuotesPerMinute/{securityCode}/{beginTime?}/{endTime?}")]
        public IEnumerable<StockQuotationInformationPerMinuteViewModel> GetStockQuotationInformation(string securityCode, string beginTime = "", string endTime = "")
        {
	        DateTime dtBeginTime;
           
	        if (beginTime.IsNullOrEmpty())
	        {
                dtBeginTime = DateTime.Today.ToUniversalTime();
	        }
	        else
	        {
                dtBeginTime = Convert.ToDateTime(beginTime).ToUniversalTime();
	        }
	        DateTime dtEndTime = endTime != ""
		        ? Convert.ToDateTime(endTime).ToUniversalTime()
		        : DateTime.Now.ToUniversalTime();

            EntityResponse<List<StockQuoteInfo>> stockQuotationInfomationList = _marketDataService.GetStockQuotesInfoPerMinute(securityCode, dtBeginTime, dtEndTime);

            List<StockQuotationInformationPerMinuteViewModel> stockQuotationInformationPerMinute =
                Mapper.Map<List<StockQuoteInfo>, List<StockQuotationInformationPerMinuteViewModel>>(stockQuotationInfomationList);
            decimal previousVolume = 0;
            foreach (var info in stockQuotationInformationPerMinute)
            {
                info.CurrentVolume = info.Volume - previousVolume;
                previousVolume = info.Volume;
            }
            return stockQuotationInformationPerMinute;
        }

        //public EntityResponse<List<StockQuoteInfo>> GetStockQuotationInformation(string securityCode, string beginTime = "", string endTime = "")
        //{

        //    DateTime dtBeginTime = Convert.ToDateTime(beginTime);
        //    DateTime dtEndTime;
        //    if (endTime != "")

        //        dtEndTime = Convert.ToDateTime(endTime);
        //    else
        //        dtEndTime = DateTime.Now;
        //    return _marketDataService.GetStockQuotesInfoPerMinute(securityCode, dtBeginTime, dtEndTime);
        //}

        [Route("GetStockMarketIndex")]
        public IEnumerable<StockMarketIndex> GetStockMarketIndex()
        {

            //Getting Shanghai Composite Index
            List<StockMarketIndex> list= new List<StockMarketIndex>();
             StockMarketIndex   item = OptionsPlay.MarketData.MarketDataProvider.GetStockMarketIndex("http://hq.sinajs.cn/list=s_sh000001");
             item.IndexName = "上证指数";
             list.Add(item);
             item = OptionsPlay.MarketData.MarketDataProvider.GetStockMarketIndex("http://hq.sinajs.cn/list=s_sz399001");
             item.IndexName = "深证指数";
             list.Add(item);
             item = OptionsPlay.MarketData.MarketDataProvider.GetStockMarketIndex("http://hq.sinajs.cn/list=s_sh000300");
             item.IndexName = "沪深300指数";
             list.Add(item);
            //EntityResponse<List<StockQuoteInfo>> stockQuotationInfomationList = _marketDataService.GetStockQuotesInfoPerMinute(securityCode, dtBeginTime, dtEndTime);

            //List<StockQuotationInformationPerMinuteViewModel> stockQuotationInformationPerMinute =
            //    Mapper.Map<List<StockQuoteInfo>, List<StockQuotationInformationPerMinuteViewModel>>(stockQuotationInfomationList);

            return list;
        }


     	[Route("historicalQuotes/{stockCode}/{period?}")]
		public EntityResponse<List<HistoricalQuoteViewModel>> GetHistoricalQuotes(string stockCode, string period = null)
		{
			List<HistoricalQuote> models = _marketDataService.GetHistoricalQuotes(stockCode, period);
			List<HistoricalQuoteViewModel> result = Mapper.Map<List<HistoricalQuote>, List<HistoricalQuoteViewModel>>(models);
			return result;
		}

		[Route("syrahSentiments/{stockCode}")]
		public object GetSyrahSentiments(string stockCode)
		{
			List<HistoricalQuote> historicalQuotes2YearsResponse = _marketDataService.GetHistoricalQuotes(stockCode, "2y");

			List<Signal> syrahShortTermSignals;
			List<Signal> syrahLongTermSignals;

			int? sentimentShortTermValue = null;
			int? sentimentLongTermValue = null;

			int? technicalRank = null;
			SupportAndResistance supportAndResistance = null;
			string sentence = string.Empty;

			Tuple<List<Signal>, List<Signal>> signals = _signalHelpers.GetSentiments(historicalQuotes2YearsResponse);

			syrahShortTermSignals = signals.Item1;
			syrahLongTermSignals = signals.Item2;

			Tuple<int?, int?> sentimentTermValues = _signalHelpers.GetSentimentTermValues(syrahShortTermSignals, syrahLongTermSignals);
			sentimentShortTermValue = sentimentTermValues.Item1;
			sentimentLongTermValue = sentimentTermValues.Item2;

			DateTime yearAgo = DateTime.UtcNow.Date.AddYears(-1);
			List<HistoricalQuote> historicalQuotes1Year = historicalQuotes2YearsResponse.Where(h => h.TradeDate >= yearAgo).ToList();
			HistoricalData historicalData1Year = null;
			if (!historicalQuotes1Year.IsNullOrEmpty())
			{
				historicalData1Year = new HistoricalData(historicalQuotes1Year);
			}

			StockQuoteInfo quote = _marketDataService.GetStockQuote(stockCode);

			technicalRank = _signalHelpers.GetTechnicalRank(historicalData1Year);
			var last = 0d;
			if (quote.LastPrice != null)
			{
				last = (double)quote.LastPrice.Value;
			}
			SupportAndResistanceMath srCalc = new SupportAndResistanceMath(historicalData1Year);
			supportAndResistance = srCalc.GetSupportAndResistance();
			return new
			{
				quote = quote,
				technicalRank = technicalRank,
				supportAndResistance = supportAndResistance,
				sentimentShortTermValue = sentimentShortTermValue,
				sentimentLongTermValue = sentimentLongTermValue,
				syrahShortTermSignals = syrahShortTermSignals,
				syrahLongTermSignals = syrahLongTermSignals,
				historicalQuotes2Years = historicalQuotes2YearsResponse
			};
		}
	}
}
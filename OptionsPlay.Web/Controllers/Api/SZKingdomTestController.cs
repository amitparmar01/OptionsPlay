using System.Collections.Generic;
using System.Web.Http;
using System.Web.Http.ModelBinding;
using OptionsPlay.BusinessLogic.Common;
using OptionsPlay.Common.ServiceResponses;
using OptionsPlay.DAL.SZKingdom.Common;
using OptionsPlay.DAL.SZKingdom.Common.Entities;
using OptionsPlay.DAL.SZKingdom.Common.Entities.Arguments;
using OptionsPlay.DAL.SZKingdom.Common.Enums;
using OptionsPlay.Model;
using OptionsPlay.Web.Infrastructure.ModelBinders;
using OptionsPlay.Web.ViewModels.MarketData.Order;
using OptionsPlay.Web.ViewModels.MarketData.SZKingdom;

namespace OptionsPlay.Web.Controllers.Api
{
	//todo: only for test purposes
	[RoutePrefix("api/SZKingdom")]
	public class SZKingdomTestController : BaseApiController
	{
		private readonly IMarketDataProvider _marketDataProvider;
		private readonly IOrderManager _orderManager;
		private readonly IPortfolioManager _portfolioManager;
		private readonly IAccountManager _accountManager;
		private readonly IMarketDataService _marketDataService;

		public SZKingdomTestController(
			IMarketDataProvider marketDataProvider,
			IOrderManager orderManager,
			IPortfolioManager portfolioManager,
			IAccountManager accountManager,
			IMarketDataService marketDataService)
		{
			_marketDataProvider = marketDataProvider;
			_orderManager = orderManager;
			_portfolioManager = portfolioManager;
			_accountManager = accountManager;
			_marketDataService = marketDataService;
		}

		[Route("securities")]
		public List<SecurityInformationViewModel> GetSecuritiesInformationViewModels(
			[ModelBinder(typeof (TypeSafeEnumModelBinder))] StockBoard tradeSector = null, string securityCode = null)
		{
			List<SecurityInformation> entities = _marketDataProvider.GetSecuritiesInformation(tradeSector, securityCode);
			return AutoMapper.Mapper.Map<List<SecurityInformation>, List<SecurityInformationViewModel>>(entities);
		}

		[Route("quotation/{securityCode}")]
		public QuotationInformation GetQuotationInformation(string securityCode)
		{
			QuotationInformation res = _marketDataProvider.GetQuotationInformation(securityCode);
			return res;
		}

		[Route("optionBasic")]
		public List<OptionBasicInformationViewModel> GetOptionBasicInformation(string optionUndlCode = null, string optionNo = null)
		{
			List<OptionBasicInformation> entities = _marketDataProvider.GetOptionBasicInformation(optionUndlCode, optionNo);
			return AutoMapper.Mapper.Map<List<OptionBasicInformation>, List<OptionBasicInformationViewModel>>(entities);
		}

		[Route("optionQuotation")]
		public OptionQuotationInformationViewModel GetOptionQuotationInformation(string optionNo)
		{
			OptionQuoteInfo res = _marketDataService.GetOption5LevelQuotation(optionNo);
			return AutoMapper.Mapper.Map<OptionQuotationInformationViewModel>(res);
		}

		[Route("optionQuotation")]
		public List<OptionQuotationInformationViewModel> GetOptionQuotationInformation()
		{
			List<OptionQuoteInfo> res = _marketDataService.GetOptionQuotes();
			return AutoMapper.Mapper.Map<List<OptionQuoteInfo>, List<OptionQuotationInformationViewModel>>(res);
		}

		[Route("maxOrderQuantity")]
		public object GetOpenOrdersMaxQuantity(OptionOrderTicketViewModel orderTicket)
		{
			OptionOrderMaxQuantityArguments reqArguments = new OptionOrderMaxQuantityArguments
				{
					CustomerAccountCode = orderTicket.AccountCode,
					TradeAccount = orderTicket.TradeAccount,
					StockBusiness = StockBusiness.Parse(orderTicket.StockBusiness),
					StockBusinessAction = StockBusinessAction.Parse(orderTicket.OrderType),
					OptionNumber = orderTicket.OptionNumber,
					SecurityCode = orderTicket.UnderlyingCode,
					OrderPrice = orderTicket.OrderPrice
				};

			OptionOrderMaxQuantityInformation result = _orderManager.GetOptionOrderMaxQuantity(reqArguments);
			return result;
		}

		[Route("fund")]
		public object GetFundInformation(string accountCode, string customerCode = null, Currency currency = null)
		{
			EntityResponse<List<FundInformation>> result = _portfolioManager.GetFundInformation(customerCode, accountCode, currency);
			return result;
		}

		[Route("account")]
		public object GetAccountInformation(string customerCode, string accountCode)
		{
			AccountInformation result = _accountManager.GetAccountInformation(customerCode, accountCode);

			return result;
		}

		[Route("coveredStock")]
		public List<OptionableStockPositionInformation> GetOptionalStockPositions(string customerCode, string accountCode, string tradeAccount)
		{
			List<OptionableStockPositionInformation> result = _portfolioManager.GetOptionalStockPositions(customerCode, accountCode, tradeAccount);
			if (result == null)
			{
				return new List<OptionableStockPositionInformation>();
			}
			return result;
		}

		[Route("submitOptionOrder")]
		public OptionOrderInformation PostOptionOrder(OptionOrderTicketViewModel orderTicket)
		{
			OptionOrderArguments orderArguments = new OptionOrderArguments
			{
				CustomerAccountCode = orderTicket.AccountCode,
				TradeAccount = orderTicket.TradeAccount,
				OptionNumber = orderTicket.OptionNumber,
				SecurityCode = orderTicket.UnderlyingCode,
				OrderQuantity = orderTicket.OrderQuantity,
				OrderPrice = orderTicket.OrderPrice,
				StockBusiness = StockBusiness.Parse(orderTicket.StockBusiness),
				StockBusinessAction = StockBusinessAction.Parse(orderTicket.OrderType),
				Password = orderTicket.Password,
				ClientInfo = orderTicket.ClientInfo
			};

			OptionOrderInformation result = _orderManager.SubmitOptionOrder(orderArguments);

			return result;
		}

		[Route("cancelOrder")]
		public object PostCancelOrders(string accountCode, string orderId)
		{
			OptionOrderCancellationArguments arguments = new OptionOrderCancellationArguments
			{
				CustomerAccountCode = accountCode,
				OrderId = orderId
			};
			BaseResponse result = _orderManager.CancelOptionOrder(arguments);
			return result;
		}

		[Route("exercisePositions")]
		public OptionOrderInformation ExerciseOptionPosition(OptionOrderTicketViewModel orderTicket)
		{
			OptionOrderArguments orderArguments = new OptionOrderArguments
			{
				CustomerAccountCode = orderTicket.AccountCode,
				TradeAccount = orderTicket.TradeAccount,
				OptionNumber = orderTicket.OptionNumber,
				OrderQuantity = orderTicket.OrderQuantity,
				StockBusiness = StockBusiness.Parse(orderTicket.StockBusiness),
				StockBusinessAction = StockBusinessAction.OrderDeclaration,
				Password = orderTicket.Password,
				ClientInfo = orderTicket.ClientInfo
			};

			OptionOrderInformation result = _orderManager.SubmitOptionOrder(orderArguments);

			return result;
		}

		[Route("intradayOrders")]
		public List<IntradayOptionOrderInformation> GetIntrdayOptionOrders(string customerCode, string accountCode)
		{
			IntradayOptionOrderArguments arguments = new IntradayOptionOrderArguments
			{
				CustomerCode = customerCode,
				CustomerAccountCode = accountCode
			};
			return _orderManager.GetIntradayOptionOrders(arguments);
		}

		[Route("intradayTrades")]
		public List<IntradayOptionTradeInformation> GetIntrdayOptionTrades(string customerCode, string accountCode)
		{
			IntradayOptionOrderArguments arguments = new IntradayOptionOrderArguments
			{
				CustomerCode = customerCode,
				CustomerAccountCode = accountCode
			};
			return _orderManager.GetIntradayOptionTrades(arguments);
		}

		[Route("historicalTrades")]
		public List<HistoricalOptionTradeInformation> GetHistoricalOptionTrades(string accountCode, string beginDate = null, string endDate = null)
		{
			HistoricalOptionOrdersArguments arguments = new HistoricalOptionOrdersArguments
			{
				CustomerAccountCode = accountCode
			};
			return _orderManager.GetHistoricalOptionTrades(arguments);
		}
		[Route("historicalOrders")]
		public List<HistoricalOptionOrderInformation> GetHistoricalOptionOrders(string accountCode, string beginDate = null, string endDate = null)
		{
			HistoricalOptionOrdersArguments arguments = new HistoricalOptionOrdersArguments
			{
				CustomerAccountCode = accountCode
			};
			return _orderManager.GetHistoricalOptionOrders(arguments);
		}

		[Route("cancellableOrders")]
		public List<IntradayOptionOrderBasicInformation> GetCancellableOrders(string customerCode, string accountCode)
		{
			IntradayOptionOrderArguments arguments = new IntradayOptionOrderArguments
			{
				CustomerCode = customerCode,
				CustomerAccountCode = accountCode
			};
			return _orderManager.GetCancellableOrders(arguments);
		}

	}
}
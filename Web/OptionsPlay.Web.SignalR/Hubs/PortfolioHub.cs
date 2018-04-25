using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNet.SignalR.Hubs;
using OptionsPlay.DAL.SZKingdom.Common.Enums;
using OptionsPlay.Web.Infrastructure.Attributes.SignalR;
using OptionsPlay.Web.ViewModels.MarketData.Order;
using OptionsPlay.Web.ViewModels.Providers.Orchestrators;
using OptionsPlay.Web.ViewModels.MarketData;

namespace OptionsPlay.Web.SignalR.Hubs
{
	[HubAuthorize]
	[HubName("PortfolioHub")]
	public class PortfolioHub : BaseHub
	{
		private readonly PortfolioOrchestrator _portfolioOrchestrator;
		private readonly OrderOrchestrator _orderOrchestrator;

		public PortfolioHub(PortfolioOrchestrator portfolioOrchestrator, OrderOrchestrator orderOrchestrator)
		{
			_portfolioOrchestrator = portfolioOrchestrator;
			_orderOrchestrator = orderOrchestrator;
			Interval = 15000;
		}

		private const string PortfolioTask = "PortfolioTask";
		private const string FundTask = "FundTask";
		private const string IntradayOrdersTask = "IntradayOrdersTask";
		private const string IntradayTradesTask = "IntradayTradesTask";

		[HubMethodName("subscribePortfolio")]
		public List<BasePortfolioItemGroupViewModel> GetPortfolio()
		{
			ConfirmDataPushing(PortfolioTask, null, () =>
			{
				List<BasePortfolioItemGroupViewModel> result1 =
					_portfolioOrchestrator.GetPortfolioData(
						FCIdentity.CustomerCode,
						FCIdentity.CustomerAccountCode,
						FCIdentity.TradeAccount);
				Clients.Client(Context.ConnectionId).updatePortfolio(result1);
			});
			List<BasePortfolioItemGroupViewModel> result =
				_portfolioOrchestrator.GetPortfolioData(
								FCIdentity.CustomerCode,
								FCIdentity.CustomerAccountCode,
								FCIdentity.TradeAccount);
			return result;
		}


		[HubMethodName("subscribeFund")]
		public FundViewModel GetFund()
		{
			ConfirmDataPushing(FundTask, null, () =>
			{
				FundViewModel result1 =
					_portfolioOrchestrator.GetFundInformation(
										FCIdentity.CustomerAccountCode,
										FCIdentity.CustomerCode,
										Currency.ChineseYuan);
				Clients.Client(Context.ConnectionId).updateFund(result1);
			});

			FundViewModel result =
				_portfolioOrchestrator.GetFundInformation(
									FCIdentity.CustomerAccountCode,
									FCIdentity.CustomerCode,
									Currency.ChineseYuan);
			return result;
		}
		
		[HubMethodName("subscribeIntradayOrders")]
		public List<IntradayOrderViewModel> GetIntradayOrders()
		{
			ConfirmDataPushing(IntradayOrdersTask, null, () =>
			{
				List<IntradayOrderViewModel> result1 = _orderOrchestrator.GetIntrdayOptionOrders(FCIdentity.CustomerCode, FCIdentity.CustomerAccountCode);
				Clients.Client(Context.ConnectionId).updateIntradayOrders(result1);
			});

			return _orderOrchestrator.GetIntrdayOptionOrders(FCIdentity.CustomerCode, FCIdentity.CustomerAccountCode);
		}

		[HubMethodName("subscribeIntradayTrades")]
		public List<IntradayTradeViewModel> GetIntradayTrades()
		{
			ConfirmDataPushing(IntradayTradesTask, null, () =>
			{
				List<IntradayTradeViewModel> result1 = _orderOrchestrator.GetIntrdayOptionTrades(FCIdentity.CustomerCode, FCIdentity.CustomerAccountCode);
				Clients.Client(Context.ConnectionId).updateIntradayTrades(result1);
			});

			return _orderOrchestrator.GetIntrdayOptionTrades(FCIdentity.CustomerCode, FCIdentity.CustomerAccountCode);
		}
	}
}

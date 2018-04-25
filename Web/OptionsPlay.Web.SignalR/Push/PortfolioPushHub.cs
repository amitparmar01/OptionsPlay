using System.Collections.Generic;
using System.Security.Principal;
using System.Web;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;
using OptionsPlay.Security.Identities;
using OptionsPlay.Web.SignalR.Hubs;
using OptionsPlay.Web.ViewModels.MarketData;
using OptionsPlay.Web.ViewModels.Providers.Orchestrators;

namespace OptionsPlay.Web.SignalR.Push
{
	public class PortfolioPushHub : BasePush<PortfolioHub>
	{
		private readonly PortfolioOrchestrator _portfolioOrchestrator;

		public PortfolioPushHub(IUserToConnectionMapper userToConnectionMapper, PortfolioOrchestrator portfolioOrchestrator)
			: base(userToConnectionMapper)
		{
			_portfolioOrchestrator = portfolioOrchestrator;
		}

		public void UpdatePortfolio()
		{
			if (AreUserAndFunctionIsValid())
			{
				OptionsPlayFCUserIdentity identity = FCIdentity;

				List<BasePortfolioItemGroupViewModel> result =
						_portfolioOrchestrator.GetPortfolioData(
								identity.CustomerCode,
								identity.CustomerAccountCode,
								identity.TradeAccount);

				List<string> connections = UserToConnectionMapper.GetConnectionIdsByUser(identity.UserId);
				Clients.Clients(connections).updatePortfolio(result);
			}
		}

	}
}

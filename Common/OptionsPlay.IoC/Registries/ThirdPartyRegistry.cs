using OptionsPlay.BusinessLogic.Common.Cache;
using OptionsPlay.BusinessLogic.MarketData;
using OptionsPlay.DAL.SZKingdom.Common;
using OptionsPlay.DAL.SZKingdom.DataProvider;
using StructureMap.Configuration.DSL;

namespace OptionsPlay.IoC.Registries
{
	public class ThirdPartyRegistry : Registry
	{
		public ThirdPartyRegistry()
		{
			For<IMarketDataLibrary>().Use<MarketDataLibraryWrapper>();
			For<IMarketDataProvider>()
				.Use<MarketDataProvider>()
				.DecorateWith((ioc, target) => new MarketDataProviderCache(target, ioc.GetInstance<IDatabaseCacheService>()));
			For<IOrderManager>().Use<OrderManager>();
			For<IPortfolioManager>().Use<PortfolioManager>();
			For<IAccountManager>().Use<AccountManager>();
		}
	}
}
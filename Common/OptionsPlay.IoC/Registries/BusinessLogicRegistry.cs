using OptionsPlay.BusinessLogic;
using OptionsPlay.BusinessLogic.Common;
using OptionsPlay.BusinessLogic.MarketData;
using OptionsPlay.DAL.SZKingdom.Common;
using OptionsPlay.DAL.SZKingdom.DataProvider;
using StructureMap.Configuration.DSL;

namespace OptionsPlay.IoC.Registries
{
	/// <summary>
	/// Instructs <c>StructureMap</c> how to create services and all related objects.
	/// </summary>
	public class BusinessLogicRegistry : Registry
	{
		public BusinessLogicRegistry()
		{
			Scan(x =>
			{
				x.AssemblyContainingType<IMarketDataService>();
				x.AssemblyContainingType<MarketDataService>();
				x.AssemblyContainingType<ConfigurationService>();
				x.WithDefaultConventions();
			});

			For<IMarketWorkTimeService>().Use<ShanghaiStockExchangeWorkTimeService>();
			For<IMarketDataProviderQueryable>().Use<MarketDataProviderCache>()
				.Ctor<IMarketDataProvider>().Is<MarketDataProvider>();
		}
	}
}

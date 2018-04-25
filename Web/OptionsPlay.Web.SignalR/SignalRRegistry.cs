using OptionsPlay.Common.Tracing;
using OptionsPlay.Web.SignalR.Push;
using OptionsPlay.Web.ViewModels.Providers.AsyncUpdater;
using StructureMap.Configuration.DSL;

namespace OptionsPlay.Web.SignalR
{
	public class SignalRRegistry : Registry
	{
		public SignalRRegistry()
		{
			For<IUserToConnectionMapper>().Singleton().Use<InMemoryUserToConnectionMapper>();
			For<ITraceManager>().Singleton().Use<SZKingdomTraceManager>();
			For<IMarketDataPusher>().Singleton().Use<MarketDataPusher>();
			For<SecurityQuoteUpdater>().Singleton();
            //For<OptionQuoteUpdater>().Singleton();
			Forward<ITraceManager, SZKingdomTraceManager>();
		}
	}
}
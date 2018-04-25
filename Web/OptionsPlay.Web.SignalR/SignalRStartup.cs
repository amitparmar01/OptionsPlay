using Microsoft.AspNet.SignalR;
using Microsoft.Owin;
using Newtonsoft.Json;
using OptionsPlay.Web.Infrastructure.DependencyResolution;
using OptionsPlay.Web.Infrastructure.Json;
using OptionsPlay.Web.SignalR;
using Owin;
using StructureMap;

[assembly: OwinStartup(typeof(SignalRStartup))]

namespace OptionsPlay.Web.SignalR
{
	public class SignalRStartup
	{

		public void Configuration(IAppBuilder app)
		{
			// Branch the pipeline here for requests that start with "/signalr"
			// Run the SignalR pipeline. We're not using MapSignalR
			// since this branch already runs under the "/signalr"
			// path.
            var hubConfiguration = new HubConfiguration();
            hubConfiguration.EnableDetailedErrors = true;
            app.MapSignalR(hubConfiguration);
			app.Map("/signalr", map => map.RunSignalR());
		}

		public static void InitializeIoc()
		{
			IContainer container = ObjectFactory.Container;
			GlobalHost.DependencyResolver = new SignalRStructureMapDependencyResolver(container);
            //GlobalHost.Configuration.KeepAlive = null;
			// camel case for SignalR hubs
			JsonSerializerSettings settings = new JsonSerializerSettings();
			settings.ContractResolver = new SignalRContractResolver();
			JsonSerializer serializer = JsonSerializer.Create(settings);
			container.Configure(c => c.For<JsonSerializer>().Singleton().Use(serializer));
            
		}
	}
}
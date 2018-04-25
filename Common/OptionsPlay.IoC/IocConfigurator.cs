using OptionsPlay.IoC.Registries;
using OptionsPlay.Web.SignalR;
using StructureMap;

namespace OptionsPlay.IoC
{
	/// <summary>
	/// Class to store configuration of <c>Ioc</c> container.
	/// </summary>
	public static class IocConfigurator
	{
		/// <summary>
		/// Configures the IoC container.
		/// </summary>
		public static void Configure()
		{
			ObjectFactory.Configure(config =>
			{
				config.AddRegistry<DBContextRegistry>();
				config.AddRegistry<RepositoryRegistry>();
				config.AddRegistry<BusinessLogicRegistry>();
				config.AddRegistry<ControllerRegistry>();
				config.AddRegistry<ThirdPartyRegistry>();
				config.AddRegistry<CacheRegistry>();
				config.AddRegistry<SignalRRegistry>();
				config.AddRegistry<MongoDBContextRegistry>();
                config.AddRegistry<CommonRegistry>();
			});
		}

		/// <summary>
		/// Return instance of IoC container
		/// </summary>
		public static IContainer Initialize()
		{
			Configure();
			return ObjectFactory.Container;
		}
	}
}

using OptionsPlay.DAL.EF.Repositories;
using OptionsPlay.DAL.Interfaces;
using OptionsPlay.DAL.Interfaces.Repositories;
using OptionsPlay.DAL.MongoDB.Repositories;
using OptionsPlay.DAL.MongoDB.Repositories.Repositories;
using StructureMap.Configuration.DSL;

namespace OptionsPlay.IoC.Registries
{
	/// <summary>
	/// Instructs <c>StructureMap</c> how to create services and all related objects.
	/// </summary>
	public class RepositoryRegistry : Registry
	{
		public RepositoryRegistry()
		{
			Scan(x =>
			{
				x.WithDefaultConventions();
				x.AssemblyContainingType<IConfigDirectoriesRepository>();
				x.AssemblyContainingType<ConfigDirectoriesRepository>();
				x.AssemblyContainingType<SchedulerQueueRepository>();
			});

			For(typeof(IRepository<>)).Use(typeof(EFRepository<>));
			For(typeof(IHistoricalQuoteRepository)).Use(typeof(HistoricalQuoteRepository));
			For(typeof(ICachedEntitiesRepository<>)).Use(typeof(CachedEntitiesRepository<>));
		}
	}
}

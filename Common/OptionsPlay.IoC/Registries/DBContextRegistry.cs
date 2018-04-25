using System.Data.Entity;
using OptionsPlay.DAL.Core;
using OptionsPlay.DAL.EF.Core;
using OptionsPlay.DAL.Interfaces;
using StructureMap.Configuration.DSL;
using StructureMap.Web.Pipeline;

namespace OptionsPlay.IoC.Registries
{
	/// <summary>
	/// Instructs <c>StructureMap</c> how to create services and all related objects.
	/// </summary>
	public class DBContextRegistry : Registry
	{
		public DBContextRegistry()
		{
			For<DbContext>().LifecycleIs<HybridLifecycle>().Use<OptionsPlayDbContext>();
			For<IOptionsPlayUow>().LifecycleIs<HybridLifecycle>().Use<OptionsPlayUow>();
		}
	}
}

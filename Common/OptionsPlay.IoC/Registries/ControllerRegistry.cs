using StructureMap.Configuration.DSL;
using StructureMap.Graph;

namespace OptionsPlay.IoC.Registries
{
	/// <summary>
	/// Instructs <c>StructureMap</c> how to create services and all related objects.
	/// </summary>
	public class ControllerRegistry : Registry
	{
		public ControllerRegistry()
		{
			Scan(x =>
			{
				x.TheCallingAssembly();
				x.WithDefaultConventions();
			});
		}
	}
}

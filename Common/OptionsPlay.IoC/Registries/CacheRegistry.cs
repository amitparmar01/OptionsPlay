using System;
using OptionsPlay.Cache.Configuration;
using OptionsPlay.Cache.Core;
using StructureMap.Configuration.DSL;

namespace OptionsPlay.IoC.Registries
{
	public class CacheRegistry : Registry
	{
		public CacheRegistry()
		{
			if (CacheConfiguration.Configuration.Realization == CacheRealization.AspNet)
			{
				For<ICache>().Use<HttpRuntimeCache>();
			}
			else
			{
				throw new NotImplementedException();
			}
			For<IKeyBuilder>().Use<JsonKeyBuilder>();
		}
	}
}
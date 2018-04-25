using System;
using System.Configuration;

namespace OptionsPlay.Cache.Configuration
{
	public class CacheConfiguration
	{
		private static readonly Lazy<CacheConfigurationSection> CurrentInstance = new Lazy<CacheConfigurationSection>(GetCacheConfiguration);

		public static CacheConfigurationSection Configuration
		{
			get
			{
				return CurrentInstance.Value;
			}
		}

		private static CacheConfigurationSection GetCacheConfiguration()
		{
			CacheConfigurationSection config = (CacheConfigurationSection)ConfigurationManager.GetSection("cacheConfiguration");
			return config;
		}
	}
}

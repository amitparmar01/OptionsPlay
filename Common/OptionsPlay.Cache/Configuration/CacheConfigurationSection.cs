using System.Configuration;

namespace OptionsPlay.Cache.Configuration
{
	public class CacheConfigurationSection : ConfigurationSection
	{
		[ConfigurationProperty("defaultDurationInSeconds", DefaultValue = 60, IsRequired = false)]
		public int DefaultDurationInSeconds
		{
			get
			{
				return (int)this["defaultDurationInSeconds"];
			}
			set
			{
				this["defaultDurationInSeconds"] = value;
			}
		}

		[ConfigurationProperty("realization", DefaultValue = CacheRealization.AspNet, IsRequired = false)]
		public CacheRealization Realization
		{
			get
			{
				return (CacheRealization)this["realization"];
			}
			set
			{
				this["realization"] = value;
			}
		}
	}
}

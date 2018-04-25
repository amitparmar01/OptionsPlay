using System.Configuration;
using OptionsPlay.MarketData.Sources;

namespace OptionsPlay.MarketData
{
	internal class MarketDataConfiguration : ConfigurationSection
	{
		private MarketDataConfiguration()
		{
		}

		private static MarketDataConfiguration _configuration;

		public static MarketDataConfiguration Instance
		{
			get
			{
				MarketDataConfiguration configuration = _configuration ??
					(_configuration = (MarketDataConfiguration)ConfigurationManager.GetSection("marketDataConfiguration"));
				return configuration;
			}
		}

		[ConfigurationProperty("locationTxt", IsRequired = true)]
        public string LocationTxt
		{
			get
			{
                string result = this["locationTxt"].ToString();
				return result;
			}
		}

        [ConfigurationProperty("locationDbf", IsRequired = true)]
        public string LocationDbf
        {
            get
            {
                string result = this["locationDbf"].ToString();
                return result;
            }
        }

		[ConfigurationProperty("source", IsRequired = true, DefaultValue = MarketDataSources.LocalDrive)]
		public MarketDataSources Source
		{
			get
			{
				var result = (MarketDataSources)this["source"];
				return result;
			}
		}

		[ConfigurationProperty("ftpUsername", IsRequired = false)]
		public string FtpUsername
		{
			get
			{
				string result = this["ftpUsername"].ToString();
				return result;
			}
		}

		[ConfigurationProperty("ftpPassword", IsRequired = false)]
		public string FtpPassword
		{
			get
			{
				string result = this["ftpPassword"].ToString();
				return result;
			}
		}

		[ConfigurationProperty("txtFileName", IsRequired = true)]
		public string TxtFileName
		{
			get
			{
				string result = this["txtFileName"].ToString();
				return result;
			}
		}

		[ConfigurationProperty("dbfFileName", IsRequired = true)]
		public string DbfFileName
		{
			get
			{
				string result = this["dbfFileName"].ToString();
				return result;
			}
		}

        [ConfigurationProperty("UncTxtFileName", IsRequired = true)]
        public string UncTxtFileName 
        {
            get 
            {
                string result = this["UncTxtFileName"].ToString();
                return result;
            }
        }

        [ConfigurationProperty("lineNum", IsRequired = true)]
        public int LineNum
        {
            get
            {
                int result = (int)this["lineNum"];
                return result;
            }
        }
	}
}

using System.Configuration;

namespace OptionsPlay.Scheduler
{
	public class SchedulerConfiguration : ConfigurationSection
	{

		private SchedulerConfiguration()
		{
		}

		private static SchedulerConfiguration _configuration;

		public static SchedulerConfiguration Instance
		{
			get
			{
				SchedulerConfiguration configuration = _configuration ??
					(_configuration = (SchedulerConfiguration)ConfigurationManager.GetSection("schedulerConfiguration"));
				return configuration;
			}
		}


		[ConfigurationProperty("historicalQuotesPopCronExpression", IsRequired = false, DefaultValue = "0 5 7 ? * 2-6 *")]
		public string HistoricalQuotesPopCronExpression
		{
			get
			{
				string result = this["historicalQuotesPopCronExpression"].ToString();
				return result;
			}
		}

        [ConfigurationProperty("realTimeQuotesPopCronExpression", IsRequired = false, DefaultValue = "0/5 * * 1/1 * ? *")]
		public string RealTimeQuotesPopCronExpression
		{
			get
			{
				string result = this["realTimeQuotesPopCronExpression"].ToString();
				return result;
			}
		}

        [ConfigurationProperty("stockOptionQuotesPopCronExpression", IsRequired = false, DefaultValue = "0 0/1 * 1/1 * ? *")]
        public string StockOptionQuotesPopCronExpression
        {
            get
            {
                string result = this["stockOptionQuotesPopCronExpression"].ToString();
                return result;
            }
        }

        [ConfigurationProperty("latestStockQuotesToHistoricalQuotesPerDayPopCronExpression", IsRequired = false, DefaultValue = "0 00 14 1/1 * ? *")]
        public string LatestStockQuotesToHistoricalQuotesPerDayPopCronExpression 
        {
            get
            {
                string result = this["latestStockQuotesToHistoricalQuotesPerDayPopCronExpression"].ToString();
                return result;
            }
        }

        [ConfigurationProperty("ErasePerMinuteQuotesPopCronExpression", IsRequired = false, DefaultValue = "0 59 15 1/1 * ? *")]
        public string ErasePerMinuteQuotesPopCronExpression
        {
            get
            {
                string result = this["ErasePerMinuteQuotesPopCronExpression"].ToString();
                return result;
            }
        }
	}
}
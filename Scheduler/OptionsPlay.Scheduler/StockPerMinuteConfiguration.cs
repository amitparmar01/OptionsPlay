using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OptionsPlay.Scheduler
{
    class StockPerMinuteConfiguration:ConfigurationSection
    {
        private StockPerMinuteConfiguration()
        {
        }

        private static StockPerMinuteConfiguration _configuration;

        public static StockPerMinuteConfiguration Instance
        {
            get
            {
                StockPerMinuteConfiguration configuration = _configuration ??
                    (_configuration = (StockPerMinuteConfiguration)ConfigurationManager.GetSection("StockPerMinuteConfiguration"));
                return configuration;
            }
        }

        [ConfigurationProperty("value", IsRequired = false, DefaultValue = "5100050,5100180,600104,601318")]
        public string value
        {
            get
            {
                string result = this["value"].ToString();
                return result;
            }
        }

    }
}

using System;
using System.Collections;
using System.Configuration;

namespace OptionsPlay.Scheduler
{
    public class StockConfiguration : ConfigurationSection,System.Collections.IEnumerable
    {

        private StockConfiguration()
        {
        }

        private static StockConfiguration _configuration;

        public static StockConfiguration Instance
        {
            get
            {
                StockConfiguration configuration = _configuration ??
                    (_configuration = (StockConfiguration)ConfigurationManager.GetSection("StockConfiguration"));
                return configuration;
            }
        }

       
        [ConfigurationProperty("S00001", IsRequired = false, DefaultValue = "5100050")]
        public string S00001
        {
            get
            {
                string result = this["S00001"].ToString();
                return result;
            }
        }

        [ConfigurationProperty("S00002", IsRequired = false, DefaultValue = "5100180")]
        public string S00002
        {
            get
            {
                string result = this["S00002"].ToString();
                return result;
            }
        }

        [ConfigurationProperty("S00003", IsRequired = false, DefaultValue = "600104")]
        public string S00003
        {
            get
            {
                string result = this["S00003"].ToString();
                return result;
            }
        }

        [ConfigurationProperty("S00004", IsRequired = false, DefaultValue = "600519")]
        public string S00004
        {
            get
            {
                string result = this["S00004"].ToString();
                return result;
            }
        }

        [ConfigurationProperty("S00005", IsRequired = false, DefaultValue = "601318")]
        public string S00005
        {
            get
            {
                string result = this["S00005"].ToString();
                return result;
            }
        }

        [ConfigurationProperty("S00006", IsRequired = false, DefaultValue = "601628")]
        public string S00006
        {
            get
            {
                string result = this["S00006"].ToString();
                return result;
            }
        }

        [ConfigurationProperty("S00007", IsRequired = false, DefaultValue = "601857")]
        public string S00007
        {
            get
            {
                string result = this["S00007"].ToString();
                return result;
            }
        }

      
        public IEnumerator GetEnumerator()
        {
        return (IEnumerator)Instance.Properties.GetEnumerator();
        }
     
    }
}
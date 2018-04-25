
using System.Configuration;
namespace OptionsPlay.DAL.SZKingdom.Common.Configuration
{
    public class SZKingdomPoolConfiguration : ConfigurationSection
    {
        private SZKingdomPoolConfiguration()
        {
        }

        public static SZKingdomPoolConfiguration LoadConfiguration()
        {
            SZKingdomPoolConfiguration configuration = (SZKingdomPoolConfiguration)ConfigurationManager.GetSection("SZKingdomPoolConfiguration");
            return configuration;
        }
        [ConfigurationProperty("size", IsRequired = false, DefaultValue = "2")]
        public int Size
        {
            get
            {
                string size = this["size"] as string;
                if (size != null)
                {
                    return int.Parse(size);
                }
                return 2;
            }
        }
    }
}

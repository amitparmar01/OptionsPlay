using System.Configuration;

namespace OptionsPlay.DAL.SZKingdom.Common.Configuration
{
	/// <summary>
	/// Defines section 'marketDataConfiguration' in web.config
	/// </summary>
	public class SZKingdomConfiguration : ConfigurationSection
	{
		private SZKingdomConfiguration()
		{
		}

        public static SZKingdomConfiguration LoadConfiguration()
        {
            SZKingdomConfiguration configuration = (SZKingdomConfiguration)ConfigurationManager.GetSection("SZKingdomConfiguration1");
            return configuration;
        }

        public static SZKingdomConfiguration LoadConfiguration(string name)
        {
            SZKingdomConfiguration configuration = (SZKingdomConfiguration)ConfigurationManager.GetSection(name);
            return configuration;
        }

		[ConfigurationProperty("ipAddress", IsRequired = true)]
		public string IpAddress
		{
			get
			{
				string ipAddress = this["ipAddress"] as string;
				return ipAddress;
			}
		}

		[ConfigurationProperty("port", IsRequired = true)]
		public int Port
		{
			get
			{
				int port = (int)this["port"];
				return port;
			}
		}

		[ConfigurationProperty("userName", IsRequired = true)]
		public string UserName
		{
			get
			{
				string userName = this["userName"] as string;
				return userName;
			}
		}

		[ConfigurationProperty("password", IsRequired = true)]
		public string Password
		{
			get
			{
				string password = this["password"] as string;
				return password;
			}
		}


		[ConfigurationProperty("serverName", IsRequired = true)]
		public string ServerName
		{
			get
			{
				string serverName = this["serverName"] as string;
				return serverName;
			}
		}

		[ConfigurationProperty("numberOfConcurrentConnections", IsRequired = false, DefaultValue = 10)]
		public int NumberOfConcurrentConnections
		{
			get
			{
				int numberOfConcurrentConnections = (int)this["numberOfConcurrentConnections"];
				return numberOfConcurrentConnections;
			}
		}

		[ConfigurationProperty("protocol", IsRequired = false, DefaultValue = 0)]
		public int Protocol
		{
			get
			{
				int protocol = (int)this["protocol"];
				return protocol;
			}
		}

		[ConfigurationProperty("sendQName", IsRequired = false, DefaultValue = "req_1")]
		public string SendQName
		{
			get
			{
				string sendQName = this["sendQName"] as string;
				return sendQName;
			}
		}

		[ConfigurationProperty("receiveQName", IsRequired = false, DefaultValue = "ans_1")]
		public string ReceiveQName
		{
			get
			{
				string receiveQName = this["receiveQName"] as string;
				return receiveQName;
			}
		}

		[ConfigurationProperty("operatorCode", IsRequired = false, DefaultValue = "8888")]
		public string OperatorCode
		{
			get
			{
				string operatorCode = this["operatorCode"] as string;
				return operatorCode;
			}
		}

		[ConfigurationProperty("operatorRole", IsRequired = false, DefaultValue = "2")]
		public string OperatorRole
		{
			get
			{
				string operatorRole = this["operatorRole"] as string;
				return operatorRole;
			}
		}

		[ConfigurationProperty("operatorSite", IsRequired = false, DefaultValue = "0")]
		public string OperatorSite
		{
			get
			{
				string operatorSite = this["operatorSite"] as string;
				return operatorSite;
			}
		}

		[ConfigurationProperty("channel", IsRequired = false, DefaultValue = "1")]
		public string Channel
		{
			get
			{
				string channel = this["channel"] as string;
				return channel;
			}
		}

		[ConfigurationProperty("operateOrganization", IsRequired = false, DefaultValue = "0")]
		public string OperateOrganization
		{
			get
			{
				string operatorOrganization = this["operateOrganization"] as string;
				return operatorOrganization;
			}
		}

		[ConfigurationProperty("timeout", IsRequired = false, DefaultValue = "60")]
		public int Timeout
		{
			get
			{
				string timeout = this["timeout"] as string;
				if (timeout != null)
				{
					return int.Parse(timeout);
				}
				return 60;
			}
		}
	}

  
}

using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using OptionsPlay.Logging;

namespace OptionsPlay.Common.Options
{
	public static partial class AppConfigManager
	{
		#region Public properties

		/// <summary>
		/// The number of fractional digits in double value
		/// </summary>
		public static int NumberOfFractionalDigits
		{
			get
			{
				int numberOfFractionalDigits = GetValueFromConfig<int>("NumberOfFractionalDigits");
				return numberOfFractionalDigits;
			}
		}

		public static int RememberMeExpirationTimeFrameInDays
		{
			get
			{
				int value = GetValueFromConfig<int>("RememberMeExpirationTimeFrameInDays");
				return value;
			}
		}

		public static string OptionsPlayConnectionString
		{
			get
			{
				return ConfigurationManager.ConnectionStrings["OptionsPlay"].ConnectionString;
			}
		}

		public static int GridPageSize
		{
			get
			{
				int value = GetValueFromConfig<int>("GridPageSize");
				return value;
			}
		}

		public static bool ShowSZKingdomTraceLog
		{
			get
			{
				bool value = GetValueFromConfig<bool>("ShowSZKingdomTraceLog");
				return value;
			}
		}

		public static int PagingLength
		{
			get
			{
				int value = GetValueFromConfig<int>("PagingLength");
				return value;
			}
		}

		public static string FileUploadDirectory
		{
			get
			{
				string result = GetValueFromConfig<string>("FileUploadDirectory");
				return result;
			}
		}

		public static string Environment
		{
			get
			{
				string result = GetValueFromConfig<string>("Environment");
				return result;
			}
		}

		public static string DefaultTimeFrame
		{
			get
			{
				string value = GetValueFromConfig("DefaultTimeFrame");
				return value;
			}
		}

		/// <summary>
		/// Async cache repopulating interval in milliseconds (for quotes)
		/// </summary>
		public static int AsyncQuotesUpdateIntervalInMilliseconds
		{
			get
			{
				int value = GetValueFromConfig<int>("AsyncQuotesUpdateIntervalInMilliseconds");
				return value;
			}
		}


		public static string SupportAndResistanceDefaultTimeFrame
		{
			get
			{
				string value = GetValueFromConfig("SupportAndResistanceDefaultTimeFrame");
				return value;
			}
		}
		public static double MinimalBidForTradingStrategies
		{
			get
			{
				double value = GetValueFromConfig<double>("MinimalBidForTradingStrategies");
				return value;
			}
		}

        public static int OptionBasicInformationExpiration 
        {
            get 
            {
                int value = GetValueFromConfig<int>("OptionBasicInformationExpiration");
                return value;
            }
        }

        public static int SecurityInformationExpiration
        {
            get
            {
                int value = GetValueFromConfig<int>("SecurityInformationExpiration");
                return value;
            }
        }

        public static int OptionChainExpiration
        {
            get
            {
                int value = GetValueFromConfig<int>("OptionChainExpiration");
                return value;
            }
        }

        public static int StockQuoteInfoExpiration
        {
            get
            {
                int value = GetValueFromConfig<int>("StockQuoteInfoExpiration");
                return value;
            }
        }

        public static string OleDbConn
        {
            get
            {
                string value = GetValueFromConfig<string>("OleDbConn");
                return value;
            }
        }
		
		#endregion

		#region Private methods

		private static T GetValueFromConfig<T>(string key) where T : IConvertible
		{
			string value = GetValueFromConfig(key);
			T result = (T)Convert.ChangeType(value, typeof(T));
			return result;
		}

		private static string GetValueFromConfig(string key)
		{
			string value = ConfigurationManager.AppSettings[key];
			if (string.IsNullOrWhiteSpace(value))
			{
				string errorMessage = string.Format("Key '{0}' has not been found in Web.config'", key);
				Logger.LogErrorAndThrow(errorMessage);
			}
			return value;
		}

		private static List<string> ExtractEmails(string key)
		{
			string emailsStr = GetValueFromConfig<string>(key);
			List<string> emails = emailsStr.Split(new[] { ';' }, StringSplitOptions.RemoveEmptyEntries).ToList();
			return emails;
		}

		#endregion
	}
}

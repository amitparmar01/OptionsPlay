using OptionsPlay.BusinessLogic.Common;
using OptionsPlay.Common.ConfigurationConstants;
using OptionsPlay.Common.ObjectJsonSerialization;
using OptionsPlay.Model;

namespace OptionsPlay.BusinessLogic.MarketData
{
	public class RiskFreeRateProvider : IRiskFreeRateProvider
	{
		private readonly IConfigurationService _configurationService;

		#region Implementation of IRiskFreeRateProvider

		public RiskFreeRateProvider(IConfigurationService configurationService)
		{
			_configurationService = configurationService;
		}

		public double GetRiskFreeRate()
		{
			ConfigValue riskFreeValue = _configurationService.GetConfigValue(MarketDataConfiguration.TechnicalAnalysisDirectoryPath, MarketDataConfiguration.RiskFreeRateValueName);
			double result = riskFreeValue.GetValue<double>();
			return result;
		}

		#endregion
	}
}
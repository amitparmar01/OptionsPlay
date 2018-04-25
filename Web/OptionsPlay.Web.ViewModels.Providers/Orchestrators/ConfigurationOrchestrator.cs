using OptionsPlay.BusinessLogic.Common;
using OptionsPlay.Common.ConfigurationConstants;
using OptionsPlay.Common.Options;
using OptionsPlay.Web.ViewModels.Configuration;

namespace OptionsPlay.Web.ViewModels.Providers.Orchestrators
{
	public class ConfigurationOrchestrator
	{
		private readonly IRiskFreeRateProvider _riskFreeRateProvider;
		private readonly IConfigurationService _configurationService;

		public ConfigurationOrchestrator(IRiskFreeRateProvider riskFreeRateProvider, IConfigurationService configurationService)
		{
			_riskFreeRateProvider = riskFreeRateProvider;
			_configurationService = configurationService;
		}

		public ClientConfiguration GetClientConfiguration()
		{
			ClientConfiguration cfg = new ClientConfiguration();

			cfg.App = GetApplicationConfiguration();
			cfg.TechnicalAnalysis = GetTechnicalAnalysis();

			return cfg;
		}

		private static ApplicationConfiguration GetApplicationConfiguration()
		{
			ApplicationConfiguration appCfg = new ApplicationConfiguration();

			appCfg.ShowTrace = AppConfigManager.ShowSZKingdomTraceLog;
			appCfg.GridPageSize = AppConfigManager.GridPageSize;
			return appCfg;
		}

		private TechnicalAnalysisConfiguration GetTechnicalAnalysis()
		{
			TechnicalAnalysisConfiguration techCfg = new TechnicalAnalysisConfiguration();

			techCfg.DaysOfDefaultExpiry = _configurationService.GetValueOnly<double>(MarketDataConfiguration.TechnicalAnalysisDirectoryPath,
				MarketDataConfiguration.DaysOfDefaultExpiryValueName);
			techCfg.DefaultDividendYield = _configurationService.GetValueOnly<double>(MarketDataConfiguration.TechnicalAnalysisDirectoryPath,
				MarketDataConfiguration.DefaultDividendYieldValueName);
			techCfg.RiskFreeRate = _riskFreeRateProvider.GetRiskFreeRate();

			return techCfg;
		}

	}
}
namespace OptionsPlay.Common.ConfigurationConstants
{
	// WARN: Do not modify these constants. If you do you must add migration to update corresponding values in DB
	public static class MarketDataConfiguration
	{
		public const string MarketDataDirectoryName = "market_data";
		public const string RiskFreeRateValueName = "risk_free_rate";
		public const string DefaultDividendYieldValueName = "default_dividend_yield";
		public const string DaysOfDefaultExpiryValueName = "days_of_default_expiry";

		public static string[] TechnicalAnalysisDirectoryPath = { MarketDataDirectoryName };
	}
}

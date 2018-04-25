namespace OptionsPlay.Model
{
	public class BaseCalculation : BaseMongoEntity
	{
		public double? Pe { get; set; }

		public double? Pb { get; set; }

		public double? Dividend { get; set; }

		public double? Yield { get; set; }


		#region Profitability

		public double? ProfitMarginRatio { get; set; }

		public double? ReturnOnAssets { get; set; }

		public double? ReturnOnEquity { get; set; }

		public double? TaxRate { get; set; }

		#endregion

		#region Liquidity Metrics

		public double? CurrentRatio { get; set; }

		public double? QuickRatio { get; set; }

		public double? CashRatio { get; set; }

		public double? RevenueOnAssets { get; set; }

		#endregion

		#region Debt Metrics

		public double? TotalDebt { get; set; }

		public double? DebtAssetsRatio { get; set; }

		public double? DebtEquityRatio { get; set; }

		public double? CapitalizationRatio { get; set; }

		#endregion
	}
}
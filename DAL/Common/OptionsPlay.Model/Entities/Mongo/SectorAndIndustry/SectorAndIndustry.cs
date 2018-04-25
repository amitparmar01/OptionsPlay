using MongoDB.Bson.Serialization.Attributes;

namespace OptionsPlay.Model
{
	[BsonIgnoreExtraElements]
	public class SectorAndIndustry : BaseMongoEntity
	{
		public string Symbol { get; set; }
		public string Title { get; set; }
		public string Sector { get; set; }
		public string Industry { get; set; }

		public double? PeRatio { get; set; }
		public double? PrBookRatio { get; set; }
		public double? Dividend { get; set; }
		public double? Yield { get; set; }
		public long? SharesOutstanding { get; set; }
		public double Last { get; set; }


		public int SectorId { get; set; }
		public int IndustryId { get; set; }

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
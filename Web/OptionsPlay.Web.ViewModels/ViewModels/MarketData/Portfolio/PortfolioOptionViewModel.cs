namespace OptionsPlay.Web.ViewModels.MarketData
{
	//todo: need to be implemented
	public class PortfolioOptionViewModel : PortfolioItemViewModel
	{
		public decimal StrikePrice { get; set; }

		public decimal OptionFloatingPL { get; set; }

		public decimal OptionMarketValue { get; set; }

		public decimal OptionMargin { get; set; }

		public string OptionCode { get; set; }

		public decimal OptionRealtimeUnrealizedPL { get; set; }
		
		public decimal OptionRealtimeCostBasis { get; set; }

		public string OptionCoveredFlag { get; set; }

		public long OptionBalance { get; set; }

		public long PremiumMultiplier { get; set; }

		public long OptionAvailableQuantity { get; set; }

		public long OptionFrozenQuantity { get; set; }

		public long OptionHoldingQuantity { get; set; }

		public string OptionName { get; set; }


		//TODO: should be removed and changed to autoproperties
		#region Calculated

		public bool ExpiresToday
		{
			get
			{
				bool value = Expiry.TotalNumberOfDaysUntilExpiry < 1;
				return value;
			}
		}

		public bool ExpiresInTwoDays
		{
			get
			{
				bool value = Expiry.TotalNumberOfDaysUntilExpiry <= 3;
				return value;
			}
		}

		public bool ExpiresInTwoDaysNotToday
		{
			get
			{
				bool value = Expiry.TotalNumberOfDaysUntilExpiry >= 1 && Expiry.TotalNumberOfDaysUntilExpiry <= 3;
				return value;
			}
		}

		#endregion Calculated


		#region Overrided

		public override bool IsStock
		{
			get
			{
				return false;
			}
		}

		public override string ItemCode
		{
			get
			{
				return OptionNumber;
			}
		}

		public override string ItemName
		{
			get
			{
				return OptionName;
			}
		}

		#endregion Overrided
	}
}

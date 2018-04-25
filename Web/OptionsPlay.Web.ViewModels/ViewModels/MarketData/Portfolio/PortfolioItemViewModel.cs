namespace OptionsPlay.Web.ViewModels.MarketData
{
	public abstract class PortfolioItemViewModel
	{
		private const string AlwaysDisplaySignFormatString = "+#;-#;0";

		public string UnderlyingCode { get; set; }

		public string UnderlyingName { get; set; }

		public string OptionNumber { get; set; }

		public string SecurityCode { get; set; }

		public string SecurityName { get; set; }

		public string OptionSide { get; set; }

		public string OptionSideFormatted
		{
			get
			{
				string value;

				switch (OptionSide)
				{
					case "L":
						value = "portfolio.buy";
						break;
					case "S":
						value = "portfolio.sell";
						break;
					case "C":
						value = "portfolio.covered";
						break;
					default:
						value = null;
						break;
				}

				return value;
			}
		}

		public long AdjustedBalance { get; set; }

		public long OptionHoldingQuantity { get; set; }

		public long AdjustedHoldingQuantity { get; set; }

		public string OptionBalanceFormatted
		{
			get
			{
				string value = AdjustedHoldingQuantity.ToString(AlwaysDisplaySignFormatString);
				return value;
			}
		}

		public long AdjustedAvailableQuantity { get; set; }

		public string FormattedAvailableQuantity
		{
			get
			{
				string value = AdjustedAvailableQuantity.ToString(AlwaysDisplaySignFormatString);
				return value;
			}
		}

		public string OptionType { get; set; }

		public string OptionTypeFormatted
		{
			get
			{
				string value;

				switch (OptionType)
				{
					case "C":
						value = "call";
						if (OptionSide == "C")
						{
							value = "coveredCall";
						}
						break;
					case "P":
						value = "put";
						break;
					case "S":
						value = "security";
						break;
					default:
						value = null;
						break;
				}

				return value;
			}
		}
		public bool IsCovered { get; set; }

		public string OptionCoveredFlagFormatted
		{
			get
			{
				return IsCovered
					? "portfolio.coveredYes"
					: "portfolio.coveredNo";
			}
		}

		public decimal AdjustedRealtimeCostBasis { get; set; }

		public double AdjustedMark { get; set; }

		public decimal MarketValue { get; set; }

		public decimal LastPrice { get; set; }

		public decimal FloatingPL { get; set; }

		public string IconProfitLossChart { get; set; }

		public DateAndNumberOfDaysUntilViewModel Expiry { get; set; }

		public GreeksViewModel Greeks { get; set; }

		public long PreviousBalance { get; set; }

		public long Balance { get; set; }

		public long AvailableBalance { get; set; }

		public virtual bool IsStock { get; set; }

		public bool GeneratePremiumVisible { get; set; }
		
		public bool CloseVisible { get; set; }

		public abstract string ItemCode { get; }

		public abstract string ItemName { get; }

		public PortfolioItemViewModel()
		{
			Expiry = new DateAndNumberOfDaysUntilViewModel();
		}
		
	}
}

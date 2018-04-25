using System;
using OptionsPlay.DAL.SZKingdom.Common.Enums;

namespace OptionsPlay.BusinessLogic.Common.Entities
{
	//todo: need to be implemented
	public class PortfolioOption : PortfolioItem
	{
		public DateAndNumberOfDaysUntil Expiry { get; set; }

		public decimal StrikePrice { get; set; }

		public decimal OptionFloatingPL { get; set; }

		public decimal OptionMarketValue { get; set; }

		public decimal OptionMargin { get; set; }

		public string OptionCode { get; set; }

		public string OptionNumber { get; set; }

		public decimal OptionRealtimeUnrealizedPL { get; set; }
		
		public decimal OptionRealtimeCostBasis { get; set; }

		public string OptionCoveredFlag { get; set; }

		public long OptionBalance { get; set; }

		public long OptionPreviousBalance { get; set; }
		
		public long OptionTradeNettingQuantity { get; set; }

		public long OptionTradeFronzenQuantity { get; set; }

		public long OptionTradeUnfronzenQuantity { get; set; }

		public long OptionFrozenQuantity
		{
			get
			{
				return OptionTradeFronzenQuantity + OptionTradeNettingQuantity - OptionTradeUnfronzenQuantity;
			}
		}

		public long OptionT0Quantity
		{
			get
			{
				if (OptionHoldingQuantity != 0)
				{
					return OptionHoldingQuantity;
				}
				return Math.Abs(OptionTradeNettingQuantity);
			}
		}

		public long PremiumMultiplier { get; set; }

		public long OptionAvailableQuantity { get; set; }

		public long OptionHoldingQuantity
		{
			get
			{
				return OptionPreviousBalance + OptionTradeNettingQuantity;
			}
		}

		public string OptionName { get; set; }
		
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

		public bool IsObligate
		{
			get { return OptionSide == "S" || OptionSide == "C"; }
		}

		public long AdjustedHoldingQuantity
		{
			get
			{
				var quantity = OptionHoldingQuantity;
				if (IsObligate)
				{
					quantity = -quantity;
				}
				return quantity;
			}
		}

		public long AdjustedT0Quantity
		{
			get
			{
				var quantity = OptionT0Quantity;
				if (IsObligate)
				{
					quantity = -quantity;
				}
				return quantity;
			}
		}

		public double AdjustedMark
		{
			get
			{
				if (AdjustedHoldingQuantity != 0 && PremiumMultiplier != 0)
				{
					double value = (double)OptionMarketValue / AdjustedHoldingQuantity / PremiumMultiplier;
					return value;
				}
				return 0;
			}
		}

		public override long AdjustedBalance
		{
			get
			{
				var balance = Math.Max(Math.Abs(OptionHoldingQuantity), Math.Abs(OptionBalance));
				if (IsObligate)
				{
					balance = -balance;
				}
				return balance;
			}
		}
		
		public decimal AdjustedRealtimeCostBasis
		{
			get
			{
				if (AdjustedHoldingQuantity != 0 && PremiumMultiplier != 0)
				{
					decimal value;
					if (OptionRealtimeCostBasis != 0 && OptionBalance != 0)
					{
						value = OptionRealtimeCostBasis / Math.Abs(OptionBalance) / PremiumMultiplier;
					}
					else
					{
						value = (OptionMarketValue - FloatingPL) / AdjustedHoldingQuantity / PremiumMultiplier;
					}
					return value;
				}
				return 0;
			}
		}

		public override long AdjustedAvailableQuantity
		{
			get
			{
				if (OptionType == OptionType.Security)
				{
					return AvailableBalance;
				}
				var quantity = OptionAvailableQuantity;
				if (IsObligate)
				{
					quantity = -quantity;
				}
				return quantity;
			}
		}
		
		public override bool CloseVisible
		{
			get
			{
				bool value = OptionAvailableQuantity > 0;
				return value;
			}
		}

		public override decimal FloatingPL
		{
			get
			{
				return OptionFloatingPL;
			}
		}

		public override decimal MarketValue
		{
			get
			{
				return OptionMarketValue;
			}
		}

		#endregion Calculated

		public PortfolioOption()
		{
			Expiry = new DateAndNumberOfDaysUntil();
		}
	}
}

using System;
using System.Collections.Generic;
using System.Linq;
using OptionsPlay.DAL.SZKingdom.Common.Enums;

namespace OptionsPlay.BusinessLogic.Common.Entities
{
	public class StrategyPortfolioItemGroup : BasePortfolioItemGroup
	{
		public StrategyPortfolioItemGroup(string name, IEnumerable<PortfolioItem> items) : base(items)
		{
			Strategy = name;
			IsStockGroup = false;
		}

		public string EigenValue { get; set; }

		public string Strategy { get; set; }

		public string UnderlyingCode { get; set; }

		public string UnderlyingName { get; set; }

		public bool GeneratePremiumVisible { get; set; }

		#region Calculated

		public bool AnyExpiresInTwoDaysNotToday
		{
			get
			{
				if (_options == null)
				{
					return false;
				}
				bool value = _options.Any(x => x.ExpiresInTwoDaysNotToday);
				return value;
			}
		}

		public bool CloseVisible
		{
			get
			{
				if (_options == null || Strategy == "Custom Strategy")
				{
					return false;
				}
				bool value = _options.Any(x => x.CloseVisible);
				return value;
			}
		}

		public string OptionSide { get; set; }

		public long Quantity
		{
			get
			{
				if (_items == null)
				{
					return 0;
				}

				if (_options.Select(x => x.OptionHoldingQuantity).Max() == 0)
				{
					return 0;
				}

				long maxQuantity = _options.Where(x => x.OptionHoldingQuantity > 0).Select(x => x.OptionHoldingQuantity).Min();

				long result = 1;

				for (long value = 2; value <= maxQuantity; value++)
				{
					bool divisible = true;
					long value1 = value;
					_options.ForEach(x => divisible &= x.OptionHoldingQuantity % value1 == 0);
					if (divisible)
					{
						result = value;
					}
				}

				if (OptionSide == "S")
				{
					result = -result;
				}
				return result;
			}
		}

		public decimal? RealtimeCostBasis
		{
			get
			{
				if (_options == null)
				{
					return null;
				}
				if (Quantity == 0)
				{
					return 0;
				}
				decimal value = _options.Sum(x => x.AdjustedRealtimeCostBasis * x.OptionHoldingQuantity) / Quantity;
				return value;
			}
		}

		public double? Mark
		{
			get
			{
				if (_options == null)
				{
					return null;
				}
                if (Quantity == 0)
                {
                    return 0;
                }
				double value = (double)(_options.Sum(x => x.LastPrice * x.AdjustedHoldingQuantity) / Quantity);
				return value;
			}
		}

		public decimal? FloatingPL
		{
			get
			{
				if (_options == null)
				{
					return null;
				}
				decimal value = _options.Sum(x => x.OptionFloatingPL);
				return value;
			}
		}

		public decimal? Margin
		{
			get
			{
				if (_options == null)
				{
					return null;
				}
				decimal value = _options.Sum(x => x.OptionMargin);
				return value;
			}
		}

		public decimal? MarketValue
		{
			get
			{
				if (_options == null)
				{
					return null;
				}
				decimal value = _options.Sum(x => x.AdjustedAvailableQuantity >= 0 ? x.OptionMarketValue : -x.OptionMarketValue);
				return value;
			}
		}

		public ComplexGreeks Greeks
		{
			get
			{
				if (_items == null)
				{
					return null;
				}
				ComplexGreeks greeks = new ComplexGreeks(_items);
				return greeks;
			}
		}

		#endregion Calculated
	}
}

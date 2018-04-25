using System;
using OptionsPlay.DAL.SZKingdom.Common.Enums;
using OptionsPlay.Model;

namespace OptionsPlay.BusinessLogic.Common.Entities
{
	public abstract class PortfolioItem : ICloneable
	{
		public string UnderlyingCode { get; set; }

		public string UnderlyingName { get; set; }

		public string SecurityCode { get; set; }

		public string SecurityName { get; set; }

		public abstract long AdjustedBalance { get; }

		public abstract long AdjustedAvailableQuantity { get; }

		public decimal LastPrice { get; set; }

		public abstract decimal MarketValue { get; }

		public abstract decimal FloatingPL { get; }

		public bool IsCovered { get; set; }

		public PortfolioGreeks Greeks { get; set; }

		public long PreviousBalance { get; set; }

		public long Balance { get; set; }

		public long AvailableBalance { get; set; }

		public string OptionSide { get; set; }

		public OptionType OptionType { get; set; }
		
		public abstract bool CloseVisible { get; }

		public string IconProfitLossChart
		{
			get
			{
				string value;

				if (OptionSide == "L" && OptionType == OptionType.Call)
				{
					value = "buyCallPL";
				}
				else if (OptionSide == "L" && OptionType == OptionType.Put)
				{
					value = "buyPutPL";
				}
				else if (OptionSide == "L" && OptionType == OptionType.CoveredCall)
				{
					value = "buyCoveredCallPL";
				}
				else if (OptionSide == "S" && OptionType == OptionType.Call)
				{
					value = "sellCallPL";
				}
				else if (OptionSide == "S" && OptionType == OptionType.Put)
				{
					value = "sellPutPL";
				} else if (OptionSide == "C")
				{
					value = "buyCoveredCallPL";
				}
				else
				{
					value = "longStockPL";
				}

				return value;
			}
		}

		public object Clone()
		{
			return MemberwiseClone();
		}
	}
}

using OptionsPlay.DAL.SZKingdom.Common.Enums;

namespace OptionsPlay.BusinessLogic.Common.Entities
{
	//todo: need to be implemented
	public class PortfolioStock : PortfolioItem
	{
		public bool GeneratePremiumVisible { get; set; }

		public decimal StockMarketValue { get; set; }

		public decimal StockFloatingPL { get; set; }

		public override long AdjustedBalance
		{
			get
			{
				return Balance;
			}
		}

		public override long AdjustedAvailableQuantity
		{
			get
			{
				return AvailableBalance;
			}
		}

		public override decimal MarketValue
		{
			get
			{
				return StockMarketValue;
			}
		}

		public override decimal FloatingPL
		{
			get
			{
				return StockFloatingPL;
			}
		}

		public OptionType OptionType
		{
			get { return OptionType.Security; }
		}

		public override bool CloseVisible
		{
			get { return false; }
		}

	}
}

using OptionsPlay.Model.Enums;

namespace OptionsPlay.BusinessLogic.Common.Entities
{
	public class SuggestedStrategyLeg
	{
		public SuggestedStrategyLeg(LegType legType, BuyOrSell buyOrSell, int qty, double? strike = null, DateAndNumberOfDaysUntil expirationDate = null)
		{
			LegType = legType;
			BuyOrSell = buyOrSell;
			StrikePrice = strike;
			ExpirationDate = expirationDate;
			Quantity = qty;
		}

		public LegType LegType { get; set; }

		public BuyOrSell BuyOrSell { get; set; }

		public double? StrikePrice { get; set; }

		public int Quantity { get; set; }

		public DateAndNumberOfDaysUntil ExpirationDate { get; set; }
	}
}
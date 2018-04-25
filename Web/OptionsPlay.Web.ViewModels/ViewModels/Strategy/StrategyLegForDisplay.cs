using OptionsPlay.Model.Enums;

namespace OptionsPlay.Web.ViewModels
{
	public class StrategyLegForDisplay
	{
		public int Id { get; set; }

		public virtual BuyOrSell? BuyOrSell { get; set; }

		public virtual int Quantity { get; set; }

		public virtual short? Strike { get; set; }

		public virtual byte? Expiry { get; set; }

		public virtual LegType? LegType { get; set; }
	}
}
using System.Collections.Generic;

namespace OptionsPlay.Web.ViewModels
{
	public class StrategyForDisplay : StrategyBase
	{
		public StrategyDetailForDisplay BuyDetails { get; set; }

		public StrategyDetailForDisplay SellDetails { get; set; }

		public string PairStrategyName { get; set; }

		public List<StrategyLegForDisplay> Legs { get; set; }
	}
}
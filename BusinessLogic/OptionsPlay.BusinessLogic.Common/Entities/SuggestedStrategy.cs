using System.Collections.Generic;
using System.Linq;
using OptionsPlay.Common.Utilities;
using OptionsPlay.Model.Enums;

namespace OptionsPlay.BusinessLogic.Common.Entities
{
	public class SuggestedStrategy
	{
		public SuggestedStrategy(string strategyName, BuyOrSell buyOrSell)
		{
			StrategyName = strategyName;
			BuyOrSell = buyOrSell;
		}

		public SuggestedStrategy(string strategyName, BuyOrSell buyOrSell, IEnumerable<SuggestedStrategyLeg> legs)
		{
			StrategyName = strategyName;
			BuyOrSell = buyOrSell;
			Legs = legs.ToList();
		}

		public string StrategyName { get; set; }

		public string FullStrategyName
		{
			get
			{
				string name = string.Format("{0} {1}", BuyOrSell, StrategyName);
				return name;
			}
		}

		public BuyOrSell BuyOrSell { get; set; }

		public IReadOnlyList<SuggestedStrategyLeg> Legs { get; set; }

		public bool IsComposed
		{
			get
			{
				bool isComposed = !Legs.IsNullOrEmpty();
				return isComposed;
			}
		}
	}
}
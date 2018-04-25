using System.Collections.Generic;
using OptionsPlay.BusinessLogic.Common.Entities;
using OptionsPlay.Model;

namespace OptionsPlay.BusinessLogic.Common.Services
{
	public interface ISuggestedStrategiesService
	{

		List<SuggestedStrategy> GetSuggestedTradingStrategies(string symbol, bool opposite = false);
		SuggestedStrategy FullfillStrategy(OptionChain chain, Strategy strategyTemplate, bool opposite = false);
	}
}
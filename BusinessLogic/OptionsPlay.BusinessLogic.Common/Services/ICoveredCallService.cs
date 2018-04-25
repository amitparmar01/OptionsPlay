using System.Collections.Generic;
using OptionsPlay.BusinessLogic.Common.Entities;
using OptionsPlay.TechnicalAnalysis.Entities;

namespace OptionsPlay.BusinessLogic.Common
{
	public interface ICoveredCallService
	{
		List<CoveredCall> GetAllCoveredCalls(OptionChain data, LegType? legType = null, double? minimumPremium = null, double? minimumReturn = null
			/*,Signal volOfVol, EarningsCalendar calendar,*/);

		List<CoveredCall> GetOptimalCoveredCalls(OptionChain data, LegType? legType = null, double? minimumPremium = null, double? minimumReturn = null
			/*Signal volOfVol, EarningsCalendar calendar,*/);
	}
}
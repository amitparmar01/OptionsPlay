using System.Collections.Generic;

namespace OptionsPlay.MarketData.Common
{
	public interface IIndicatorsBuilder
	{
		/// <summary>
		/// Instanitates indicators by given string.
		/// Each indicator in string is separated by comma. 
		/// Periodical indicators may have additional period value in brackets.
		/// eg: 
		/// initializationString = "RSI(20), CCI(20), STOCH, WILLR(20), MFI(20)"
		/// if period is not given - the factory creates separate indicator instance
		///  for each default period in PeriodIndicator.DefaultAvgPeriods
		/// </summary>
		/// <param name="initializationString"></param>
		/// <param name="fromJson">If this parameter is true, <paramref name="initializationString"/> must represent valid JSON string</param>
		List<IIndicator> Build(string initializationString, bool fromJson = false);

		/// <summary>
		/// Get List of Default Indicators
		/// </summary>
		List<IIndicator> GetDefaultIndicators();
	}
}
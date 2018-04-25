using OptionsPlay.Common.Options;
using OptionsPlay.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace OptionsPlay.Common.Helpers
{
	//TODO: introduce smart wrapper for TimeFrame
	public static class ApiTimeFrameHelper
	{
		private const string InvalidTimeframeErrorMessage = "Invalid timeframe format";

		// e.g. 5y (5 years), 3m (3 months) etc.
		private const string TimeFramePattern = @"(?i)^\d+[d|m|y]$(?-i)";

		//TODO: eliminate this
		/// <summary>
		/// Returns converted date if timeframe is not greater than one year
		/// </summary>
		public static DateTime? TimeframeIsNotGreaterThanOneYear(string timeframe)
		{
			if (string.IsNullOrWhiteSpace(timeframe))
			{
				timeframe = AppConfigManager.DefaultTimeFrame;
			}
			string yearOrMonth = GetPeriodTypeFromTimeframe(timeframe);
			int number = GetNumberFromTimeframe(timeframe);
			DateTime? date;
			switch (yearOrMonth.ToLower())
			{
				case "y":
					if (number <= 1)
					{
						date = SubtractYearsFromCurrentDate(number);
						return date;
					}
					break;
				case "m":
					if (number <= 12)
					{
						date = SubtractMonthsFromCurrentDate(number);
						return date;
					}
					break;
				case "d":
					if (number <= 365)
					{
						date = SubtractDaysFromCurrentDate(number);
						return date;
					}
					break;
				default:
					throw new Exception(InvalidTimeframeErrorMessage);
			}
			return null;
		}

		//TODO: Eliminate this too
		public static void ValidateTimeFrame(string timeframe)
		{
			if (string.IsNullOrWhiteSpace(timeframe))
			{
				return;
			}
			bool isMatch = Regex.IsMatch(timeframe, TimeFramePattern);
			if (isMatch)
			{
				return;
			}
			string errorMessage = string.Format("Time frame '{0}' does not match format '{1}'", timeframe, TimeFramePattern);
			Logger.LogErrorAndThrow(errorMessage);
		}

		public static DateTime ConvertTimeframeToDateTimeUsingConfig(string timeframe)
		{
			if (string.IsNullOrWhiteSpace(timeframe))
			{
				timeframe = AppConfigManager.DefaultTimeFrame;
			}
			string yearOrMonth = GetPeriodTypeFromTimeframe(timeframe);
			int number = GetNumberFromTimeframe(timeframe);
			DateTime date;
			switch (yearOrMonth.ToLower())
			{
				case "y":
					date = SubtractYearsFromCurrentDate(number);
					return date;
				case "m":
					date = SubtractMonthsFromCurrentDate(number);
					return date;
				case "d":
					date = SubtractDaysFromCurrentDate(number);
					return date;
				default:
					throw new Exception(InvalidTimeframeErrorMessage);
			}
		}

		#region Private methods

		private static string GetPeriodTypeFromTimeframe(string timeframe)
		{
			// matches any character other than a decimal digit
			string yearOrMonth = Regex.Match(timeframe, @"\D").Value;
			return yearOrMonth;
		}

		private static int GetNumberFromTimeframe(string timeframe)
		{
			// matches any decimal digit
			int number = int.Parse(Regex.Match(timeframe, @"\d{0,3}").Value);
			return number;
		}

		private static DateTime SubtractYearsFromCurrentDate(int number)
		{
			DateTime nowDate = GetNowDate();
			DateTime result = nowDate.AddYears(-number);
			return result;
		}

		private static DateTime GetNowDate()
		{
			DateTime now = DateTime.UtcNow;
			return now;
		}

		private static DateTime SubtractMonthsFromCurrentDate(int number)
		{
			DateTime nowDate = GetNowDate();
			DateTime result = nowDate.AddMonths(-number);
			return result;
		}

		private static DateTime SubtractDaysFromCurrentDate(int number)
		{
			DateTime nowDate = GetNowDate();
			DateTime result = nowDate.AddDays(-number);
			return result;
		}

		#endregion Private methods
	}
}

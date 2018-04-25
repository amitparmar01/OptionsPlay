using System;
using System.Collections.Generic;

namespace OptionsPlay.Common.Helpers
{
	public static class MarketDatesHelper
	{
		public static bool IsTimeOfDayBetween(this DateTime time, TimeSpan startTime, TimeSpan endTime)
		{
			if (endTime == startTime)
			{
				return false;
			}
			bool result;
			if (endTime < startTime)
			{
				result = time.TimeOfDay <= endTime || time.TimeOfDay >= startTime;
			}
			else
			{
				result = time.TimeOfDay >= startTime && time.TimeOfDay <= endTime;
			}
			return result;
		}

		public static bool IsBetween(this DateTime time, DateTime startDateTime, DateTime endDateTime)
		{
			if (endDateTime == startDateTime)
			{
				return true;
			}

			bool result = time >= startDateTime && time <= endDateTime;
			return result;
		}

		/// <summary>
		/// Calculates total number of business days, taking into account:
		///  - weekends (Saturdays and Sundays)
		///  - holidays in the middle of the week
		/// http://stackoverflow.com/questions/1617049/calculate-the-number-of-business-days-between-two-dates
		/// </summary>
		/// <param name="firstDay">First day in the time interval</param>
		/// <param name="lastDay">Last day in the time interval</param>
		/// <param name="startOfWorkDay">start of work day</param>
		/// <param name="holidays">List of holidays excluding weekends</param>
		/// <param name="endOfWorkDay">end of work day</param>
		/// <returns>Number of business days during the 'span'</returns>
		public static double TotalBusinessDaysUntil(this DateTime firstDay, DateTime lastDay, TimeSpan? startOfWorkDay = null, TimeSpan? endOfWorkDay = null, List<DateTime> holidays = null)
		{
			TimeSpan firstDayStartTime = firstDay.TimeOfDay;
			firstDay = firstDay.Date;
			lastDay = lastDay.Date;
			if (firstDay > lastDay)
			{
				throw new ArgumentException("Incorrect last day " + lastDay);
			}

			TimeSpan span = lastDay - firstDay;
			int businessDays = span.Days + 1;
			int fullWeekCount = businessDays / 7;
			// find out if there are weekends during the time exceeding the full weeks
			if (businessDays > fullWeekCount * 7)
			{
				// we are here to find out if there is a 1-day or 2-days weekend
				// in the time interval remaining after subtracting the complete weeks
				int firstDayOfWeek = (int)firstDay.DayOfWeek;
				int lastDayOfWeek = (int)lastDay.DayOfWeek;
				if (lastDayOfWeek < firstDayOfWeek)
				{
					lastDayOfWeek += 7;
				}
				if (firstDayOfWeek <= 6)
				{
					if (lastDayOfWeek >= 7) // Both Saturday and Sunday are in the remaining time interval
					{
						businessDays -= 2;
					}
					else if (lastDayOfWeek >= 6) // Only Saturday is in the remaining time interval
					{
						businessDays -= 1;
					}
				}
				else if (firstDayOfWeek <= 7 && lastDayOfWeek >= 7) // Only Sunday is in the remaining time interval
				{
					businessDays -= 1;
				}
			}

			// subtract the weekends during the full weeks in the interval
			businessDays -= fullWeekCount + fullWeekCount;


			if (holidays != null)
			{
				// subtract the number of bank holidays during the time interval
				foreach (DateTime holiday in holidays)
				{
					DateTime bh = holiday.Date;
					if (firstDay <= bh && bh <= lastDay)
					{
						--businessDays;
					}
				}
			}

			if (startOfWorkDay != null && endOfWorkDay != null)
			{
				double diff = firstDayStartTime < startOfWorkDay
					? (endOfWorkDay.Value - startOfWorkDay.Value).TotalDays
					: (endOfWorkDay.Value - firstDayStartTime).TotalDays;

				return businessDays + diff;
			}

			return businessDays;
		}
	}
}
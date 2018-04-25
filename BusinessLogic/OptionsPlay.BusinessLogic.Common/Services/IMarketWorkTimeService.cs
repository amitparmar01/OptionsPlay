using System;
using OptionsPlay.BusinessLogic.Common.Entities;
using OptionsPlay.Common.ServiceResponses;
using OptionsPlay.Model;

namespace OptionsPlay.BusinessLogic.Common
{
	public interface IMarketWorkTimeService
	{
		/// <summary>
		/// Gets market's close time for the <paramref name="date"/> given. 
		/// Checks given date for a holiday and for shortened work day.
		/// </summary>
		EntityResponse<DateTime> GetUtcMarketCloseTimeForDate(DateTime date);

		/// <summary>
		/// Gets market's open time for the <paramref name="date"/> given. 
		/// Checks given date for a holiday.
		/// </summary>
		EntityResponse<DateTime> GetUtcMarketOpenTimeForDate(DateTime date);

		/// <summary>
		/// The convenient combination of <seealso cref="GetUtcMarketOpenTimeForDate"/> and <seealso cref="GetUtcMarketCloseTimeForDate"/>
		/// </summary>
		EntityResponse<Tuple<DateTime, DateTime>> GetUtcMarketOpenCloseTimeForToday();

		/// <summary>
		/// Converts <paramref name="dateTime"/> to market's time zone.
		/// </summary>
		DateTime ConvertUtcToMaketTimeZone(DateTime dateTime);

		/// <summary>
		/// Equivalent to <seealso cref="ConvertUtcToMaketTimeZone"/>(DateTime.UtcNow);
		/// </summary>
		DateTime NowInMarketTimeZone { get; }

		/// <summary>
		/// Checks if market is open at the moment of call. Takes in account current time
		/// </summary>
		bool IsMarketOpenNow();

		/// <summary>
		/// Checks if market is open at the given date. Does not take in account time
		/// </summary>
		bool IsMarketOpen(DateTime date);

		/// <summary>
		/// Checks if market is open today. Does not take in account current time.
		/// Equivalent to <see cref="IsMarketOpen"/>(<see cref="NowInMarketTimeZone"/>)
		/// </summary>
		bool IsMarketOpenToday();

		/// <summary>
		/// Calculates total number of days(including fractional part) left until expiry.
		/// </summary>
		/// <param name="expiry">expiry date</param>
		DateAndNumberOfDaysUntil GetNumberOfDaysLeftUntilExpiry(DateTime expiry);


		/// <summary>
		/// Tries to find a holiday for today (in market time zone).
		/// </summary>
		/// <returns>Null if today is a weekend or a work day</returns>
		Holiday GetHolidayForToday();
	}
}
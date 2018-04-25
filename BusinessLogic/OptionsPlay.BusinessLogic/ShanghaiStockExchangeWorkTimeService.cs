using System;
using System.Collections.Generic;
using System.Linq;
using OptionsPlay.Aspects;
using OptionsPlay.BusinessLogic.Common;
using OptionsPlay.BusinessLogic.Common.Entities;
using OptionsPlay.Common.ConfigurationConstants;
using OptionsPlay.Common.Helpers;
using OptionsPlay.Common.ServiceResponses;
using OptionsPlay.Model;

namespace OptionsPlay.BusinessLogic
{

	/// <summary>
	/// Shanghai Stock Exchange (SSE)
	/// <see cref="http://asiaetrading.com/exchanges/china-exchanges/shanghai-stock-exchange/trading-hours/"/>
	/// <see cref="http://english.sse.com.cn/aboutsse/holiday/"/>
	/// <see cref="http://markets.on.nytimes.com/research/markets/holidays/holidays.asp?display=market&exchange=SHH"/>
	/// </summary>
	public class ShanghaiStockExchangeWorkTimeService: IMarketWorkTimeService
	{
		private readonly IConfigurationService _configurationService;

		private static readonly TimeZoneInfo CstTimeZone = TimeZoneInfo.FindSystemTimeZoneById("China Standard Time");

		private static readonly TimeSpan SseOpenTime = TimeSpan.FromHours(9.25);/*9:15 am CST*/
		private static readonly TimeSpan SseCloseTime = TimeSpan.FromHours(15);/*15:00 CST*/

		public ShanghaiStockExchangeWorkTimeService(IConfigurationService configurationService)
		{
			_configurationService = configurationService;
		}

		#region Implementation of IMarketWorkTimeService
		public EntityResponse<DateTime> GetUtcMarketOpenTimeForDate(DateTime date)
		{
			EntityResponse<Tuple<DateTime, DateTime>> utcMarketOpenCloseTime = GetUtcMarketOpenCloseTimeForDate(date);
			if (!utcMarketOpenCloseTime.IsSuccess)
			{
				return EntityResponse<DateTime>.Error(utcMarketOpenCloseTime);
			}
			return utcMarketOpenCloseTime.Entity.Item1;
		}

		public EntityResponse<DateTime> GetUtcMarketCloseTimeForDate(DateTime date)
		{
			EntityResponse<Tuple<DateTime, DateTime>> utcMarketOpenCloseTime = GetUtcMarketOpenCloseTimeForDate(date);
			if (!utcMarketOpenCloseTime.IsSuccess)
			{
				return EntityResponse<DateTime>.Error(utcMarketOpenCloseTime);
			}
			return utcMarketOpenCloseTime.Entity.Item2;
		}

		public EntityResponse<Tuple<DateTime, DateTime>> GetUtcMarketOpenCloseTimeForToday()
		{
			EntityResponse<Tuple<DateTime, DateTime>> result = GetUtcMarketOpenCloseTimeForDate(NowInMarketTimeZone);
			return result;
		}

		public DateTime ConvertUtcToMaketTimeZone(DateTime dateTime)
		{
			DateTime est = TimeZoneInfo.ConvertTimeFromUtc(dateTime, CstTimeZone);
			return est;
		}

		public DateTime NowInMarketTimeZone
		{
			get
			{
				DateTime result = ConvertUtcToMaketTimeZone(DateTime.UtcNow);
				return result;
			}
		}

		public bool IsMarketOpenNow()
		{
			EntityResponse<Tuple<DateTime, DateTime>> openCloseDates = GetUtcMarketOpenCloseTimeForToday();
			if (!openCloseDates.IsSuccess)
			{
				return false;
			}

			bool isMarketOpen = DateTime.UtcNow.IsBetween(openCloseDates.Entity.Item1, openCloseDates.Entity.Item2);
			return isMarketOpen;
		}

		public bool IsMarketOpen(DateTime date)
		{
			EntityResponse<Tuple<DateTime, DateTime>> openCloseDates = GetUtcMarketOpenCloseTimeForDate(date);
			return openCloseDates.IsSuccess;
		}

		public bool IsMarketOpenToday()
		{
			EntityResponse<Tuple<DateTime, DateTime>> openCloseDates = GetUtcMarketOpenCloseTimeForDate(NowInMarketTimeZone);
			return openCloseDates.IsSuccess;
		}

		// todo: consider to remove from here
		public DateAndNumberOfDaysUntil GetNumberOfDaysLeftUntilExpiry(DateTime expiry)
		{
			int delta = 0;
			EntityResponse<DateTime> utcMarketCloseTimeForDate = GetUtcMarketCloseTimeForDate(expiry);
			if (utcMarketCloseTimeForDate == null)
			{
				delta = -1;
			}

			if (expiry.Kind == DateTimeKind.Utc)
			{
				expiry = TimeZoneInfo.ConvertTimeFromUtc(expiry, CstTimeZone);
			}

			DateTime utcMarketCloseTime = TimeZoneInfo.ConvertTimeToUtc(expiry.Date.Add(SseCloseTime), CstTimeZone);
			TimeSpan diff = (utcMarketCloseTime - DateTime.UtcNow);
			DateAndNumberOfDaysUntil result = new DateAndNumberOfDaysUntil
			{
				FutureDate = expiry,
				TotalNumberOfDaysUntilExpiry = diff.TotalDays + delta
			};

			return result; 
		}

		public Holiday GetHolidayForToday()
		{
			Holiday holiday = GetHolidayForDate(NowInMarketTimeZone);
			return holiday;
		}

		#endregion

		private EntityResponse<Tuple<DateTime, DateTime>> GetUtcMarketOpenCloseTimeForDate(DateTime date)
		{
			if (date.DayOfWeek == DayOfWeek.Saturday || date.DayOfWeek == DayOfWeek.Sunday || GetHolidayForDate(date.Date) != null)
			{
				return ErrorCode.MarketIsClosed;
			}

			if (date.Kind == DateTimeKind.Utc)
			{
				date = TimeZoneInfo.ConvertTimeFromUtc(date, CstTimeZone);
			}

			DateTime utcMarketOpenTime = TimeZoneInfo.ConvertTimeToUtc(date.Date.Add(SseOpenTime), CstTimeZone);
			DateTime utcMarketCloseTime = TimeZoneInfo.ConvertTimeToUtc(date.Date.Add(SseCloseTime), CstTimeZone);

			return Tuple.Create(utcMarketOpenTime, utcMarketCloseTime);
		}

		private Holiday GetHolidayForDate(DateTime date)
		{
			List<Holiday> holidays = GetHolidaysFromConfiguration();
			Holiday holiday = holidays.FirstOrDefault(h => h.Date.Date.Equals(date.Date));
			return holiday;
		}

		[Cache(CacheExpirationInSeconds = 15 * 60)]
		private List<Holiday> GetHolidaysFromConfiguration()
		{
			List<Holiday> holidays = _configurationService.GetValueOnly<List<Holiday>>(
				CalendarConfigurationConstants.PathToShanghaiHolidays,
				CalendarConfigurationConstants.ShanghaiTradingHolidaysSettingName);

			return holidays;
		}
	}
}
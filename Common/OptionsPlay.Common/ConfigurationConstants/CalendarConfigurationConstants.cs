namespace OptionsPlay.Common.ConfigurationConstants
{
	// WARN: Do not modify these constants. If you do you must add migration to update corresponding values in DB
	public class CalendarConfigurationConstants
	{
		public const string CalendarsRootName = "market_calendar";

		public const string ShanghaiCalendarName = "shanghai";

		public static string ShanghaiTradingHolidaysSettingName = "shanghai_trading_holidays";

		public static string[] PathToShanghaiHolidays = { CalendarsRootName, ShanghaiCalendarName };

		public const string ShenzhenCalendarName = "shenzhen";

		public static string ShenzhenTradingHolidaySettingName = "shenzhen_trading_holidays";

		public static string[] PathToShenzhenHolidays = { CalendarsRootName, ShenzhenCalendarName };
	}
}
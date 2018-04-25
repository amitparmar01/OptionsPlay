using System.Collections.Generic;
using OptionsPlay.Common.ConfigurationConstants;
using OptionsPlay.Common.ObjectJsonSerialization;
using OptionsPlay.DAL.EF.Core.Helpers;

namespace OptionsPlay.DAL.EF.Core.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddMarketHolidayConfiguration : DbMigration
	{
		public override void Up()
		{
			List<Holiday> holidays = new List<Holiday>
			{
				CreateHoliday("01/01/2013", "New Year's Day"),
				CreateHoliday("01/02/2013", "Additional New Year Holiday"),
				CreateHoliday("01/03/2013", "Additional New Year Holiday 2"),
				CreateHoliday("02/11/2013", "Lunar New Year 2"),
				CreateHoliday("02/12/2013", "Lunar New Year 3"),
				CreateHoliday("02/13/2013", "Lunar New Year 4"),
				CreateHoliday("02/14/2013", "Lunar New Year 5"),
				CreateHoliday("02/15/2013", "Lunar New Year 6"),
				CreateHoliday("04/04/2013", "Ching Ming Festival Eve"),
				CreateHoliday("04/05/2013", "Ching Ming Festival"),
				CreateHoliday("04/29/2013", "Labour Day Holiday"),
				CreateHoliday("04/30/2013", "Labour Day Holiday 2"),
				CreateHoliday("05/01/2013", "Labour Day 1"),
				CreateHoliday("06/10/2013", "Dragon Boat Festival Holiday"),
				CreateHoliday("06/11/2013", "Dragon Boat Festival Holiday 2"),
				CreateHoliday("06/12/2013", "Dragon Boat Festival (Tuen Ng Day)"),
				CreateHoliday("09/19/2013", "Mid-autumn Festival"),
				CreateHoliday("09/20/2013", "Day after Mid-Autumn Festival"),
				CreateHoliday("10/01/2013", "National Day 1"),
				CreateHoliday("10/02/2013", "National Day 2"),
				CreateHoliday("10/03/2013", "National Day 3"),
				CreateHoliday("10/04/2013", "National Day 4"),
				CreateHoliday("10/07/2013", "National Day 7"),


				CreateHoliday("01/01/2014", "New Year's Day"),
				CreateHoliday("01/02/2014", "Additional New Year Holiday"),
				CreateHoliday("01/03/2014", "Additional New Year Holiday 2"),
				CreateHoliday("01/30/2014", "Lunar New Year Eve 1"),
				CreateHoliday("01/31/2014", "Lunar New Year 1"),
				CreateHoliday("02/03/2014", "Lunar New Year 4"),
				CreateHoliday("02/04/2014", "Lunar New Year 5"),
				CreateHoliday("02/05/2014", "Lunar New Year 6"),
				CreateHoliday("02/06/2014", "Lunar New Year 7"),
				CreateHoliday("02/07/2014", "Lunar New Year 8"),
				CreateHoliday("04/04/2014", "Ching Ming Festival Eve"),
				CreateHoliday("04/07/2014", "Ching Ming Festival Holiday"),
				CreateHoliday("05/01/2014", "Labour Day 1"),
				CreateHoliday("05/02/2014", "Labour Day 2"),
				CreateHoliday("06/02/2014", "Dragon Boat Festival Holiday"),
				CreateHoliday("09/08/2014", "Mid-autumn Festival"),
				CreateHoliday("10/01/2014", "National Day 1"),
				CreateHoliday("10/02/2014", "National Day 2"),
				CreateHoliday("10/03/2014", "National Day 3"),
				CreateHoliday("10/06/2014", "National Day 6"),
				CreateHoliday("10/07/2014", "National Day 7"),
			};

			ConfigDirectoryInsert calendarDir = new ConfigDirectoryInsert
			{
				Name = CalendarConfigurationConstants.CalendarsRootName,
				FullPath = CalendarConfigurationConstants.CalendarsRootName, //must be recalculated for inner directories
			};
			calendarDir.Id = SqlExecute.InsertAndGetInt32Identity("ConfigDirectories", calendarDir);

			ConfigDirectoryInsert calendarDirShanghai = new ConfigDirectoryInsert
			{
				Name = CalendarConfigurationConstants.ShanghaiCalendarName,
				ParentDirectory_Id = calendarDir.Id,
				FullPath = ConfigDirectoryDirHelper.GetConfigDirectoryFullPath(calendarDir.Name, CalendarConfigurationConstants.ShanghaiCalendarName), //must be recalculated for inner directories
			};
			calendarDirShanghai.Id = SqlExecute.InsertAndGetInt32Identity("ConfigDirectories", calendarDirShanghai);


			ConfigValueInsert holidaysSettingValue = new ConfigValueInsert
			{
				Description = "Shanghai Stock Exchange Market Holidays",
				Name = CalendarConfigurationConstants.ShanghaiTradingHolidaysSettingName,
				ParentDirectory_Id = calendarDirShanghai.Id,
			};

			holidaysSettingValue.SetValue(holidays, typeof(List<Model.Holiday>));
			SqlExecute.InsertAndGetInt32Identity("ConfigValues", holidaysSettingValue);

		}

		private static Holiday CreateHoliday(string dateStr, string name)
		{
			DateTime date = DateTime.Parse(dateStr);
			return new Holiday
			{
				Date = date,
				Name = name,
			};
		}

		public override void Down()
		{
			Sql(string.Format("Delete FROM [ConfigValues] WHERE [Name] = '{0}' ", CalendarConfigurationConstants.ShanghaiTradingHolidaysSettingName));
			Sql(string.Format("Delete FROM [ConfigDirectories] WHERE [Name] = '{0}' ", CalendarConfigurationConstants.ShanghaiCalendarName));
			Sql(string.Format("Delete FROM [ConfigDirectories] WHERE [Name] = '{0}' ", CalendarConfigurationConstants.CalendarsRootName));
		}
    }
}

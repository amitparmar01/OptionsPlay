using System;
using System.Data.Entity;
using System.Linq;
using OptionsPlay.DAL.Interfaces.Repositories;
using OptionsPlay.Model;

namespace OptionsPlay.DAL.EF.Repositories
{
	public class DailyPlayRepository : EFRepository<DailyPlay>, IDailyPlayRepository
	{
		public DailyPlayRepository(DbContext dbContext) : base(dbContext)
		{
		}

		#region Implementation of IDailyPlayRepository

		/// <summary>
		/// Get DailyPlay for the Day
		/// </summary>
		public DailyPlay GetByDate(DateTime date)
		{
			date = date.Date;
			DailyPlay dailyPlay = GetAll().SingleOrDefault(item => item.Date == date);
			return dailyPlay;
		}

		/// <summary>
		/// Create or Update DailyPlay for trade idea
		/// </summary>
		public void AddOrUpdate(TradeIdea tradeIdea)
		{
			DateTime date = tradeIdea.DateOfScan.Date;

			DailyPlay dailyPlay = GetByDate(date);
			if (dailyPlay != null)
			{
				dailyPlay.Price = tradeIdea.Price;
				dailyPlay.MasterSecurity = tradeIdea.MasterSecurity;
				Update(dailyPlay);
			}
			else
			{
				dailyPlay = new DailyPlay
				{
					Price = tradeIdea.Price,
					SecurityCode = tradeIdea.MasterSecurity.SecurityCode,
					MasterSecurity = tradeIdea.MasterSecurity,
					Date = date
				};
				Add(dailyPlay);
			}
		}

		#endregion
	}
}
using System;
using OptionsPlay.Model;

namespace OptionsPlay.DAL.Interfaces.Repositories
{
	public interface IDailyPlayRepository : IRepository<DailyPlay>
	{
		/// <summary>
		/// Get DailyPlay for the Day
		/// </summary>
		DailyPlay GetByDate(DateTime date);

		/// <summary>
		/// Create or Update DailyPlay for trade idea
		/// </summary>
		void AddOrUpdate(TradeIdea tradeIdea);
	}
}
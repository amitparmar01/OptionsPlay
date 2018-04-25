using System.Collections.Generic;
using OptionsPlay.Model;

namespace OptionsPlay.DAL.Interfaces.Repositories
{
	public interface IEarningsCalendarRepository : IMongoRepository<EarningsCalendar>
	{
		/// <summary>
		/// Add or Update EarningsCalendars
		/// </summary>
		void AddOrUpdate(IList<EarningsCalendar> earningsCalendars);

		/// <summary>
		/// Get EarningsCalendar by Symbol
		/// </summary>
		EarningsCalendar GetBySymbol(string symbol);
	}
}
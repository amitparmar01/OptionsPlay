using System;
using System.Linq;
using OptionsPlay.Model;

namespace OptionsPlay.DAL.Interfaces.Repositories
{
	public interface IHistoricalQuoteRepository : IMongoRepository<HistoricalQuote>
	{
		IQueryable<HistoricalQuote> Get(string securityCode, DateTime startDate);

        void DeleteTradeIdeaByFileName(ref System.IO.FileStream fs, string stockName);

        void UpdateStringAsISODate(ref System.IO.FileStream fs, string stockName);
	}
}

using System;
using System.Linq;
using OptionsPlay.DAL.Interfaces.Repositories;
using OptionsPlay.Model;
using System.IO;
using MongoDB.Driver.Builders;

namespace OptionsPlay.DAL.MongoDB.Repositories.Repositories
{
	public class HistoricalQuoteRepository : MongoRepository<HistoricalQuote>, IHistoricalQuoteRepository
	{
		public HistoricalQuoteRepository(MongoDBContext mongoDBContext)
			: base(mongoDBContext)
		{
		}

		public IQueryable<HistoricalQuote> Get(string securityCode, DateTime startDate)
		{
			string lowerCaseSymbol = securityCode.ToLower();

			IQueryable<HistoricalQuote> historicalQuotes = GetAll()
				.Where(m => m.StockCode == lowerCaseSymbol
					&& m.TradeDate >= startDate);

			return historicalQuotes;
		}

        public void DeleteTradeIdeaByFileName(ref System.IO.FileStream fs, string stockName)
        {
            Delete(Query.And(Query<HistoricalQuote>.Matches(e => e.StockCode, Path.GetFileNameWithoutExtension(fs.Name))));


        }


        public void UpdateStringAsISODate(ref System.IO.FileStream fs,string stockName)
        {
            Update(Query<HistoricalQuote>.Matches(e => e.StockCode, Path.GetFileNameWithoutExtension(fs.Name)), Update<HistoricalQuote>.Set(quote => quote.StockCode, ""));

              
        }
       
	}
}

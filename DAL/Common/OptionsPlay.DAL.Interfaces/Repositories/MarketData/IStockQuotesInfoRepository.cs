using System.Collections.Generic;
using OptionsPlay.Model;

namespace OptionsPlay.DAL.Interfaces.Repositories
{
	public interface IStockQuotesInfoRepository : IMongoRepository<StockQuoteInfo>
	{
		void Replace(IEnumerable<StockQuoteInfo> items);

		void Update(List<StockQuoteInfo> newItems, List<StockQuoteInfo> previousItems);
	}
}

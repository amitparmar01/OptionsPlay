using System.Collections.Generic;
using OptionsPlay.Model;

namespace OptionsPlay.DAL.Interfaces.Repositories
{
	public interface IOptionQuotesInfoRepository : IMongoRepository<OptionQuoteInfo>
	{
		void Replace(IEnumerable<OptionQuoteInfo> items);

		void Update(List<OptionQuoteInfo> newItems, List<OptionQuoteInfo> previousItems);
	}
}

using MongoDB.Driver.Builders;
using OptionsPlay.DAL.Interfaces.Repositories.MarketData;
using OptionsPlay.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OptionsPlay.DAL.MongoDB.Repositories.Repositories
{
    public class OptionQuotePerMinuteRepository : MongoRepository<OptionQuoteInfo>, IOptionQuotePerMinuteRepository
    {
        public OptionQuotePerMinuteRepository(MongoDBContext monoDBContext)
            : base(monoDBContext)
        {
            CollectionName = "OptionQuotesPerMinute";
        }


        public void DeleteDataBeforeTwoDays()
        {
            Delete(Query.And(Query<OptionQuoteInfo>.LT(e=>e.TradeDate,System.DateTime.Now.AddDays(-2))));


        }

    }
}

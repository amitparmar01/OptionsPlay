using OptionsPlay.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OptionsPlay.DAL.Interfaces.Repositories
{
    public interface IStockQuotePerMinuteRepository : IMongoRepository<StockQuoteInfo>
    {
        void DeleteDataBeforeTwoDays();
    }
}

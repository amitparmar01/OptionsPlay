using OptionsPlay.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OptionsPlay.DAL.Interfaces.Repositories.MarketData
{
    public interface IOptionQuotePerMinuteRepository : IMongoRepository<OptionQuoteInfo>
    {

        void DeleteDataBeforeTwoDays();

    }
}

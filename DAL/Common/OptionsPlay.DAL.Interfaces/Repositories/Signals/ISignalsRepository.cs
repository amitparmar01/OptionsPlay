using OptionsPlay.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OptionsPlay.DAL.Interfaces.Repositories
{
    public interface ISignalsRepository : IMongoRepository<Signal>
    {
        List<Signal> Get(string symbol, string[] signalNames, int last);

        void AddOrUpdateBySymbol(List<Signal> signals, string symbol);

        void AddOrUpdateByName(List<Signal> signals, string signalName, DateTime date);

        List<Signal> Get(List<string> symbols, string signalName);
    }
}

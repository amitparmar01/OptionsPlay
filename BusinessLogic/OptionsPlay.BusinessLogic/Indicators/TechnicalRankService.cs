using OptionsPlay.BusinessLogic.Common.Indicators;
using OptionsPlay.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using OptionsPlay.Common.Utilities;
using OptionsPlay.MarketData.Indicators;

namespace OptionsPlay.BusinessLogic.Indicators
{
    public class TechnicalRankService : ITechnicalRankService
    {
        public List<Signal> GenerateTechnicalRank(List<string> symbols, List<Signal> technicalRankScores)
        {
            List<Signal> technicalRanks = GetTechnicalRankSignalsForDate(symbols, technicalRankScores, DateTime.UtcNow);
            return technicalRanks;
        }

        private List<Signal> GetTechnicalRankSignalsForDate(IEnumerable<string> symbols, List<Signal> technicalRankScores, DateTime date) 
        {
            int valuableCount = technicalRankScores.Count;
            technicalRankScores.Sort(s => s.Value);
            List<Signal> rankedSignals = technicalRankScores.Select((x, index) => new Signal 
            {
                StockCode = x.StockCode,
                Date = date,
                Name = TechnicalRank.GetName(),
                Value = Convert.ToInt32(Math.Ceiling((double)10 * (index + 1) / valuableCount))
            }).ToList();

            IEnumerable<Signal> zeroRankedSignals = symbols.Where(x => !rankedSignals.Exists(s => s.StockCode.Equals(x.ToLower()))).Select(x => new Signal
            {
                StockCode = x,
                Date = date,
                Name = TechnicalRank.GetName(),
                Value = 0
            });

            rankedSignals.AddRange(zeroRankedSignals);
            return rankedSignals;
        }
    }
}

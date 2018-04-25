using OptionsPlay.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OptionsPlay.BusinessLogic.Common.Indicators
{
    public interface ITechnicalRankService
    {
        /// <summary>
        /// Generates technical rank by latest TecnicalRankScore values.
        /// </summary>
        List<Signal> GenerateTechnicalRank(List<string> symbols, List<Signal> technicalRankScores);
    }
}

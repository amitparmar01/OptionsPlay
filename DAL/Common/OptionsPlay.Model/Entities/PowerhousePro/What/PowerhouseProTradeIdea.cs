using OptionsPlay.Model.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OptionsPlay.Model.Entities.PowerhousePro.What
{
    public class PowerhouseProTradeIdea : PowerhouseProBaseTradeIdea
    {
        public DateTime DateOfScan { get; set; }

        public int? SyrahSentiment { get; set; }

        public int? SyrahSentimentShortTerm { get; set; }

        public TradeIdeasSentiment Sentiment { get; set; }

        public int? TechnicalRank { get; set; }
    }
}

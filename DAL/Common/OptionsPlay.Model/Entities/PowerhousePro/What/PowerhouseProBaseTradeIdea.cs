using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OptionsPlay.Model.Entities.PowerhousePro.What
{
    public abstract class PowerhouseProBaseTradeIdea
    {
        public string Symbol { get; set; }

        public string CompanyName { get; set; }

        public string Sector { get; set; }

        public double MarketCap { get; set; }
    }
}

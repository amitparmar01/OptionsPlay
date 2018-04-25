using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OptionsPlay.Web.ViewModels.ViewModels.MarketData
{
    public class StockQuotationInformationPerMinuteViewModel
    {

        public string SecurityCode { get; set; }
        public decimal Volume { get; set; }
        public decimal LastPrice { get; set; }

        public string TradeDate { get; set; }
        public decimal CurrentVolume { get; set; }

        public decimal PreviousClose { get; set; }

    }
}

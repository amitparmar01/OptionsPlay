using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OptionsPlay.Web.ViewModels.ViewModels.MarketData
{
    public class OptionQuotationInformationPerMinuteViewModel
    {
        public string OptionNumber { get; set; }
        public long TradeQuantity { get; set; }
        public decimal LatestTradedPrice { get; set; }

        public string TradeDate { get; set; }
    }
}

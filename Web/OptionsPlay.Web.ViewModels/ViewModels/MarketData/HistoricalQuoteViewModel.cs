using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OptionsPlay.Web.ViewModels.ViewModels.MarketData
{
	public class HistoricalQuoteViewModel
	{

		public DateTime TradeDate { get; set; }

		public string StockCode { get; set; }

		public string StockName { get; set; }

		public double LastClosePrice { get; set; }

		public double OpenPrice { get; set; }

		public double HighPrice { get; set; }

		public double LowPrice { get; set; }

		public double MatchQuantity { get; set; }

		public double MatchSum { get; set; }

		public double ClosePrice { get; set; }

	}
}

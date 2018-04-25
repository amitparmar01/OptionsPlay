using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OptionsPlay.Web.ViewModels.MarketData
{
	public class CompanyViewModel
	{
		public string SecurityCode { get; set; }
		public string SecurityName { get; set; }
		public string StockExchange { get; set; }

		public bool HasOptions { get; set; }
	}
}

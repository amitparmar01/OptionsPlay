using System.Collections.Generic;

namespace OptionsPlay.Web.ViewModels.MarketData
{
	public class BasePortfolioItemGroupViewModel
	{
		public string Id { get; set; }

		public List<PortfolioItemViewModel> Items { get; set; }

		public bool IsStockGroup { get; set; }
	}
}

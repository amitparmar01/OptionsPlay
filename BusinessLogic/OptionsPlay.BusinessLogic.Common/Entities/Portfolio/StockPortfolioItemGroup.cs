using System;
using System.Collections.Generic;
using System.Linq;

namespace OptionsPlay.BusinessLogic.Common.Entities
{
	public class StockPortfolioItemGroup : BasePortfolioItemGroup
	{
		public StockPortfolioItemGroup(IEnumerable<PortfolioItem> items) : base(items)
		{
			IsStockGroup = true;
		}
	}
}

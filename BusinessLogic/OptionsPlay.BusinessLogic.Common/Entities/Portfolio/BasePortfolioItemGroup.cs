using System;
using System.Collections.Generic;
using System.Linq;

namespace OptionsPlay.BusinessLogic.Common.Entities
{
	public abstract class BasePortfolioItemGroup
	{
		public BasePortfolioItemGroup(IEnumerable<PortfolioItem> items)
		{
			Id = Guid.NewGuid();
			_items = items.ToList();
			_stocks = _items.Where(item => item is PortfolioStock).Cast<PortfolioStock>().ToList();
			_options = _items.Where(item => item is PortfolioOption).Cast<PortfolioOption>().ToList();
		}

		public Guid Id { get; set; }

		protected readonly List<PortfolioItem> _items;

		protected readonly List<PortfolioStock> _stocks;
		protected readonly List<PortfolioOption> _options;

		public bool IsStockGroup { get; set; }

		public List<PortfolioItem> Items 
		{
			get
			{
				return _items;
			}
		}

	}
}

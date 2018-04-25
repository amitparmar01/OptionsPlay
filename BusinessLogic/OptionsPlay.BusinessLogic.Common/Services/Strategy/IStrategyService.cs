using System;
using System.Collections.Generic;
using System.Linq;
using OptionsPlay.BusinessLogic.Common.Entities;
using OptionsPlay.Model;

namespace OptionsPlay.BusinessLogic.Common
{
	public interface IStrategyService
	{
		IQueryable<Strategy> GetAll();

		IQueryable<Strategy> GetAll(int pageNumber, out int totalCount);

		IEnumerable<Strategy> Where(Func<Strategy, bool> predicate);

		Strategy GetById(int id);

		void Create(Strategy strategy);

		void Update(Strategy strategy);

		bool Delete(int id);

		IEnumerable<BasePortfolioItemGroup> GetPortfolioItemsGroupedByStrategy(IEnumerable<PortfolioOption> portfolioOptions, IEnumerable<PortfolioStock> portfolioStocks);

	}
}

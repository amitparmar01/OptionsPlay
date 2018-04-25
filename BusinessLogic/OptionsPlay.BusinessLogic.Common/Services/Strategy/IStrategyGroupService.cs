using System.Collections.Generic;
using System.Linq;
using OptionsPlay.Common.ServiceResponses;
using OptionsPlay.Model;

namespace OptionsPlay.BusinessLogic.Interfaces
{
	public interface IStrategyGroupService
	{
		IQueryable<StrategyGroup> GetAll();

		IQueryable<StrategyGroup> GetAll(int pageNumber, out int totalCount);

		List<Strategy> GetNotGroupedStrategies(int? callStrategyId, int? putStrategyId);

		StrategyGroup GetById(int id);

		StrategyGroup Create(StrategyGroup strategyGroup);

		void Update(StrategyGroup strategyGroup);

		BaseResponse Delete(int id);
	}
}

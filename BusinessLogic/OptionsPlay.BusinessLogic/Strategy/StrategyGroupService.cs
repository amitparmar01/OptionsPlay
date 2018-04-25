using System.Collections.Generic;
using System.Linq;
using OptionsPlay.BusinessLogic.Interfaces;
using OptionsPlay.Common.ServiceResponses;
using OptionsPlay.DAL.Interfaces;
using OptionsPlay.Model;

namespace OptionsPlay.BusinessLogic
{
	public class StrategyGroupService : BaseService, IStrategyGroupService
	{
		public StrategyGroupService(IOptionsPlayUow uow)
			: base(uow)
		{
		}

		public IQueryable<StrategyGroup> GetAll()
		{
			IQueryable<StrategyGroup> strategyGroups = Uow.StrategyGroups.GetAll();
			return strategyGroups;
		}

		public IQueryable<StrategyGroup> GetAll(int pageNumber, out int totalCount)
		{
			IQueryable<StrategyGroup> strategyGroups = Uow.StrategyGroups.GetAll(pageNumber, out totalCount);
			return strategyGroups;
		}

		public List<Strategy> GetNotGroupedStrategies(int? callStrategyId, int? putStrategyId)
		{
			List<long> groupedStrategyIds = new List<long>();
			foreach (StrategyGroup strategyGroup in Uow.StrategyGroups.GetAll())
			{
				groupedStrategyIds.Add(strategyGroup.CallStrategyId);
				if (strategyGroup.PutStrategyId.HasValue)
				{
					groupedStrategyIds.Add(strategyGroup.PutStrategyId.Value);
				}
			}

			List<Strategy> strategies = Uow.Strategies
				.GetAll()
				.Where(m => !groupedStrategyIds.Contains(m.Id)
							|| m.Id == callStrategyId
							|| m.Id == putStrategyId)
				.ToList();
			return strategies;
		}

		public StrategyGroup GetById(int id)
		{
			StrategyGroup strategyGroup = Uow.StrategyGroups.GetById(id);
			return strategyGroup;
		}

		public StrategyGroup Create(StrategyGroup strategyGroup)
		{
			Uow.StrategyGroups.Add(strategyGroup);
			Uow.Commit();
			return strategyGroup;
		}

		public void Update(StrategyGroup strategyGroup)
		{
			Uow.StrategyGroups.Update(strategyGroup);
			Uow.Commit();
		}

		public BaseResponse Delete(int id)
		{
			bool success = Uow.StrategyGroups.Delete(id);
			if (success)
			{
				Uow.Commit();
			}
			else
			{
				return ErrorCode.ItemNotFound;
			}
			return BaseResponse.Success();
		}
	}
}

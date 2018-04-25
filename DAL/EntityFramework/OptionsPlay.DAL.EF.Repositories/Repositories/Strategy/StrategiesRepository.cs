using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using OptionsPlay.DAL.EF.Repositories.Helpers;
using OptionsPlay.DAL.Interfaces.Repositories;
using OptionsPlay.Model;

namespace OptionsPlay.DAL.EF.Repositories
{
	public class StrategiesRepository : EFRepository<Strategy, int>, IStrategiesRepository
	{
		public StrategiesRepository(DbContext context)
			: base(context)
		{
		}

		public override void Update(Strategy entity)
		{
			// update strategy details
			DbEntityEntry buyDetailsEntry = DbContext.Entry(entity.BuyDetails);
			buyDetailsEntry.State = EntityState.Modified;
			DbEntityEntry sellDetailsEntry = DbContext.Entry(entity.SellDetails);
			sellDetailsEntry.State = EntityState.Modified;

			// update existing legs, create new ones
			foreach (StrategyLeg strategyLeg in entity.Legs)
			{
				EntityState entityState = strategyLeg.Id == default(long)
					? EntityState.Added
					: EntityState.Modified;
				DbEntityEntry dbEntityEntry = DbContext.Entry(strategyLeg);
				dbEntityEntry.State = entityState;
			}

			// delete legs
			Strategy originalEntity = GetById(entity.Id);
			// 'Legs' collection might be modified => 'ToList()' is essential
			foreach (StrategyLeg strategyLeg in originalEntity.Legs.ToList())
			{
				if (entity.Legs.All(m => m.Id != strategyLeg.Id))
				{
					DbContext.Entry(strategyLeg).State = EntityState.Deleted;
				}
			}

			// pair strategy has been removed
			if (!entity.PairStrategyId.HasValue && originalEntity.PairStrategyId.HasValue)
			{
				DeletePairStrategy(originalEntity);
			}
			// pair strategy has been added
			if (entity.PairStrategyId.HasValue && !originalEntity.PairStrategyId.HasValue)
			{
				AddPairStrategy(entity);
			}
			// pair strategy has been edited
			if (entity.PairStrategyId.HasValue && originalEntity.PairStrategyId.HasValue)
			{
				DeletePairStrategy(originalEntity);
				AddPairStrategy(entity);
			}

			// update strategy iteself
			DbContext.Entry(originalEntity).CurrentValues.SetValues(entity);
		}

		public override bool Delete(int id)
		{
			Strategy strategy = GetById(id);
			if (strategy != null)
			{
				Delete(strategy.BuyDetails);
				Delete(strategy.SellDetails);
				Delete(strategy);

				if (strategy.PairStrategyId.HasValue)
				{
					Strategy pairStrategy = GetById(strategy.PairStrategyId.Value);
					pairStrategy.PairStrategyId = null;
				}

				return true;
			}
			return false;
		}

		public IQueryable<Strategy> GetAll(int pageNumber, out int totalCount)
		{
			IQueryable<Strategy> strategies = DbSet
				.OrderBy(m => m.Id)
				.GetByPageNumber(pageNumber, out totalCount);
			return strategies;
		}

		public IEnumerable<Strategy> Where(Func<Strategy, bool> predicate)
		{
			IEnumerable<Strategy> list = DbSet.Where(predicate);
			return list;
		}

		public void AddPairStrategy(Strategy strategy)
		{
			if (!strategy.PairStrategyId.HasValue)
			{
				return;
			}
			Strategy pairStrategy = GetById(strategy.PairStrategyId.Value);
			if (pairStrategy.PairStrategyId.HasValue)
			{
				throw new Exception("Pair Strategy already has PairStrategyId.");
			}
			pairStrategy.PairStrategyId = strategy.Id;
		}

		private void DeletePairStrategy(Strategy strategy)
		{
			if (!strategy.PairStrategyId.HasValue)
			{
				return;
			}
			Strategy pairStrategy = GetById(strategy.PairStrategyId.Value);
			pairStrategy.PairStrategyId = null;
		}

		private void Delete(StrategyDetail strategyDetail)
		{
			DbEntityEntry dbEntityEntry = DbContext.Entry(strategyDetail);
			dbEntityEntry.State = EntityState.Deleted;
		}
	}
}

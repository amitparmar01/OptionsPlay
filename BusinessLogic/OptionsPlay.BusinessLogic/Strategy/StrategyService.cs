using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using OptionsPlay.BusinessLogic.Common;
using OptionsPlay.BusinessLogic.Common.Extensions;
using OptionsPlay.DAL.Interfaces;
using OptionsPlay.DAL.SZKingdom.Common.Enums;
using OptionsPlay.Model;
using System.Text;
using OptionsPlay.Model.Enums;
using OptionsPlay.BusinessLogic.Common.Entities;

namespace OptionsPlay.BusinessLogic
{
	public class StrategyService : BaseService, IStrategyService
	{
		private const int DefaultMultiplier = 1000;
		public StrategyService(IOptionsPlayUow uow)
			: base(uow)
		{
		}

		public List<Tuple<int, string, string>> GetEigenValues()
		{
			List<Strategy> strategies = GetAll().ToList();
			var eigenValues = new List<Tuple<int, string, string>>();

			foreach (Strategy strategy in strategies)
			{
				string buyEigenValue = GetEigenValue(strategy, false);
				string sellEigenValue = GetEigenValue(strategy, true);

				eigenValues.Add( new Tuple<int, string, string>(strategy.Id, buyEigenValue, sellEigenValue));
			}

			return eigenValues;
		}

		private string GetEigenValue(Strategy strategy, bool invertBuyOrSell)
		{
			StringBuilder value = new StringBuilder();
			StrategyLeg previousLeg = null;
			List<StrategyLeg> sortedList =
				strategy.Legs
				.OrderBy(x => x.LegType == LegType.Security ? -1 : 1)
					.ThenBy(x => x.Expiry)
					.ThenBy(x => x.Strike)
					.ThenBy(x => x.LegType == LegType.Call ? -1 : 1)
					.ToList();

			BuyOrSell targetBuyOrSell = invertBuyOrSell
				? BuyOrSell.Sell
				: BuyOrSell.Buy;

			foreach (StrategyLeg strategyLeg in sortedList)
			{
				double quantity = strategyLeg.BuyOrSell == targetBuyOrSell
					? strategyLeg.Quantity
					: - (strategyLeg.Quantity);

				if (strategyLeg.LegType == LegType.Security)
				{
					quantity = quantity / DefaultMultiplier;
				}

				int result;
				if (previousLeg != null)
				{
					double previousQuantity = previousLeg.BuyOrSell == targetBuyOrSell
						? previousLeg.Quantity
						: -(previousLeg.Quantity);

					if (previousLeg.LegType == LegType.Security)
					{
						previousQuantity = previousQuantity / DefaultMultiplier;
					}

					result = Convert.ToInt32(quantity / previousQuantity* 100);
				}
				else
				{
					result = quantity > 0
						? 1
						: -1;
				}
				value.Append(result);

				if (previousLeg == null || previousLeg.LegType == LegType.Security)
				{
					result = 2;
				}
				else
				{
					result = Math.Sign(previousLeg.Expiry.Value - strategyLeg.Expiry.Value);
				}
				value.Append(result);

				if (previousLeg == null || previousLeg.LegType == LegType.Security)
				{
					result = 2;
				}
				else
				{
					result = previousLeg.Strike == strategyLeg.Strike
						? 1
						: 0;
				}
				value.Append(result);

				switch (strategyLeg.LegType)
				{
					case (LegType.Security):
					{
						result = 0;
						break;
					}
					case (LegType.Call):
					{
						result = 1;
						break;
					}
					case (LegType.Put):
					{
						result = 2;
						break;
					}
				}
				value.Append(result);
				value.Append("|");
				previousLeg = strategyLeg;
			}

			return value.ToString();
		}

		public IQueryable<Strategy> GetAll()
		{
			IQueryable<Strategy> strategies = Uow.Strategies.GetAll();

			return strategies;
		}

		public IQueryable<Strategy> GetAll(int pageNumber, out int totalCount)
		{
			IQueryable<Strategy> strategies = Uow.Strategies.GetAll(pageNumber, out totalCount);
			return strategies;
		}

		public IEnumerable<Strategy> Where(Func<Strategy, bool> predicate)
		{
			IEnumerable<Strategy> strategies = Uow.Strategies.Where(predicate);
			return strategies;
		}

		public Strategy GetById(int id)
		{
			Strategy strategy = Uow.Strategies.GetById(id);
			return strategy;
		}

		public void Create(Strategy strategy)
		{
			// in order to support consistency of DB we need to separate creation of strategy from setting pair strategy
			int? pairStrategyId = null;
			if (strategy.PairStrategyId.HasValue)
			{
				pairStrategyId = strategy.PairStrategyId;
				strategy.PairStrategyId = null;
			}
			Uow.Strategies.Add(strategy);
			Uow.Commit();

			if (!pairStrategyId.HasValue)
			{
				return;
			}
			strategy.PairStrategyId = pairStrategyId;
			Uow.Strategies.AddPairStrategy(strategy);
			Uow.Commit();
		}

		public void Update(Strategy strategy)
		{
			Uow.Strategies.Update(strategy);
			Uow.Commit();
		}

		public bool Delete(int id)
		{
			bool success = Uow.Strategies.Delete(id);
			if (success)
			{
				Uow.Commit();
			}
			return success;
		}

		public IEnumerable<BasePortfolioItemGroup> GetPortfolioItemsGroupedByStrategy(IEnumerable<PortfolioOption> portfolioOptions, IEnumerable<PortfolioStock> portfolioStocks)
		{
			List<StrategyPortfolioItemGroup> groupedItems = portfolioOptions
				.GroupBy(x => x.UnderlyingCode)
				.OrderBy(y => y.Key)
				.Select(x => new StrategyPortfolioItemGroup(null, x)
			{
				UnderlyingCode = x.First().UnderlyingCode,
				UnderlyingName = x.First().UnderlyingName
			}).ToList();

			#region Define strategies

			List<Tuple<int, string, string>> strategyEigenValues = GetEigenValues();

			IEnumerable<StrategyPortfolioItemGroup> strategiesWithoutDetectedStrategy = groupedItems.Where(x => string.IsNullOrEmpty(x.Strategy));
			SetEigenValues(strategiesWithoutDetectedStrategy);

			foreach (StrategyPortfolioItemGroup group in groupedItems)
			{
				if (strategyEigenValues.Any(x => x.Item2 == group.EigenValue))
				{
					group.Strategy = GetById(strategyEigenValues.Single(x => x.Item2 == group.EigenValue).Item1).Name;
					group.OptionSide = "L";
				}
				if (strategyEigenValues.Any(x => x.Item3 == group.EigenValue))
				{
					group.Strategy = GetById(strategyEigenValues.Single(x => x.Item3 == group.EigenValue).Item1).Name;
					group.OptionSide = "S";
				}
				if (string.IsNullOrEmpty(group.Strategy))
				{
					group.Strategy = "Custom Strategy";
					group.OptionSide = "L";
				}
			}
			#endregion

			// Note: There is no need to combine coveredCall with covered stock shares.
			// because the locked shares will be not available/fronzen when writing the covered call.
			//List<PortfolioItemGroup> coveredStrategies = new List<PortfolioItemGroup>();

			foreach (PortfolioStock portfolioStock in portfolioStocks)
			{
				if (portfolioStock != null && portfolioStock.AvailableBalance > 0)
				{
					portfolioStock.GeneratePremiumVisible = true;
				}
			}
			StockPortfolioItemGroup stockGroup = new StockPortfolioItemGroup(portfolioStocks);

			List<BasePortfolioItemGroup> wholeList = new List<BasePortfolioItemGroup>(groupedItems);
			wholeList.Add(stockGroup);

			return wholeList;
		}

		private void SetEigenValues(IEnumerable<StrategyPortfolioItemGroup> positionGroups)
		{
			foreach (StrategyPortfolioItemGroup group in positionGroups)
			{
				List<PortfolioItem> groupedPortfolioItems = group.Items.ToList();
				string value = GetEigenValue(groupedPortfolioItems);
				group.EigenValue = value;
			}
		}

		private string GetEigenValue(List<PortfolioItem> portfolioItems)
		{
			PortfolioItem prePos = null;
			double preQuantity = 1;

			StringBuilder value = new StringBuilder();
			List<PortfolioOption> portfolioOptions = 
						portfolioItems.Where(item => item is PortfolioOption).Cast<PortfolioOption>()
						.Where(item => item.OptionHoldingQuantity != 0).ToList();

			if (portfolioOptions == null || portfolioOptions.Count == 0)
			{
				portfolioOptions = portfolioItems.Where(item => item is PortfolioOption).Cast<PortfolioOption>().ToList();
			}

			List<PortfolioStock> portfolioStocks = portfolioItems.Where(item => item is PortfolioStock).Cast<PortfolioStock>().ToList();

			long multiplier = portfolioOptions.Where(p => p.OptionType != OptionType.Security).Select(p => p.PremiumMultiplier).FirstOrDefault();
			if (multiplier == 0)
			{
				multiplier = 1000;
			}

			portfolioItems = new List<PortfolioItem>();
			portfolioItems.AddRange(portfolioStocks);
			portfolioItems.AddRange(portfolioOptions
				.OrderBy(x => x.StrikePrice)
				.ThenBy(x => x.Expiry.FutureDate)
				.ThenBy(x => (x.OptionType == OptionType.Call || x.OptionType == OptionType.CoveredCall)? -1 : 1));

			foreach (PortfolioItem portfolioItem in portfolioItems)
			{
				double quantity = portfolioItem.AdjustedAvailableQuantity;

				if (!portfolioItem.IsStock())
				{
					quantity = portfolioItem.ToPortfolioOption().AdjustedT0Quantity;
					if (Math.Abs(quantity) < 0.1)
					{ 
						quantity = portfolioItem.AdjustedBalance;
					}
				}

				int result;

				if (prePos != null)
				{
					if (prePos.IsStock())
					{
						preQuantity = Convert.ToDouble(prePos.AdjustedBalance) / multiplier;
					}
					else
					{
						preQuantity = prePos.ToPortfolioOption().AdjustedT0Quantity;
						if (Math.Abs(preQuantity) < 0.1)
						{
							preQuantity = prePos.AdjustedBalance;
						}
					}
				}
				if (portfolioItem.IsStock())
				{
					quantity = Convert.ToInt32(portfolioItem.AdjustedBalance / multiplier);
				}

				if (prePos != null)
				{
					result = (int)(quantity / preQuantity * 100);
				}
				else
				{
					result = quantity > 0 ? 1 : -1;
				}
				value.Append(result);

				if (prePos == null || prePos.IsStock())
				{
					result = 2;
				}
				else
				{
					result = Math.Sign((prePos.ToPortfolioOption().Expiry.FutureDate - portfolioItem.ToPortfolioOption().Expiry.FutureDate).Days);
				}
				value.Append(result);

				if (prePos == null || prePos.IsStock())
				{
					result = 2;
				}
				else
				{
					result = prePos.ToPortfolioOption().StrikePrice == portfolioItem.ToPortfolioOption().StrikePrice ? 1 : 0;
				}
				value.Append(result);

				//switch...case is not applicable
				if (portfolioItem.IsStock())
				{
					result = 0;
				}
				else
				{
					PortfolioOption portfolioOption = portfolioItem.ToPortfolioOption();

					if (portfolioOption.OptionType == OptionType.Call)
					{
						result = 1;
					}
					if (portfolioOption.OptionType == OptionType.Put)
					{
						result = 2;
					}
				}

				value.Append(result);

				prePos = portfolioItem;

				value.Append("|");
			}
			return value.ToString();
		}
	}
}

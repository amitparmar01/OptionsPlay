using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Globalization;
using System.Linq;
using System.Web.Mvc;
using AutoMapper;
using OptionsPlay.BusinessLogic.Common;
using OptionsPlay.Model;
using OptionsPlay.Web.ViewModels.Providers.Helpers;

namespace OptionsPlay.Web.ViewModels.Providers.Orchestrators
{
	public class StrategiesOrchestrator
	{
		private readonly IStrategyService _strategyService;

		public StrategiesOrchestrator(IStrategyService strategyService)
		{
			_strategyService = strategyService;
		}

		#region Public methods

		public List<StrategyForDisplay> GetStrategies()
		{
			List<Strategy> list = _strategyService
				.GetAll()
				.ToList();
			List<StrategyForDisplay> strategies = list
				.ConvertAll(ToDisplayViewModel);
			return strategies;
		}

		public KendoGrid<StrategyForDisplay> GetStrategies(int pageNumber)
		{
			PagingHelper.ValidatePageNumber(pageNumber);

			int totalCount;
			List<StrategyForDisplay> strategies = _strategyService
				.GetAll(pageNumber, out totalCount)
				.Include(item => item.Legs)
				.Include(item => item.BuyDetails)
				.Include(item => item.SellDetails)
				.ToList()
				.ConvertAll(ToDisplayViewModel);

			KendoGrid<StrategyForDisplay> grid = new KendoGrid<StrategyForDisplay>
			{
				Data = strategies,
				Total = totalCount
			};
			return grid;
		}

		public StrategyViewModel GetNewStrategy()
		{
			StrategyViewModel viewModel = new StrategyViewModel();
			viewModel.PairStrategyOptions = GetPairStrategyOptions();
			return viewModel;
		}

		public StrategyViewModel GetEditStrategy(int strategyId)
		{
			Strategy strategy = _strategyService.GetById(strategyId);
			if (strategy == null)
			{
				return null;
			}
			StrategyViewModel viewModel = Mapper.Map<Strategy, StrategyViewModel>(strategy);
			viewModel.PairStrategyOptions = GetPairStrategyOptions(strategyId);
			return viewModel;
		}

		public StrategyForDisplay GetStrategyForDisplay(int strategyId)
		{
			Strategy strategy = _strategyService.GetById(strategyId);
			StrategyForDisplay strategyForDisplay = ToDisplayViewModel(strategy);
			return strategyForDisplay;
		}

		#endregion Public methods

		#region Private methods

		private StrategyForDisplay ToDisplayViewModel(Strategy strategy)
		{
			StrategyForDisplay viewModel = Mapper.Map<Strategy, StrategyForDisplay>(strategy);

			if (strategy != null && strategy.PairStrategyId.HasValue)
			{
				Strategy pairStrategy = _strategyService.GetById(strategy.PairStrategyId.Value);
				if (pairStrategy == null)
				{
					throw new Exception("Pair Strategy has not been found.");
				}
				viewModel.PairStrategyName = pairStrategy.Name;
			}

			return viewModel;
		}

		private List<SelectListItem> GetPairStrategyOptions(long strategyId = 0)
		{
			List<SelectListItem> pairStrategyOptions = new List<SelectListItem>();

			IEnumerable<Strategy> strategies = _strategyService.Where(m =>
				// all strategies without pair strategy
					!m.PairStrategyId.HasValue && m.Id != strategyId
						// its own pair strategy
					|| m.PairStrategyId.HasValue && m.PairStrategyId.Value == strategyId);
			foreach (Strategy strategy in strategies)
			{
				SelectListItem selectListItem = new SelectListItem
				{
					Value = strategy.Id.ToString(CultureInfo.InvariantCulture),
					Text = strategy.Name
				};
				pairStrategyOptions.Add(selectListItem);
			}

			return pairStrategyOptions;
		}

		#endregion Private methods
	}
}
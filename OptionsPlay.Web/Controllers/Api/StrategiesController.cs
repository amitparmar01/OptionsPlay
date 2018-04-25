using System.Collections.Generic;
using System.Web.Http;
using OptionsPlay.BusinessLogic.Common;
using OptionsPlay.Model;
using OptionsPlay.Model.Enums;
using OptionsPlay.Web.Infrastructure.Attributes.Api;
using OptionsPlay.Web.ViewModels;
using OptionsPlay.Web.ViewModels.Providers.Orchestrators;

namespace OptionsPlay.Web.Controllers.Api
{
	[RoutePrefix("api/strategies")]
	public class StrategiesController : BaseApiController
	{
		private readonly StrategiesOrchestrator _strategiesOrchestrator;
		private readonly IStrategyService _strategyService;

		public StrategiesController(StrategiesOrchestrator strategiesOrchestrator, IStrategyService strategyService)
		{
			_strategiesOrchestrator = strategiesOrchestrator;
			_strategyService = strategyService;
		}

		[ApiAuthorize(PermissionCollection.ViewStrategies)]
		public List<StrategyForDisplay> GetAll()
		{
			List<StrategyForDisplay> strategies = _strategiesOrchestrator.GetStrategies();
			return strategies;
		}

		[ApiAuthorize(PermissionCollection.ViewStrategies)]
		public KendoGrid<StrategyForDisplay> GetAll(int page)
		{
			KendoGrid<StrategyForDisplay> strategies = _strategiesOrchestrator.GetStrategies(page);
			return strategies;
		}

		[ApiAuthorize(PermissionCollection.ViewStrategies)]
		public StrategyForDisplay GetById(int id)
		{
			StrategyForDisplay strategy = _strategiesOrchestrator.GetStrategyForDisplay(id);
			if (strategy == null)
			{
				ThrowNotFoundException();
			}
			return strategy;
		}

		[ApiAuthorize(PermissionCollection.ManageStrategies)]
		public void Post(StrategyViewModel strategy)
		{
			Strategy entity = strategy.ToEntity();
			_strategyService.Create(entity);
		}

		[ApiAuthorize(PermissionCollection.ManageStrategies)]
		public void Put(StrategyViewModel strategy)
		{
			Strategy entity = strategy.ToEntity();
			_strategyService.Update(entity);
		}

		[ApiAuthorize(PermissionCollection.ManageStrategies)]
		public void Delete(int id)
		{
			bool success = _strategyService.Delete(id);
			if (!success)
			{
				ThrowNotFoundException();
			}
		}

		/// <summary>
		/// Is used for 'New Strategy' form
		/// </summary>
		[ApiAuthorize(PermissionCollection.ManageStrategies)]
		[Route("new")]
		public StrategyViewModel GetNewStrategy()
		{
			StrategyViewModel strategy = _strategiesOrchestrator.GetNewStrategy();
			return strategy;
		}

		/// <summary>
		/// Is used for 'Edit Strategy' form
		/// </summary>
		[ApiAuthorize(PermissionCollection.ManageStrategies)]
		[Route("edit/{id}")]
		public StrategyViewModel GetEditStrategy(int id)
		{
			StrategyViewModel strategy = _strategiesOrchestrator.GetEditStrategy(id);
			if (strategy == null)
			{
				ThrowNotFoundException();
			}
			return strategy;
		}
	}
}

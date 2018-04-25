using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web.Http;
using AutoMapper;
using OptionsPlay.BusinessLogic.Interfaces;
using OptionsPlay.Common.ServiceResponses;
using OptionsPlay.Model;
using OptionsPlay.Model.Enums;
using OptionsPlay.Web.Helpers;
using OptionsPlay.Web.Infrastructure.Attributes.Api;
using OptionsPlay.Web.ViewModels;
using OptionsPlay.Web.ViewModels.Providers.Orchestrators;

namespace OptionsPlay.Web.Controllers.Api
{
	[RoutePrefix("api/strategyGroups")]
	public class StrategyGroupsController : BaseApiController
	{
		private readonly StrategyGroupsOrchestrator _orchestrator;
		private readonly IStrategyGroupService _strategyGroupService;

		public StrategyGroupsController(StrategyGroupsOrchestrator orchestrator, IStrategyGroupService strategyGroupService)
		{
			_orchestrator = orchestrator;
			_strategyGroupService = strategyGroupService;
		}

		[ApiAuthorize(PermissionCollection.ViewStrategies)]
		public List<StrategyGroupForDisplay> GetAll()
		{
			// todo: move '.Include' to mapper
			List<StrategyGroup> items = _strategyGroupService.GetAll()
				.Include(item => item.CallStrategy)
				.Include(item => item.PutStrategy)
				.Include(item => item.OriginalImage)
				.Include(item => item.ThumbnailImage)
				.ToList();
			List<StrategyGroupForDisplay> strategyGroups = Mapper.Map<List<StrategyGroup>, List<StrategyGroupForDisplay>>(items);
			return strategyGroups;
		}

		[ApiAuthorize(PermissionCollection.ViewStrategies)]
		public KendoGrid<StrategyGroupForDisplay> GetAll(int page)
		{
			PagingHelper.ValidatePageNumber(page);

			int totalCount;
			List<StrategyGroup> models = _strategyGroupService
				.GetAll(page, out totalCount)
				.Include(item => item.CallStrategy)
				.Include(item => item.PutStrategy)
				.ToList();
			List<StrategyGroupForDisplay> strategyGroups = Mapper.Map<List<StrategyGroup>, List<StrategyGroupForDisplay>>(models);

			KendoGrid<StrategyGroupForDisplay> grid = new KendoGrid<StrategyGroupForDisplay>
			{
				Data = strategyGroups,
				Total = totalCount
			};
			return grid;
		}

		[ApiAuthorize(PermissionCollection.ViewStrategies)]
		public StrategyGroupForDisplay GetById(int id)
		{
			StrategyGroup strategyGroup = _strategyGroupService.GetById(id);
			StrategyGroupForDisplay strategyGroupForDisplay = Mapper.Map<StrategyGroup, StrategyGroupForDisplay>(strategyGroup);
			if (strategyGroupForDisplay == null)
			{
				ThrowNotFoundException();
			}
			return strategyGroupForDisplay;
		}

		/// <summary>
		/// Is used for 'New Strategy Group' form
		/// </summary>
		[ApiAuthorize(PermissionCollection.ManageStrategies)]
		[Route("new")]
		public StrategyGroupViewModel GetNewStrategyGroup()
		{
			StrategyGroupViewModel strategyGroup = _orchestrator.GetNewStrategyGroup();
			return strategyGroup;
		}

		/// <summary>
		/// Is used for 'Edit Strategy Group' form
		/// </summary>
		[ApiAuthorize(PermissionCollection.ManageStrategies)]
		[Route("edit/{id}")]
		public StrategyGroupViewModel GetEditStrategyGroup(int id)
		{
			StrategyGroupViewModel strategyGroup = _orchestrator.GetEditStrategyGroup(id);
			if (strategyGroup == null)
			{
				ThrowNotFoundException();
			}
			return strategyGroup;
		}

		[ApiAuthorize(PermissionCollection.ManageStrategies)]
		public BaseResponse Delete(int id)
		{
			BaseResponse response = _strategyGroupService.Delete(id);
			return response;
		}
	}
}

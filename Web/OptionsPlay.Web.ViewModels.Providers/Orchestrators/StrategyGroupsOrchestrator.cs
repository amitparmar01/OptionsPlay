using System.Collections.Generic;
using System.Globalization;
using System.Web.Mvc;
using AutoMapper;
using OptionsPlay.BusinessLogic.Interfaces;
using OptionsPlay.Model;

namespace OptionsPlay.Web.ViewModels.Providers.Orchestrators
{
	public class StrategyGroupsOrchestrator
	{
		private readonly IStrategyGroupService _strategyGroupService;

		public StrategyGroupsOrchestrator(IStrategyGroupService strategyGroupService)
		{
			_strategyGroupService = strategyGroupService;
		}

		#region Public methods

		/// <summary>
		/// Gets view model for 'new strategy group' form
		/// </summary>
		public StrategyGroupViewModel GetNewStrategyGroup()
		{
			StrategyGroupViewModel strategyGroup = new StrategyGroupViewModel();
			strategyGroup.StrategyOptions = GetStrategyOptions();
			return strategyGroup;
		}

		/// <summary>
		/// Gets view model for 'edit strategy group' form
		/// </summary>
		public StrategyGroupViewModel GetEditStrategyGroup(int strategyGroupId)
		{
			StrategyGroup strategyGroup = _strategyGroupService.GetById(strategyGroupId);
			List<SelectListItem> strategyOptions = GetStrategyOptions(strategyGroup.CallStrategyId, strategyGroup.PutStrategyId);
			StrategyGroupViewModel editStrategyGroup = Mapper.Map<StrategyGroup, StrategyGroupViewModel>(strategyGroup);
			editStrategyGroup.StrategyOptions = strategyOptions;
			return editStrategyGroup;
		}

		#endregion Public methods

		#region Private methods

		private List<SelectListItem> GetStrategyOptions(int? callStrategyId = null, int? putStrategyId = null)
		{
			List<SelectListItem> strategyOptions = _strategyGroupService.GetNotGroupedStrategies(callStrategyId, putStrategyId).ConvertAll(m => new SelectListItem
			{
				Value = m.Id.ToString(CultureInfo.InvariantCulture),
				Text = m.Name
			});
			return strategyOptions;
		}

		#endregion Private methods
	}
}
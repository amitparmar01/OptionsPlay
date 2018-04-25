using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using OptionsPlay.BusinessLogic.Interfaces;
using OptionsPlay.Model;
using OptionsPlay.Web.ViewModels;

namespace OptionsPlay.Web.Controllers
{
	// todo: add [Authorize]
	public class StrategyGroupsManagerController : Controller
	{
		private readonly IStrategyGroupService _strategyGroupService;

		public StrategyGroupsManagerController(IStrategyGroupService strategyGroupService)
		{
			_strategyGroupService = strategyGroupService;
		}

		[HttpPost]
		public JsonResult Create(StrategyGroupViewModel newStrategyGroup)
		{
			if (!ModelState.IsValid)
			{
				List<string> errorMessages = GetErrorMessages();
				return Json(new { success = false, errorMessages });
			}
			StrategyGroup strategyGroup = newStrategyGroup.ToEntity();
			_strategyGroupService.Create(strategyGroup);
			return Json(new { success = true });
		}

		[HttpPost]
		public JsonResult Update(StrategyGroupViewModel editStrategyGroup)
		{
			if (!ModelState.IsValid)
			{
				List<string> errorMessages = GetErrorMessages();
				return Json(new { success = false, errorMessages });
			}
			StrategyGroup strategyGroup = editStrategyGroup.ToEntity();
			_strategyGroupService.Update(strategyGroup);
			return Json(new { success = true });
		}

		private List<string> GetErrorMessages()
		{
			List<string> errorMessages = new List<string>();
			ModelState.Values.Select(m => m.Errors).ToList().ForEach(m => m.ToList().ForEach(error => errorMessages.Add(error.ErrorMessage)));
			return errorMessages;
		}
	}
}
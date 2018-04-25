using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using OptionsPlay.BusinessLogic.Interfaces;
using OptionsPlay.Model;
using OptionsPlay.Resources;
using OptionsPlay.Web.ViewModels.Helpers;
using StructureMap;

namespace OptionsPlay.Web.ViewModels.ValidationAttributes
{
	/// <summary>
	/// Ensures that strategy can be used only once as 'Call Strategy' or 'Put Strategy' in strategy group
	/// </summary>
	public class OnlyOneGroupedStrategyAttribute : ValidationAttribute
	{
		public OnlyOneGroupedStrategyAttribute()
		{
			ErrorMessageResourceType = typeof(ErrorMessages);
			ErrorMessageResourceName = "OnlyOneGroupedStrategy";
		}

		public override string FormatErrorMessage(string name)
		{
			string errorMessage = string.Format(ErrorMessageString, name);
			return errorMessage;
		}

		protected override ValidationResult IsValid(object value, ValidationContext validationContext)
		{
			if (value == null)
			{
				return ValidationResult.Success;
			}

			int callOrPutStrategyId = int.Parse(value.ToString());
			int strategyId = int.Parse(validationContext.ObjectType.GetProperty("Id").GetValue(validationContext.ObjectInstance, null).ToString());
			int? originalCallStrategyId;
			int? originalPutStrategyId;

			IStrategyGroupService strategyGroupService = ObjectFactory.GetInstance<IStrategyGroupService>();
			if (strategyId == 0)
			{
				originalCallStrategyId = null;
				originalPutStrategyId = null;
			}
			else
			{
				StrategyGroup strategyGroup = strategyGroupService.GetById(strategyId);
				originalCallStrategyId = strategyGroup.CallStrategyId;
				originalPutStrategyId = strategyGroup.PutStrategyId;
			}

			List<Strategy> notGroupedStrategies = strategyGroupService.GetNotGroupedStrategies(originalCallStrategyId, originalPutStrategyId);
			List<int> notGroupedStrategyIds = notGroupedStrategies.Select(m => m.Id).ToList();

			if (notGroupedStrategyIds.Contains(callOrPutStrategyId))
			{
				return ValidationResult.Success;
			}

			string displayName = DisplayNameHelper.GetDisplayName(validationContext.DisplayName, validationContext);
			return new ValidationResult(FormatErrorMessage(displayName));
		}
	}
}
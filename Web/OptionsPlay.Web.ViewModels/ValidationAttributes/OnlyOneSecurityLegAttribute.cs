using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using OptionsPlay.Model.Enums;
using OptionsPlay.Resources;

namespace OptionsPlay.Web.ViewModels.ValidationAttributes
{
	/// <summary>
	/// Ensures that strategy have only one leg of LegType = 'Security'
	/// </summary>
	public class OnlyOneSecurityLegAttribute : ValidationAttribute
	{
		public OnlyOneSecurityLegAttribute()
		{
			ErrorMessageResourceType = typeof(ErrorMessages);
			ErrorMessageResourceName = "OnlyOneSecurityLeg";
		}

		public override bool IsValid(object value)
		{
			List<StrategyLegViewModel> legs = value as List<StrategyLegViewModel>;
			if (legs == null)
			{
				throw new Exception("This validation attribute can be applied only on list of 'StrategyLegViewModel'.");
			}
			bool result = legs.Count(m => m.LegType == LegType.Security) <= 1;
			return result;
		}
	}
}

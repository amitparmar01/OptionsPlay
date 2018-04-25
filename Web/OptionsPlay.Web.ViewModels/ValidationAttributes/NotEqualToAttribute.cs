using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Reflection;
using System.Web.Mvc;
using OptionsPlay.Resources;
using OptionsPlay.Web.ViewModels.Helpers;

namespace OptionsPlay.Web.ViewModels.ValidationAttributes
{
	/// <summary>
	/// Ensures that one field is not equal to another one
	/// </summary>
	public class NotEqualToAttribute : ValidationAttribute, IClientValidatable
	{
		private readonly string _propertyToCompare;

		private string _propertyToCompareDisplayName;

		public NotEqualToAttribute(string propertyToCompare)
		{
			_propertyToCompare = propertyToCompare;
			ErrorMessageResourceType = typeof(ErrorMessages);
			ErrorMessageResourceName = "NotEqualTo";
		}

		public override string FormatErrorMessage(string name)
		{
			string errorMessage = string.Format(ErrorMessageString, name, _propertyToCompareDisplayName);
			return errorMessage;
		}

		protected override ValidationResult IsValid(object value, ValidationContext validationContext)
		{
			if (value == null)
			{
				return ValidationResult.Success;
			}
			PropertyInfo propertyToComparePropertyInfo = validationContext.ObjectType.GetProperty(_propertyToCompare);
			object propertyToCompareValue = propertyToComparePropertyInfo.GetValue(validationContext.ObjectInstance, null);
			if (propertyToCompareValue == null || !propertyToCompareValue.ToString().Equals(value.ToString()))
			{
				return ValidationResult.Success;
			}

			_propertyToCompareDisplayName = DisplayNameHelper.GetDisplayName(_propertyToCompare, propertyToComparePropertyInfo);
			string displayName = DisplayNameHelper.GetDisplayName(validationContext.DisplayName, validationContext);
			return new ValidationResult(FormatErrorMessage(displayName));
		}

		public IEnumerable<ModelClientValidationRule> GetClientValidationRules(ModelMetadata metadata, ControllerContext context)
		{
			_propertyToCompareDisplayName = DisplayNameHelper.GetDisplayName(_propertyToCompare, metadata, context);
			ModelClientValidationRule rule = new ModelClientValidationRule
			{
				ValidationType = "notequalto",
				ErrorMessage = FormatErrorMessage(metadata.DisplayName),
			};
			rule.ValidationParameters.Add("another", _propertyToCompare);
			yield return rule;
		}
	}
}

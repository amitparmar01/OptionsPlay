using System.ComponentModel.DataAnnotations;
using System.Reflection;
using OptionsPlay.Resources;

namespace OptionsPlay.Web.ViewModels.ValidationAttributes
{
	// todo: implement client validation
	/// <summary>
	/// Makes property required only if another property is null
	/// </summary>
	public class ConditionalRequiredAttribute : RequiredAttribute
	{
		private readonly string _property;

		public ConditionalRequiredAttribute(string property)
		{
			_property = property;
			ErrorMessageResourceType = typeof(ErrorMessages);
			ErrorMessageResourceName = "Required";
		}

		#region Overrides of ValidationAttribute

		protected override ValidationResult IsValid(object value, ValidationContext validationContext)
		{
			PropertyInfo propertyInfo = validationContext.ObjectType.GetProperty(_property);
			object propertyValue = propertyInfo.GetValue(validationContext.ObjectInstance, null);
			ValidationResult isValid = propertyValue == null
				? base.IsValid(value, validationContext)
				: ValidationResult.Success;
			return isValid;
		}

		#endregion
	}
}

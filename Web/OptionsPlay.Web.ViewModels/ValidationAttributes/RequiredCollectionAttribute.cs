using System.Collections;
using System.ComponentModel.DataAnnotations;
using OptionsPlay.Resources;

namespace OptionsPlay.Web.ViewModels.ValidationAttributes
{
	/// <summary>
	/// Ensures that collection contains at least one item
	/// </summary>
	public class RequiredCollectionAttribute : ValidationAttribute
	{
		public RequiredCollectionAttribute()
		{
			ErrorMessageResourceType = typeof(ErrorMessages);
			ErrorMessageResourceName = "RequiredCollection";
		}

		public override bool IsValid(object value)
		{
			IList list = (IList)value;
			bool isValid = list.Count != 0;
			return isValid;
		}
	}
}

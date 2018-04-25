using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Reflection;
using System.Web.Mvc;

namespace OptionsPlay.Web.ViewModels.Helpers
{
	/// <summary>
	/// Helps to retrieve property's display name via reflection
	/// </summary>
	public class DisplayNameHelper
	{
		public static string GetDisplayName(string propertyName, ValidationContext validationContext)
		{
			PropertyInfo propertyInfo = validationContext.ObjectType.GetProperty(propertyName);
			string displayName = GetDisplayName(propertyName, propertyInfo);
			return displayName;
		}

		public static string GetDisplayName(string propertyName, PropertyInfo propertyInfo)
		{
			string displayName;

			object custromAttribute = propertyInfo.GetCustomAttributes(typeof(DisplayAttribute), false).FirstOrDefault();
			if (custromAttribute != null)
			{
				DisplayAttribute displayAttribute = custromAttribute as DisplayAttribute;
				displayName = displayAttribute != null
					? displayAttribute.GetName()
					: propertyName;
			}
			else
			{
				custromAttribute = propertyInfo.GetCustomAttributes(typeof(DisplayNameAttribute), false).FirstOrDefault();
				if (custromAttribute == null)
				{
					displayName = propertyName;
				}
				else
				{
					DisplayNameAttribute displayNameAttribute = custromAttribute as DisplayNameAttribute;
					displayName = displayNameAttribute != null
						? displayNameAttribute.DisplayName
						: propertyName;
				}
			}
			return displayName;
		}

		public static string GetDisplayName(string propertyName, ModelMetadata metadata, ControllerContext context)
		{
			ModelMetadata propertyMetaData = ModelMetadataProviders.Current.GetMetadataForProperties(context.Controller.ViewData.Model,
				metadata.ContainerType).FirstOrDefault(m => m.PropertyName == propertyName);
			string displayName = propertyMetaData != null
				? propertyMetaData.DisplayName
				: propertyName;
			return displayName;
		}
	}
}

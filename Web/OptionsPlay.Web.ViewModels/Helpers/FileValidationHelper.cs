using System;
using System.Web;
using OptionsPlay.Logging;

namespace OptionsPlay.Web.ViewModels.Helpers
{
	/// <summary>
	/// Helps to validate files (HttpPostedFileBase)
	/// </summary>
	public class FileValidationHelper
	{
		/// <summary>
		/// Converts object into HttpPostedFileBase
		/// </summary>
		public static HttpPostedFileBase GetFileFromValue(object value, Type attributeType)
		{
			HttpPostedFileBase file = value as HttpPostedFileBase;
			if (file == null)
			{
				string errorMessage = string.Format("'{0}' can be used only with properties of type '{1}'", attributeType.Name, typeof(HttpPostedFileBase).Name);
				Logger.Error(errorMessage);
				throw new Exception(errorMessage);
			}
			return file;
		}
	}
}

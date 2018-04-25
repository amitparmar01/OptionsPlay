using System;
using System.ComponentModel.DataAnnotations;
using System.Web;
using OptionsPlay.Logging;
using OptionsPlay.Resources;

namespace OptionsPlay.Web.ViewModels.ValidationAttributes
{
	/// <summary>
	/// Restricts max file size
	/// </summary>
	public class MaxFileSizeAttribute : ValidationAttribute
	{
		private readonly int _sizeInMb;

		public MaxFileSizeAttribute(int sizeInMb)
		{
			_sizeInMb = sizeInMb;
			ErrorMessageResourceType = typeof(ErrorMessages);
			ErrorMessageResourceName = "FileSize";
		}

		public override string FormatErrorMessage(string name)
		{
			string errorMessage = string.Format(ErrorMessageString, name, _sizeInMb);
			return errorMessage;
		}

		public override bool IsValid(object value)
		{
			if (value == null)
			{
				return true;
			}

			HttpPostedFileBase file = GetFileFromValue(value, GetType());
			int sizeInBytes = _sizeInMb * 1024 * 1024;

			bool isValid = file.ContentLength <= sizeInBytes;
			return isValid;
		}

		/// <summary>
		/// Converts object into HttpPostedFileBase
		/// </summary>
		private static HttpPostedFileBase GetFileFromValue(object value, Type attributeType)
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

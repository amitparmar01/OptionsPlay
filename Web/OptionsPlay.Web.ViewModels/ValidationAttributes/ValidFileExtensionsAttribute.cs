using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.IO;
using System.Linq;
using System.Web;
using OptionsPlay.Logging;
using OptionsPlay.Resources;
using OptionsPlay.Web.ViewModels.Helpers;

namespace OptionsPlay.Web.ViewModels.ValidationAttributes
{
	// todo: implement client side validation
	/// <summary>
	/// Restricts file extension
	/// </summary>
	public class ValidFileExtensionsAttribute : ValidationAttribute
	{
		private readonly List<string> _extensions;

		/// <param name="extensions">extensions separated by comma</param>
		public ValidFileExtensionsAttribute(string extensions)
		{
			ErrorMessageResourceType = typeof(ErrorMessages);
			ErrorMessageResourceName = "ValidFileExtensions";
			_extensions = extensions.Split(',').Select(m => m.Trim().ToLower()).ToList();
		}

		public override string FormatErrorMessage(string name)
		{
			string extensions = string.Join(", ", _extensions);
			string errorMessage = string.Format(ErrorMessageString, name, extensions);
			return errorMessage;
		}

		public override bool IsValid(object value)
		{
			if (value == null)
			{
				return true;
			}

			HttpPostedFileBase file = FileValidationHelper.GetFileFromValue(value, GetType());

			string extension = Path.GetExtension(file.FileName);
			if (string.IsNullOrWhiteSpace(extension))
			{
				const string errorMessage = "File extension cannot be determined";
				Logger.Error(errorMessage);
				throw new Exception(errorMessage);
			}
			// convert .jpg → jpg, .gif → gif, etc.
			extension = extension.Replace(".", string.Empty).ToLower();

			bool isValid = _extensions.Contains(extension);
			return isValid;
		}
	}
}

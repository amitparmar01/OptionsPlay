using System;
using System.Collections.Generic;
using System.Text.RegularExpressions;
using System.Web.Mvc;
using OptionsPlay.Logging;
using OptionsPlay.Resources;

namespace OptionsPlay.Web.ViewModels.Helpers
{
	public static class CustomEnumConverter
	{
		public static List<SelectListItem> ToSelectList<T>() where T : struct
		{
			Type type = typeof(T);

			if (!type.IsEnum)
			{
				string errorMessage = ErrorMessages.NotEnumType;
				Logger.Error(errorMessage);
				throw new ArgumentException(errorMessage);
			}

			List<SelectListItem> selectList = new List<SelectListItem>();
			Array enumValues = Enum.GetValues(type);
			foreach (object enumValue in enumValues)
			{
				string enumValueString = enumValue.ToString();
				// split CamelCase into words
				string text = Regex.Replace(enumValueString, "(\\B[A-Z])", " $1");
				SelectListItem selectListItem = new SelectListItem
				{
					Value = enumValueString,
					Text = text
				};
				selectList.Add(selectListItem);
			}
			return selectList;
		}
	}
}

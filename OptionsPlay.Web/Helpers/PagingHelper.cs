using System;
using OptionsPlay.Logging;

namespace OptionsPlay.Web.Helpers
{
	internal static class PagingHelper
	{
		public static void ValidatePageNumber(int pageNumber)
		{
			if (pageNumber >= 1)
			{
				return;
			}
			const string errorMessage = "Page Number must be not less than 1";
			Logger.Error(errorMessage);
			throw new ArgumentException(errorMessage);
		}
	}
}
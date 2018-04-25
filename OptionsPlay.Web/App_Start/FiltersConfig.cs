using System.Web.Mvc;
using OptionsPlay.Web.Infrastructure.Filters;

namespace OptionsPlay.Web
{
	public class FiltersConfig
	{
		public static void RegisterGlobalFilters(GlobalFilterCollection filters)
		{
			filters.Add(new HandleErrorAttribute());
		}

		public static void RegisterWebApiFilters(System.Web.Http.Filters.HttpFilterCollection filters)
		{
			filters.Add(new EntityResponseFilterAttribute());
			filters.Add(new OptionsPlayExceptionFilterAttribute());
		}
	}
}
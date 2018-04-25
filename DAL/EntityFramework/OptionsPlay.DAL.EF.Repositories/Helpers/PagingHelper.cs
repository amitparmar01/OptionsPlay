using System.Collections.Generic;
using System.Linq;
using OptionsPlay.Common.Options;

namespace OptionsPlay.DAL.EF.Repositories.Helpers
{
	internal static class PagingHelper
	{
		public static IQueryable<T> GetByPageNumber<T>(this IEnumerable<T> enumerable, int? pageNumber, out int totalCount)
		{
			IQueryable<T> items = enumerable.AsQueryable();
			// We not enumerate it here coz better to make 2 requests to DB and have only required information
			totalCount = items.Count();
			if (pageNumber.HasValue)
			{
				int pageSize = AppConfigManager.GridPageSize;
				items = items.Skip((pageNumber.Value - 1) * pageSize).Take(pageSize);
			}
			return items;
		}
	}
}

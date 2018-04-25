using System.Collections.Generic;

namespace OptionsPlay.Web.ViewModels
{
	public class KendoGrid<T> where T : class
	{
		public List<T> Data { get; set; }

		public int Total { get; set; }
	}
}

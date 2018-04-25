using System.Collections.Generic;
using OptionsPlay.Web.ViewModels.MarketData;

namespace OptionsPlay.Web.ViewModels.Math
{
	public class DateAndDefaultStandardDeviationsViewModel
	{
		public DateAndNumberOfDaysUntilViewModel DateAndNumberOfDaysUntil { get; set; }

		/// <summary>
		/// index |SD moves
		/// 0     |-3 (down price for sd = -3)
		/// ...   |
		/// 5     |3 (up price for sd = 3)
		/// </summary>
		public List<double> StdDevPrices { get; set; }
	}
}
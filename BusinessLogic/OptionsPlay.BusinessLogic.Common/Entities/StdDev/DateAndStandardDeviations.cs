using System.Collections.Generic;
using OptionsPlay.TechnicalAnalysis.Entities;

namespace OptionsPlay.BusinessLogic.Common.Entities
{
	public class DateAndStandardDeviations
	{
		public DateAndNumberOfDaysUntil DateAndNumberOfDaysUntil { get; set; }

		/// <summary>
		/// Standard Deviation up and down prices for 1sd, 2sd and 3sd moves
		/// </summary>
		public List<StdDevPrices> StdDevPrices { get; set; }
	}
}
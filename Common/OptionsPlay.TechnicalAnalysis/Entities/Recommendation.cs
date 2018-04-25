using System;

namespace OptionsPlay.TechnicalAnalysis.Entities
{
	public class Recommendation
	{
		public DateTime ExpiryDate { get; set; }

		public int NumberOfContract { get; set; }

		public double StrikePrice { get; set; }
	}
}
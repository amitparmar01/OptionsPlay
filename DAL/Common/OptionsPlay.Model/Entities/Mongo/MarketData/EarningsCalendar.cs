using System;

namespace OptionsPlay.Model
{
	public class EarningsCalendar : BaseMongoEntity
	{
		public string SecurityCode { get; set; }

		public string EpsEstimate { get; set; }

		public DateTime Date { get; set; }

		public string Time { get; set; }
	}
}
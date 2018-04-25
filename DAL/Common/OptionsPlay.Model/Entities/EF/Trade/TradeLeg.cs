using System;

namespace OptionsPlay.Model
{
	public class TradeLeg : IBaseEntity<long>
	{
		public long Id { get; set; }

		public string OptionCode { get; set; }

		public int Quantity { get; set; }

		public DateTime Expiry { get; set; }

		public double Strike { get; set; }

		public int Multiplier { get; set; }

		public double Bid { get; set; }

		public virtual Trade Trade { get; set; }
	}
}
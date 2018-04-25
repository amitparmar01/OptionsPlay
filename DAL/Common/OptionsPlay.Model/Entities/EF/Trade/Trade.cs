using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace OptionsPlay.Model
{
	public class Trade : IBaseEntity<long>
	{
		public long Id { get; set; }

		[Required]
		public virtual MasterSecurity UnderlyingSecurity { get; set; }

		public virtual Strategy Strategy { get; set; }

		public DateTime Timestamp { get; set; }

		public virtual ICollection<TradeLeg> TradeLegs { get; set; }

		public virtual WebUser User { get; set; }
	}
}
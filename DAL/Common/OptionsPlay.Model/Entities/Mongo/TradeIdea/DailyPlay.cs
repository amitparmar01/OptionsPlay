using System;
using System.ComponentModel.DataAnnotations;

namespace OptionsPlay.Model
{
	public class DailyPlay : IBaseEntity<long>
	{
		public long Id { get; set; }

		[MaxLength(10)]
		public string SecurityCode { get; set; }

		public virtual MasterSecurity MasterSecurity { get; set; }

		public DateTime Date { get; set; }

		public double Price { get; set; }
	}
}
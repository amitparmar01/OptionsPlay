using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace OptionsPlay.Model.WatchList
{
	public class WatchList : IBaseEntity<long>
	{
		public long Id { get; set; }

		[Required]
		public string Name { get; set; }

		public long UserId { get; set; }

		public virtual User User { get; set; }

		public virtual ICollection<WatchListItem> Quotes { get; set; }
	}
}
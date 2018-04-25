using System.ComponentModel.DataAnnotations;

namespace OptionsPlay.Model.WatchList
{
	public class WatchListItem : IBaseEntity<long>
	{
		public long Id { get; set; }

		[Required]
		public virtual MasterSecurity Security { get; set; }

		/// <summary>
		/// Price of the quote when it was added
		/// </summary>
		public double PriceAtAdd { get; set; }

		public long WatchListId { get; set; }

		public virtual WatchList WatchList { get; set; }
	}
}
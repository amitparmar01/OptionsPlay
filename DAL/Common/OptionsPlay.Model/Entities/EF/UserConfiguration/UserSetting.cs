using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OptionsPlay.Model
{
	public class UserSetting : IBaseEntity<long>, ITrackableItem
	{

		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public long Id { get; set; }

		public virtual User User { get; set; }
		[Index("IX_User_Client", 1, IsUnique = true)]
		public long UserId { get; set; }

		//max index length could be 900 bytes
		[MaxLength(256)]
		[Index("IX_User_Client", 2, IsUnique = true)]
		public string ClientId { get; set; }

		public bool HasDisclaimerBeenAccepted { get; set; }

		[MaxLength(64)]
		public string Theme { get; set; }

		[Range(5, 6 * 60)]
		public int TimeOutInMinutes { get; set; }
		
		#region Implementation of ITrackableItem

		public virtual User CreatedBy { get; set; }

		public virtual User ModifiedBy { get; set; }

		public DateTime ModifiedDate { get; set; }

		#endregion
	}
}
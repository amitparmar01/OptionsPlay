using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OptionsPlay.Model
{
	[Table("Users")]
	public class User : IBaseEntity<long>
	{
		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public long Id { get; set; }

		public virtual Role Role { get; set; }

		public int RoleId { get; set; }

		public DateTime RegistrationDate { get; set; }
	}
}

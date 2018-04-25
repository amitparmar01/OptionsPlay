using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OptionsPlay.Model
{
	[Table("WebUsers")]
	public class WebUser : User
	{
		[MaxLength(255)]
		public string LoginName { get; set; }

		[MaxLength(255)]
		public string DisplayName { get; set; }

		[MaxLength(255)]
		public string PasswordHash { get; set; }

		[MaxLength(255)]
		public string PasswordSalt { get; set; }

		public DateTime? PasswordLastChangeDate { get; set; }
	}
}

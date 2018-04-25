using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OptionsPlay.Model
{
	public class ConfigDirectory : IBaseEntity<long>
	{
		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public long Id { get; set; }

		[Required]
		public string Name { get; set; }

		[Required]
		[MaxLength(450)]
		public string FullPath { get; set; }

		public string Description { get; set; }

		[Required]
		public DateTime ModifiedDate { get; set; }

		public virtual User ModifiedBy { get; set; }

		public virtual ConfigDirectory ParentDirectory { get; set; }

		public virtual ICollection<ConfigDirectory> ChildDirectories { get; set; }

		public virtual ICollection<ConfigValue> ChildValues { get; set; }
	}
}
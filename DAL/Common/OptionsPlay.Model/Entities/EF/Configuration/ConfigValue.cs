using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using OptionsPlay.Common.ObjectJsonSerialization;

namespace OptionsPlay.Model
{
	public class ConfigValue : IBaseEntity<long>, ISerealizedValueTypeProvider
	{
		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public long Id { get; set; }

		[Required]
		[MaxLength(442)]
		public string Name { get; set; }

		public string Description { get; set; }

		[Required]
		public DateTime ModifiedDate { get; set; }

		public virtual User ModifiedBy { get; set; }

		public virtual ConfigDirectory ParentDirectory { get; set; }

		public string ValueString { get; set; }

		public string SettingTypeString { get; set; }
	}
}

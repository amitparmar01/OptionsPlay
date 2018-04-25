using System;
using OptionsPlay.Common.ObjectJsonSerialization;

namespace OptionsPlay.DAL.EF.Core
{
	// WARN: Do not modify this class
	public class ConfigValueInsert : ISerealizedValueTypeProvider
	{
		public ConfigValueInsert()
		{
			ModifiedDate = DateTime.UtcNow;
		}

		public long Id { get; set; }

		public string Name { get; set; }

		public string Description { get; set; }

		public DateTime ModifiedDate { get; set; }

		public int? ModifiedBy_Id { get; set; }

		public long? ParentDirectory_Id { get; set; }

		public string ValueString { get; set; }

		public string SettingTypeString { get; set; }
	}
}

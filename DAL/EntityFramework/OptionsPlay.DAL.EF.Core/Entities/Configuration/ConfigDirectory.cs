using System;
using System.Linq;

namespace OptionsPlay.DAL.EF.Core
{
	// WARN: Do not modify this class
	public class ConfigDirectoryInsert
	{
		public ConfigDirectoryInsert()
		{
			ModifiedDate = DateTime.UtcNow;
		}

		public int Id { get; set; }

		public string Name { get; set; }

		//be careful. must be calculated on server side
		public string FullPath { get; set; }

		public string Description { get; set; }

		public DateTime ModifiedDate { get; set; }

		public int? ModifiedBy_Id { get; set; }

		public int? ParentDirectory_Id { get; set; }
	}

	public static class ConfigDirectoryDirHelper
	{
		public static string GetConfigDirectoryFullPath(params string[] path)
		{
			string fullPath = string.Join("|", path.Select(item => item.Trim()));
			return fullPath;
		}
	}
}
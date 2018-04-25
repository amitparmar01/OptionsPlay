using System;
using System.Collections.Generic;

namespace OptionsPlay.Web.ViewModels.Configuration
{
	public class ConfigDirectoryViewModel
	{
		public int Id { get; set; }

		public int? ParentId { get; set; }

		public string Name { get; set; }

		public string Description { get; set; }

		public List<ConfigDirectoryReferenceViewModel> ChildDirectories { get; set; }

		public List<ConfigValueViewModel> ConfigValues { get; set; }
	}
}

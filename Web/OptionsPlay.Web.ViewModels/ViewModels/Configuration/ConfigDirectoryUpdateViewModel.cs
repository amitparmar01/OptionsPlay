using System.Collections.Generic;

namespace OptionsPlay.Web.ViewModels.Configuration
{
	public class ConfigDirectoryUpdateViewModel
	{
		public int Id { get; set; }

		public string Description { get; set; }

		public List<ConfigValueUpdateViewModel> ConfigValues { get; set; }
	}
}
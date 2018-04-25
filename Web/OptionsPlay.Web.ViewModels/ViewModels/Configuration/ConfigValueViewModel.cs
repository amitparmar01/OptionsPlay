using System.Collections.Generic;
using System.Web.Mvc;

namespace OptionsPlay.Web.ViewModels.Configuration
{
	public class ConfigValueViewModel
	{
		public int Id { get; set; }

		public int ParentSectionId { get; set; }

		public string Name { get; set; }

		public string Description { get; set; }

		public object Value { get; set; }

		public string Type { get; set; }

		public List<SelectListItem> AllowedValues { get; set; }
	}
}
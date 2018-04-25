using OptionsPlay.Common.ObjectJsonSerialization;

namespace OptionsPlay.Web.ViewModels.Configuration
{
	public class ConfigValueUpdateViewModel : ISerealizedValueTypeProvider
	{
		public int Id { get; set; }

		public string Description { get; set; }

		public object Value { get; set; }

		public string Type { get; set; }

		string ISerealizedValueTypeProvider.SettingTypeString
		{
			get { return Type; }
			set { Type = value; }
		}

		string ISerealizedValueTypeProvider.ValueString
		{
			get { return Value.ToString(); }
			set { Value = value; }
		}
	}
}
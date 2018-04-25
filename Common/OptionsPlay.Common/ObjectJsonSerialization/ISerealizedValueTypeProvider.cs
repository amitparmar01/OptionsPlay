namespace OptionsPlay.Common.ObjectJsonSerialization
{
	public interface ISerealizedValueTypeProvider
	{
		string ValueString { get; set; }

		string SettingTypeString { get; set; }
	}
}
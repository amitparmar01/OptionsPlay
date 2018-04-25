namespace OptionsPlay.Cache.Core
{
	public interface IKeyBuilder
	{
		string BuildKey(KeyObject key);

		KeyObject RestoreKeyObject(string key);
	}
}
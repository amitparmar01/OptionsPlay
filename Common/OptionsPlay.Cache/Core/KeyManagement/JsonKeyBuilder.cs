using Newtonsoft.Json;

namespace OptionsPlay.Cache.Core
{
	public class JsonKeyBuilder : IKeyBuilder
	{
		#region Implementation of IKeyBuilder

		public string BuildKey(KeyObject keyObject)
		{
			string key = JsonConvert.SerializeObject(keyObject);
			return key;
		}

		public KeyObject RestoreKeyObject(string key)
		{
			KeyObject keyObject = JsonConvert.DeserializeObject<KeyObject>(key);
			return keyObject;
		}

		#endregion
	}
}
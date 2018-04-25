using OptionsPlay.Cache.Core;

namespace OptionsPlay.Cache.Helpers
{
	public static class CacheExtensions
	{
		public static T Get<T>(this ICache cache, KeyObject keyObject)
		{
			T result = (T)cache.Get(keyObject);
			return result;
		}
	}
}
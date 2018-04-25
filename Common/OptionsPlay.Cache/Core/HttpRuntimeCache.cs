using System;
using System.Web;

namespace OptionsPlay.Cache.Core
{
	public class HttpRuntimeCache : ICache
	{
		private readonly IKeyBuilder _keyBuilder;

		public HttpRuntimeCache(IKeyBuilder keyBuilder)
		{
			_keyBuilder = keyBuilder;
		}

		#region Implementation of ICache

		public void Insert(KeyObject keyObject, object item)
		{
			string key = _keyBuilder.BuildKey(keyObject);
			if (!string.IsNullOrEmpty(key) && item != null)
			{
				HttpRuntime.Cache.Insert(key, item);
			}
		}

		public void Insert(KeyObject keyObject, object item, TimeSpan expiration)
		{
			string key = _keyBuilder.BuildKey(keyObject);
			if (!string.IsNullOrEmpty(key) && item != null)
			{
				HttpRuntime.Cache.Insert(key, item, null, DateTime.UtcNow.Add(expiration), System.Web.Caching.Cache.NoSlidingExpiration);
			}
		}

		public object Get(KeyObject keyObject)
		{
			string key = _keyBuilder.BuildKey(keyObject);
			return HttpRuntime.Cache.Get(key);
		}

		#endregion
	}
}

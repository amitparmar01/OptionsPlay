using System;
using System.Collections.Generic;

namespace OptionsPlay.Cache.Core
{
	public class KeyObject
	{
		public KeyObject(string keyPrefix, IList<object> arguments)
		{
			if (keyPrefix == null)
			{
				throw new ArgumentNullException("keyPrefix");
			}

			KeyPrefix = keyPrefix;
			Arguments = arguments;
		}

		public string KeyPrefix { get; private set; }

		public IList<object> Arguments { get; private set; }
	}
}
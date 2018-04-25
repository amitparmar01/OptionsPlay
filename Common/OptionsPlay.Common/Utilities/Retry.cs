using System;
using System.Collections.Generic;
using System.Threading;

namespace OptionsPlay.Common.Utilities
{
	public static class Retry
	{
		public static void Do(Action action, TimeSpan retryInterval, int retryCount = 3, Action<Exception> onError = null)
		{
			Do<object>(() =>
			{
				action();
				return null;
			}, retryInterval, retryCount, onError);
		}

		public static T Do<T>(Func<T> action, TimeSpan retryInterval, int retryCount = 3, Action<Exception> onError = null)
		{
			List<Exception> exceptions = new List<Exception>();

			for (int retry = 0; retry < retryCount; retry++)
			{
				try
				{
					return action();
				}
				catch (Exception ex)
				{
					exceptions.Add(ex);
					if (onError != null)
					{
						onError(ex);
					}
					Thread.Sleep(retryInterval);
				}
			}

			throw new AggregateException(exceptions);
		}
	}
}
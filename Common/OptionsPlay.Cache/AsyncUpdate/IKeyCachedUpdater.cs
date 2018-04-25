using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace OptionsPlay.Cache.AsyncUpdate
{

	public interface IAspScheduler
	{
		/// <summary>
		/// Initializes and start scheduler. Should be called on app startup
		/// </summary>
		void Initialize();
	}

	public class CacheUpdatedEventArgs<TEntity> : EventArgs
	{

		public CacheUpdatedEventArgs(TEntity entity)
		{
			Entity = entity;
		}

		public TEntity Entity { get; private set; }
	}

	public interface IKeyCachedUpdater<TEntity> : IAspScheduler
	{
		/// <summary>
		/// Register keys to being updated by specified interval
		/// </summary>
		/// <param name="keys">Keys to updated for</param>
		void Register(IEnumerable<string> keys);

		/// <summary>
		/// Removes keys from scheduler.
		/// </summary>
		void Unregister(IEnumerable<string> keys);

		/// <summary>
		/// Called to track activity for specified keys
		/// </summary>
		/// <param name="keys"></param>
		void Track(IEnumerable<string> keys);

		/// <summary>
		/// Interval for updating cached values async.
		/// </summary>
		TimeSpan UpdateInterval { get; }

		/// <summary>
		/// If some symbols haven't been used (<see cref="Track"/>) for the interval - they are removed from update queue.
		/// </summary>
		TimeSpan CheckForNotUsedItemsInterval { get; }

		/// <summary>
		/// Method, which is used to request new items to be inserted in cache.
		/// HIGHHLY IMPORTANT: the implementation of this method should retrieve data NOT FROM CACHE (e.g. the method for retrieving). 
		/// </summary>
		Func<List<string>, Task<List<KeyValuePair<string, TEntity>>>> GetItems { get; }

		/// <summary>
		/// Notifies subscribers after cache is updated. Event args contains <b>changed</b> KeyValuePairs.
		/// </summary>
		event EventHandler<CacheUpdatedEventArgs<List<KeyValuePair<string, TEntity>>>> CacheUpdated;
	}
}
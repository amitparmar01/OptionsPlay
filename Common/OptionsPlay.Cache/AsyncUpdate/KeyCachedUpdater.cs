using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using OptionsPlay.Cache.Core;
using OptionsPlay.Logging;

namespace OptionsPlay.Cache.AsyncUpdate
{
	
	public abstract class KeyCachedUpdater<TEntity> : IKeyCachedUpdater<TEntity>
	{

		private static readonly ConcurrentDictionary<string, DateTime> KeysToRepopulate = new ConcurrentDictionary<string, DateTime>();

		private readonly ICache _cache;

		private Timer _updateTimer;

        private Thread _updateThread;

		protected KeyCachedUpdater(ICache cache)
		{
			_cache = cache;
			Initialize();
            Logger.Debug(this.ToString() + " Constructor (ThreadID = " + Thread.CurrentThread.ManagedThreadId + ") ");
		}
		
		#region Implementation of IKeyCachedUpdater<TEntity>

		public void Register(IEnumerable<string> keys)
		{
            Logger.Debug(this.ToString() + " Register Start (ThreadID = " + Thread.CurrentThread.ManagedThreadId + ") KeysToRepopulate.Count = " + KeysToRepopulate.Count + ", keys.Count = " + keys.Count());
			foreach (string key in keys)
			{
				KeysToRepopulate[key.ToUpper()] = DateTime.UtcNow;
			}
            Logger.Debug(this.ToString() + " Register End (ThreadID = " + Thread.CurrentThread.ManagedThreadId + ") KeysToRepopulate.Count = " + KeysToRepopulate.Count);
		}

		public void Unregister(IEnumerable<string> keys)
		{
            Logger.Debug(this.ToString() + " Unregister Start (ThreadID = " + Thread.CurrentThread.ManagedThreadId + ") KeysToRepopulate.Count = " + KeysToRepopulate.Count + ", keys.Count = " + keys.Count());
			foreach (string key in keys)
			{
				DateTime value;
				KeysToRepopulate.TryRemove(key.ToUpper(), out value);
			}
            Logger.Debug(this.ToString() + " Unregister End (ThreadID = " + Thread.CurrentThread.ManagedThreadId + ") KeysToRepopulate.Count = " + KeysToRepopulate.Count);
		}

		public void Track(IEnumerable<string> keys)
		{
			foreach (string key in keys.Where(s => KeysToRepopulate.ContainsKey(s.ToUpper())))
			{
				KeysToRepopulate[key.ToUpper()] = DateTime.UtcNow;
			}
		}

		public abstract TimeSpan UpdateInterval { get; }
		public TimeSpan CheckForNotUsedItemsInterval { get; private set; }

		public abstract Func<List<string>, Task<List<KeyValuePair<string, TEntity>>>> GetItems { get; }

		/// <summary>
		/// Cache updated event, event arguments includes <b>changed</b> KeyValuePair.
		/// </summary>
		public event EventHandler<CacheUpdatedEventArgs<List<KeyValuePair<string, TEntity>>>> CacheUpdated;

		#endregion

		#region Implementation of IAspScheduler

		public void Initialize()
		{
            //_updateTimer = new Timer(UpdateCallback, null, UpdateInterval, UpdateInterval);
            _updateThread = new Thread(UpdateCallback);
            _updateThread.Start();
		}

		#endregion

		protected virtual void OnCacheUpdated(CacheUpdatedEventArgs<List<KeyValuePair<string, TEntity>>> eventArgs)
		{
			EventHandler<CacheUpdatedEventArgs<List<KeyValuePair<string, TEntity>>>> handler = CacheUpdated;
			if (handler != null)
			{
				handler(this, eventArgs);
			}
		}
        //public virtual List<string> OnGetKeysToPopulate()
        //{
        //    return new List<string>(); 
        //}

		protected async Task<List<KeyValuePair<string, TEntity>>> UpdateCachedValues()
		{
            Logger.Debug(this.ToString() + " UpdateCachedValues 1 (ThreadID = " + Thread.CurrentThread.ManagedThreadId + ") ");
			if (KeysToRepopulate.Count <= 0)
			{
                Logger.Debug(this.ToString() + " UpdateCachedValues 1-1 (ThreadID = " + Thread.CurrentThread.ManagedThreadId + ") KeysToRepopulate.Count() = " + KeysToRepopulate.Count());
				return new List<KeyValuePair<string, TEntity>>();
			}

			List<string> keys = KeysToRepopulate.Keys.ToList();

			List<KeyValuePair<string, TEntity>> items;
			try
			{
				items = await GetItems(keys);
                Logger.Debug(this.ToString() + " UpdateCachedValues 1-2 (ThreadID = " + Thread.CurrentThread.ManagedThreadId + ") All Items.Count() = " + items.Count);
			}
			catch (Exception e)
			{
                Logger.Debug(this.ToString() + " UpdateCachedValues 1-3-1 (ThreadID = " + Thread.CurrentThread.ManagedThreadId + ") empty items exception = " + e.ToString());
                Logger.Debug(this.ToString() + " UpdateCachedValues 1-3-1 (ThreadID = " + Thread.CurrentThread.ManagedThreadId + ") exception = " + e.StackTrace);
				return items = new List<KeyValuePair<string, TEntity>>();
			}

			List<KeyValuePair<string, TEntity>> changeItems = new List<KeyValuePair<string, TEntity>>();

			List<string> missingItems = new List<string>(keys);

			foreach (KeyValuePair<string, TEntity> pair in items)
			{
				string key = pair.Key;
				TEntity item = pair.Value;
				KeyObject keyObject = new StringIdentityKeyObject<TEntity>(key);
                object cachedItem = _cache.Get(keyObject);

                bool isNeedUpdateForCachedItem = isNeedUpdate(item, cachedItem);

                if (isNeedUpdateForCachedItem)
				{
					changeItems.Add(new KeyValuePair<string, TEntity>(key, item));
				}

                if (cachedItem == null || isNeedUpdateForCachedItem)
				    _cache.Insert(keyObject, item);
				
				missingItems.Remove(key);
			}

            ////Track(keys);
			Unregister(missingItems);

            Logger.Debug(this.ToString() + " UpdateCachedValues 1-4 (ThreadID = " + Thread.CurrentThread.ManagedThreadId + ") missingItems.count = " + missingItems.Count);
            Logger.Debug(this.ToString() + " UpdateCachedValues 2 (ThreadID = " + Thread.CurrentThread.ManagedThreadId + ")");
			return changeItems;
		}

        protected virtual bool isNeedUpdate(object item, object cachedItem)
        {
            return !item.Equals(cachedItem);           
        }

		private async void UpdateCallback(object state)
		{
            while (true)
            {
			List<KeyValuePair<string, TEntity>> results = await UpdateCachedValues();
			OnCacheUpdated(new CacheUpdatedEventArgs<List<KeyValuePair<string, TEntity>>>(results));
                Thread.Sleep(200);
            }
		}
	}
}
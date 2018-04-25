using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;

namespace OptionsPlay.Common.Utilities
{
	/// <summary>
	/// Object Pool pattern implementation. Should be a singleton.
	/// </summary>
	/// <typeparam name="T"></typeparam>
	public class ObjectPool<T> where T : new()
	{
		// maps from object to availabilityFlag
		private readonly Dictionary<T, bool> _poolInternal = new Dictionary<T, bool>();

		static ObjectPool()
		{
			Instance = new ObjectPool<T>();
		}

		private ObjectPool() { }

		public static ObjectPool<T> Instance
		{
			get; private set;
		}

		/// <summary>
		/// Pool limit. (Maximum capacity)
		/// If it is less or equal to 0 this value is ignored.
		/// </summary>
		public int Limit { get; set; }

		/// <summary>
		/// Total number of objects in the pool
		/// </summary>
		public int ObjectsCount
		{
			get
			{
				lock (_poolInternal)
				{
					return _poolInternal.Count;
				}
			}
		}

		/// <summary>
		/// Requests for a new object from pool. It will create a new object if no free objects available.
		/// </summary>
		/// <returns>Object available for usage</returns>
		public T Acquire()
		{
			lock (_poolInternal)
			{
				if (Limit > 0 && ObjectsCount >= Limit)
				{
					while (!_poolInternal.ContainsValue(true))
					{
						Monitor.Wait(_poolInternal);
					}
				}

				T freeInstance = _poolInternal.ContainsValue(true)
					? _poolInternal.First(pair => pair.Value).Key
					: CreateInstance();

				_poolInternal[freeInstance] = false;
				return freeInstance;
			}
		}

		/// <summary>
		/// Releases previously acquired object and marks it as free to be available for further users.
		/// Note: the object isn't get disposed in this case nor it removed internal storage.
		/// </summary>
		/// <param name="obj"></param>
		public void Release(T obj)
		{
			lock (_poolInternal)
			{
				if (!_poolInternal.ContainsKey(obj))
				{
					throw new InvalidOperationException("Object does not belong to current thread pool");
				}

				// mark object as free
				_poolInternal[obj] = true;
				Monitor.Pulse(_poolInternal);
			}
		}

		private static T CreateInstance()
		{
			T obj = new T();
			return obj;
		}
	}
}
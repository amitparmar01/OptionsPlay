using System;

namespace OptionsPlay.Cache.Core
{
	/// <summary>
	/// Interface for various cache implementations.
	/// Key object (parameter for "Insert" methods) is serialized by current implementation.
	/// </summary>
	public interface ICache
	{
		/// <summary>
		/// Inserts an item into the cache object with a cache key to reference its location.
		/// Item being added by this method is never expired.
		/// </summary>
		/// <param name="keyObject">key object used to reference the item</param>
		/// <param name="item">The item to be inserted into the cache</param>
		void Insert(KeyObject keyObject, object item);

		/// <summary>
		/// Inserts an item into the cache object with expiration policies
		/// </summary>
		/// <param name="keyObject">key object used to reference the item</param>
		/// <param name="item">The item to be inserted into the cache</param>
		/// <param name="expiration">The interval between the time the inserted object is last accessed and the time at which that object expires.</param>
		void Insert(KeyObject keyObject, object item, TimeSpan expiration);

		/// <summary>
		/// Retrieves the specified item from the Cache object.
		/// </summary>
		/// <param name="keyObject">The identifier for the cache item to retrieve.</param>
		/// <returns>Object corresponding the key given. Null if cache miss</returns>
		object Get(KeyObject keyObject);
	}
}
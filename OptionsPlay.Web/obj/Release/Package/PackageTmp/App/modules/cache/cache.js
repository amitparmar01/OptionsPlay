define(['cacheStores'], function (stores) {

	/**
	 * CacheJS - implements a key/val store with expiry.
	 * Swappable storage modules (array, cookie, localstorage)
	 * Homepage: http://code.google.com/p/cachejs
	 */
	function Cache() {

		/* public */
		var cachePublicInterface = {
			/**
			 * Sets the storage object to use.
			 * On invalid store being passed, current store is not affected.
			 * @param new_store store.
			 * @return boolean true if new_store implements the required methods and was set to this cache's store. else false
			 */
			setStore: function (newStore) {
				if (typeof newStore == "function") {
					newStore = newStore();
					if (newStore.get && newStore.set && newStore.kill && newStore.has) {
						store = newStore;
						return true;
					} else {
						return false;
					}
				} else {
					return false;
				}
			},
			/**
			 * Returns true if cache contains the key, else false
			 * @param key string the key to search for
			 * @return boolean
			 */
			has: function (key) {
				return store.has(key);
			},
			/**
			 * Removes a key from the cache
			 * @param key string the key to remove for
			 * @return boolean
			 */
			kill: function (key) {
				store.kill(key);
				return store.has(key);
			},
			/**
			 * Gets the expiry date for given key
			 * @param key string. The key to get
			 * @return mixed, value for key or NULL if no such key
			 */
			getExpiry: function (key) {
				var exp = get(key, EXPIRES);
				if (exp != false && exp != null) {
					exp = new Date(exp);
				}
				return exp;
			},
			/**
			 * Sets the expiry date for given key
			 * @param key string. The key to set
			 * @param expiry; RFC1123 date or false for no expiry
			 * @return mixed, value for key or NULL if no such key
			 */
			setExpiry: function (key, expiry) {
				if (store.has(key)) {
					var storedVal = store.get(key);
					storedVal[EXPIRES] = makeValidExpiry(expiry);
					store.set(key, storedVal);
					return cachePublicInterface.getExpiry(key);
				} else {
					return NO_SUCH_KEY;
				}
			},
			/**
			 * Gets a value from the cache
			 * @param key string. The key to fetch
			 * @return mixed or NULL if no such key
			 */
			get: function (key) {
				return get(key, VALUE);
			},
			/**
			 * Get if a key is expired or not
			 * @param key string. The key to text
			 * @return boolean
			 */
			expired: function (key) {
				if (store.has(key)) {
					// this key exists:

					// get the value
					var storedVal = store.get(key);

					var now = new Date();
					if (storedVal[EXPIRES] && Date.parse(storedVal[EXPIRES]) <= now) {
						// key has expired
						return true;
					} else if (typeof storedVal[VALUE] != "undefined") {
						// not expired or never expires, and part exists in store[key]
						return false;
					} else {
						// part is not a member of store[key]
						return true;
					}
				} else {
					// no such key
					return true;
				}
			},
			/**
			 * Sets a value in the cache, returns true on sucess, false on failure.
			 * @param key string. the name of this cache object
			 * @param val mixed. the value to return when querying against this key value
			 * @param expiry RFC1123 date, optional. If not set and is a new key, or set to false, this key never expires
			 *                       If not set and is pre-existing key, no change is made to expiry date
			 *                       If set to date, key expires on that date.
			 */
			set: function (key, val, expiry) {
				var storedVal;

				if (!store.has(key)) {
					// key did not exist; create it
					storedVal = Array();
					storedVal[EXPIRES] = makeValidExpiry(expiry);
					store.set(key, storedVal);
				} else {
					// key did already exist
					storedVal = store.get(key);
					if (typeof expiry != "undefined") {
						// If we've been given an expiry, set it
						storedVal[EXPIRES] = makeValidExpiry(expiry);
					} // else do not change the existent expiry
				}

				// always set the value
				storedVal[VALUE] = val;
				store.set(key, storedVal);

				return cachePublicInterface.get(key);
			}
		};
		/* /public */

		/* private */
		var store = stores.objectStore();
		var NO_SUCH_KEY = null;
		var VALUE = 0;
		var EXPIRES = 1;

		function get(key, part) {
			if (store.has(key)) {
				// this key exists:

				// get the value
				var storedVal = store.get(key);

				if (typeof storedVal[part] != "undefined") {
					// not expired or never expires, and part exists in store[key]
					return storedVal[part];
				} else {
					// part is not a member of store[key]
					return NO_SUCH_KEY;
				}
			} else {
				// no such key
				return NO_SUCH_KEY;
			}
		}

		function makeValidExpiry(expiry) {
			if (!expiry) {
				// no expiry given; change from "undefined" to false - this value does not expire.
				expiry = false;
			} else {
				// force to date type
				expiry = new Date(expiry);
			}

			return expiry;
		}

		/* /private */

		return cachePublicInterface;
	}

	return Cache;
});
define(function () {
	/**
	 * objectStore - the default Cache storage
	 */
	var objectStore = function () {
		var cacheObject = {};

		var my = {
			has: function (key) {
				return (typeof cacheObject[key] !== "undefined");
			},
			get: function (key) {
				return cacheObject[key];
			},
			set: function (key, val) {
				cacheObject[key] = val;
			},
			kill: function (key) {
				delete cacheObject[key];
			}
		};

		return my;
	};

	/**
	 * localStorageStore.
	 */
	var localStorageStore = function () {
		var prefix = "CacheJS_LS"; // change this if you're developing and want to kill everything ;0)

		var my = {
			has: function (key) {
				return (localStorage[prefix + key] != null);
			},
			get: function (key) {
				if (!my.has(key)) {
					return undefined;
				} else {
					return JSON.parse(localStorage[prefix + key]);
				}
			},
			set: function (key, val) {
				if (val === undefined) {
					my.kill(key);
				} else {
					localStorage[prefix + key] = JSON.stringify(val);
				}
			},
			kill: function (key) {
				//delete localStorage[prefix+key]; // not supported in IE8
				localStorage.removeItem(prefix + key);
			}
		};

		if (window.localStorage) {
			return my;
		} else {
			// localStorage not supported on this browser; degrade to objectStore.
			return objectStore();
		}
	};

	var stores = {
		objectStore: objectStore,
		localStorageStore: localStorageStore
	};

	return stores;
});
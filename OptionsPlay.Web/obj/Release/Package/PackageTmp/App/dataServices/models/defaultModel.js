define(['komapping'], function (mapping) {
	'use strict';
	function DefaultModel(data, mappingOptions) {
		mappingOptions = mappingOptions || {};
		this.updateModel = function (newData) {
			mapping.fromJS(newData, mappingOptions, this);
		};

		this.updateModel(data);
	}

	return DefaultModel;
});

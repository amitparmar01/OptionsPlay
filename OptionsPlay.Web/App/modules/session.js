define(['knockout'], function (ko) {

	var result = {};

	result.isAuthenticated = ko.observable(false);

	result.userName = ko.observable();
	result.accountNumber = ko.observable();
	result.accountId = ko.observable();
	result.role = ko.observable();
	result.permissions = ko.observableArray();

	result.hasPermission = function (permission) {
		var permissions = result.permissions();
		if (result.isAuthenticated() && permissions && permissions.indexOf(permission) !== -1) {
			return true;
		}
		return false;
	};

	result.setSecurityModel = function (securityModel) {
		if (securityModel == null) {
			result.isAuthenticated(false);
			result.userName(null);
			result.accountNumber(null);
			result.accountId(null);
			result.role(null);
			result.permissions(null);
		} else {
			result.userName(securityModel.userName);
			result.accountNumber(securityModel.accountNumber);
			result.accountId(securityModel.accountId);
			result.role(securityModel.role);
			result.permissions(securityModel.permissions);
			result.isAuthenticated(true);
		}
	};
	
	function cloneNodes(nodesArray, shouldCleanNodes) {
		for (var i = 0, j = nodesArray.length, newNodesArray = []; i < j; i++) {
			var clonedNode = nodesArray[i].cloneNode(true);
			newNodesArray.push(shouldCleanNodes ? ko.cleanNode(clonedNode) : clonedNode);
		}
		return newNodesArray;
	}

	ko.bindingHandlers.ifHasPermissions = {
		init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
			var didDisplayOnLastUpdate, savedNodes;
			ko.computed(function () {
				var dataValue = ko.utils.unwrapObservable(valueAccessor());
				var shouldDisplay = result.hasPermission(dataValue);
				var isFirstRender = !savedNodes;
				var needsRefresh = isFirstRender || (shouldDisplay !== didDisplayOnLastUpdate);

				if (needsRefresh) {
					// Save a copy of the inner nodes on the initial update, but only if we have dependencies.
					if (isFirstRender && ko.computedContext.getDependenciesCount()) {
						savedNodes = cloneNodes(ko.virtualElements.childNodes(element), true /* shouldCleanNodes */);
					}

					if (shouldDisplay) {
						if (!isFirstRender) {
							ko.virtualElements.setDomNodeChildren(element, cloneNodes(savedNodes));
						}
						ko.applyBindingsToDescendants(bindingContext, element);
					} else {
						ko.virtualElements.emptyNode(element);
					}

					didDisplayOnLastUpdate = shouldDisplay;
				}
			}, null, { disposeWhenNodeIsRemoved: element });
			return { 'controlsDescendantBindings': true };
		}
	};
	ko.expressionRewriting.bindingRewriteValidators.ifHasPermissions = false; // Can't rewrite control flow bindings
	ko.virtualElements.allowedBindings.ifHasPermissions = true;

	return result;
});
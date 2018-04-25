define(['knockout', 'koBindings/customExtenders'], function (ko) {

	var DisposableViewModel = function () {
		var disposables = [];
		var _isDisposed = false;

		function isDiposed() {
			return _isDisposed;
		}

		this.destroy = this.dispose = function () {
			for (var i = 0; i < disposables.length; i++) {
				disposables[i].dispose();
			}
			disposables = [];
			_isDisposed = true;
		}
		this.computed = function (evaluateOrOptions, target, options) {
			var computed = ko.extendedComputed(evaluateOrOptions, target, options, {
				disposeWhen: isDiposed
			});
			disposables.push(computed);
			return computed;
		}
		this.deferredComputed = function (evaluateOrOptions, target, options) {
			var computed = ko.extendedComputed(evaluateOrOptions, target, options, {
				deferEvaluation: true,
				disposeWhen: isDiposed
			});
			disposables.push(computed);
			return computed;
		}
		this.subscribe = function (observable, callback, callbackTarget, event) {
			var subscription = observable.subscribe(callback, callbackTarget, event);
			disposables.push(subscription);
		}
	}

	return DisposableViewModel;
});
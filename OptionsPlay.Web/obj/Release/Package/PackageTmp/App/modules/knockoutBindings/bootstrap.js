define(['jquery', 'knockout', 'bootstrap'], function ($, ko) {
	'use strict';

	function bindEventsToHandlers(sender, events, parameters) {
		for (var property in events) {
			if (parameters[property]) {
				sender.on(events[property], parameters[property]);
			}
		}
	}

	//todo: work on this binding
	/**
	* Binding to bootstrap 3.0 tab panel. should be bound to trigger element
	* You can specify bootstrap tab options along with events [onShow, onShown]:
	*	data-bind="tab: { onShow: onMyTabShow }"
	* Example:
	*		<a href="#myTab1" data-bind="tab: { onShow: onMyTabShow }">
	*		</a>
	*		<div id="myTab1" class="tab-content hide fade">
	*		</div>
	*/
	ko.bindingHandlers.tab = {
		init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
			var parameters = valueAccessor();
			var events = {
				onShow: 'show.bs.tab',
				onShown: 'shown.bs.tab'
			};

			var tab = $(element).tab();
			var newValueAccessor = function () {
				return function () {
					tab.tab('show');
				};
			};

			bindEventsToHandlers(tab, events, parameters);

			ko.bindingHandlers.click.init(element, newValueAccessor, allBindings, viewModel, bindingContext);
		}
	};


	/**
	* Binding to bootstrap 3.0 modal window. should be bound to viewmodel which should handle modal behavior.
	* ViewModel MUST contain at least one observable property 'show' which is true when modal should be shown (is shown) and false when modal should be hidden (is hidden).
	* ViewModel also can contain the following event handlers: onShow,  onShown, onHide, onHidden.
	* You can specify bootstrap modal options:
	*	data-bind="bootstrapModal: modal, modalOptions: { show: false, backdrop: 'static', keyboard: false }"
	* Example:
	*	<div data-bind="bootstrapModal: tradeTicket, modalOptions: { show: false, backdrop: 'static', keyboard: false }">
	*		...modal content
	*	</div>
	*/
	ko.bindingHandlers.bootstrapModal = {
		init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
			var template = allBindingsAccessor().template;
			var bootstrapAdditionalOptions = allBindingsAccessor().modalOptions || {};
			var modal = valueAccessor();

			var events = {
				onShow: 'show.bs.modal',
				onShown: 'shown.bs.modal',
				onHide: 'hide.bs.modal',
				onHidden: 'hidden.bs.modal'
			};

			ko.utils.toggleDomNodeCssClass(element, "modal fade", true);
			if (template) {
				var vm = bindingContext.createChildContext(viewModel);
				ko.utils.extend(vm, modal);
				ko.renderTemplate(template, vm, null, element);
			} else {
				ko.bindingHandlers.with.init(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext);
			}
			if (bootstrapAdditionalOptions.show != null) {
				modal.show(!!bootstrapAdditionalOptions.show);
			}

			bootstrapAdditionalOptions.show = false;
			var domEl = $(element).modal(bootstrapAdditionalOptions);
			bindEventsToHandlers(domEl, events, modal);
			domEl.on(events.onHidden, function () {
				modal.show(false);
			});

			var showHide = ko.computed(function () {
				var show = modal.show();
				$(element).modal(show ? 'show' : 'hide');
			});

			ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
				showHide.dispose();
				for (var e in events) {
					if (events.hasOwnProperty(e)) {
						domEl.off(events[e]);
					}
				}
			});
			return {
				controlsDescendantBindings: true
			};
		}
	};

	/**
	* Binding to bootstrap 3.0 carousel.
	* You can specify bootstrap carousel options along with events [onSlide, onSlid]:
	*	data-bind="carousel: itemIndexObservable, carouselOptions: { options: { wrap: false }, onSlide: onMyCarouselSlide }"
	*/
	ko.bindingHandlers.carousel = {
		init: function (element, valueAccessor, allBindings) {
			var currentItemIndexObservable = valueAccessor();
			ko.unwrap(currentItemIndexObservable);
			function doInit() {
				//var currentItemIndexObservable = valueAccessor();

				var events = {
					onSlide: 'slide.bs.carousel',
					onSlid: 'slid.bs.carousel'
				};

				var parameters = allBindings.get('carouselOptions');

				var creationOptions = parameters ? parameters.options : {};

				var carousel = $(element).carousel(creationOptions);

				if (parameters) {
					bindEventsToHandlers(carousel, events, parameters);
				}

				carousel.on('slid.bs.carousel', function () {
					var newIndex = carousel.find('.item.active').index();
					currentItemIndexObservable(newIndex);
				});

				$(carousel.find('.item')[ko.unwrap(currentItemIndexObservable)]).addClass('active');
			}
			// allow inner bindings to be applied
			window.setTimeout(doInit, 1);
		},
		update: function (element, valueAccessor) {
			var currentItemIndex = valueAccessor();
			var currentSlide = ko.unwrap(currentItemIndex);
			function doUpdate() {
				$(element).carousel(currentSlide);
			}
			// allow inner bindings to be applied
			if ($(element).data('bs.carousel')) {
				$(element).carousel(currentSlide);
			} else {
				window.setTimeout(doUpdate, 1);
			}
		}
	};

});
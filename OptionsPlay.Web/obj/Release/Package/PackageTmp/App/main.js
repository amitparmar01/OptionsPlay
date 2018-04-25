(function () {
	var SCRIPTS_FOLDER = '../Scripts/';
	var DURANDAL_FOLDER = '../Scripts/' + 'durandal/';
	var APP_FOLDER = '../App/';
	var MODULES_FOLDER = '../App/' + 'modules/';
	var DATA_SERVICES_FOLDER = '../App/' + 'dataServices/';
	var MODELS_FOLDER = '../App/' + 'dataServices/' + 'models/';
	var KO_BINDINGS_FOLDER = '../App/' + 'modules/' + 'knockoutBindings/';
	var CACHE_FOLDER = '../App/' + 'modules/' + 'cache/';
	var VALIDATION_FOLDER = '../Scripts/' + 'jquery.validate/';
	var CHARTIQ_FOLIDER = '../Scripts/' + 'chartIQ/'

	function removeLastChar(str) {
		var s = str.substring(0, str.length - 1);
		return s;
	}

	requirejs.config({
		waitSeconds: 0, // for Chinese site instance. Loading kendo modules take too much time
		paths: {
			'requireLib': '../Scripts/' + 'require-2.1.11',
			'text': '../Scripts/' + 'text',
			'durandal': '../Scripts/' + 'durandal',
			'plugins': '../Scripts/' + 'durandal/' + 'plugins',
			'transitions': '../Scripts/' + 'durandal/' + 'transitions',
			//'knockout': '../Scripts/' + 'knockout-3.1.0',
			'komapping': '../Scripts/' + 'knockout.mapping-2.4.1',
			'knockout-kendo': '../Scripts/' + 'knockout-kendo',
			//'kendo': '../Scripts/' + 'kendo/kendo.all.min',
			'kendo-zh-CN': '../Scripts/' + 'kendo/kendo.culture.zh-CN.min',
			'kendo-plugins': '../Scripts/' + 'kendo/kendo.web.plugins',
			'i18next': '../Scripts/' + 'i18next.amd.withJQuery-1.7.2',
			'jstat': '../Scripts/' + 'jstat-0.1.0.min',
			'jquery-signalr': '../Scripts/' + 'jquery.signalR-2.1.2.min',
			'jquery-ui': '../Scripts/' + 'jquery-ui-1.10.4.custom.min',
			'jquery-ui-touch-punch': '../Scripts/' + 'jquery.ui.touch-punch.min',
			'jquery-placeholder': '../Scripts/' + 'jquery.placeholder',
			'jquery-cookie': '../Scripts/' + 'jquery.cookie',
			'toastr': '../Scripts/' + 'toastr',
			'highstock': '../Scripts/' + 'highstock',
			'highstockCopy': '../Scripts/' + 'highstock-copy',
			'isotope': '../Scripts/' + 'isotope.pkgd',
			'pace': '../Scripts/' + 'pace',
			'perfectScrollbar': '../Scripts/' + 'perfect-scrollbar',
			'bootstrap': '../Scripts/' + 'bootstrap',
			'bootstrap-datepicker': '../Scripts/' + 'bootstrap-datepicker',
			'jquery-validate': '../Scripts/' + 'jquery.validate/' + 'jquery.validate',
			'jquery-validate-unobtrusive': '../Scripts/' + 'jquery.validate/' + 'jquery.validate.unobtrusive',
			'jquery-hotkeys': '../Scripts/' + 'jquery.hotkeys',
			'autoNumeric': '../Scripts/' + 'autoNumeric-1.9.25',
			'knockout-validation-clear': '../Scripts/' + 'knockout.validation.debug',

			'modules': '../App/' + 'modules',
			'modules/strategyTemplates': '../App/' + 'modules/' + 'strategies/strategyTemplates',
			'modules/combinationViewModel': '../App/' + 'modules/' + 'combination/combinationViewModel',
			'modules/combinationChart': '../App/' + 'modules/' + 'combination/combinationChart',
			'modules/combinationEditor': '../App/' + 'modules/' + 'combination/combinationEditor',
			'modules/combinationHelpers': '../App/' + 'modules/' + 'combination/combinationHelpers',
			'modules/strategyHelpers': '../App/' + 'modules/' + 'combination/strategyHelpers',
			'modules/enums': '../App/' + 'modules/' + 'combination/enums',
			'addToValidationContext': '../App/' + 'modules/' + 'validation/addToValidationContext',
			'loader': '../App/' + 'modules/' + 'loader',
			'events': '../App/' + 'modules/' + 'events',

			'cache': '../App/' + 'modules/' + 'cache/' + 'cache',
			'cacheStores': '../App/' + 'modules/' + 'cache/' + 'stores',

			'models': '../App/' + 'dataServices/' + 'models',
			'defaultModel': '../App/' + 'dataServices/' + 'models/' + 'defaultModel',
			'optionChainsModel': '../App/' + 'dataServices/' + 'models/' + 'optionChainsModel',
			'portfolioItemGroupModel': '../App/' + 'dataServices/' + 'models/' + 'portfolioItemGroupModel',
			'portfolioItemModel': '../App/' + 'dataServices/' + 'models/' + 'portfolioItemModel',
			'standardDeviationModel': '../App/' + 'dataServices/' + 'models/' + 'standardDeviationModel',
			'predictionsModel': '../App/' + 'dataServices/' + 'models/' + 'predictionsModel',
			
			'dataServices': '../App/' + 'dataServices/',
			'dataContext': '../App/' + 'dataServices/' + 'dataContext',
			'hostResolver': '../App/' + 'dataServices/' + 'hostResolver',
			'dataServices/traceDataService': '../App/' + 'dataServices/' + 'traceDataService',
			
			'koBindings': '../App/' + 'modules/' + 'knockoutBindings',
			'koExtenders': '../App/' + 'modules/' + 'knockoutBindings/' + 'koExtenders'
		},
		shim: {
			'knockout-validation-clear': ['addKnockoutAsGlobalVariable'],
			'knockout-kendo': ['kendo'],
			'kendo-plugins': ['kendo'],
			'amcharts-serial': ['amcharts'],
			'amcharts-xy': ['amcharts'],
			'kendo-zh-CN': ['kendo'],
			'jquery-hotkeys': ['jquery'],
			'jquery-validate': ['jquery'],
			'jquery-ui': ['jquery'],
			'jquery-ui-touch-punch': ['jquery-ui'],
			'bootstrap-datepicker': ['jquery-ui'],
			'jquery-validate-unobtrusive': ['jquery-validate']
		}
	});
})();


define('jquery', function () {
	return jQuery;
});

define('kendo', function () {
	return kendo;
});

define('knockout', function () {
	return ko;
});

// FIXME: knockout-validation plugin does not support AMD...
define('addKnockoutAsGlobalVariable', ['knockout'], function (ko) {
	window.ko = ko;
});
// Fix for knockout validation + kendo. knockout-kendo bindings require direct observable property to track changes.
// isValid is defined as a simple function (not observable). Here we make this property computed observable. 
define('knockout-validation', ['knockout', 'knockout-validation-clear'], function () {
	var oldGroupFunc = ko.validation.group;
	ko.validation.group = function (obj, options) {
		oldGroupFunc(obj, options);
		obj.isValid = ko.computed(function () {
			return obj.errors().length === 0;
		})
	};
})

define(['dataContext',
		'durandal/system',
		'durandal/app',
		'durandal/viewLocator',
		'pace',
		'durandal/composition',
		'koBindings/translate',
		'koBindings/textFormatted',
        'koBindings/fadeBackdropVisible',
		'modules/validation'],
function (dataContext, system, app, viewLocator, pace) {
	system.debug(true);

	app.configurePlugins({
		router: true,
		widget: true
	});

	//window.paceOptions = {
	//	startOnPageLoad: false,
	//	restartOnRequestAfter: false,
	//	restartOnPushState: false,
	//	elements: { selectors: ['.pace-indicator'] },
	//	//'GetView' requests may be resolved from cache causing IE9 to stuck
	//	ajax: { trackWebSockets: false, ignoreURLs: ['signalr', 'GetView'] }
	//};

	app.start().then(function () {
		viewLocator.useConvention('viewmodels', ' DurandalViewsProvider/GetView?name=', ' DurandalViewsProvider/GetView?name=');
		dataContext.authentication.getSecurityModel().then(function () {
			app.setRoot('viewmodels/shell', 'entrance');
		})
	});
});
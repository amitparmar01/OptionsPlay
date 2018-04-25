define(['knockout',
		'plugins/router',
		'loader',
		'modules/notifications',
		'modules/session',
		'modules/localizer',
		'dataContext',
		'modules/browserDetection',
		'koBindings/kendoExt'],
function (ko, router, loader, notifications, session, localizer, dataContext, browserDetection) {
	function SignInViewModel() {
		var self = this;
		var returnRoute;
		var loading;

		this.isAuthenticated = session.isAuthenticated;

		this.login = ko.observable(null).extend({ required: true });
		this.password = ko.observable(null).extend({ required: true });
		this.rememberMe = ko.observable(true);
		this.loginWays = ko.observableArray(['资金账号', '客户账号']);
		this.selectedLoginValue = ko.observable('资金账号');
        
		this.signIn = function () {
			if (loading || !self.isValid() || self.isAuthenticated()) {
				if(!self.login.isValid()){
					notifications.error(localizer.localize('signInPage.loginEmpty'));	
				}
				if(!self.password.isValid()){
					notifications.error(localizer.localize('signInPage.passwordEmpty'));
				}
				
				return;
			}

			var signInModel = {
				login: self.login(),
				password: self.password(),
				loginAccountType: ((self.selectedLoginValue()) == "客户账号") ? ("U") : ("Z"), //////////////////客户账号登陆传入U，资金账户Z
                				rememberMe: self.rememberMe(),
				
			};

			//loader.show();
			loading = true;
			
			//$("#authenticatedView").css("opacity", "0");
			dataContext.authentication.signIn(signInModel)
				.done(function () {
				    router.navigate(returnRoute);
				}).always(function () {
					loader.hide();
					loading = false;
				});
		};

		this.canReuseForRoute = function () {
			return false;
		};

		this.activate = function (returnRouteParam) {
			returnRoute = returnRouteParam || '#';
		};

		// to workaround the issue with browser's autofill
		this.login.subscribe(function () {
			$('#password').trigger('change');
		});

		// initialize validation group on this model
		ko.validation.group(this);

		this.browserCompatibilityWarningVisible = ko.computed(function () {
			var ie = browserDetection.ie;

			return ie < 10;
		});
	}

	return SignInViewModel;
});
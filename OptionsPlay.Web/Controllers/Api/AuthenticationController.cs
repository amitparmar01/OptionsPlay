using System.Collections.Generic;
using System.Web.Http;
using OptionsPlay.BusinessLogic.Common.Authentication;
using OptionsPlay.Common.ServiceResponses;
using OptionsPlay.Model;
using OptionsPlay.Model.Enums;
using OptionsPlay.Resources;
using OptionsPlay.Security.Identities;
using OptionsPlay.Web.Infrastructure.Attributes.Api;
using OptionsPlay.Web.Infrastructure.Helpers;
using OptionsPlay.Web.ViewModels;
using OptionsPlay.Web.ViewModels.Authentication;

namespace OptionsPlay.Web.Controllers.Api
{
	[RoutePrefix("api/authentication")]
	public class AuthenticationController : BaseApiController
	{

		private readonly IAuthenticationService _authenticationService;

		public AuthenticationController(IAuthenticationService authenticationService)
		{
			_authenticationService = authenticationService;
		}

		[ApiAuthorize(PermissionCollection.NotAuthenticatedAccessOnly)]
		[Route("signIn")]
		public EntityResponse<AuthenticationModel> SignIn(SignInModel signInModel)
		{
			if (!ModelState.IsValid)
			{
				List<string> errorMessages = GetValidationErrorMessages();
				EntityResponse<AuthenticationModel> error = 
					EntityResponse<AuthenticationModel>.Error(ErrorCode.AccountVerificationInvalidModel, string.Join(".", errorMessages));
				return error;
			}

			Role role = _authenticationService.Authenticate(signInModel.Login, signInModel.Password, signInModel.LoginAccountType, signInModel.RememberMe);
			if (role == null)
			{
				EntityResponse<AuthenticationModel> error = EntityResponse<AuthenticationModel>.Error(
					ErrorCode.AccountVerificationInvalidLoginOrPassword,
					ClientErrorMessages.AccountController_AccountVerificationInvalidLoginOrPassword);
				return error;
			}

			AuthenticationModel authenticationModel = GetSecurityModel();
			return authenticationModel;
		}

		[HttpGet]
		[Route("securityModel")]
		public AuthenticationModel GetSecurityModel()
		{
			IOptionsPlayIdentity identity = SessionHelper.GetIdentity();
			if (identity == null)
			{
				return null;
			}
			AuthenticationModel authenticationModel = new AuthenticationModel();

			authenticationModel.Role = identity.Role;
			authenticationModel.Permissions = identity.Permissions.ToArray();
			
			OptionsPlayFCUserIdentity fcUserIdentity = identity as OptionsPlayFCUserIdentity;
			if (fcUserIdentity != null)
			{
				authenticationModel.AccountNumber = fcUserIdentity.CustomerAccountCode;
				authenticationModel.AccountId = fcUserIdentity.AccountId;
                authenticationModel.UserName = fcUserIdentity.TradeAccountName;
			}
			
            //OptionsPlayWebUserIdentity webUserIdentity = identity as OptionsPlayWebUserIdentity;
            //if (webUserIdentity != null)
            //{
            //    authenticationModel.UserName = webUserIdentity.DisplayName;
            //}

			return authenticationModel;
		}

		[HttpGet, HttpPost]
		[ApiAuthorize]
		[Route("logOut")]
		public BaseResponse LogOut()
		{
			_authenticationService.LogOut();
			return BaseResponse.Success();
		}
	}
}
using OptionsPlay.BusinessLogic.Common.Authentication;
using OptionsPlay.Common.ServiceResponses;
using OptionsPlay.DAL.Interfaces;
using OptionsPlay.DAL.SZKingdom.Common;
using OptionsPlay.DAL.SZKingdom.Common.Entities;
using OptionsPlay.DAL.SZKingdom.Common.Enums;
using OptionsPlay.Logging;
using OptionsPlay.Model;
using OptionsPlay.Security;
using OptionsPlay.Security.Utilits;

namespace OptionsPlay.BusinessLogic.Authentication
{
	public class AuthenticationService : BaseService, IAuthenticationService
	{
		private readonly IAccountManager _accountManager;
		private readonly IUserService _userService;
		private readonly WebFormsAuthenticator _authenticator = new WebFormsAuthenticator();

		public AuthenticationService(IOptionsPlayUow uow, IAccountManager accountManager, IUserService userService)
			: base(uow)
		{
			//TODO: passing account manager could be a performance issue. Used only in Authenticate method. Need detailed investigation.
			_accountManager = accountManager;

			_userService = userService;
		}

		/// <summary>
		/// Authenticates user in the system.
		/// </summary>
		/// <param name="loginName">login name</param>
		/// <param name="password">password</param>
		/// <param name="rememberMe">remember user or not</param>
		/// <returns><c>true</c> entity if authenticated, otherwise - <c>false</c></returns>
        public Role Authenticate(string loginName, string password, string loginAccountType, bool rememberMe = false)
		{
			User user = Uow.Users.GetByLoginName(loginName);

			if (user == null)
			{
				EntityResponse<UserLoginInformation> loginInfo =
					_accountManager.UserLogin(
                            loginAccountType == "U" ? LoginAccountType.CustomerCode : LoginAccountType.CustomerAccountCode,
							loginName,
							password,
							PasswordUseScope.OptionTrade);

				if (loginInfo.IsSuccess)
				{
					EntityResponse<FCUser> fcUserResponse = _userService.AddOrUpdateFCUser(loginInfo.Entity, password);
					user = fcUserResponse.Entity;
				}
			}

			if (user != null)
			{
				return Authenticate(user, password, rememberMe);
			}

			Logger.Warn(string.Format("Invalid user name {0}", loginName));

			return null;
		}

		/// <summary>
		/// Authenticate the <paramref name="user"/>
		/// </summary>
		/// <param name="user">The user to be authenticated.</param>
		/// <param name="password">The password.</param>
		/// <param name="rememberMe">remember user or not</param>
		public Role Authenticate(User user, string password, bool rememberMe = false)
		{
			WebUser webUser = user as WebUser;

			if (webUser != null)
			{
				PasswordFactory passwordFactory = new PasswordFactory();

				bool result = passwordFactory.CheckPassword(webUser, password);

				if (result)
				{
					UpdateAuthentication(user, rememberMe);

					return user.Role;
				}
			}
			else
			{
				FCUser fcUser = (FCUser)user;
				UpdateAuthentication(user, rememberMe);
				return fcUser.Role;
			}

			return null;
		}

		/// <summary>
		/// Authenticate the <paramref name="user"/>
		/// </summary>
		/// <param name="user">The user to be authenticated.</param>
		/// <param name="rememberMe">remember user or not</param>
		public Role Authenticate(User user, bool rememberMe = false)
		{
			UpdateAuthentication(user, rememberMe);

			return user.Role;
		}

		/// <summary>
		/// Logs the user out of the system.
		/// </summary>
		public void LogOut()
		{
			_authenticator.LogOut();
		}

		/// <summary>
		/// Updates user's cookie
		/// </summary>
		private void UpdateAuthentication(User user, bool rememberMe = false)
		{
			_authenticator.Authenticate(user, rememberMe);
		}
	}
}

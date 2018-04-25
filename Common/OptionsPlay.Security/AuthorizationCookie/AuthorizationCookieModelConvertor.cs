using System.Linq;
using OptionsPlay.Model;
using OptionsPlay.Model.Enums;
using OptionsPlay.Security.Identities;
using OptionsPlay.Security.Permissions;

namespace OptionsPlay.Security.AuthorizationCookie
{
	public static class AuthorizationCookieModelConvertor
	{
		public static OptionsPlayIdentity ToOptionsPlayIdentity(this AuthorizationCookieModel authorizationCookieModel)
		{
			OptionsPlayIdentity result;

			AuthCookieWebUserInfo cookieWebUserInfo = authorizationCookieModel.AdditionalInfo as AuthCookieWebUserInfo;
			if (cookieWebUserInfo != null)
			{
				//HACK: Just for testing purposes! 

				//result = new OptionsPlayWebUserIdentity(cookieWebUserInfo.LoginName)
				//{
				//	DisplayName = cookieWebUserInfo.DisplayName,
				//	UserId = authorizationCookieModel.UserId,
				//	Role = (RoleCollection)authorizationCookieModel.Role,
				//	RoleName = ((RoleCollection)authorizationCookieModel.Role).ToString(),
				//	Permissions = authorizationCookieModel.Permissions.Cast<PermissionCollection>().ToList(),
				//};

				//CUST_CODE: 109029901
				//CUACCT_CODE: 109029906
				//TRDACCT: A780361420
				//Or 
				//CUST_CODE: 109029910
				//CUACCT_CODE: 109029922
				//TRDACCT: A780370835
				//123321

				// 109029819
				// 109029820
				// A780738295

				result = new OptionsPlayFCUserIdentity("108054788")
				{
					UserId = authorizationCookieModel.UserId,
					Role = RoleCollection.Admin,
					RoleName = RoleCollection.Admin.ToString(),
					Permissions = authorizationCookieModel.Permissions.Cast<PermissionCollection>().ToList(),
					CustomerCode = "108054788",
					CustomerAccountCode = "108054803",
					TradeAccount = "A780738295",
					InternalOrganization = 1099
				};
			}
			else
			{
				AuthCookieFCUserInfo authCookieFCUserInfo = (AuthCookieFCUserInfo)authorizationCookieModel.AdditionalInfo;

				result = new OptionsPlayFCUserIdentity(authCookieFCUserInfo.CustomerCode)
				{
					UserId = authorizationCookieModel.UserId,
					Role = (RoleCollection)authorizationCookieModel.Role,
					RoleName = ((RoleCollection)authorizationCookieModel.Role).ToString(),
					Permissions = authorizationCookieModel.Permissions.Cast<PermissionCollection>().ToList(),
					CustomerCode = authCookieFCUserInfo.CustomerCode,
					CustomerAccountCode = authCookieFCUserInfo.CustomerAccountCode,
					TradeAccount = authCookieFCUserInfo.TradeAccount,
					AccountId = authCookieFCUserInfo.AccountId,
					TradeAccountName = authCookieFCUserInfo.TradeAccountName,
					InternalOrganization = authCookieFCUserInfo.InternalOrganization
				};
			}

			return result;
		}

		public static AuthorizationCookieModel ToAuthorizationCookieModel(this User user)
		{
			AuthorizationCookieModel result = new AuthorizationCookieModel
			{
				UserId = user.Id,
				Role = (int)user.Role.Id,
				Permissions = user.Role.GetPermissions().Cast<int>().ToList()
			};

			WebUser webUser = user as WebUser;
			if (webUser != null)
			{
				result.AdditionalInfo = new AuthCookieWebUserInfo
				{
					DisplayName = webUser.DisplayName,
					LoginName = webUser.LoginName
				};
			}
			else
			{
				FCUser fcUSer = (FCUser)user;

				result.AdditionalInfo = new AuthCookieFCUserInfo
				{
					CustomerCode = fcUSer.CustomerCode,
					CustomerAccountCode = fcUSer.CustomerAccountCode,
					TradeAccount = fcUSer.TradeAccount,
					AccountId = fcUSer.AccountId,
					TradeAccountName = fcUSer.TradeAccountName,
					InternalOrganization = fcUSer.InternalOrganization
				};
			}

			return result;
		}
	}
}
using System;
using System.Globalization;
using System.Linq;
using System.Web;
using System.Web.Http.Filters;
using OptionsPlay.Common.Exceptions;
using OptionsPlay.Common.ServiceResponses;
using OptionsPlay.Model.Enums;
using OptionsPlay.Security.Identities;
using OptionsPlay.Web.Infrastructure.CustomAuthorization;

namespace OptionsPlay.Web.Infrastructure.Attributes.Api
{
	/// <summary>
	/// Authorize attribute for API controllers
	/// </summary>
	[AttributeUsage(AttributeTargets.Class | AttributeTargets.Method, Inherited = false, AllowMultiple = false)]
	public class ApiAuthorizeAttribute : AuthorizationFilterAttribute
	{
		private readonly PermissionCollection[] _permissions;

		public ApiAuthorizeAttribute(params PermissionCollection[] permissions)
		{
			permissions.ValidatePermissions();
			_permissions = permissions;
		}

		public override void OnAuthorization(System.Web.Http.Controllers.HttpActionContext actionContext)
		{
			HttpContext context = HttpContext.Current;
			if (context == null || context.User == null)
			{
				throw new AuthorizeException(ErrorCode.AuthenticationInvalidHttpContext);
			}

			if (context.User.Identity.IsAuthenticated)
			{
				IOptionsPlayIdentity optionsPlayIdentity = context.User.Identity as IOptionsPlayIdentity;
				if (optionsPlayIdentity == null)
				{
					throw new AuthorizeException(ErrorCode.AuthenticationIncorrectIdentity);
				}

				if (_permissions.Length > 0 && !_permissions.Any(item => optionsPlayIdentity.Permissions.Contains(item)))
				{
					throw new AuthorizeException(
						ErrorCode.AuthenticationMethodAccessNotEnabled, 
						optionsPlayIdentity.UserId.ToString(CultureInfo.InvariantCulture),
						string.Join(", ", _permissions.Select(item => item.ToString())));
				}
			}
			else if (!_permissions.Contains(PermissionCollection.NotAuthenticatedAccessOnly))
			{
				throw new AuthorizeException(ErrorCode.AuthenticationOnlyAuthenticatedAccess);
			}
		}
	}
}
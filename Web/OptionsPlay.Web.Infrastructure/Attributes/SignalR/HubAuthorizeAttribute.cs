using System;
using System.Linq;
using System.Security.Principal;
using Microsoft.AspNet.SignalR;
using OptionsPlay.Model.Enums;
using OptionsPlay.Security.Identities;
using OptionsPlay.Web.Infrastructure.CustomAuthorization;

namespace OptionsPlay.Web.Infrastructure.Attributes.SignalR
{
	/// <summary>
	/// Authorize attribute for SignalR hubs
	/// </summary>
	[AttributeUsage(AttributeTargets.Class, Inherited = false, AllowMultiple = false)]
	public class HubAuthorizeAttribute : AuthorizeAttribute
	{
		private readonly PermissionCollection[] _permissions;

		public HubAuthorizeAttribute(params PermissionCollection[] permissions)
		{
			permissions.ValidatePermissions();
			_permissions = permissions;
		}

		protected override bool UserAuthorized(IPrincipal user)
		{
			if (user != null && user.Identity.IsAuthenticated)
			{
				IOptionsPlayIdentity identity = (IOptionsPlayIdentity)user.Identity;
				if (_permissions.Length > 0 && !_permissions.All(m => identity.Permissions.Contains(m)))
				{
					return false;
				}
			}
			else if (!_permissions.Contains(PermissionCollection.NotAuthenticatedAccessOnly))
			{
				return false;
			}
			return true;
		}
	}
}
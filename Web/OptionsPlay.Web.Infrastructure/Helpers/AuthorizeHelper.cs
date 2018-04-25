using System.Linq;
using OptionsPlay.Logging;
using OptionsPlay.Model.Enums;
using OptionsPlay.Resources;

namespace OptionsPlay.Web.Infrastructure.CustomAuthorization
{
	internal static class AuthorizeHelper
	{
		internal static void ValidatePermissions(this PermissionCollection[] permissions)
		{
			if (permissions.Contains(PermissionCollection.NotAuthenticatedAccessOnly) && permissions.Length > 1)
			{
				Logger.LogErrorAndThrow(ErrorMessages.InvalidPermissionsScope);
			}
		}
	}
}
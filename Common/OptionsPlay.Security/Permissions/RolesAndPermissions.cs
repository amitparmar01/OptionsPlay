using System.Collections.Generic;
using OptionsPlay.Model;
using OptionsPlay.Model.Enums;

namespace OptionsPlay.Security.Permissions
{
	public static class RolesAndPermissions
	{
		public static List<PermissionCollection> GetPermissions(this RoleCollection role)
		{
			List<PermissionCollection> permissions;

			switch (role)
			{
				case RoleCollection.Admin:
					permissions = new List<PermissionCollection>
					{
						PermissionCollection.ManageConfigurationsData,
						PermissionCollection.ViewStrategies,
						PermissionCollection.ManageStrategies
					};
					break;
				case RoleCollection.FCUser:
					permissions = new List<PermissionCollection>
					{
						PermissionCollection.ViewStrategies
					};
					break;
				default:
					permissions = new List<PermissionCollection>();
					break;
			}

			return permissions;
		}

		public static List<PermissionCollection> GetPermissions(this Role role)
		{
			return ((RoleCollection)role.Id).GetPermissions();
		}

		//public static bool IsUserHasPermission(this User user, PermissionCollection permission)
		//{
		//	return user.Role.GetPermissions().Contains(permission);
		//}
	}
}

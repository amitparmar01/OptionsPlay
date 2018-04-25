using System.Collections.Generic;
using System.Security.Principal;
using OptionsPlay.Model.Enums;

namespace OptionsPlay.Security.Identities
{
	public interface IOptionsPlayIdentity : IIdentity
	{
		RoleCollection Role { get; set; }

		List<PermissionCollection> Permissions { get; set; }

		string RoleName { get; set; }

		long UserId { get; set; }
	}
}
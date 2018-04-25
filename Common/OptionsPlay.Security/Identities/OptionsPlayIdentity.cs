using System.Collections.Generic;
using System.Security.Principal;
using OptionsPlay.Model.Enums;

namespace OptionsPlay.Security.Identities
{
	public abstract class OptionsPlayIdentity : GenericIdentity, IOptionsPlayIdentity
	{
		protected OptionsPlayIdentity(string name)
			: base(name)
		{}

		public RoleCollection Role { get; set; }

		public List<PermissionCollection> Permissions { get; set; }

		public string RoleName { get; set; }

		public long UserId { get; set; }
	}
}

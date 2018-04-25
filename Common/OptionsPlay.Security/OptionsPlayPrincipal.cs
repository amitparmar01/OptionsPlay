using System.Security.Principal;
using OptionsPlay.Model.Enums;
using OptionsPlay.Security.Identities;

namespace OptionsPlay.Security
{
	public class OptionsPlayPrincipal : GenericPrincipal, IOptionsPlayPrincipal
	{
		public OptionsPlayPrincipal(IIdentity identity, RoleCollection role)
			: base(identity, new[] { role.ToString() })
		{
		}

		public IOptionsPlayIdentity OptionsPlayIdentity
		{
			get
			{
				IOptionsPlayIdentity srahTraderIdentity = Identity as IOptionsPlayIdentity;
				return srahTraderIdentity;
			}
		}
	}
}
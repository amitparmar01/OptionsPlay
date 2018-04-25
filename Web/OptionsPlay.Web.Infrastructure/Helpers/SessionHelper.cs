using System.Web;
using OptionsPlay.Security.Identities;

namespace OptionsPlay.Web.Infrastructure.Helpers
{
	public class SessionHelper
	{
		public static IOptionsPlayIdentity GetIdentity()
		{
			IOptionsPlayIdentity optionsPlayIdentity = HttpContext.Current.User.Identity as IOptionsPlayIdentity;
			return optionsPlayIdentity;
		}
	}
}

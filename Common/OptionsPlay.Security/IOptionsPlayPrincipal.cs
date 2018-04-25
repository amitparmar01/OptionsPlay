using OptionsPlay.Security.Identities;

namespace OptionsPlay.Security
{
	public interface IOptionsPlayPrincipal
	{
		IOptionsPlayIdentity OptionsPlayIdentity
		{
			get;
		}
	}
}
using OptionsPlay.Model;

namespace OptionsPlay.BusinessLogic.Common.Authentication
{
	public interface IAuthenticationService
	{
        Role Authenticate(string login, string password, string loginAccountType, bool rememberMe = false);

		Role Authenticate(User user, string password, bool rememberMe = false);

		Role Authenticate(User user, bool rememberMe = false);

		void LogOut();
	}
}

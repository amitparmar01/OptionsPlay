using OptionsPlay.Model.Enums;

namespace OptionsPlay.Web.ViewModels.Authentication
{
	public class AuthenticationModel
	{
		public string UserName { get; set; }

		public string AccountNumber { get; set; }

		public string AccountId { get; set; }

		public RoleCollection Role { get; set; }

		public PermissionCollection[] Permissions { get; set; }
	}
}

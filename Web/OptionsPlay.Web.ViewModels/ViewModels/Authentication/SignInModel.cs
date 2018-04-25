using System.ComponentModel.DataAnnotations;
using OptionsPlay.Resources;

namespace OptionsPlay.Web.ViewModels
{
	public class SignInModel
	{
		private const int MaxStringLength = 255;

		[Required(ErrorMessageResourceType = typeof(ClientErrorMessages), ErrorMessageResourceName = "Model_Required")]
		[StringLength(MaxStringLength, ErrorMessageResourceType = typeof(ClientErrorMessages), ErrorMessageResourceName = "Model_StringLength")]
		public string Login { get; set; }

		[Required(ErrorMessageResourceType = typeof(ClientErrorMessages), ErrorMessageResourceName = "Model_Required")]
		[StringLength(MaxStringLength, ErrorMessageResourceType = typeof(ClientErrorMessages), ErrorMessageResourceName = "Model_StringLength")]
		public string Password { get; set; }

		public bool RememberMe { get; set; }

		public string ReturnUrl { get; set; }

        public string LoginAccountType { get; set; }

		public SignInModel()
		{
			RememberMe = true;
		}
	}
}

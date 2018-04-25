using OptionsPlay.DAL.SZKingdom.Common.Enums;

namespace OptionsPlay.Web.ViewModels.MarketData
{
	public class ChangePasswordViewModel
	{
		public string OldPassword { get; set; }

		public string NewPassword { get; set; }

		public string UseScope { get; set; }
	}
}
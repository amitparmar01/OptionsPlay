using OptionsPlay.DAL.SZKingdom.Common.Entities;
using OptionsPlay.Model;

namespace OptionsPlay.BusinessLogic.Helpers.Convertors
{
	public static class UserLoginInformationConvertor
	{
		public static FCUser ToFCUser(this UserLoginInformation userLoginInformation, FCUser user)
		{
			user = user ?? new FCUser();

			user.CustomerCode = userLoginInformation.CustomerCode;
			user.CustomerAccountCode = userLoginInformation.CustomerAccountCode;
			user.InternalOrganization = userLoginInformation.InternalOrganization;
			user.StockExchange = userLoginInformation.StockExchange.InternalValue;
			user.StockBoard = userLoginInformation.StockBoard.InternalValue;
			user.TradeAccount = userLoginInformation.TradeAccount;
			user.TradeAccountStatus = userLoginInformation.TradeAccountStatus.InternalValue;
			user.TradeUnit = userLoginInformation.TradeUnit;
			user.LoginAccountType = userLoginInformation.LoginAccountType.InternalValue;
			user.AccountId = userLoginInformation.AccountId;
			user.TradeAccountName = userLoginInformation.TradeAccountName;
			user.InternalOrganization = userLoginInformation.InternalOrganization;

			return user;
		}
	}
}

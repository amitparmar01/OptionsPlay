using System;
using System.Collections.Generic;
using OptionsPlay.Common.ServiceResponses;
using OptionsPlay.DAL.SZKingdom.Common.Entities;
using OptionsPlay.DAL.SZKingdom.Common.Entities.Arguments;
using OptionsPlay.DAL.SZKingdom.Common.Enums;

namespace OptionsPlay.DAL.SZKingdom.Common
{
	public interface IAccountManager
	{
		EntityResponse<UserLoginInformation> UserLogin(LoginAccountType accountType, string accountId, string password, PasswordUseScope useScope);

		BaseResponse ChangePassword(string customerCode, PasswordUseScope useScope, string oldPassword, string newPassword);

		EntityResponse<AccountInformation> GetAccountInformation(string customerCode, string customerAccountCode);

		EntityResponse<List<BankCodeInformation>> GetBankCodeInformation(string customerAccountCode, Currency currency);

		EntityResponse<FundTransferSerialNo> TransferFund(TransferFundArguments transferArguments);

		EntityResponse<List<HistoricalFundTransfer>> GetHistoricalTransferFund(string customerAccountCode, string BeginDate,string EndDate, int qryPos, int qryNum);
		
	}
}
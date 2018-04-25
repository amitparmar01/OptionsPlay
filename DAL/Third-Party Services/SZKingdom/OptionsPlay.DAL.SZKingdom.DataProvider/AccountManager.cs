using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using OptionsPlay.Common.ServiceResponses;
using OptionsPlay.DAL.SZKingdom.Common;
using OptionsPlay.DAL.SZKingdom.Common.Entities;
using OptionsPlay.DAL.SZKingdom.Common.Entities.Arguments;
using OptionsPlay.DAL.SZKingdom.Common.Enums;
using OptionsPlay.DAL.SZKingdom.DataProvider.Entities;
using OptionsPlay.Resources;

namespace OptionsPlay.DAL.SZKingdom.DataProvider
{
	public class AccountManager : IAccountManager
	{
		private readonly IMarketDataLibrary _marketDataLibrary;

		public AccountManager(IMarketDataLibrary marketDataLibrary)
		{
			_marketDataLibrary = marketDataLibrary;
		}

		#region Implementation of IAccountManager

		public EntityResponse<UserLoginInformation> UserLogin(LoginAccountType accountType, string accountId, string password, PasswordUseScope useScope)
		{
			List<SZKingdomArgument> arguments = new List<SZKingdomArgument>();

			arguments.Add(SZKingdomArgument.LoginAccountType(accountType));
			arguments.Add(SZKingdomArgument.LoginAccountId(accountId));
			arguments.Add(SZKingdomArgument.PasswordUseScpose(useScope));
			arguments.Add(SZKingdomArgument.AuthenticationData(_marketDataLibrary.EncryptPassword(accountId, password)));
			arguments.Add(SZKingdomArgument.EncryptionKey(accountId));
			arguments.Add(SZKingdomArgument.EncryptionType(EncryptionType.WinEncryption));
			arguments.Add(SZKingdomArgument.AuthenticationType(AuthenticationType.Password)); // password(0) is the only AUTH_TYPE

			EntityResponse<List<UserLoginInformation>> results = 
				_marketDataLibrary.ExecuteCommandList<UserLoginInformation>(SZKingdomRequest.UserLogin, arguments);

			if (results.IsSuccess)
			{
				if (results.Entity.Count >= 1)
				{
					UserLoginInformation result = results.Entity.First(); //.Single(u => u.StockBoard == StockBoard.SHStockOptions);
					return result;
				}
				return EntityResponse<UserLoginInformation>.Error(ErrorCode.AuthenticationIncorrectIdentity, string.Format(ErrorMessages.SZKingdom_Invalid_Account, accountId));
			}
			return EntityResponse<UserLoginInformation>.Error(results);
		}

		public BaseResponse ChangePassword(string customerCode, PasswordUseScope useScope, string oldPassword, string newPassword)
		{
			List<SZKingdomArgument> arguments = new List<SZKingdomArgument>();

			arguments.Add(SZKingdomArgument.UserCode(customerCode));
			arguments.Add(SZKingdomArgument.PasswordUseScpose(useScope));
			arguments.Add(SZKingdomArgument.OldAuthenticationData(_marketDataLibrary.EncryptPassword(customerCode, oldPassword)));
			arguments.Add(SZKingdomArgument.NewAuthenticationData(_marketDataLibrary.EncryptPassword(customerCode, newPassword)));
			arguments.Add(SZKingdomArgument.EncryptionKey(customerCode));
			arguments.Add(SZKingdomArgument.EncryptionType(EncryptionType.WinEncryption));
			arguments.Add(SZKingdomArgument.AuthenticationType(AuthenticationType.Password));

			EntityResponse<DataTable> result = _marketDataLibrary.ExecuteCommand(SZKingdomRequest.ChangePassword, arguments);

			if (result.IsSuccess)
			{
				return BaseResponse.Success();
			}

			return BaseResponse.Error(result.ErrorCode, result.FormattedMessage);
		}

		public EntityResponse<AccountInformation> GetAccountInformation(string customerCode, string customerAccountCode)
		{
			if (string.IsNullOrWhiteSpace(customerCode) && string.IsNullOrWhiteSpace(customerAccountCode))
			{
				return EntityResponse<AccountInformation>.Error(
					ErrorCode.SZKingdomLibraryError, 
					"Customer code and account code cannot be empty at the same time.");
			}

			List<SZKingdomArgument> arguments = new List<SZKingdomArgument>();

			arguments.Add(SZKingdomArgument.CustomerCode(customerCode));
			arguments.Add(SZKingdomArgument.CustomerAccountCode(customerAccountCode));

			return _marketDataLibrary.ExecuteCommandSingleEntity<AccountInformation>(SZKingdomRequest.GetAccountInformation, arguments);
		}

		public EntityResponse<List<BankCodeInformation>> GetBankCodeInformation(string customerAccountCode, Currency currency)
		{

			var arguments = new List<SZKingdomArgument>();

			arguments.Add(SZKingdomArgument.CustomerAccountCode(customerAccountCode));
			arguments.Add(SZKingdomArgument.Currency(currency));

			return _marketDataLibrary.ExecuteCommandList<BankCodeInformation>(SZKingdomRequest.GetBankCode, arguments);
		}

		public EntityResponse<FundTransferSerialNo> TransferFund(TransferFundArguments transferArguments)
		{
			var arguments = new List<SZKingdomArgument>();

			arguments.Add(SZKingdomArgument.CustomerAccountCode(transferArguments.CustomerAccountCode));
			arguments.Add(SZKingdomArgument.Currency(transferArguments.Currency));
			arguments.Add(SZKingdomArgument.FundPassword(_marketDataLibrary.EncryptPassword(transferArguments.CustomerAccountCode, transferArguments.FundPassword)));
			arguments.Add(SZKingdomArgument.BankCode(transferArguments.BankCode));
			arguments.Add(SZKingdomArgument.BankPassword(_marketDataLibrary.EncryptPassword(transferArguments.CustomerAccountCode, transferArguments.BankPassword)));
			arguments.Add(SZKingdomArgument.TransferType(transferArguments.TransferType));
			arguments.Add(SZKingdomArgument.TransferAmount(transferArguments.TransferAmount));
			arguments.Add(SZKingdomArgument.EncryptionKey(transferArguments.CustomerAccountCode));
			arguments.Add(SZKingdomArgument.EncryptionType(EncryptionType.WinEncryption));
			arguments.Add(SZKingdomArgument.OperationRemark(transferArguments.OperationRemark));

			return _marketDataLibrary.ExecuteCommandSingleEntity<FundTransferSerialNo>(SZKingdomRequest.FundTransfer, arguments);
		}
		public EntityResponse<List<HistoricalFundTransfer>> GetHistoricalTransferFund(string customerAccountCode, string BeginDate,string EndDate, int qryPos, int qryNum)
		{
			var arguments = new List<SZKingdomArgument>();

			arguments.Add(SZKingdomArgument.CustomerAccountCode(customerAccountCode));
            arguments.Add(SZKingdomArgument.BeginDate(BeginDate));
            arguments.Add(SZKingdomArgument.EndDate(EndDate));
		    arguments.Add(SZKingdomArgument.QueryNumer(qryNum));
			arguments.Add(SZKingdomArgument.QueryPosition(qryPos));


            EntityResponse<List<HistoricalFundTransfer>> results = _marketDataLibrary.ExecuteCommandList<HistoricalFundTransfer>(SZKingdomRequest.HistoricalFundTransfer, arguments);
            if (results.IsSuccess)
            {
                if (results.Entity.Count >= 1)
                {
                    List<HistoricalFundTransfer> resultList = (List<HistoricalFundTransfer>)results.Entity.OrderBy(u => u.OccurTime); // order by OccurTime to show

                    return resultList;
                }
                return EntityResponse<List<HistoricalFundTransfer>>.Error(ErrorCode.AuthenticationIncorrectIdentity, string.Format(ErrorMessages.InvalidDateRange, BeginDate, EndDate));
            }
            return EntityResponse<List<HistoricalFundTransfer>>.Error(results);
			
		}

		#endregion
	}
}
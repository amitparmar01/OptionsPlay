using System.Collections.Generic;
using OptionsPlay.Common.ServiceResponses;
using OptionsPlay.DAL.SZKingdom.Common;
using OptionsPlay.DAL.SZKingdom.Common.Entities;
using OptionsPlay.DAL.SZKingdom.Common.Entities.Arguments;
using OptionsPlay.DAL.SZKingdom.Common.Enums;
using OptionsPlay.DAL.SZKingdom.DataProvider.Entities;
using OptionsPlay.Resources;

namespace OptionsPlay.DAL.SZKingdom.DataProvider
{
	public class PortfolioManager : IPortfolioManager
	{
		private readonly IMarketDataLibrary _marketDataLibrary;

		public PortfolioManager(IMarketDataLibrary marketDataLibrary)
		{
			_marketDataLibrary = marketDataLibrary;
		}

		#region Implementation of IPortfolioManager

		public EntityResponse<List<FundInformation>> GetFundInformation(string customertCode = null, string customerAccountCode = null, Currency currency = null)
		{
			List<SZKingdomArgument> arguments = new List<SZKingdomArgument>();

			if (string.IsNullOrWhiteSpace(customertCode) && string.IsNullOrWhiteSpace(customerAccountCode))
			{
				return EntityResponse<List<FundInformation>>.Error(ErrorCode.SZKingdomLibraryError, 
																	string.Format(ErrorMessages.SZKingdom_EmptyAccountIds));
			}

			arguments.Add(SZKingdomArgument.CustomerCode(customertCode));
			arguments.Add(SZKingdomArgument.CustomerAccountCode(customerAccountCode));
			arguments.Add(SZKingdomArgument.Currency(currency));
			arguments.Add(SZKingdomArgument.ValueFlag("15"));

			EntityResponse<List<FundInformation>> result =
				_marketDataLibrary.ExecuteCommandList<FundInformation>(SZKingdomRequest.FundInformation, arguments);

			return result;
		}

		public EntityResponse<List<OptionableStockPositionInformation>> GetOptionalStockPositions(string customerCode, string customerAccountCode,
																								string tradeAccount, string tradeUnit = null,
																								string queryPosition = null)
		{
			List<SZKingdomArgument> arguments = new List<SZKingdomArgument>();

			if (string.IsNullOrWhiteSpace(customerCode) && string.IsNullOrWhiteSpace(customerAccountCode))
			{
				return EntityResponse<List<OptionableStockPositionInformation>>.Error(ErrorCode.SZKingdomLibraryError, "Customer code and Account code cannot be empty at the same time.");
			}

			arguments.Add(SZKingdomArgument.CustomerCode(customerCode));
			arguments.Add(SZKingdomArgument.CustomerAccountCode(customerAccountCode));
			arguments.Add(SZKingdomArgument.TradeAccount(tradeAccount));
			arguments.Add(SZKingdomArgument.TradeUnit(tradeUnit));
			arguments.Add(SZKingdomArgument.QueryPosition(queryPosition));

			EntityResponse<List<OptionableStockPositionInformation>> result =
				_marketDataLibrary.ExecuteCommandList<OptionableStockPositionInformation>(SZKingdomRequest.OptionableStockPositions, arguments);

			return result;
		}

		public EntityResponse<List<OptionPositionInformation>> GetOptionPositions(OptionPositionsArguments optionPositionsArguments)
		{
			List<SZKingdomArgument> arguments = new List<SZKingdomArgument>();

			if (optionPositionsArguments.CustomerCode == null && optionPositionsArguments.CustomerAccountCode == null)
			{
				return EntityResponse<List<OptionPositionInformation>>.Error(
					ErrorCode.SZKingdomLibraryError, 
					ErrorMessages.SZKingdom_CustAndAccCodeNull);
			}

			arguments.Add(SZKingdomArgument.CustomerCode(optionPositionsArguments.CustomerCode));
			arguments.Add(SZKingdomArgument.CustomerAccountCode(optionPositionsArguments.CustomerAccountCode));
			arguments.Add(SZKingdomArgument.TradeAccount(optionPositionsArguments.TradeAccount));
			arguments.Add(SZKingdomArgument.OptionNumber(optionPositionsArguments.OptionNumber));
			arguments.Add(SZKingdomArgument.TradeUnit(optionPositionsArguments.TradeUnit));
			arguments.Add(SZKingdomArgument.OptionSide(optionPositionsArguments.OptionSide));
			arguments.Add(SZKingdomArgument.OptionCoveredFlag(optionPositionsArguments.OptionCoveredFlag));
			arguments.Add(SZKingdomArgument.QueryPosition(optionPositionsArguments.QueryPosition));

			EntityResponse<List<OptionPositionInformation>> result =
				_marketDataLibrary.ExecuteCommandList<OptionPositionInformation>(SZKingdomRequest.OptionPositions, arguments);

			return result;
		}

		public EntityResponse<RiskLevelInformation> GetAccountRiskLevelInformation(string customerAccountCode, Currency currency)
		{
			List<SZKingdomArgument> arguments = new List<SZKingdomArgument>();

			if (string.IsNullOrWhiteSpace(customerAccountCode))
			{
				return EntityResponse<RiskLevelInformation>.Error(
					ErrorCode.SZKingdomLibraryError,
					ErrorMessages.SZKingdom_CustomerCodeEmpty);
			}

			arguments.Add(SZKingdomArgument.CustomerAccountCode(customerAccountCode));
			arguments.Add(SZKingdomArgument.Currency(currency));

			EntityResponse<RiskLevelInformation> result =
				_marketDataLibrary.ExecuteCommandSingleEntity<RiskLevelInformation>(SZKingdomRequest.AccountRiskLevel, arguments);

			return result;
		}

		public EntityResponse<List<CustomerAutomaticOptionExercisingInformation>> GetAutomaticOptionExercisingParameters(string customerCode, string customerAccountCode, string tradeSector, string tradeAccount, List<string> optionNumbers)
		{
			if (string.IsNullOrWhiteSpace(customerAccountCode))
			{
				return EntityResponse<List<CustomerAutomaticOptionExercisingInformation>>.Error(
					ErrorCode.SZKingdomLibraryError,
					ErrorMessages.SZKingdom_CustomerCodeEmpty);
			}
			List<CustomerAutomaticOptionExercisingInformation> result = new List<CustomerAutomaticOptionExercisingInformation>();
			foreach (string optionNumber in optionNumbers)
			{
				var arguments = new List<SZKingdomArgument>();
				arguments.Add(SZKingdomArgument.CustomerAccountCode(customerAccountCode));

				arguments.Add(SZKingdomArgument.OptionNumber(optionNumber));

				EntityResponse<CustomerAutomaticOptionExercisingInformation> item =
					_marketDataLibrary.ExecuteCommandSingleEntity<CustomerAutomaticOptionExercisingInformation>(SZKingdomRequest.AutomaticOptionExercisingParameters, arguments);
				if (item.Entity == null)
				{
					item = EntityResponse<CustomerAutomaticOptionExercisingInformation>.Success(
						new CustomerAutomaticOptionExercisingInformation()
						{
							ContractNumber = optionNumber,
							ExercisingQuantity = 0
						});

				}

				result.Add(item);
			}

			return result;
		}


		public EntityResponse SetAutomaticOptionExercisingParameters(CustomerAutomaticOptionExercisingInformation information)
		{
			if (string.IsNullOrWhiteSpace(information.CustomerAccountCode))
			{
				return EntityResponse<List<CustomerAutomaticOptionExercisingInformation>>.Error(
					ErrorCode.SZKingdomLibraryError,
					ErrorMessages.SZKingdom_CustomerCodeEmpty);
			}

			List<SZKingdomArgument> arguments = new List<SZKingdomArgument>();
			arguments.Add(SZKingdomArgument.CustomerCode(information.CustomerCode));
			arguments.Add(SZKingdomArgument.CustomerAccountCode(information.CustomerAccountCode));
			arguments.Add(SZKingdomArgument.StockBoard(information.TradeSector));
			arguments.Add(SZKingdomArgument.TradeAccount(information.TradingAccount));

			arguments.Add(SZKingdomArgument.ExercisingQuantity(information.ExercisingQuantity));
			arguments.Add(SZKingdomArgument.AutomaticExerciseControl(information.AutomaticExcerciseControl));
			arguments.Add(SZKingdomArgument.ExercisingStrategyType(information.ExercisingStrategyType));
			arguments.Add(SZKingdomArgument.ExercisingStrategyValue(information.ExercisingStrategyValue));
			arguments.Add(SZKingdomArgument.OptionNumber(information.ContractNumber));
			arguments.Add(SZKingdomArgument.Remark(information.Remark));

			EntityResponse result =
				_marketDataLibrary.ExecuteCommand(SZKingdomRequest.SetAutomaticOptionExercisingParameters, arguments);

			return result;
		}

		#endregion
	}
}
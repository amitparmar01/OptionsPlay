using System.Collections.Generic;
using OptionsPlay.Common.ServiceResponses;
using OptionsPlay.DAL.SZKingdom.Common.Entities;
using OptionsPlay.DAL.SZKingdom.Common.Entities.Arguments;
using OptionsPlay.DAL.SZKingdom.Common.Enums;

namespace OptionsPlay.DAL.SZKingdom.Common
{
	public interface IPortfolioManager
	{
		EntityResponse<List<FundInformation>> GetFundInformation(string customertCode = null, string customerAccountCode = null, Currency currency = null);

		EntityResponse<List<OptionableStockPositionInformation>> GetOptionalStockPositions(string customerCode, string customerAccountCode,
																							string tradeAccount, string tradeUnit = null, string queryPosition = null);

		EntityResponse<List<OptionPositionInformation>> GetOptionPositions(OptionPositionsArguments arguments);

		EntityResponse<RiskLevelInformation> GetAccountRiskLevelInformation(string customerAccountCode, Currency currency);

		EntityResponse<List<CustomerAutomaticOptionExercisingInformation>> GetAutomaticOptionExercisingParameters(string customerCode,
																												string customerAccountCode, string tradeUnit, string tradeAccount, List<string> optionNumbers);

		EntityResponse SetAutomaticOptionExercisingParameters(CustomerAutomaticOptionExercisingInformation information);
	}
}
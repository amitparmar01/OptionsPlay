using System.Collections.Generic;
using OptionsPlay.Common.ServiceResponses;
using OptionsPlay.DAL.SZKingdom.Common.Entities;
using OptionsPlay.DAL.SZKingdom.Common.Enums;

namespace OptionsPlay.DAL.SZKingdom.Common
{
	public interface IMarketDataProvider
	{
		/// <summary>
		/// NOTE: Cached.
		/// </summary>
		EntityResponse<List<SecurityInformation>> GetSecuritiesInformation(StockBoard stockBoard = null, string securityCode = null);

		// todo: for test purpose, delete after RTQ is confirmed working.
		EntityResponse<QuotationInformation> GetQuotationInformation(string securityCode);

		/// <summary>
		/// NOTE: Cached.
		/// </summary>
		EntityResponse<List<OptionBasicInformation>> GetOptionBasicInformation(string underlyingCode = null, string optionNumber = null);

		//EntityResponse<OptionQuotationInformation> GetOptionQuotationInformation(string optionNo);

		//EntityResponse<List<OptionQuotationInformation>> GetOptionQuotationInformation();
	}
}

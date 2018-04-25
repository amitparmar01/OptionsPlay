using System.Collections.Generic;
using OptionsPlay.BusinessLogic.Common.Entities;
using OptionsPlay.Common.ServiceResponses;
using OptionsPlay.DAL.SZKingdom.Common.Entities;
using OptionsPlay.Model;
using System;

namespace OptionsPlay.BusinessLogic.Common
{
	public interface IMarketDataService
	{
        Option GetOptionTradingInformation(string optionNum);

		/// <summary>
		/// Gets option chains 
		/// </summary>
		/// <param name="underlying"></param>
		/// <returns></returns>
		EntityResponse<OptionChain> GetOptionChain(string underlying);

		/// <summary>
		/// Gets quotation information for single option
		/// </summary>
		/// <param name="optionNo">Number(code) of the option to get information for</param>
		/// <returns></returns>
		EntityResponse<OptionQuotation> GetOptionQuotation(string optionNo);

		/// <summary>
		/// Gets basic information for single option
		/// </summary>
		/// <param name="optionNo">Number(code) of the option to get information for</param>
		/// <returns></returns>
		EntityResponse<OptionBasicInformation> GetOptionInformation(string optionNo);

		/// <summary>
		/// Gets 5-level quotation information for single option
		/// </summary>
		/// <param name="optionNo">Number(code) of the option to get information for</param>
		/// <returns></returns>
		EntityResponse<OptionQuoteInfo> GetOption5LevelQuotation(string optionNo);

		/// <summary>
		/// Gets quotation for single equity
		/// </summary>
		/// <param name="securityCode"></param>
		/// <returns>Security basic information and quotation.</returns>
		EntityResponse<SecurityQuotation> GetSecurityQuotation(string securityCode);

		/// <summary>
		/// Gets quotations for a list of securities
		/// </summary>
		/// <param name="securityCodes"></param>
		/// <returns>Security basic information and quotation.</returns>
		List<EntityResponse<SecurityQuotation>> GetSecurityQuotations(List<string> securityCodes);

		/// <summary>
		/// Retrieves information for securities which has options
		/// </summary>
		/// <returns></returns>
		List<SecurityInformation> GetOptionableSecurities();

		/// <summary>
		/// Get list of companies filtered by company code and chinese name
		/// </summary>
		/// <param name="filter"></param>
		/// <returns>List companies</returns>
		EntityResponse<List<SecurityInformation>> GetCompanies(string filter);

		/// <summary>
		/// Get list of option basic information filtered by option number
		/// </summary>
		/// <param name="filter"></param>
		/// <returns>List of option basic information</returns>
		EntityResponse<List<OptionBasicInformation>> GetOptions(string filter);

		/// <summary>
		/// Gets list of historical quotes ordered by <see cref="HistoricalQuote.Date"/> ascending.
		/// </summary>
		EntityResponse<List<HistoricalQuote>> GetHistoricalQuotes(string symbol, string timeframe = null);

		/// <summary>
		/// Gets list of current stock quotes
		/// </summary>
		EntityResponse<List<StockQuoteInfo>> GetStockQuotes();

		/// <summary>
		/// Gets stock quote
		/// </summary>
		EntityResponse<StockQuoteInfo> GetStockQuote(string securityCode);

		/// <summary>
		/// Gets list of current option quotes
		/// </summary>
		EntityResponse<List<OptionQuoteInfo>> GetOptionQuotes();
		
		/// <summary>
		/// Gets list of current option quotes of options
		/// </summary>
		EntityResponse<List<OptionQuotation>> GetOptionQuotes(List<string> optionNumbers);

        /// <summary>
        /// Gets list of current option quotes of options between BeginTime and EndTime
        /// </summary>
        EntityResponse<List<OptionQuoteInfo>> GetOptionQuotesInfoPerMinute(string optionNumber, DateTime BeginTime,DateTime EndTime);

        /// <summary>
        /// Gets list of current stock quotes of stock betwwen BeginTime and EndTime
        /// </summary>
      
        EntityResponse<List<StockQuoteInfo>> GetStockQuotesInfoPerMinute(string SecurityCode, DateTime BeginTime, DateTime EndTime);
	}
}

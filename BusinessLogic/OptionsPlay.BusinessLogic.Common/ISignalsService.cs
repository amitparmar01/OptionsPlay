using System;
using System.Collections.Generic;
using OptionsPlay.Model;

namespace OptionsPlay.BusinessLogic.Common
{
	public interface ISignalsService
	{
		/// <summary>
		/// Saves historical quotes in DB
		/// </summary>
		void SaveHistoricalQuotes(List<HistoricalQuote> historicalQuotes);

		/// <summary>
		/// Gets historical quotes by <paramref name="symbol"/> and <paramref name="startDate"/>
		/// </summary>
		List<HistoricalQuote> GetHistoricalQuotesByStartDate(string symbol, DateTime startDate);

		/// <summary>
		/// Save or Replace <paramref name="signals"/> in DB
		/// </summary>
		void SaveOrReplaceSignals(List<Signal> signals);

		/// <summary>
		/// Gets latest signals by <paramref name="signalNames"/> for the <paramref name="symbol"/> from DB
		/// </summary>
		List<Signal> GetSignals(string symbol, IEnumerable<string> signalNames);

		/// <summary>
		/// Gets latest signals by <paramref name="signalName"/> for <paramref name="symbols"/> from DB
		/// </summary>
		List<Signal> GetLatestSignals(List<string> symbols, string signalName);
	}
}
using System;
using System.Collections.Generic;
using System.Linq;
using OptionsPlay.BusinessLogic.Common;
using OptionsPlay.DAL.Interfaces;
using OptionsPlay.Model;

namespace OptionsPlay.BusinessLogic
{
	public class SignalsService : BaseService, ISignalsService
	{

		public SignalsService(IOptionsPlayUow uow)
			: base(uow)
		{
		}

		public void SaveHistoricalQuotes(List<HistoricalQuote> historicalQuotes)
		{
			Uow.HistoricalQuotes.Add(historicalQuotes);
		}

		public List<HistoricalQuote> GetHistoricalQuotesByStartDate(string symbol, DateTime startDate)
		{
			List<HistoricalQuote> historicalQuotes = Uow.HistoricalQuotes
				.Get(symbol, startDate)
				.ToList();

			return historicalQuotes;
		}

		public void SaveOrReplaceSignals(List<Signal> signals)
		{
		//	string signalName = signals.Select(signal => signal.Name).Distinct().Single();

		//	List<CachedSignal> cachedSignals = AutoMapper.Mapper.Map<List<Signal>, List<CachedSignal>>(signals).ToList();
		//	Uow.CachedSignalsRepository.AddOrUpdateByName(cachedSignals, signalName);

		//	signals.GroupBy(signal => signal.Date)
		//		.ToList()
		//		.ForEach(group => Uow.Signals.AddOrUpdateByName(group.ToList(), signalName, group.Key));
		}

		public List<Signal> GetSignals(string symbol, IEnumerable<string> signalNames)
		{
			//List<CachedSignal> cachedSignals = Uow.CachedSignalsRepository
			//	.Get(symbol, signalNames)
			//	.ToList();

			//List<Signal> signals = _mapper.Map<CachedSignal, Signal>(cachedSignals).ToList();

			return new List<Signal>();
		}

		public List<Signal> GetLatestSignals(List<string> symbols, string signalName)
		{
			//List<CachedSignal> cachedSignals = Uow.CachedSignalsRepository
			//	.Get(symbols, signalName)
			//	.ToList();

			//List<Signal> signals = _mapper.Map<CachedSignal, Signal>(cachedSignals).ToList();

			return new List<Signal>();
		}

	}
}
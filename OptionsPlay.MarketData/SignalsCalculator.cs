using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using OptionsPlay.MarketData.Common;
using OptionsPlay.MarketData.Indicators;
using OptionsPlay.MarketData.Indicators.Helpers;
using OptionsPlay.Model;

namespace OptionsPlay.MarketData
{
	public class SignalsCalculator : ISignalsCalculator
	{
		#region Implementation of ISignalsCalculator

        public IEnumerable<Signal> CalculateSignals(HistoricalData data, List<IIndicator> indicators, int? last)
		{
			ConcurrentBag<List<Signal>> signalsBag = new ConcurrentBag<List<Signal>>();

			IEnumerable<ICalculatableIndicator> nonCalculatedIndicators =
				indicators.Where(ind => !(ind is CalculatedIndicator)).OfType<ICalculatableIndicator>().ToList();

			Parallel.ForEach(nonCalculatedIndicators, indicator =>
			{
				List<Signal> signalsForIndicator = indicator.GetSignals(data, null, last);
				signalsBag.Add(signalsForIndicator);
			});

			// Would be better to include dependencies in upper loop, but here are 2 issues:
			// 1. We need to store signals from them separately in another collection, otherwise they might be included in output.
			// 2. We must not take in account 'last' parameter for dependencies. 
			List<CalculatedIndicator> calculatedIndicators = indicators.OfType<CalculatedIndicator>().ToList();

			if (calculatedIndicators.Count > 0)
			{
				ConcurrentBag<List<Signal>> signaldependenciesBag = new ConcurrentBag<List<Signal>>();
				// Assuming calculated indicators do not depend on any another calculated indicator.
				List<ICalculatableIndicator> indicatorDependencies =
					calculatedIndicators.SelectMany(i => i.CalculationDependencies.GetIndicators()).OfType<ICalculatableIndicator>().ToList();

				Parallel.ForEach(indicatorDependencies, indicator =>
				{
					List<Signal> deps = indicator.GetSignals(data);
					signaldependenciesBag.Add(deps);
				});

				List<Signal> signalDependencies = signaldependenciesBag.SelectMany(list => list).ToList();
				Parallel.ForEach(calculatedIndicators, indicator =>
				{
					List<Signal> signalsForIndicator = ((ICalculatableIndicator)indicator).GetSignals(data, signalDependencies, last);
					signalsBag.Add(signalsForIndicator);
				});
			}

			return signalsBag.SelectMany(list => list).ToList();
		}

		#endregion
	}
}
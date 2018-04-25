using System;
using System.Collections.Generic;
using System.Linq;
using OptionsPlay.Common.Utilities;
using OptionsPlay.MarketData.Common;
using OptionsPlay.Model;

namespace OptionsPlay.MarketData.Indicators.Helpers
{
	public static class SignalsExtension
	{
		/// <summary>
		/// Returns signals (sorted by date descending) by offset from latest one. 
		/// </summary>
		public static List<Signal> ForIndicatorAndOffset(this IList<Signal> signals, IIndicator indicator, int[] offsets)
		{
			List<Signal> result = new List<Signal>();

			List<Signal> filteredSignals = signals.ForIndicator(indicator).OrderByDescending(item => item.Date).Take((-offsets.Min()) + 1).ToList();

			foreach (int offset in offsets)
			{
				if (filteredSignals.Count > (-offset))
				{
					result.Add(filteredSignals[-offset]);
				}
				else
				{
					return null;
				}
			}

			result.SortDescending(s => s.Date);
			return result;
		}

		public static Signal LatestForIndicator(this IEnumerable<Signal> signals, IIndicator indicator)
		{
			Signal result = signals.ForIndicator(indicator).OrderByDescending(s => s.Date).FirstOrDefault();
			return result;
		}

		public static Signal PreviousForIndicator(this IEnumerable<Signal> signals, IIndicator indicator, int offset)
		{
			Signal result = signals.ForIndicator(indicator).OrderByDescending(s => s.Date).Skip(offset).FirstOrDefault();
			return result;
		}

		public static IEnumerable<Signal> ForIndicator(this IEnumerable<Signal> signals, IIndicator indicator)
		{
			IEnumerable<Signal> result = signals.Where(s => s.Name.Equals(indicator.Name));
			return result;
		}

		public static IEnumerable<Signal> ForIndicators(this IEnumerable<Signal> signals, IEnumerable<IIndicator> indicators)
		{
			IEnumerable<Signal> result = signals.Where(s => indicators.Any(i => i.Name.Equals(s.Name)));
			return result;
		}

		public static IEnumerable<SignalInterpretation> ForIndicator(this IEnumerable<SignalInterpretation> interpretations, IIndicator indicator)
		{
			IEnumerable<SignalInterpretation> result = interpretations.Where(s => Equals(s.Indicator, indicator));
			return result;
		}

		public static IEnumerable<SignalInterpretation> ForIndicators(this IEnumerable<SignalInterpretation> interpretations, IEnumerable<IIndicator> indicators)
		{
			IEnumerable<SignalInterpretation> result = interpretations.Where(s => indicators.Any(i => i.Equals(s.Indicator)));
			return result;
		}

		public static IEnumerable<SignalInterpretation> ForIndicator(this IEnumerable<SignalInterpretation> interpretations, Type indicatortype)
		{
			IEnumerable<SignalInterpretation> result = interpretations.Where(s => s.Indicator.GetType() == indicatortype);
			return result;
		}

		public static IEnumerable<SignalInterpretation> ForIndicators(this IEnumerable<SignalInterpretation> interpretations, IEnumerable<Type> indicatorTypes)
		{
			IEnumerable<SignalInterpretation> result = interpretations.Where(s => indicatorTypes.Contains(s.Indicator.GetType()));
			return result;
		}

		/// <summary>
		/// Faster version of signals.GroupBy(s => s.Date).ToDictionary(g => g.Key, g => g.ToList());
		/// </summary>
		public static Dictionary<DateTime, List<Signal>> ConvertToDictionaryByDate(this IEnumerable<Signal> signals)
		{
			Dictionary<DateTime, List<Signal>> result = new Dictionary<DateTime, List<Signal>>();

			foreach (Signal signal in signals)
			{
				List<Signal> signalsByDate;
				DateTime date = signal.Date;

				if (!result.TryGetValue(date, out signalsByDate))
				{
					signalsByDate = new List<Signal>();
					result.Add(date, signalsByDate);
				}

				signalsByDate.Add(signal);
			}

			return result;
		}
	}
}
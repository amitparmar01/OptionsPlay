using System;
using System.Collections.Generic;
using System.Linq;
using OptionsPlay.MarketData.Common;
using OptionsPlay.MarketData.Indicators.Factories;
using OptionsPlay.MarketData.Indicators.Helpers;
using OptionsPlay.Model;

namespace OptionsPlay.MarketData.Indicators
{
	public class TechincalRankScoreFactory : BaseIndicatorFactory<TechnicalRankScore>
	{
		#region Overrides of BaseIndicatorFactory<TechnicalRankScore>

		public override List<IIndicator> Create(Dictionary<string, string> properties = null)
		{
			List<IIndicator> indicators = new List<IIndicator> { new TechnicalRankScore() };
			return indicators;
		}

		#endregion
	}

	public class TechnicalRankScore : CalculatedIndicator
	{
		private readonly SmaVol _smaVol20 = new SmaVol(20);
		private readonly Sma _sma50 = new Sma(50);
		private readonly Sma _sma200 = new Sma(200);
		private readonly Roc _roc20 = new Roc(20);
		private readonly Roc _roc125 = new Roc(125);
		private readonly Rsi _rsi20 = new Rsi(20);
		private readonly Ppo _ppo = new Ppo(12, 26);

		private readonly DependencyScope _calculationDependencies;
		private readonly string _name;

		public TechnicalRankScore()
		{
			_name = string.Format("{0}", GetType().Name);

			List<IIndicator> dependencies = new List<IIndicator>
				{
					_smaVol20,
					_sma50,
					_sma200,
					_roc20,
					_roc125,
					_rsi20,
					_ppo
				};
			_calculationDependencies = new DependencyScope(new Dictionary<int, List<IIndicator>>
			{
				{ -3, dependencies }
			});
		}

		public override string Name
		{
			get
			{
				return _name;
			}
		}

		public override string InterpretationName
		{
			get
			{
				return Name;
			}
		}

		public override DependencyScope CalculationDependencies
		{
			get
			{
				return _calculationDependencies;
			}
		}

		private double? Calculate(List<Signal> signals, double price)
		{
			Signal smaVol20 = signals.LatestForIndicator(_smaVol20);
			Signal sma50 = signals.LatestForIndicator(_sma50);
			Signal sma200 = signals.LatestForIndicator(_sma200);
			Signal roc20 = signals.LatestForIndicator(_roc20);
			Signal roc125 = signals.LatestForIndicator(_roc125);
			Signal rsi20 = signals.LatestForIndicator(_rsi20);
			Signal ppoLast = signals.LatestForIndicator(_ppo);
			Signal ppo3DaysBefore = signals.PreviousForIndicator(_ppo, -3);

			if (smaVol20 == null || sma50 == null || sma200 == null || roc20 == null ||
				roc125 == null || rsi20 == null || ppoLast == null || ppo3DaysBefore == null)
			{
				return null;
			}

			// sma200 == 0 ||  sma50 == 0
			if (Math.Abs(sma200.Value) < 1e-5 || Math.Abs(sma50.Value) < 1e-5)
			{
				return null;
			}

			double? score = (0.3) * ((price - sma200.Value) / sma200.Value)
					+ (0.3) * roc125.Value
					+ (0.15) * ((price - sma50.Value) / sma50.Value)
					+ (0.15) * (roc20.Value)
					+ (0.05) * ((ppoLast.Value - ppo3DaysBefore.Value) / 3)
					+ (0.05) * (rsi20.Value);
			return score;
		}

		protected override List<Signal> GetSignals(HistoricalData historicalData, List<Signal> signals = null, int? last = null)
		{
			if (signals == null)
			{
				throw new InvalidOperationException("Dependencies should be specified");
			}

			List<Signal> resultSignals = new List<Signal>();

			List<string> signalDependencies = CalculationDependencies.GetIndicators().Select(i => i.Name).ToList();

			signals = signals.Where(s => signalDependencies.Contains(s.Name)).ToList();
			Dictionary<DateTime, List<Signal>> signalsByDates = signals.ConvertToDictionaryByDate();
			List<DateTime> allDates = signalsByDates.Keys.OrderBy(d => d).ToList();

			for (int i = allDates.Count - 1; i >= 3; i--)
			{
				DateTime date = allDates[i];
				DateTime prevDate = allDates[i - 3];

				List<Signal> signalsForCalculation;
				List<Signal> signalsForCalculation3DaysBefore;
				if (signalsByDates.TryGetValue(date, out signalsForCalculation) && signalsByDates.TryGetValue(prevDate, out signalsForCalculation3DaysBefore))
				{
					List<Signal> mergedSignals = signalsForCalculation.Union(signalsForCalculation3DaysBefore).ToList();
					double? outData = Calculate(mergedSignals, historicalData.Close[i]);
					if (outData.HasValue)
					{
						resultSignals.Add(GetSignal(historicalData.SecurityCode, outData.Value, date));
					}
				}
				if (last.HasValue && resultSignals.Count >= last.Value)
				{
					break;
				}
			}

			return resultSignals;
		}

		protected override List<Signal> GetSignalsBase(HistoricalData historicalData, List<Signal> dependencySignals = null)
		{
			List<Signal> signalsBase = GetSignals(historicalData, dependencySignals);
			return signalsBase;
		}

		protected override SignalInterpretation MakeInterpretation(List<Signal> signals, StockQuoteInfo quote = null)
		{
			return null;
		}
	}
}
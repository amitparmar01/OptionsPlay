using System.Collections.Generic;
using OptionsPlay.Common.Utilities;
using OptionsPlay.MarketData.Common;
using OptionsPlay.MarketData.Indicators.Factories;
using OptionsPlay.MarketData.Indicators.Helpers;
using OptionsPlay.Model;
using TicTacTec.TA.Library;

namespace OptionsPlay.MarketData.Indicators
{
	public class MacdFactory : BaseIndicatorFactory<Macd>
	{
		private readonly string _fastPeriodPropName = ReflectionExtensions.GetPropertyName<Macd>(i => i.FastPeriod);
		private readonly string _slowPeriodPropName = ReflectionExtensions.GetPropertyName<Macd>(i => i.SlowPeriod);
		private readonly string _signalPeriodPropName = ReflectionExtensions.GetPropertyName<Macd>(i => i.SignalPeriod);

		#region Implementation of IIndicatorFactory

		public override List<IIndicator> Create(Dictionary<string, string> properties = null)
		{
			int fastPeriod = GetPropertyValue(properties, _fastPeriodPropName) ?? IndicatorsConfiguration.FastPeriodDefaultValue;
			int slowPeriod = GetPropertyValue(properties, _slowPeriodPropName) ?? IndicatorsConfiguration.SlowPeriodDefaultValue;
			int signalPeriod = GetPropertyValue(properties, _signalPeriodPropName) ?? IndicatorsConfiguration.SignalPeriodDefaultValue;

			List<IIndicator> indicators = new List<IIndicator> { new Macd(fastPeriod, slowPeriod, signalPeriod) };
			return indicators;
		}

		#endregion
	}

	public class Macd : Indicator
	{
		private readonly string _name;

		public Macd(int fastPeriod, int slowPeriod, int signalPeriod)
		{
			FastPeriod = fastPeriod;
			SignalPeriod = signalPeriod;
			SlowPeriod = slowPeriod;
			_name = string.Format("{0}; FastPeriod = {1}, SlowPeriod = {2}, SignalPeriod = {3}", GetType().Name, FastPeriod, SlowPeriod, SignalPeriod);
		}

		#region Properties

		public int FastPeriod { get; private set; }

		public int SlowPeriod { get; private set; }

		public int SignalPeriod { get; private set; }

		#endregion

		protected override List<Signal> GetSignalsBase(HistoricalData historicalData, List<Signal> dependencySignals = null)
		{
			List<Signal> signals = new List<Signal>();

			int count = historicalData.Count;

			int endIdx = count - 1;

			int outBegIdx;
			int outNbElement;

			double[] outMacd = new double[count];
			double[] outMacdSignal = new double[count];
			double[] outMacdHist = new double[count];

			Core.RetCode retCode = Core.Macd(StartIdx, endIdx, historicalData.Close, FastPeriod, SlowPeriod, SignalPeriod,
				out outBegIdx, out outNbElement, outMacd, outMacdSignal, outMacdHist);
			if (retCode != Core.RetCode.Success)
			{
				LogError(retCode);
			}
			else
			{
				signals = GetSignals(historicalData.SecurityCode, outMacdHist, historicalData.Date, outBegIdx, outNbElement);
			}

			return signals;
		}

		public override string Name
		{
			get { return _name; }
		}

		protected override DependencyScope InterpretationDependencies
		{
			get
			{
				Dictionary<int, List<IIndicator>> deps = new Dictionary<int, List<IIndicator>>
				{
					{ 0, new List<IIndicator> { this } },
					{ -3, new List<IIndicator> { this } }
				};

				DependencyScope result = new DependencyScope(deps) { IsQuoteNeeded = false };
				return result;
			}
		}

		protected override SignalInterpretation MakeInterpretation(List<Signal> signals, StockQuoteInfo quote = null)
		{
			SignalInterpretation result = null;

			if (signals != null)
			{
				List<Signal> macds = signals.ForIndicatorAndOffset(this, new[] { 0, -3 });

				if (macds != null && macds.Count == 2)
				{
					Signal macd0 = macds[0];
					Signal macd3 = macds[1];

					double macd0D = macd0.Value;
					double macd3D = macd3.Value;

					result = new SignalInterpretation(this);

					if (macd0D > 0)
					{
						result.Interpretation = (macd0D - macd3D) < 0
							? SignalInterpretationValue.BullishTurningBearish
							: SignalInterpretationValue.Bullish;
					}
					else
					{
						result.Interpretation = (macd0D - macd3D) >= 0
							? SignalInterpretationValue.BearishTurningBullish
							: SignalInterpretationValue.Bearish;
					}
				}
			}

			return result;
		}
	}
}
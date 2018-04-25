using System.Collections.Generic;
using OptionsPlay.Common.Utilities;
using OptionsPlay.MarketData.Common;
using OptionsPlay.MarketData.Indicators.Factories;
using OptionsPlay.MarketData.Indicators.Helpers;
using OptionsPlay.Model;
using TicTacTec.TA.Library;

namespace OptionsPlay.MarketData.Indicators
{
	public class PpoFactory : BaseIndicatorFactory<Ppo>
	{
		private readonly string _fastPeriodPropName = ReflectionExtensions.GetPropertyName<Ppo>(i => i.FastPeriod);
		private readonly string _slowPeriodPropName = ReflectionExtensions.GetPropertyName<Ppo>(i => i.SlowPeriod);

		#region Implementation of IIndicatorFactory

		public override List<IIndicator> Create(Dictionary<string, string> properties = null)
		{
			int fastPeriod = GetPropertyValue(properties, _fastPeriodPropName) ?? IndicatorsConfiguration.FastPeriodDefaultValue;
			int slowPeriod = GetPropertyValue(properties, _slowPeriodPropName) ?? IndicatorsConfiguration.SlowPeriodDefaultValue;

			List<IIndicator> indicators = new List<IIndicator> { new Ppo(fastPeriod, slowPeriod) };
			return indicators;
		}

		#endregion
	}

	public class Ppo : Indicator
	{
		private readonly string _name;

		public Ppo(int fastPeriodDefaultValue, int slowPeriodDefaultValue)
		{
			FastPeriod = fastPeriodDefaultValue;
			SlowPeriod = slowPeriodDefaultValue;

			_name = string.Format("{0}; FastPeriod = {1}, SlowPeriod = {2}", GetType().Name, FastPeriod, SlowPeriod);
		}

		#region Properties

		public int FastPeriod { get; private set; }

		public int SlowPeriod { get; private set; }

		#endregion

		protected override List<Signal> GetSignalsBase(HistoricalData historicalData, List<Signal> dependencySignals = null)
		{
			List<Signal> signals = new List<Signal>();

            if (historicalData == null)
            {
                return signals;
            }

			int count = historicalData.Count;

			int endIdx = count - 1;

			int outBegIdx;
			int outNbElement;

			double[] outPpo = new double[count];

			Core.RetCode retCode = Core.Ppo(StartIdx, endIdx, historicalData.Close, FastPeriod, SlowPeriod, Core.MAType.Ema, out outBegIdx, out outNbElement, outPpo);
			if (retCode != Core.RetCode.Success)
			{
				LogError(retCode);
			}
			else
			{
				signals = GetSignals(historicalData.SecurityCode, outPpo, historicalData.Date, outBegIdx, outNbElement);
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
				List<Signal> pros = signals.ForIndicatorAndOffset(this, new[] { 0, -3 });

				if (pros != null && pros.Count == 2)
				{
					Signal pro0 = pros[0];
					Signal pro3 = pros[1];

					double pro0D = pro0.Value;
					double pro3D = pro3.Value;

					result = new SignalInterpretation(this);

					if (pro0D > 0)
					{
						result.Interpretation = (pro0D - pro3D) < 0
													? SignalInterpretationValue.TurningBearish
													: SignalInterpretationValue.Bullish;
					}
					else
					{
						result.Interpretation = (pro0D - pro3D) >= 0
													? SignalInterpretationValue.BearishTurningBullish
													: SignalInterpretationValue.Bearish;
					}
				}
			}

			return result;
		}
	}
}
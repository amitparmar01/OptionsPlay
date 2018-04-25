using System.Collections.Generic;
using OptionsPlay.Common.Utilities;
using OptionsPlay.MarketData.Common;
using OptionsPlay.MarketData.Indicators.Factories;
using OptionsPlay.MarketData.Indicators.Helpers;
using OptionsPlay.Model;
using TicTacTec.TA.Library;

namespace OptionsPlay.MarketData.Indicators
{
	public class StochFactory : BaseIndicatorFactory<Stoch>
	{
		private readonly string _optInFastKPeriodPropName = ReflectionExtensions.GetPropertyName<Stoch>(i => i.OptInFastKPeriod);
		private readonly string _optInSlowDPeriodPropName = ReflectionExtensions.GetPropertyName<Stoch>(i => i.OptInSlowDPeriod);
		private readonly string _optInSlowKPeriodPropName = ReflectionExtensions.GetPropertyName<Stoch>(i => i.OptInSlowKPeriod);

		#region Implementation of IIndicatorFactory

		public override List<IIndicator> Create(Dictionary<string, string> properties = null)
		{
			int fastKPeriod = GetPropertyValue(properties, _optInFastKPeriodPropName) ?? IndicatorsConfiguration.OptInFastKPeriodDefault;
			int slowDPeriod = GetPropertyValue(properties, _optInSlowDPeriodPropName) ?? IndicatorsConfiguration.OptInSlowDPeriodDefault;
			int slowKPeriod = GetPropertyValue(properties, _optInSlowKPeriodPropName) ?? IndicatorsConfiguration.OptInSlowKPeriodDefault;

			List<IIndicator> indicators = new List<IIndicator> { new Stoch(fastKPeriod, slowKPeriod, slowDPeriod) };
			return indicators;
		}

		public static bool IsDefault(int optInFastKPeriod, int optInSlowKPeriod, int optInSlowDPeriod)
		{
			bool result = optInFastKPeriod == IndicatorsConfiguration.OptInFastKPeriodDefault
						&& optInSlowKPeriod == IndicatorsConfiguration.OptInSlowKPeriodDefault
						&& optInSlowDPeriod == IndicatorsConfiguration.OptInSlowDPeriodDefault;
			return result;
		}

		#endregion
	}

	public class Stoch : Indicator
	{
		private readonly string _name;

		public Stoch()
			: this(IndicatorsConfiguration.OptInFastKPeriodDefault,
					IndicatorsConfiguration.OptInSlowKPeriodDefault,
					IndicatorsConfiguration.OptInSlowDPeriodDefault)
		{
		}

		public Stoch(int optInFastKPeriod, int optInSlowKPeriod, int optInSlowDPeriod)
		{
			OptInFastKPeriod = optInFastKPeriod;
			OptInSlowKPeriod = optInSlowKPeriod;
			OptInSlowDPeriod = optInSlowDPeriod;

			_name = string.Format("{0}; OptInFastKPeriod = {1}, OptInSlowKPeriod = {2}, OptInSlowDPeriod = {3}",
								GetType().Name, OptInFastKPeriod, OptInSlowKPeriod, OptInSlowDPeriod);
		}

		public int OptInFastKPeriod { get; set; }

		public int OptInSlowKPeriod { get; set; }

		public int OptInSlowDPeriod { get; set; }

		protected override List<Signal> GetSignalsBase(HistoricalData historicalData, List<Signal> dependencySignals = null)
		{
			List<Signal> resultSignals = new List<Signal>();

			int count = historicalData.Count;
			int endIdx = count - 1;
			int outBegIdx;
			int outNbElement;

			double[] outFastK = new double[count];
			double[] outFastD = new double[count];

			Core.RetCode retCode = Core.StochF(StartIdx, endIdx, historicalData.High, historicalData.Low, historicalData.Close, OptInFastKPeriod,
				OptInSlowKPeriod, Core.MAType.Sma, out outBegIdx, out outNbElement, outFastK, outFastD);

			if (retCode != Core.RetCode.Success)
			{
				LogError(retCode);
			}
			else
			{
				resultSignals = GetSignals(historicalData.SecurityCode, outFastK, historicalData.Date, outBegIdx, outNbElement);
			}
			return resultSignals;
		}

		public override string Name
		{
			get { return _name; }
		}

		protected override SignalInterpretation MakeInterpretation(List<Signal> signals, StockQuoteInfo quote = null)
		{
			SignalInterpretation result = null;

			if (signals != null)
			{
				Signal stoch = signals.LatestForIndicator(this);

				if (stoch != null)
				{
					double stochD = stoch.Value;

					result = new SignalInterpretation(this);

					if (stochD <= 20)
					{
						result.Interpretation = SignalInterpretationValue.Oversold;
					}
					else if (stochD > 20 && stochD <= 35)
					{
						result.Interpretation = SignalInterpretationValue.Bearish;
					}
					else if (stochD > 35 && stochD < 50)
					{
						result.Interpretation = SignalInterpretationValue.MildlyBearish;
					}
					else if (stochD >= 50 && stochD < 65)
					{
						result.Interpretation = SignalInterpretationValue.MildlyBullish;
					}
					else if (stochD >= 65 && stochD < 80)
					{
						result.Interpretation = SignalInterpretationValue.Bullish;
					}
					else
					{
						result.Interpretation = SignalInterpretationValue.Overbought;
					}
				}
			}

			return result;
		}
	}
}
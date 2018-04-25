using System;
using System.Collections.Generic;
using OptionsPlay.Common.Utilities;
using OptionsPlay.MarketData.Common;
using OptionsPlay.MarketData.Indicators.Factories;
using OptionsPlay.Model;
using TicTacTec.TA.Library;

namespace OptionsPlay.MarketData.Indicators
{
	public class BBandsFactory : PeriodIndicatorFactory<BBands>
	{
		private readonly string _typePropertyName = ReflectionExtensions.GetPropertyName<BBands>(i => i.Type);

		public override List<IIndicator> Create(Dictionary<string, string> properties = null)
		{
			List<IIndicator> result = new List<IIndicator>();

			BBands.BandType type = 0;
			if (properties != null && properties.ContainsKey(_typePropertyName))
			{
				Enum.TryParse(properties[_typePropertyName], out type);
			}

			foreach (int avgPeriod in GetAvgPeriods(properties))
			{
				if (type != 0)
				{
					result.Add(new BBands(avgPeriod, type));
				}
				else
				{
					result.Add(new BBands(avgPeriod, BBands.BandType.Upper));
					result.Add(new BBands(avgPeriod, BBands.BandType.Lower));
				}
			}

			return result;
		}
	}

	public class BBands : PeriodIndicator
	{
		private readonly BandType _type;

		public enum BandType
		{
			Upper, Lower, Middle
		}

		private const double OptInNbDevUp = 2;
		private const double OptInNbDevDn = 2;

		public BBands(int avgPeriod, BandType type)
			: base(avgPeriod, type.ToString())
		{
			_type = type;
		}

		public BandType Type { get { return _type; } }

		protected override List<Signal> GetSignalsBase(HistoricalData historicalData, List<Signal> dependencySignals = null)
		{
			int count = historicalData.Count;

			int endIdx = count - 1;

			int outBegIdx;
			int outNbElement;

			double[] outUpperBand = new double[count];
			double[] outMiddleBand = new double[count];
			double[] outLowerBand = new double[count];

			Core.RetCode retCode = Core.Bbands(StartIdx, endIdx, historicalData.Close, AvgPeriod, OptInNbDevUp, OptInNbDevDn,
												Core.MAType.Sma, out outBegIdx, out outNbElement, outUpperBand, outMiddleBand, outLowerBand);

			if (retCode != Core.RetCode.Success)
			{
				LogError(retCode);
			}
			else
			{
				switch (_type)
				{
					case BandType.Upper:
						List<Signal> upperSignals = GetSignals(historicalData.SecurityCode, outUpperBand, historicalData.Date, outBegIdx, outNbElement);
						return upperSignals;
					case BandType.Lower:
						List<Signal> lowerSignals = GetSignals(historicalData.SecurityCode, outLowerBand, historicalData.Date, outBegIdx, outNbElement);
						return lowerSignals;
					case BandType.Middle:
						List<Signal> middleSignals = GetSignals(historicalData.SecurityCode, outMiddleBand, historicalData.Date, outBegIdx, outNbElement);
						return middleSignals;
					default:
						throw new ArgumentOutOfRangeException();
				}

			}

			return new List<Signal>();
		}

		protected override SignalInterpretation MakeInterpretation(List<Signal> signals, StockQuoteInfo quote = null)
		{
			return null;
		}
	}
}
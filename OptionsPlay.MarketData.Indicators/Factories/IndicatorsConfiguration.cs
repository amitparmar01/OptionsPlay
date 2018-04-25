using System;
using System.Collections.Generic;

namespace OptionsPlay.MarketData.Indicators.Factories
{
	/// <summary>
	/// Can be totally moved to some configuration setting
	/// </summary>
	public static class IndicatorsConfiguration
	{
		private const int DefaultAvgPeriod = 20;
		private static readonly List<int> DefaultAvgPeriods = new List<int> { DefaultAvgPeriod };

		private static readonly Dictionary<Type, List<int>> AvgPeriods = new Dictionary<Type, List<int>>();

		static IndicatorsConfiguration()
		{
			AvgPeriods.Add(typeof(Cci), new List<int> { DefaultAvgPeriod, 5, 50 });
			AvgPeriods.Add(typeof(BBands), new List<int> { DefaultAvgPeriod, 50 });
			AvgPeriods.Add(typeof(Ema), new List<int> { DefaultAvgPeriod, 50, 100, 200 });
			AvgPeriods.Add(typeof(Roc), new List<int> { DefaultAvgPeriod, 125 });
			AvgPeriods.Add(typeof(Rsi), new List<int> { DefaultAvgPeriod, 5, 50 });
			AvgPeriods.Add(typeof(Sma), new List<int> { DefaultAvgPeriod, 50, 100, 200 });
			AvgPeriods.Add(typeof(Wma), new List<int> { DefaultAvgPeriod, 50, 100, 200 });
			AvgPeriods.Add(typeof(RiskScore), new List<int> { 64 });
		}

		public static bool IsDefault(PeriodIndicator i)
		{
			bool isDefault = GetDefaultAvgPeriods(i.GetType()).Contains(i.AvgPeriod);
			return isDefault;
		}

		public static List<int> GetDefaultAvgPeriods(Type periodIndicatortype)
		{
			List<int> res;
			if (AvgPeriods.TryGetValue(periodIndicatortype, out res))
			{
				return res;
			}
			return DefaultAvgPeriods;
		}

		#region Other Indicators Configuration

		public const int FastPeriodDefaultValue = 12;
		public const int SlowPeriodDefaultValue = 26;
		public const int SignalPeriodDefaultValue = 9;

		public const int OptInFastKPeriodDefault = 20;
		public const int OptInSlowKPeriodDefault = 20;
		public const int OptInSlowDPeriodDefault = 3;

		#endregion
	}
}
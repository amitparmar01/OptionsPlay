using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using OptionsPlay.MarketData.Common;

namespace OptionsPlay.MarketData.Indicators.Helpers
{
	public static class IndicatorHelper
	{
		private static readonly Type CalculatedIndicatorType = typeof(CalculatedIndicator);

		private static readonly Type CommonIndicatorType = typeof(Indicator);

		private static readonly Type PeriodIndicatorType = typeof(PeriodIndicator);

		private static readonly Type TechnicalRankIndicatorType = typeof(TechnicalRank);

		private static readonly Type RiskIndicatorType = typeof(Risk);

		private static readonly IEnumerable<Type> AllTypes = Assembly
			.GetAssembly(CalculatedIndicatorType)
			.GetTypes().Where(m => m.IsClass
				&& !m.IsAbstract);

		/// <summary>
		/// All types derived from 'PeriodIndicator' class
		/// </summary>
		public static readonly List<Type> PeriodIndicatorTypes = AllTypes
			.Where(m => m.IsSubclassOf(PeriodIndicatorType))
			.ToList();

		/// <summary>
		/// All types derived from 'Indicator' but not 'PeriodIndicator' class
		/// </summary>
		public static readonly List<Type> NonPeriodIndicatorTypes = AllTypes
			.Where(m => m.IsSubclassOf(CommonIndicatorType)
						&& !m.IsSubclassOf(PeriodIndicatorType)
						|| m == TechnicalRankIndicatorType || m == RiskIndicatorType)
			.ToList();

		/// <summary>
		/// All types derived from 'Indicator' class
		/// </summary>
		public static readonly List<Type> IndicatorTypes = PeriodIndicatorTypes
			.Concat(NonPeriodIndicatorTypes)
			.ToList();

		public static bool IsPeriodIndicator(this IIndicator indicator)
		{
			bool result = PeriodIndicatorTypes.Contains(indicator.GetType());
			return result;
		}

		public static bool IsNonPeriodIndicator(this IIndicator indicator)
		{
			bool result = NonPeriodIndicatorTypes.Contains(indicator.GetType());
			return result;
		}
	}
}
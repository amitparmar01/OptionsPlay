using System;
using System.Collections.Generic;
using OptionsPlay.Common.Utilities;
using OptionsPlay.MarketData.Common;

namespace OptionsPlay.MarketData.Indicators.Factories
{
	public class PeriodIndicatorFactory : IIndicatorFactory
	{
		private readonly string _avgPropName = ReflectionExtensions.GetPropertyName<PeriodIndicator>(i => i.AvgPeriod);

		public PeriodIndicatorFactory(Type indicatorType)
		{
			if (!typeof(PeriodIndicator).IsAssignableFrom(indicatorType))
			{
				throw new InvalidOperationException("PeriodIndicator type expected");
			}

			IndicatorType = indicatorType;
		}

		#region Implementation of IIndicatorFactory

		public virtual List<IIndicator> Create(Dictionary<string, string> properties = null)
		{
			List<IIndicator> result = new List<IIndicator>();

			foreach (int avgPeriod in GetAvgPeriods(properties))
			{
				IIndicator i = (IIndicator)Activator.CreateInstance(IndicatorType, avgPeriod);
				result.Add(i);
			}

			return result;
		}

		public Type IndicatorType { get; private set; }

		#endregion

		protected List<int> GetAvgPeriods(Dictionary<string, string> properties)
		{
			List<int> avgPeriods;
			if (properties == null)
			{
				avgPeriods = IndicatorsConfiguration.GetDefaultAvgPeriods(IndicatorType);
				return avgPeriods;
			}

			string strVal;
			int value;
			if (properties.TryGetValue(_avgPropName, out strVal) && int.TryParse(strVal, out value))
			{
				avgPeriods = new List<int> { value };
				return avgPeriods;
			}

			avgPeriods = IndicatorsConfiguration.GetDefaultAvgPeriods(IndicatorType);
			return avgPeriods;
		}
	}

	public class PeriodIndicatorFactory<T> : PeriodIndicatorFactory
	{
		public PeriodIndicatorFactory()
			: base(typeof(T))
		{
		}
	}
}
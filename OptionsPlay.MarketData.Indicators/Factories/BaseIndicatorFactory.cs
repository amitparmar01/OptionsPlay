using System;
using System.Collections.Generic;
using OptionsPlay.MarketData.Common;

namespace OptionsPlay.MarketData.Indicators.Factories
{
	public abstract class BaseIndicatorFactory<T> : IIndicatorFactory
	{
		#region Implementation of IIndicatorFactory

		protected BaseIndicatorFactory()
		{
			if (!typeof(IIndicator).IsAssignableFrom(typeof(T)))
			{
				throw new InvalidOperationException("Indicator type should be specified");
			}
		}

		public abstract List<IIndicator> Create(Dictionary<string, string> properties = null);

		public Type IndicatorType { get { return typeof(T); } }

		#endregion

		protected static int? GetPropertyValue(Dictionary<string, string> properties, string name)
		{
			if (properties == null)
			{
				return null;
			}

			int val;
			if (properties.ContainsKey(name) && int.TryParse(properties[name], out val))
			{
				return val;
			}

			return null;
		}
	}
}
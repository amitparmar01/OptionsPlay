using System;
using System.Collections.Generic;
using OptionsPlay.MarketData.Common;
using OptionsPlay.MarketData.Indicators.Factories;

namespace OptionsPlay.MarketData.Indicators
{
	public class RiskFactory : BaseIndicatorFactory<Risk>
	{
		public override List<IIndicator> Create(Dictionary<string, string> properties = null)
		{
			List<IIndicator> indicators = new List<IIndicator> { new Risk() };
			return indicators;
		}
	}

	public class Risk : IIndicator
	{
		private readonly string _name = GetName();

		public string Name { get { return _name; } }

		public bool FromDatabase { get { return true; } }

		public string InterpretationName
		{
			get { throw new InvalidOperationException(); }
		}

		public static string GetName()
		{
			return typeof(Risk).Name;
		}
	}
}
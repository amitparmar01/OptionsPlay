using System;
using System.Collections.Generic;
using OptionsPlay.MarketData.Common;
using OptionsPlay.MarketData.Indicators.Factories;

namespace OptionsPlay.MarketData.Indicators
{
	public class TechincalRankFactory : BaseIndicatorFactory<TechnicalRank>
	{
		public override List<IIndicator> Create(Dictionary<string, string> properties = null)
		{
			List<IIndicator> indicators = new List<IIndicator> { new TechnicalRank() };
			return indicators;
		}
	}

	public class TechnicalRank : IIndicator
	{
		private readonly string _name = GetName();

		public string Name
		{
			get
			{
				return _name;
			}
		}

		public bool FromDatabase
		{
			get
			{
				return true;
			}
		}

		public string InterpretationName
		{
			get
			{
				throw new InvalidOperationException();
			}
		}

		public static string GetName()
		{
			string name = typeof(TechnicalRank).Name;
			return name;
		}
	}
}
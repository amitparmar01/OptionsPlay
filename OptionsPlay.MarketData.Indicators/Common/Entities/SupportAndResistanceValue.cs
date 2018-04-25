using System;

namespace OptionsPlay.MarketData.Common
{
	public enum SupportAndResistanceValueType
	{
		MajorSupport,
		MajorResistance,
		GapSupport,
		GapResistance
	}

	public class SupportAndResistanceValue
	{
		public SupportAndResistanceValue(double value, DateTime date, SupportAndResistanceValueType type)
		{
			Value = value;
			Date = date;
			Type = type;
		}

		public double Value { get; private set; }

		public SupportAndResistanceValueType Type { get; private set; }

		public DateTime Date { get; private set; }
	}
}
using System;
using System.Collections.Generic;
using System.Linq;

namespace OptionsPlay.MarketData.Common
{
	public class SupportAndResistance
	{
		// to keep bakward compatibility with other code.
		private readonly Lazy<List<double>> _majorResistanceLazy;
		private readonly Lazy<List<double>> _majorSupportLazy;
		private readonly Lazy<List<double>> _gapResistanceLazy;
		private readonly Lazy<List<double>> _gapSupportLazy;

		public SupportAndResistance(List<SupportAndResistanceValue> values)
		{
			Values = values;
			_majorResistanceLazy = new Lazy<List<double>>(() => ValuesOfType(SupportAndResistanceValueType.MajorResistance));
			_majorSupportLazy = new Lazy<List<double>>(() => ValuesOfType(SupportAndResistanceValueType.MajorSupport));
			_gapResistanceLazy = new Lazy<List<double>>(() => ValuesOfType(SupportAndResistanceValueType.GapResistance));
			_gapSupportLazy = new Lazy<List<double>>(() => ValuesOfType(SupportAndResistanceValueType.GapSupport));
		}

		public List<SupportAndResistanceValue> Values { get; private set; }

		public List<double> MajorSupport
		{
			get
			{
				return _majorSupportLazy.Value;
			}
		}

		public List<double> MajorResistance
		{
			get
			{
				return _majorResistanceLazy.Value;
			}
		}

		public List<double> GapSupport
		{
			get
			{
				return _gapSupportLazy.Value;
			}
		}

		public List<double> GapResistance
		{
			get
			{
				return _gapResistanceLazy.Value;
			}
		}

		private List<double> ValuesOfType(SupportAndResistanceValueType type)
		{
			IEnumerable<double> values = Values.Where(value => value.Type == type).Select(v => v.Value);
			List<double> resuList;

			switch (type)
			{
				case SupportAndResistanceValueType.MajorSupport:
				case SupportAndResistanceValueType.GapSupport:
					resuList = values.OrderByDescending(d => d).ToList();
					break;
				case SupportAndResistanceValueType.MajorResistance:
				case SupportAndResistanceValueType.GapResistance:
					resuList = values.OrderBy(d => d).ToList();
					break;
				default:
					throw new ArgumentOutOfRangeException("type");
			}

			return resuList;
		}
	}
}
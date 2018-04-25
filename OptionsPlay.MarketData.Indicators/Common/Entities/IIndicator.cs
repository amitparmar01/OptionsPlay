using System;
using System.Collections.Generic;

namespace OptionsPlay.MarketData.Common
{
	public interface IIndicator
	{
		string Name { get; }

		string InterpretationName { get; }

		bool FromDatabase { get; }
	}

	/// <summary>
	/// Instanitates set of indicators of specified type with given properties
	/// Should be implemented for indicators, which takes additional paramenters in constructor.
	/// </summary>
	public interface IIndicatorFactory
	{
		/// <summary>
		/// Creates set of default indicators or indicator with specified properties (<paramref name="properties"/>).
		/// </summary>
		/// <param name="properties">
		/// Holds property values for instanitated indicator. PropertyName => PropertyValue
		/// Can be null. Default indicators should be created in this case.
		/// </param>
		List<IIndicator> Create(Dictionary<string, string> properties = null);

		/// <summary>
		/// Type of indicators which is instantiated by this factory
		/// </summary>
		Type IndicatorType { get; }
	}
}
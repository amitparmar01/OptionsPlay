using OptionsPlay.MarketData.Common;

namespace OptionsPlay.MarketData.Indicators
{
	/// <summary>
	/// Indicator which 
	/// </summary>
	public abstract class CalculatedIndicator : Indicator
	{
		#region Public/Internal members

		public abstract DependencyScope CalculationDependencies { get; }

		#endregion Public/Internal members
	}
}
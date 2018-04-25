using System.Linq;
using MathNet.Numerics;
using OptionsPlay.MarketData.Common;

namespace OptionsPlay.BusinessLogic.MarketDataProcessing.Helpers
{
	public static class SupportAndResistanceHelpers
	{
		/// <summary>
		/// Gets closest support level
		/// </summary>
		public static double GetClosestSupport(this SupportAndResistance data, double price)
		{
			double support = data.MajorSupport.Where(d => d < price).OrderBy(d => price - d).First();
			return support;
		}

		/// <summary>
		/// Gets closest resistance level
		/// </summary>
		public static double GetClosestResistance(this SupportAndResistance data, double price)
		{
			double resistance = data.MajorResistance.Where(d => d > price).OrderBy(d => d - price).First();
			return resistance;
		}

		public static bool GreaterOrEqual(this double var1, double var2, double error = 1e-5)
		{
			return var1 >= var2 || var1.AlmostEqualRelative(var2, error);
		}
	}
}
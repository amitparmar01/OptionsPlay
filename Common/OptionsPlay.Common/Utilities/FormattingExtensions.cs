using System;
using OptionsPlay.Common.Options;

namespace OptionsPlay.Common.Utilities
{
	public static class FormattingExtensions
	{
		/// <summary>
		/// Number format for double values which is used while converting doubles into strings
		/// (e.g. 123456.78 → 123,456.78)
		/// </summary>
		private const string DoubleFormat = "N2";

		/// <summary>
		/// Rounds double value
		/// </summary>
		public static double CustomRound(this double value)
		{
			double result = Math.Round(value, AppConfigManager.NumberOfFractionalDigits);
			return result;
		}

		/// <summary>
		/// Rounds double value
		/// </summary>
		public static double? CustomRound(this double? value)
		{
			if (!value.HasValue)
			{
				return null;
			}
			double result = value.Value.CustomRound();
			return result;
		}

		/// <summary>
		/// Converts double values into the string with appropriate format for UI
		/// </summary>
		public static string ToFormattedString(this double value)
		{
			string result = value.ToString(DoubleFormat);
			return result;
		}

		/// <summary>
		/// Converts double value to currency string (15.29 → $15.29)
		/// </summary>
		public static string ToCurrency(this double value)
		{
			string result = string.Format("{0:C}", value);
			return result;
		}
	}
}
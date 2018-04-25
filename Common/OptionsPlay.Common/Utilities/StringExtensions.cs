using System;
using System.Text.RegularExpressions;

namespace OptionsPlay.Common.Utilities
{
	public static class StringExtensions
	{
		/// <summary>
		/// Splits string representation of <paramref name="value"/> by capital letters (e.g. "InitialString" → "Initial String")
		/// </summary>
		public static string SplitCamelCase<T>(this T value)
		{
			Regex regex = new Regex(@"
				(?<=[A-Z])(?=[A-Z][a-z]) |
				(?<=[^A-Z])(?=[A-Z]) |
				(?<=[A-Za-z])(?=[^A-Za-z])", RegexOptions.IgnorePatternWhitespace);

			string resultString = regex.Replace(value.ToString(), " ");
			return resultString;
		}

		public static bool IgnoreCaseEquals(this string first, string second)
		{
			bool result = string.Equals(first, second, StringComparison.InvariantCultureIgnoreCase);
			return result;
		}
		public static string UppercaseFirstLetter(this string source)
		{
			if (string.IsNullOrWhiteSpace(source))
			{
				return source;
			}

			string result = Char.ToUpperInvariant(source[0]) + source.Substring(1);
			return result;
		}
		public static string LowercaseFirstLetter(this string source)
		{
			if (string.IsNullOrWhiteSpace(source))
			{
				return source;
			}

			string result = Char.ToLowerInvariant(source[0]) + source.Substring(1);
			return result;
		}

	}
}

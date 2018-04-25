using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using OptionsPlay.Common.ServiceResponses;

namespace OptionsPlay.Common.Utilities
{
	public static class EnumerableExtensions
	{

		public static IEnumerable<T> FindStraddledItems<T>(this IEnumerable<T> items, Predicate<T> matchFilling)
		{
			if (items == null)
			{
				throw new ArgumentNullException("items");
			}
			if (matchFilling == null)
			{
				throw new ArgumentNullException("matchFilling");
			}

			IEnumerable<T> straddledItems = FindStraddledItemsImplementation(items, matchFilling);
			return straddledItems;
		}

		private static IEnumerable<T> FindStraddledItemsImplementation<T>(IEnumerable<T> items, Predicate<T> matchFilling)
		{
			using (IEnumerator<T> iter = items.GetEnumerator())
			{
				T minusOne = default(T);
				T minusTwo = default(T);
				T minusThree = default(T);
				while (iter.MoveNext())
				{
					if (matchFilling(iter.Current))
					{
						// found the one we want
						yield return minusThree;
						yield return minusTwo;
						yield return minusOne;
						yield return iter.Current;
						yield return iter.MoveNext()
							? iter.Current
							: default(T);
						yield return iter.MoveNext()
							? iter.Current
							: default(T);
						yield return iter.MoveNext()
							? iter.Current
							: default(T);
						yield break;
					}
					minusThree = minusTwo;
					minusTwo = minusOne;
					minusOne = iter.Current;
				}
			}
			// If we get here nothing has been found so return three default values
			yield return default(T); // Previous
			yield return default(T); // Current
			yield return default(T); // Next
			yield return default(T); // Previous
			yield return default(T); // Current
			yield return default(T); // Next
			yield return default(T); // Next
		}

		public static IEnumerable<double> Range(double min, double max, double step)
		{
			double i;
			for (i = min; i <= max; i += step)
			{
				yield return i;
			}
		}

		/// <summary>
		/// Identifies whether the value is null or empty. 
		/// </summary>
		public static bool IsNullOrEmpty<T>(this IEnumerable<T> value)
		{
			if (value == null)
			{
				return true;
			}

			ICollection collection = value as ICollection;
			if (collection != null)
			{
				return collection.Count == 0;
			}

			bool result = !value.Any();
			return result;
		}

		/// <summary>
		/// Wraps this object instance into an <see cref="IEnumerable{T}"/>;
		/// consisting of a single item.
		/// </summary>
		/// <typeparam name="T"> Type of the wrapped object.</typeparam>
		/// <param name="item"> The object to wrap.</param>
		/// <returns>
		/// An <see cref="IEnumerable{T}"/> consisting of a single item.
		/// </returns>
		public static IEnumerable<T> Yield<T>(this T item)
		{
			yield return item;
		}

		public static IEnumerable<T> WhereSuccess<T>(this IEnumerable<IEntityResponse<T>> items)
		{
			IEnumerable<T> result = items.Where(r => r.ErrorCode == ErrorCode.None).Select(r => r.Entity);
			return result;
		}

		public static List<List<T>> SplitByNumberOfElements<T>(this IEnumerable<T> enumerable, int numberOfElementsInGroup)
		{
			List<T> list = enumerable as List<T>;
			if (list != null && list.Count <= numberOfElementsInGroup)
			{
				return new List<List<T>> { list };
			}

			List<List<T>> result =
				enumerable.Select((e, i) => new { GroupNumber = i / numberOfElementsInGroup, Element = e })
					.GroupBy(g => g.GroupNumber, g => g.Element)
					.Select(g => g.ToList())
					.ToList();
			return result;
		}
	}
}
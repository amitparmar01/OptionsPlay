using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;

namespace OptionsPlay.Common.Utilities
{
	public static class CollectionExtensions
	{
		public static bool In<T>(this T t, params T[] c)
		{
			return c.Contains(t);
		}
		
		/// <summary>
		/// Generates series of points from <paramref name="min"/> to <paramref name="max"/> using step = <paramref name="step"/> 
		/// </summary>
		public static IEnumerable<double> Range(double min, double max, double step)
		{
			double i;
			for (i = min; i <= max; i += step)
			{
				yield return i;
			}
		}
		public static Tuple<int, T> FirstAndIndex<T>(this IReadOnlyList<T> collection, Predicate<T> selectorPredicate)
		{
			for (int i = 0; i < collection.Count; ++i)
			{
				T el = collection[i];
				if (selectorPredicate(el))
				{
					return new Tuple<int, T>(i, el);
				}
			}
			return new Tuple<int, T>(-1, default(T));
		}
		public static Tuple<int, T> FirstAndIndex<T>(this IList<T> collection, Predicate<T> selectorPredicate)
		{
			for (int i = 0; i < collection.Count; ++i)
			{
				T el = collection[i];
				if (selectorPredicate(el))
				{
					return new Tuple<int, T>(i, el);
				}
			}
			return new Tuple<int, T>(-1, default(T));
		}

		public static Tuple<int, T> LastAndIndex<T>(this IReadOnlyList<T> collection, Predicate<T> selectorPredicate)
		{
			for (int i = collection.Count - 1; i >= 0; --i)
			{
				T el = collection[i];
				if (selectorPredicate(el))
				{
					return new Tuple<int, T>(i, el);
				}
			}
			return new Tuple<int, T>(-1, default(T));
		}
		public static Tuple<int, T> LastAndIndex<T>(this IList<T> collection, Predicate<T> selectorPredicate)
		{
			for (int i = collection.Count - 1; i >= 0; --i)
			{
				T el = collection[i];
				if (selectorPredicate(el))
				{
					return new Tuple<int, T>(i, el);
				}
			}
			return new Tuple<int, T>(-1, default(T));
		}

		public static Tuple<int, T> MinimumAndIndex<T>(this IList<T> collection) where T : IComparable
		{
			return MinimumAndIndex(collection, arg => arg);
		}

		public static Tuple<int, T> MinimumAndIndex<T>(this IList<T> collection, Func<T, T> selectFunction)
			where T : IComparable
		{
			int index = 0;
			T localMin = selectFunction(collection[0]);
			for (int i = 1; i < collection.Count; i++)
			{
				T pointSample = selectFunction(collection[i]);
				if (pointSample.CompareTo(localMin) < 0)
				{
					localMin = pointSample;
					index = i;
				}
			}
			return new Tuple<int, T>(index, localMin);
		}

		public static Tuple<int, T> MaximumAndIndex<T>(this IList<T> collection) where T : IComparable
		{
			return MaximumAndIndex(collection, arg => arg);
		}

		public static Tuple<int, T> MaximumAndIndex<T>(this IList<T> collection, Func<T, T> selectFunction)
			where T : IComparable
		{
			int index = 0;
			T localMax = selectFunction(collection[0]);
			for (int i = 1; i < collection.Count; i++)
			{
				T pointSample = selectFunction(collection[i]);
				if (pointSample.CompareTo(localMax) > 0)
				{
					localMax = pointSample;
					index = i;
				}
			}
			return new Tuple<int, T>(index, localMax);
		}

		public static double Average(this IList<double> list, int startIndex, int count)
		{
			if (list == null)
			{
				throw new ArgumentNullException("list");
			}
			if (startIndex < 0)
			{
				throw new ArgumentOutOfRangeException("startIndex");
			}

			int lastIndex = startIndex + count - 1;
			if (lastIndex >= list.Count)
			{
				throw new ArgumentOutOfRangeException("count");
			}

			double average = .0;
			for (int i = startIndex; i <= lastIndex; i++)
			{
				average += list[i];
			}
			average /= count;
			return average;
		}

		/// <summary>
		/// Gets element from <paramref name="list"/> by <paramref name="index"/>. 
		/// </summary>
		/// <returns>If <paramref name="index"/> is less than 0 returns first element from <paramref name="list"/>. 
		/// If <paramref name="index"/> is greater than allowed index for this <paramref name="list"/> returns the latest element from <paramref name="list"/></returns>
		public static T GetByIndexWithCheck<T>(this IList<T> list, int index)
		{
			if (index < 0)
			{
				index = 0;
			}
			else if (index >= list.Count)
			{
				index = list.Count - 1;
			}

			T result = list[index];
			return result;
		}

		/// <summary>
		/// Gets the closest to <paramref name="searchTo"/> value from collection <paramref name="list"/>
		/// </summary>
		/// <returns>0 if <paramref name="list"/> is empty</returns>
		public static double GetClosest(this IList<double> list, double searchTo)
		{
			Tuple<double, int> result = GetClosestAndIndex(list, searchTo);
			return result.Item1;
		}

		/// <summary>
		/// Gets the closest to <paramref name="searchTo"/> value and its index from collection <paramref name="list"/>
		/// </summary>
		/// <returns> '0, -1' if <paramref name="list"/> is empty</returns>
		public static Tuple<double, int> GetClosestAndIndex(this IList<double> list, double searchTo)
		{
			if (list == null)
			{
				throw new ArgumentNullException("list");
			}
			if (list.Count == 0)
			{
				return Tuple.Create(default(double), -1);
			}

			double currentNearest = list[0];
			int currentNearestIndex = 0;
			double currentDifference = Math.Abs(currentNearest - searchTo);

			for (int i = 1; i < list.Count; i++)
			{
				double current = list[i];
				Double diff = Math.Abs(current - searchTo);
				if (diff < currentDifference)
				{
					currentDifference = diff;
					currentNearestIndex = i;
					currentNearest = current;
				}
			}

			return Tuple.Create(currentNearest, currentNearestIndex);
		}

		public static void Sort<T, T2>(this List<T> list, Func<T, T2> selector)
		{
			list.Sort((x, y) => Comparer<T2>.Default.Compare(selector(x), selector(y)));
		}

		public static void SortDescending<T>(this List<T> list)
		{
			list.Sort((x, y) => Comparer<T>.Default.Compare(y, x));
		}

		public static void SortDescending<T, T2>(this List<T> list, Func<T, T2> selector)
		{
			list.Sort((x, y) => Comparer<T2>.Default.Compare(selector(y), selector(x)));
		}
	}
}

using System;
using System.Collections.Generic;
using System.Linq;
using OptionsPlay.MarketData.Common;

namespace OptionsPlay.MarketData.Indicators.Helpers
{
	public static class DependenciesHelper
	{
		public static List<IIndicator> GetIndicators(this DependencyScope scope)
		{
			HashSet<IIndicator> result = new HashSet<IIndicator>();

			// equivalent to scope.Dependencies.Values.SelectMany(s => s);
			foreach (KeyValuePair<int, List<IIndicator>> dateDependency in scope.Dependencies)
			{
				foreach (IIndicator indicator in dateDependency.Value)
				{
					result.Add(indicator);
				}
			}

			return result.ToList();
		}

		public static List<DateTime> GetDates(this DependencyScope scope, DateTime date)
		{
			List<DateTime> result = scope.Dependencies.Select(item => date.AddDays(item.Key)).ToList();

			return result;
		}

		public static int GetCountToTakeLast(this DependencyScope scope)
		{
			int result = 1 - scope.Dependencies.Keys.Min();
			return result;
		}

		public static DependencyScope GetDependencies(this List<DependencyScope> dependencyScopes)
		{
			DependencyScope result = new DependencyScope(new Dictionary<int, List<IIndicator>>());

			foreach (DependencyScope dependencyScope in dependencyScopes)
			{
				result.Merge(dependencyScope);
			}

			return result;
		}

		public static DependencyScope GetDependencies(this List<IIndicator> indicators)
		{
			List<DependencyScope> dependencyScopes = new List<DependencyScope>();
			foreach (ICalculatableIndicator coreIndicator in indicators.OfType<ICalculatableIndicator>())
			{
				DependencyScope dependencyScope = coreIndicator.InterpretationDependencies;
				dependencyScopes.Add(dependencyScope);
			}

			DependencyScope result = GetDependencies(dependencyScopes);
			return result;
		}
	}
}
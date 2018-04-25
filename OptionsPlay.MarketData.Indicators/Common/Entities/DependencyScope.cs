using System;
using System.Collections.Generic;

namespace OptionsPlay.MarketData.Common
{
	public sealed class DependencyScope
	{
		public Dictionary<int, List<IIndicator>> Dependencies { get; private set; }

		public bool IsQuoteNeeded { get; set; }

		public DependencyScope(Dictionary<int, List<IIndicator>> deps)
		{
			if (deps == null)
			{
				throw new ArgumentNullException("deps");
			}

			Dependencies = deps;
		}

		public void Merge(DependencyScope destination)
		{
			IsQuoteNeeded = IsQuoteNeeded || destination.IsQuoteNeeded;

			foreach (KeyValuePair<int, List<IIndicator>> dateDependency in destination.Dependencies)
			{
				List<IIndicator> indicators;
				if (!Dependencies.TryGetValue(dateDependency.Key, out indicators))
				{
					Dependencies.Add(dateDependency.Key, dateDependency.Value);
				}
				else
				{
					indicators.AddRange(dateDependency.Value);
				}
			}
		}
	}
}
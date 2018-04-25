using System;
using System.Collections.Generic;
using System.Linq;

namespace OptionsPlay.TechnicalAnalysis.Entities
{
	public class Prediction
	{
		public Prediction(IEnumerable<double> probabilities, IEnumerable<double> prices, double daysInFuture)
		{
			Probabilities = probabilities.ToList();
			Prices = prices.ToList();
			DaysInFuture = daysInFuture;
		}

		public double DaysInFuture { get; private set; }

		public List<double> Probabilities { get; private set; }

		public List<double> Prices { get; private set; }

		public StdDevPrices GetStdDevPrices(double deviation)
		{
			double downPrice = GetStdDevPrice(deviation, true);
			double upPrice = GetStdDevPrice(deviation, false);
			StdDevPrices result = new StdDevPrices(upPrice, downPrice, deviation);

			return result;
		}

		public static double GetProbabilityByDeviation(double deviation)
		{
			double result = BlackScholesModel.NormDistribution.CumulativeDistribution(-deviation);
			return result;
		}

		public double GetProbabilityByPrice(double price)
		{
			int count = Prices.Count;

			int probabilityIndex = Prices.BinarySearch(price);
			if (probabilityIndex < 0)
			{
				int largerIndex = ~probabilityIndex;
				int smallerIndex = largerIndex - 1;

				if (largerIndex == count)
				{
					return 1 - Probabilities[count - 1];
				}

				// Do linear interpolation
				double largerIdexProbability = Probabilities[largerIndex];
				double smallerIdexProbability = Probabilities[smallerIndex];

				double resultProbability = MarketMath.DoLinearInterpolation(Prices[smallerIndex], Prices[largerIndex], smallerIdexProbability, largerIdexProbability, price);

				resultProbability = 1 - resultProbability;
				return resultProbability;
			}

			double stdDevProbability = 1 - Probabilities[probabilityIndex];
			return stdDevProbability;
		}

		private double GetStdDevPrice(double deviation, bool getDownPrice)
		{
			// Here we use an assumption, that probability is increasing function till the mid element. 
			// After - it is decreasing function. So we need to use reverse comparer to call BinarySearch.
			int countToTake = Probabilities.Count / 2;
			int startSearchIndex = getDownPrice ? 0 : countToTake;
			IComparer<double> comparer = getDownPrice ? null : new ReverseComparer<double>();

			double probability = GetProbabilityByDeviation(deviation);

			int priceIndex = Probabilities.BinarySearch(startSearchIndex, countToTake, probability, comparer);
			if (priceIndex < 0)
			{
				// Bitwise complement - is the index of larger element;
				int largerIndex = ~priceIndex;
				if (largerIndex >= Probabilities.Count)
				{
					largerIndex = Probabilities.Count - 1;
				}
				int smallerIndex = largerIndex - 1;
				double lDiff = Math.Abs(Probabilities[largerIndex] - probability);
				double sDiff = Math.Abs(Probabilities[smallerIndex] - probability);

				// the same as probabilityDiff = prediction.Probability[largerIndex] - prediction.Probability[smallerIndex]
				double probabilityDiff = lDiff + sDiff;

				// Do linear interpolation
				double largerIdexPrice = Prices[largerIndex];
				double smallerIdexPrice = Prices[smallerIndex];

				double resultPrice = smallerIdexPrice + (largerIdexPrice - smallerIdexPrice) * (sDiff / probabilityDiff);

				return resultPrice;
			}

			double stdDevPrice = Prices[priceIndex];
			return stdDevPrice;
		}

		private class ReverseComparer<T> : IComparer<T>
		{
			public int Compare(T x, T y)
			{
				return Comparer<T>.Default.Compare(y, x);
			}
		}
	}
}
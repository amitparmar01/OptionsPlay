using System;
using System.Collections.Generic;
using System.Linq;
using MathNet.Numerics;
using OptionsPlay.TechnicalAnalysis.Entities;

namespace OptionsPlay.TechnicalAnalysis
{
	public static class MarketMath
	{
		/// <summary>
		/// The minimum value of probability
		/// </summary>
		private const double SignificantDoubleValue = 1e-15;

		private const int DefaultNumberOfPredictionResults = 1000;

		#region IAlgoService implementation

		public static Greeks GetGreeks(double daysToExpiry/*T-t, maturity*/, double strike/*K*/, double interestRate/*r*/, double spotPrice/*S*/,
											double ask, double bid, double lastPrice, LegType callOrPut, double? divYield = null)
		{
			if (divYield == null)
			{
				divYield = 0;
			}

			BlackScholesModel bsm = new BlackScholesModel(daysToExpiry, strike, interestRate, spotPrice, ask, bid, lastPrice, callOrPut, divYield);

			Greeks greeks = new Greeks();
			greeks.Delta = bsm.EuroDelta;
			greeks.Gamma = bsm.EuroGamma;
			greeks.Theta = bsm.EuroTheta;
			greeks.Sigma = bsm.Sigma;
			greeks.Rho = bsm.EuroRho;
			greeks.RhoFx = bsm.EuroRhoFx;
			greeks.Vega = bsm.EuroVega;

			return greeks;
		}

		public static Prediction GetPrediction(double spotPrice, double putSigma, double callSigma, double interestRate, double daysInFuture, int? numberOfPointsArg = null)
		{
			int numberOfPoints = numberOfPointsArg ?? DefaultNumberOfPredictionResults;

			if (putSigma.AlmostEqual(callSigma))
			{
				Prediction sp = GetSymmetricPrediction(spotPrice, putSigma, interestRate, daysInFuture, numberOfPoints);
				return sp;
			}

			Prediction pr1 = GetSymmetricPrediction(spotPrice, putSigma, interestRate, daysInFuture, numberOfPoints);
			Prediction pr2 = GetSymmetricPrediction(spotPrice, callSigma, interestRate, daysInFuture, numberOfPoints);

			int pointsToTake = numberOfPoints / 2 + 1;
			List<double> prices = new List<double>(pr1.Prices.Take(pointsToTake).Concat(pr2.Prices.Skip(pointsToTake)));
			List<double> probabilities = new List<double>(pr1.Probabilities.Take(pointsToTake).Concat(pr2.Probabilities.Skip(pointsToTake)));

			prices[pointsToTake] = (pr1.Prices[pointsToTake] + pr2.Prices[pointsToTake]) / 2;
			probabilities[pointsToTake] = (pr1.Probabilities[pointsToTake] + pr2.Probabilities[pointsToTake]) / 2;
			Prediction combined = new Prediction(probabilities, prices, daysInFuture);

			return combined;
		}

		public static Prediction GetSymmetricPrediction(double spotPrice, double volatility, double interestRate, double daysInFuture, int? numberOfPointsArg = null)
		{
			int numberOfPoints = numberOfPointsArg ?? DefaultNumberOfPredictionResults;
            volatility = 0.2;
			double t = daysInFuture / (365 * numberOfPoints);
			double tmp = interestRate / 100 - volatility * volatility / 2;
			double x = Math.Sqrt(tmp * tmp * t * t + volatility * volatility * t);
			double probabilityUp = x.AlmostEqual(0)
										? 0.5 + tmp / 2
										: 0.5 + (tmp * t) / (2 * x);
			double probabilityDown = 1 - probabilityUp;

			double[] stockPrice = new double[numberOfPoints];
			double[] cumulativeProb = new double[numberOfPoints];

			double prevStockPrice = stockPrice[0] = Math.Log(spotPrice) - (numberOfPoints) * x;
			for (int i = 0; i < numberOfPoints; i++)
			{
				prevStockPrice = prevStockPrice + 2 * x;
				stockPrice[i] = Math.Exp(prevStockPrice);
			}
			stockPrice[0] = Math.Exp(stockPrice[0]);

			double prevCumulativeProb = 0.0;
			for (int i = 0; i < numberOfPoints; i++)
			{
				double probability = SpecialFunctions.Binomial(numberOfPoints, i) *
									Math.Pow(probabilityDown, numberOfPoints - i) *
									Math.Pow(probabilityUp, i);

				probability += prevCumulativeProb;
				cumulativeProb[i] = probability.CoerceZero(SignificantDoubleValue);

				prevCumulativeProb = probability;
			}

			for (int i = numberOfPoints / 2; i < numberOfPoints; i++)
			{
				cumulativeProb[i] = 1.0 - cumulativeProb[i];
				if (cumulativeProb[i] < 0)
				{
					cumulativeProb[i] = 0;
				}
			}

			Prediction prediction = new Prediction(cumulativeProb, stockPrice, daysInFuture);
			return prediction;
		}

		public static FutureOptionPrices GetFutureOptionPrices(double spotPrice, double interestRate, DataForFutureOptionPrices data)
		{
			double[] callSigma, putSigma;
			StrikeInterpolation(data, spotPrice, out  callSigma, out putSigma);

			double[] callPrice, putPrice;
			FutureOptionPrice(data, callSigma, putSigma, spotPrice, interestRate, out callPrice, out putPrice);

			FutureOptionPrices result = new FutureOptionPrices();
			result.CurrentPlusCall = callPrice.Select(d => spotPrice + d).ToArray();
			result.CurrentMinusPut = putPrice.Select(d => spotPrice - d).ToArray();
			return result;
		}

		public static double GetProbability(Prediction prediction, double price)
		{
			int count = prediction.Prices.Count;

			int probabilityIndex = prediction.Prices.BinarySearch(price);
			if (probabilityIndex < 0)
			{
				int largerIndex = ~probabilityIndex;
				int smallerIndex = largerIndex - 1;

				if (largerIndex == count)
				{
					return 1 - prediction.Probabilities[count - 1];
				}

				// Do linear interpolation
				double largerIdexProbability = prediction.Probabilities[largerIndex];
				double smallerIdexProbability = prediction.Probabilities[smallerIndex];

				//todo: use DoLinearInterpolation()
				double resultProbability = smallerIdexProbability + (largerIdexProbability - smallerIdexProbability) /
						(prediction.Prices[largerIndex] - prediction.Prices[smallerIndex]) * (price - prediction.Prices[smallerIndex]);
					//smallerIdexProbability + (largerIdexProbability - smallerIdexProbability) * (sDiff / priceDiff);
				resultProbability = 1 - resultProbability;
				return resultProbability;
			}

			double stdDevProbability = 1 - prediction.Probabilities[probabilityIndex];
			return stdDevProbability;
		}

		public static double GetSigmaProbabilityByDeviation(double probability)
		{
			double result = BlackScholesModel.NormDistribution.InverseCumulativeDistribution(probability);
			return result;
		}

		public static double DoLinearInterpolation(double firstIndependent, double secondIndependent, double firstDependent,
									double secondDependent, double targetIndependent)
		{
			double slope = (secondDependent - firstDependent) / (secondIndependent - firstIndependent);
			double targetDependent = firstDependent + slope * (targetIndependent - firstIndependent);
			return targetDependent;
		}

		#endregion

		#region Private methods

		#region Future option prices impl

		private static void StrikeInterpolation(DataForFutureOptionPrices data, double spotPrice, out double[] callSigma, out double[] putSigma)
		{
			int arrayLength = data.DaysToExpiry.Length;
			callSigma = new double[arrayLength];
			putSigma = new double[arrayLength];
			for (int i = 0; i < arrayLength; i++)
			{
				callSigma[i] = DoLinearInterpolation(data.Strike1[i], data.Strike2[i], data.CallSigma1[i], data.CallSigma2[i], spotPrice);
				putSigma[i] = DoLinearInterpolation(data.Strike1[i], data.Strike2[i], data.PutSigma1[i], data.PutSigma2[i], spotPrice);
			}
		}

		private static void FutureOptionPrice(DataForFutureOptionPrices data, double[] callSigma, double[] putSigma, double spotPrice,
										double interestRate, out double[] callPrice, out double[] putPrice)
		{
			int arrayLength = data.DaysToExpiry.Length;
			int priceArrysLength = data.DaysToExpiry[arrayLength - 1];
			callPrice = new double[priceArrysLength];
			putPrice = new double[priceArrysLength];

			for (int i = 0; i < arrayLength; i++)
			{
				int de = data.DaysToExpiry[i];
				callPrice[de-1] = new BlackScholesModel(de, spotPrice, interestRate, spotPrice, 0, 0, 0, LegType.Call).GetEuroPrice(callSigma[i]);
				putPrice[de-1] = new BlackScholesModel(de, spotPrice, interestRate, spotPrice, 0, 0, 0, LegType.Put).GetEuroPrice(putSigma[i]);
			}

			int firstExpiry = data.DaysToExpiry[0];
			for (int i = 0; i < firstExpiry - 1; i++)
			{
				callPrice[i] = (i+1) * callPrice[firstExpiry-1] / firstExpiry;
				putPrice[i] = (i+1)* putPrice[firstExpiry-1] / firstExpiry;
			}

			for (int i = 0; i < arrayLength - 1; i++)
			{
				int currExp = data.DaysToExpiry[i];
				int nextExp = data.DaysToExpiry[i + 1];
				for (int j = currExp; j < nextExp - 1; j++)
				{
					callPrice[j] = DoLinearInterpolation(currExp, nextExp, callPrice[currExp - 1], callPrice[nextExp - 1], j + 1);
					putPrice[j] = DoLinearInterpolation(currExp, nextExp, putPrice[currExp - 1], putPrice[nextExp - 1], j + 1);
				}
			}
		}

		#endregion

		#endregion
	}
}
using System;
using System.Collections.Generic;
using System.Linq;
using MathNet.Numerics;
using MathNet.Numerics.Statistics;
using OptionsPlay.BusinessLogic.MarketDataProcessing.Helpers;
using OptionsPlay.Common.Utilities;
using OptionsPlay.MarketData.Common;

namespace OptionsPlay.BusinessLogic.MarketDataProcessing
{
	public class SupportAndResistanceMath
	{
		private enum SRPointsLocalization
		{
			// ReSharper disable UnusedMember.Local
			OneLocal = 1,
			TwoLocal = 2,
			ThreeLocal = 3
			// ReSharper restore UnusedMember.Local
		}

		private readonly HistoricalData _data;

		private static readonly double[] PotentialIncrements =
		{
			0.0001, 0.0002, 0.0005, 0.001, 0.002, 0.005, 0.01, 0.02, 0.05, 0.1,
			0.2, 0.5, 1.0, 2.0, 5.0, 10.0, 20.0, 50.0, 0.25, 2.5, 25.0, 100.0
		};

		private const double AbsoluteError = 1e-5;

		/// <summary>
		/// Number of decimal places to round values representing prices
		/// </summary>
		private const int NumberOfDigitsToRound = 5;

		public SupportAndResistanceMath(HistoricalData data)
		{
			_data = data;
		}

		public SupportAndResistance GetSupportAndResistance(double? currentPriceParam = null, double? percentRangeParam = null)
		{
			double percentRange = currentPriceParam ?? 0.4;
			double currentPrice = percentRangeParam ?? _data.Close.Last();

			Tuple<int, double> highMax = _data.High.MaximumAndIndex();
			Tuple<int, double> lowMin = _data.Low.MinimumAndIndex();

			double increment;
			List<double> priceChainResult = GeneratePriceChain(highMax.Item2, lowMin.Item2, out increment);
			List<double> volumeProfileResult = VolumeAddition(priceChainResult);
			priceChainResult.RemoveAt(priceChainResult.Count - 1);

			List<double> priceChain = priceChainResult.ToList(), volumeProfile = volumeProfileResult.ToList();
			List<SupportAndResistanceValue> srValues = FindGaps(ref volumeProfile, ref priceChain);

			PriceBounds bounds = UpAndDownPrice(highMax.Item2, lowMin.Item2, percentRange, currentPrice);

			List<double> localPrices;
			List<double> localVolume;
			SRpoints(bounds.UpPrice, bounds.DownPrice, priceChain, volumeProfile, increment, SRPointsLocalization.TwoLocal,
					out localPrices, out localVolume);

			List<double> idenSR = IdenticalVolumeFilter(ref localPrices, ref localVolume);

			double priceRangeStdDev = _data.GetPriceRangeStdDev();
			////////////////////////////////////
			// SRLocalHighFilter mat lab method
			List<Tuple<int, double>> srPoints = ApplyLocalFilters(localPrices, idenSR, priceRangeStdDev);
			//global max is always resistence, and global min is always support
			if (srPoints.All(i => !i.Item2.Equals(highMax.Item2)))
			{
				srPoints.Add(highMax);
			}
			if (srPoints.All(i => !i.Item2.Equals(lowMin.Item2)))
			{
				srPoints.Add(lowMin);
			}
			////////////////////////////////////

			CrossOverFilter(ref srPoints);

			////////////////////////////////////
			// TODO: consider move to FindGaps
			IEnumerable<SupportAndResistanceValue> gaps = PartialGap(priceRangeStdDev);
			srValues.AddRange(gaps);
			////////////////////////////////////

			srValues.AddRange(srPoints.Select((d, i) =>
			{
				DateTime date = _data.Date[d.Item1];
				SupportAndResistanceValueType type = d.Item2 >= currentPrice
					? SupportAndResistanceValueType.MajorResistance
					: SupportAndResistanceValueType.MajorSupport;
				SupportAndResistanceValue srVal = new SupportAndResistanceValue(d.Item2, date, type);
				return srVal;
			}));

			SupportAndResistance result = new SupportAndResistance(srValues);
			return result;
		}

		#region Support/Resistance helper methods implementation

		private struct PriceBounds
		{
			public PriceBounds(double downPrice, double upPrice)
			{
				UpPrice = upPrice;
				DownPrice = downPrice;
			}

			public readonly double UpPrice;
			public readonly double DownPrice;
		}

		private static PriceBounds UpAndDownPrice(double historicalHighMax, double historicalLowMin, double percentRange, double currentPrice)
		{
			double hisRange = (historicalHighMax - historicalLowMin) / currentPrice;
			double upPercent = (historicalHighMax - currentPrice) / currentPrice;
			double downPercent = (currentPrice - historicalLowMin) / currentPrice;

			double up, down;

			if (hisRange <= percentRange)
			{
				up = upPercent;
				down = hisRange - up;
			}
			else if (upPercent >= (percentRange) / 2)
			{
				if (downPercent >= (percentRange) / 2)
				{
					up = (percentRange) / 2;
					down = hisRange - up;
				}
				else
				{
					down = downPercent;
					up = percentRange - down;
				}
			}
			else
			{
				up = upPercent;
				down = percentRange - up;
			}

			double downPrice = RoundPrice(currentPrice * (1 - down));
			double upPrice = RoundPrice(currentPrice * (1 + up));
			return new PriceBounds(downPrice, upPrice);
		}

		private static List<double> GeneratePriceChain(double historicalHighMaxPrice, double historicalLowMinPrice, out double increment)
		{
			double priceRange = historicalHighMaxPrice - historicalLowMinPrice;
			priceRange = RoundPrice(priceRange);
			//Find minimum value index from array with elements abs(wholeInterval / PotentialIncrements[i] - 100)
			int incrementIndex = PotentialIncrements.MinimumAndIndex(d => Math.Abs(priceRange / d - 100)).Item1;
			increment = PotentialIncrements[incrementIndex];
			//Ranges ascending
			List<double> priceChain = EnumerableExtensions.Range(historicalLowMinPrice, historicalHighMaxPrice + increment, increment)
				.Select(RoundPrice)
				.ToList();
			return priceChain;
		}

		private List<double> VolumeAddition(IList<double> priceRange)
		{
			int rangesSize = priceRange.Count;
			double volumeSize = _data.Count;

			double[] sum = new double[rangesSize - 1];
			for (int i = 0; i < volumeSize; i++)
			{
				double currentHighPrice = _data.High[i];
				double currentLowPrice = _data.Low[i];
				double currentVolume = _data.Volume[i];

				Tuple<int, double> highBreak = priceRange.LastAndIndex(d => d < currentHighPrice);
				int highSumIndicator = highBreak.Item1;
				double highBreakValue = highBreak.Item2;
				if (highSumIndicator < 0)
				{
					highSumIndicator = 0;
					highBreakValue = priceRange[0];
				}

				Tuple<int, double> lowBreak = priceRange.LastAndIndex(d => d < currentLowPrice);
				int lowSumIndicator = lowBreak.Item1;
				double lowBreakValue = priceRange[lowSumIndicator + 1];
				if (lowSumIndicator < 0)
				{
					lowSumIndicator = 0;
					lowBreakValue = priceRange[1];
				}

				if (lowSumIndicator == highSumIndicator)
				{
					sum[lowSumIndicator] += currentVolume;
				}
				else
				{
					double priceDiff = currentHighPrice - currentLowPrice;
					double topVolume = (currentHighPrice - highBreakValue) / priceDiff * currentVolume;
					double bottomVolume = (lowBreakValue - currentLowPrice) / priceDiff * currentVolume;

					sum[lowSumIndicator] = sum[lowSumIndicator] + bottomVolume;
					sum[highSumIndicator] = sum[highSumIndicator] + topVolume;
					for (int j = lowSumIndicator + 1; j < highSumIndicator; j++)
					{
						sum[j] += (currentVolume - topVolume - bottomVolume) / (highSumIndicator - lowSumIndicator - 1);
					}
				}
			}
			return new List<double>(sum);
		}

		private static void SRpoints(double upPrice, double downPrice, IList<double> priceChain, List<double> volumeProfile,
									double increment, SRPointsLocalization pointsLocalization,
									out List<double> local, out List<double> localVolume)
		{
			int endIndicator = priceChain.LastAndIndex(d => d < upPrice).Item1 + 1;

			int startIndicator = priceChain.LastAndIndex(d => d < downPrice).Item1;
			if (startIndicator < 0)
			{
				startIndicator = 0;
			}

			List<double> volume = new List<double>();
			List<double> price = new List<double>();
			for (int i = startIndicator; i < endIndicator; i++)
			{
				volume.Add(volumeProfile[i]);
				price.Add(priceChain[i]);
			}

			local = new List<double>();
			localVolume = new List<double>();

			// filter out all values with volume higher than this
			double volumeFilter = volumeProfile.Maximum() / 2;

			// Here we check that adjacent points near current (for all steps depending on pointsLocalization) satisfy the following condition:
			// volume[current + step + 1] - volume[current + step] >= 0 && volume[current - step] - volume[current - step - 1] <= 0
			// If so - current points are added to result
			int margin = (int)pointsLocalization;
			for (int i = margin; i < price.Count - margin; i++)
			{
				if (volume[i] > volumeFilter)
				{
					continue;
				}

				bool addCurrent = volume[i + 1] > volume[i] && volume[i] < volume[i - 1];

				for (int j = 1; j < margin; j++)
				{
					//if(Volume(i+2)-Volume(i+1)>=0)&&((Volume(i-1)-Volume(i-2))<=0) 
					//|| (Volume(i+2)-Volume(i)>0)&&((Volume(i-1)-Volume(i-2))<=0) 
					//|| (Volume(i+2)-Volume(i+1)>=0)&&((Volume(i)-Volume(i-2))<0)
					// volume[i + j + 1] - volume[i + j] >= 0 

					bool grOrEq2 = volume[i + j + 1].GreaterOrEqual(volume[i + j]);
					bool grOrEq1 = volume[i + j + 1].GreaterOrEqual(volume[i + j - 1]);
					bool lessOrEq2 = volume[i - j - 1].GreaterOrEqual(volume[i - j]);
					bool lessOrEq1 = volume[i - j - 1].GreaterOrEqual(volume[i - j + 1]);

					if ((!grOrEq2 || !lessOrEq2) && (!grOrEq1 || !lessOrEq2) && (!grOrEq2 || !lessOrEq1))
					{
						addCurrent = false;
						break;
					}
				}

				if (addCurrent)
				{
					local.Add(price[i]);
					localVolume.Add(volume[i]);
				}
			}

			AdjacentPriceFilter(ref local, ref localVolume, increment);

			//VolumeProfile();
		}

		private static void AdjacentPriceFilter(ref List<double> price, ref List<double> volume, double increment)
		{
			const double adjacentPricesThreshold = 0.0001;

			int i = 0;

			bool needToSearchOnceAgain = true;
			while (needToSearchOnceAgain)
			{
				needToSearchOnceAgain = false;

				while (i < price.Count - 1)
				{
					double adjDifference = Math.Abs(price[i] - price[i + 1] + increment);
					if (adjDifference < adjacentPricesThreshold)
					{
						price[i] = RoundPrice(price[i] + increment / 2);
						price.RemoveAt(i + 1);
						volume.RemoveAt(i + 1);
						needToSearchOnceAgain = true;
						continue;
					}

					++i;
				}
			}
		}

		private List<SupportAndResistanceValue> FindGaps(ref List<double> volumeProfile, ref List<double> priceChain)
		{
			List<SupportAndResistanceValue> gapSR = new List<SupportAndResistanceValue>();
			if (!volumeProfile.Exists(d => d.AlmostEqualRelative(0.0, AbsoluteError)))
			{
				return gapSR;
			}

			List<int> gapUp, gapDown;
			_data.FindGaps(out gapUp, out gapDown);

			gapSR.AddRange(gapUp.Select(j =>
			{
				double val = _data.Low[j];
				DateTime date = _data.Date[j];
				SupportAndResistanceValue srVal = new SupportAndResistanceValue(val, date, SupportAndResistanceValueType.GapSupport);
				return srVal;
			}));

			gapSR.AddRange(gapDown.Select(j =>
			{
				double val = _data.High[j];
				DateTime date = _data.Date[j];
				SupportAndResistanceValue srVal = new SupportAndResistanceValue(val, date, SupportAndResistanceValueType.GapResistance);
				return srVal;
			}));

			int i = 0;
			while (i < volumeProfile.Count)
			{
				if (volumeProfile[i].AlmostEqualRelative(0.0, AbsoluteError))
				{
					volumeProfile.RemoveAt(i);
					priceChain.RemoveAt(i);
				}
				else
				{
					i++;
				}
			}
			return gapSR;
		}

		// TODO: refactor
		private IEnumerable<SupportAndResistanceValue> PartialGap(double priceRangeStdDev)
		{
			List<SupportAndResistanceValue> pGap = new List<SupportAndResistanceValue>();

			for (int i = 0; i < _data.Count - 1; i++)
			{
				double nextLowDiffCurrHigh = _data.Low[i + 1] - _data.High[i];
				double nextHighDiffCurrLow = _data.Low[i] - _data.High[i + 1];

				if (nextLowDiffCurrHigh > priceRangeStdDev * 2)
				{
					bool include = true;
					for (int j = i + 2; j < _data.Count; j++)
					{
						if (_data.High[j] < _data.High[i] || _data.Low[j] < _data.High[i])
						{
							include = false;
							break;
						}
					}
					if (include)
					{
						SupportAndResistanceValue value = new SupportAndResistanceValue(_data.High[i], _data.Date[i], SupportAndResistanceValueType.GapResistance);
						pGap.Add(value);
					}
				}
				else if (nextHighDiffCurrLow > priceRangeStdDev * 2)
				{
					bool include = true;
					for (int j = i + 2; j < _data.Count; j++)
					{
						if (_data.High[j] > _data.Low[i] || _data.Low[j] > _data.Low[i])
						{
							include = false;
							break;
						}
					}
					if (include)
					{
						SupportAndResistanceValue value = new SupportAndResistanceValue(_data.Low[i], _data.Date[i], SupportAndResistanceValueType.GapSupport);
						pGap.Add(value);
					}
				}
			}

			return pGap;
		}


		private static List<double> IdenticalVolumeFilter(ref List<double> price, ref List<double> volume)
		{
			List<double> idenSR = new List<double>();

			bool haveIncidentIdentical = true;

			while (haveIncidentIdentical)
			{
				haveIncidentIdentical = false;

				int lowIndicator = 0;
				for (; lowIndicator < volume.Count - 1; lowIndicator++)
				{
					double currentVolume = volume[lowIndicator];
					double nextVolume = volume[lowIndicator + 1];
					if (currentVolume.AlmostEqualRelative(nextVolume, AbsoluteError))
					{
						haveIncidentIdentical = true;
						break;
					}
				}

				if (haveIncidentIdentical)
				{
					int highIndicator = lowIndicator + 1;
					for (; highIndicator < volume.Count; highIndicator++)
					{
						double currentVolume = volume[highIndicator];
						double prevVolume = volume[highIndicator - 1];
						if (!currentVolume.AlmostEqualRelative(prevVolume, AbsoluteError))
						{
							break;
						}
					}

					idenSR.Add(price[lowIndicator]);
					idenSR.Add(price[highIndicator - 1]);

					price.RemoveRange(lowIndicator, highIndicator - lowIndicator);
					volume.RemoveRange(lowIndicator, highIndicator - lowIndicator);
				}
			}

			return idenSR;
		}

		private List<Tuple<int, double>> ApplyLocalFilters(IEnumerable<double> prices, IEnumerable<double> idsr, double priceRangeStdDev)
		{
			List<double> allPoints = new List<double>(prices);
			allPoints.AddRange(idsr);

			List<Tuple<int, double>> high = ArrayLocalFilter(_data.High, allPoints, priceRangeStdDev);
			List<Tuple<int, double>> result = new List<Tuple<int, double>>(high);
			List<Tuple<int, double>> low = ArrayLocalFilter(_data.Low, allPoints, priceRangeStdDev);
			foreach (Tuple<int, double> sr in low)
			{
				Tuple<int, double> existing = high.FirstOrDefault(i => i.Item2.Equals(sr.Item2));
				if (existing == null)
				{
					result.Add(sr);
					continue;
				}
				if (existing.Item1 < sr.Item1)
				{
					continue;
				}
				result.Remove(existing);
				result.Add(sr);
			}

			return result;
		}


		private static List<Tuple<int, double>> ArrayLocalFilter(IList<double> pricesArrayToFilter, List<double> allPoints, double priceRangeStdDev)
		{
			const int times = 1;
			double margin = priceRangeStdDev * times;

			int cnt = pricesArrayToFilter.Count;
			List<int> passedFilterIndexes = new List<int>();
			for (int i = 3; i < cnt - 3; i++)
			{
				double currentPoint = pricesArrayToFilter[i];
				if (((pricesArrayToFilter[i + 1] - currentPoint) <= AbsoluteError && (currentPoint - pricesArrayToFilter[i - 1]) >= AbsoluteError)
					&& ((pricesArrayToFilter[i + 2] - currentPoint) <= AbsoluteError && (currentPoint - pricesArrayToFilter[i - 2]) >= AbsoluteError)
					&& ((pricesArrayToFilter[i + 3] - currentPoint) <= AbsoluteError || (currentPoint - pricesArrayToFilter[i - 3]) >= AbsoluteError))
				{
					passedFilterIndexes.Add(i);
				}
			}
			if (cnt >= 5 && pricesArrayToFilter[cnt - 2] > pricesArrayToFilter[cnt - 1] && pricesArrayToFilter[cnt - 2] > pricesArrayToFilter[cnt - 3]
				&& pricesArrayToFilter[cnt - 2] > pricesArrayToFilter[cnt - 4] && pricesArrayToFilter[cnt - 2] > pricesArrayToFilter[cnt - 5])
			{
				passedFilterIndexes.Add(cnt - 2);
			}

			HashSet<double> uniquePrices = new HashSet<double>();
			List<Tuple<int, double>> keepSr = new List<Tuple<int, double>>();
			foreach (int index in passedFilterIndexes)
			{
				double match;
				double current = pricesArrayToFilter[index];

				if (TryFindFirstValueWithinMargin(allPoints, current, margin, out match) && uniquePrices.Add(match))
				{
					keepSr.Add(Tuple.Create(index, match));
				}
			}

			return keepSr;
		}


		private static bool TryFindFirstValueWithinMargin(IEnumerable<double> allPoints, double level, double margin, out double value)
		{
			double rangeUp = level + margin;
			double rangeDown = level - margin;
			value = double.NaN;

			// almost the same as keepSr.Add(allPoints.First(d => d <= rangeUp && d >= rangeUp))
			foreach (double d in allPoints)
			{
				if (d <= rangeUp && d >= rangeDown)
				{
					value = d;
					return true;
				}
			}
			return false;
		}

		private void CrossOverFilter(ref List<Tuple<int, double>> points)
		{
			const int filterTresshold = 5;
			for (int i = 0; i < points.Count; i++)
			{
				Tuple<int, double> point = points[i];
				int count = 0;
				for (int j = point.Item1; j < _data.Count - 1; j++)
				{
					if ((point.Item2 - _data.Close[j] > AbsoluteError && _data.Close[j + 1] - point.Item2 > AbsoluteError) ||
						(_data.Close[j] - point.Item2 > AbsoluteError && point.Item2 - _data.Close[j + 1] > AbsoluteError))
					{
						count++;
					}
				}
				if (count >= filterTresshold)
				{
					points.RemoveAt(i);
				}
			}
		}

		private static double RoundPrice(double price)
		{
			double roundedPrice = Math.Round(price, NumberOfDigitsToRound, MidpointRounding.AwayFromZero);
			return roundedPrice;
		}

		#endregion
	}
}
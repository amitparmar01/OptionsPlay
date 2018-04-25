using System;
using System.Collections.Generic;
using System.Linq;
using MathNet.Numerics;
using OptionsPlay.BusinessLogic.Common;
using OptionsPlay.BusinessLogic.Common.Entities;
using OptionsPlay.TechnicalAnalysis;
using OptionsPlay.TechnicalAnalysis.Entities;

namespace OptionsPlay.BusinessLogic
{
	// todo: indicators and earning calendars have not been implemented. This logic is commented
	public class CoveredCallService: ICoveredCallService
	{
		// todo: move this fields to configuration
		private const double DefaultMinimumReturn = 2.0;
		private const double DefaultMinimumPremium = 0.2;

		private readonly IPredictionAndStdDevService _predictionAndStdDevService;

		public CoveredCallService(IPredictionAndStdDevService predictionAndStdDevService)
		{
			_predictionAndStdDevService = predictionAndStdDevService;
		}

		#region Implementation of ICoveredCallService

		public List<CoveredCall> GetAllCoveredCalls(OptionChain data, LegType? legType = null, double? minimumPremium = null, double? minimumReturn = null)
		{
			Dictionary<DateAndNumberOfDaysUntil, Prediction> predictions = _predictionAndStdDevService.MakePredictionsForDates(data, data.ExpirationDates);
			List<CoveredCall> results = new List<CoveredCall>();

			if (!legType.HasValue || legType == LegType.Call)
			{
				IEnumerable<CoveredCall> coveredCalls = GetCoveredCallsByLegType(data, predictions, LegType.Call, minimumPremium, minimumReturn);
				if (coveredCalls != null)
				{
					results.AddRange(coveredCalls);
				}
			}
			if (!legType.HasValue || legType == LegType.Put)
			{
				IEnumerable<CoveredCall> coveredCalls = GetCoveredCallsByLegType(data, predictions, LegType.Put, minimumPremium, minimumReturn);
				if (coveredCalls != null)
				{
					results.AddRange(coveredCalls);
				}
			}
			return results;
		}

		public List<CoveredCall> GetOptimalCoveredCalls(OptionChain data, LegType? legType = null, double? minimumPremium = null, double? minimumReturn = null)
		{
			IEnumerable<CoveredCall> coveredCalls = GetAllCoveredCalls(data, legType, minimumPremium, minimumReturn);
			List<CoveredCall> optimalCoveredCalls = coveredCalls.Where(m => m.RiskTolerance == RiskTolerance.Optimal).ToList();
			return optimalCoveredCalls;
		}

		#endregion


		private static List<CoveredCall> GetCoveredCallsByLegType(OptionChain data, Dictionary<DateAndNumberOfDaysUntil, Prediction> predictions, /*EarningsCalendar calendar,*/
																LegType legType, /*Signal volOfVol,*/ double? minimumPremiumParam, double? minimumReturnParam)
		{
			double minimumPremium = minimumPremiumParam ?? DefaultMinimumPremium;
			double minimumReturn = minimumReturnParam ?? DefaultMinimumReturn;

			HashSet<DateTime> optimalIsFound = new HashSet<DateTime>();
			List<CoveredCall> coveredCalls = new List<CoveredCall>();

			foreach (OptionPair optionChain in data)
			{
				Option option = legType == LegType.Call
					? optionChain.CallOption
					: optionChain.PutOption;

				double bid = option.Bid;
				double currentPremium = bid;
				DateAndNumberOfDaysUntil expiry = optionChain.Expiry;
				double lastPrice = data.UnderlyingCurrentPrice;
				double strkePrice = optionChain.StrikePrice;

				List<OptionPair> chainsWithTheSameExpiry = data.Where(x => x.Expiry == expiry).ToList();

				// todo: optionChain.OptionType 
				//bool typeisSuitable = optionChain.OptionType == OptionType.Standard;

				double daysQuantity = expiry.TotalNumberOfDaysUntilExpiry;

				// Ignore expired options
				if (daysQuantity < 0 || daysQuantity.AlmostEqual(0) /*|| !typeisSuitable*/)
				{
					continue;
				}

				bool strikePriceIsSuitable = legType == LegType.Call
					? optionChain.StrikePrice > lastPrice
					: optionChain.StrikePrice < lastPrice;

				if (!strikePriceIsSuitable)
				{
					// Check if fifth strike is suitable
					strikePriceIsSuitable = legType == LegType.Call
						? chainsWithTheSameExpiry.Where(x => x.StrikePrice < lastPrice)
							.OrderBy(x => lastPrice - x.StrikePrice)
							.Take(5).Last().StrikePrice < optionChain.StrikePrice
						: chainsWithTheSameExpiry.Where(x => x.StrikePrice > lastPrice)
							.OrderBy(x => x.StrikePrice - lastPrice)
							.Take(5).Last().StrikePrice > optionChain.StrikePrice;
				}

				if (!strikePriceIsSuitable)
				{
					continue;
				}

				double intrinsicValue = legType == LegType.Call
					? lastPrice > optionChain.StrikePrice ? lastPrice - optionChain.StrikePrice : 0
					: lastPrice < optionChain.StrikePrice ? optionChain.StrikePrice - lastPrice : 0;

				double currentReturn = (Math.Pow(1 + (currentPremium - intrinsicValue) / lastPrice, 365.0 / daysQuantity) - 1) * 100;

				bool firstAboveBelowStdDev = false;

				Prediction prediction = predictions[optionChain.Expiry];
				StdDevPrices stdDev = prediction.GetStdDevPrices(1);

				bool deviationIsSuitable = legType == LegType.Call
					? strkePrice > stdDev.UpPrice
					: strkePrice < stdDev.DownPrice;
				if (deviationIsSuitable)
				{
					firstAboveBelowStdDev = legType == LegType.Call
						? chainsWithTheSameExpiry
							.Where(x => x.StrikePrice >= stdDev.UpPrice)
							.Select(y => y.StrikePrice - stdDev.UpPrice)
							.Min()
							.AlmostEqual(strkePrice - stdDev.UpPrice)
						: chainsWithTheSameExpiry
							.Where(x => x.StrikePrice <= stdDev.DownPrice)
							.Select(y => stdDev.DownPrice - y.StrikePrice)
							.Min()
							.AlmostEqual(stdDev.DownPrice - optionChain.StrikePrice);
				}

				double probability = prediction.GetProbabilityByPrice(optionChain.StrikePrice) * 100;
				double probabilityInSigmas = MarketMath.GetSigmaProbabilityByDeviation(probability / 100);
				CoveredCall coveredCall = new CoveredCall();

				coveredCall.Premium = currentPremium;
				coveredCall.Return = currentReturn;

				coveredCall.OptionNumber = option.OptionNumber;
				coveredCall.Probability = probability;
				coveredCall.ProbabilityInSigmas = probabilityInSigmas;

//				if (volOfVol != null)
//				{
//					coveredCall.VolOfVol = volOfVol.Value;
//				}
				coveredCall.PercentAboveBelowCurrentPrice = Math.Abs((optionChain.StrikePrice - lastPrice)) / lastPrice * 100;

				int numberOfStrikes = legType == LegType.Call
					? chainsWithTheSameExpiry.Where(x => x.StrikePrice >= lastPrice)
						.OrderBy(x => x.StrikePrice)
						.ToList()
						.FindIndex(x => x.StrikePrice.AlmostEqual(optionChain.StrikePrice)) + 1
					: chainsWithTheSameExpiry.Where(x => x.StrikePrice <= lastPrice)
						.OrderByDescending(x => x.StrikePrice)
						.ToList()
						.FindIndex(x => x.StrikePrice.AlmostEqual(optionChain.StrikePrice)) + 1;

				coveredCall.NumberOfStrikesBelowAboveCurrentPrice = numberOfStrikes;
				coveredCall.NumberOfSdBelowAboveCurrentPrice = probabilityInSigmas;

//				coveredCall.HasEarnings = calendar != null && calendar.Date >= DateTime.Now && calendar.Date <= optionChain.Expiry;
//				if (calendar != null)
//				{
//					coveredCall.DaysQuantityBeforeEarnings = (calendar.Date - DateTime.UtcNow).TotalDays;
//				}

				coveredCalls.Add(coveredCall);

				if (bid.AlmostEqual(0.0))
				{
					coveredCall.RiskTolerance = RiskTolerance.NoBid;
					continue;
				}

				if (!deviationIsSuitable)
				{
					if (currentPremium < minimumPremium)
					{
						coveredCall.RiskTolerance = RiskTolerance.LowPremium;
						continue;
					}

					coveredCall.RiskTolerance = currentReturn >= minimumReturn
						? RiskTolerance.Aggressive
						: RiskTolerance.LowReturn;
					continue;
				}

				if (currentPremium < minimumPremium)
				{
					coveredCall.RiskTolerance = RiskTolerance.LowPremium;
					continue;
				}

				if (currentReturn < minimumReturn)
				{
					coveredCall.RiskTolerance = RiskTolerance.LowReturn;
					continue;
				}

				if (!optimalIsFound.Contains(optionChain.Expiry.FutureDate)
					&& daysQuantity >= 3
					&& daysQuantity <= 60
					//&& (!coveredCall.HasEarnings || daysQuantity < coveredCall.DaysQuantityBeforeEarnings)
					&& firstAboveBelowStdDev)
				{
					coveredCall.RiskTolerance = RiskTolerance.Optimal;
					optimalIsFound.Add(optionChain.Expiry.FutureDate);
				}
				else
				{
					coveredCall.RiskTolerance = RiskTolerance.Conservative;
				}

			}
			return coveredCalls;
		}

	}
}
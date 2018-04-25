using System;
using System.Collections.Generic;
using System.Linq;
using MathNet.Numerics;
using OptionsPlay.BusinessLogic.Common;
using OptionsPlay.BusinessLogic.Common.Entities;
using OptionsPlay.Common.Utilities;
using OptionsPlay.TechnicalAnalysis;
using OptionsPlay.TechnicalAnalysis.Entities;

namespace OptionsPlay.BusinessLogic
{
	// todo: we might want to merge this file with custom entity, which contains data this service operates with (IBasicPredictionCalculationData)
	public class PredictionAndStdDevService: IPredictionAndStdDevService
	{
		private readonly double[] _defaultStdDevs = { 1, 2, 3 };

		// todo: get rid of all dependencies from here. 
		private readonly IMarketWorkTimeService _marketWorkTimeService;

		public PredictionAndStdDevService(IMarketWorkTimeService marketWorkTimeService)
		{
			_marketWorkTimeService = marketWorkTimeService;
		}

		#region Implementation of IPredictionAndStdDevService

		public Dictionary<DateAndNumberOfDaysUntil, Prediction> MakePredictionsForDates(IBasicPredictionCalculationData data, IEnumerable<DateAndNumberOfDaysUntil> dates)
		{
			Dictionary<DateAndNumberOfDaysUntil, Prediction> predictions = new Dictionary<DateAndNumberOfDaysUntil, Prediction>();

			foreach (DateAndNumberOfDaysUntil date in dates)
			{
				double daysInFuture = date.TotalNumberOfDaysUntilExpiry;
				if (daysInFuture.AlmostEqual(0) || daysInFuture < 0)
				{
					continue;
				}

				double volatility = data.GetVolatility(daysInFuture);
				Prediction prediction = MarketMath.GetSymmetricPrediction(data.LastPrice, volatility, data.InterestRate, daysInFuture);
				predictions.Add(date, prediction);
			}

			return predictions;
		}

		public List<DateAndStandardDeviations> GetStandardDeviationsForDates(IBasicPredictionCalculationData data, IReadOnlyList<DateAndNumberOfDaysUntil> referencePoints, IReadOnlyList<double> deviations)
		{
			const int numberOfPointsBetween = 4;

			DateAndNumberOfDaysUntil expirationDateForToday = _marketWorkTimeService.GetNumberOfDaysLeftUntilExpiry(_marketWorkTimeService.NowInMarketTimeZone.Date);

			List<DateAndNumberOfDaysUntil> experies = referencePoints.Union(expirationDateForToday.Yield()).Distinct().OrderBy(t => t.FutureDate).ToList();
			List<DateAndNumberOfDaysUntil> dates = new List<DateAndNumberOfDaysUntil>(experies);

			for (int i = 0; i < experies.Count - 1; i++)
			{
				DateAndNumberOfDaysUntil current = experies[i];
				DateAndNumberOfDaysUntil next = experies[i + 1];

				double range = next.TotalNumberOfDaysUntilExpiry - current.TotalNumberOfDaysUntilExpiry;
				if (range < 3)
				{
					continue;
				}
				double step = Math.Round(range / numberOfPointsBetween, 3, MidpointRounding.AwayFromZero);

				// uniformly inserts points between current date and next date.
				IEnumerable<int> increments = CollectionExtensions.Range(0, range - step, step).Where(d => (int)d != 0).Select(d => (int)d).Distinct();
				foreach (int increment in increments)
				{
					DateTime date = current.FutureDate.AddDays(increment);
					dates.Add(_marketWorkTimeService.GetNumberOfDaysLeftUntilExpiry(date));
				}
			}

			List<DateAndNumberOfDaysUntil> datesToBuildPredictionFor = dates.OrderBy(e => e.FutureDate).ToList();

			Dictionary<DateAndNumberOfDaysUntil, Prediction> predictions = MakePredictionsForDates(data, datesToBuildPredictionFor);
			List<DateAndStandardDeviations> stdDevs = GetStandardDeviationsForDates(data, predictions, deviations);
			return stdDevs;
		}

		public Prediction GetPrediction(IBasicPredictionCalculationData data, double daysInFuture)
		{
			double volatility = data.GetVolatility(daysInFuture);
			Prediction prediction = MarketMath.GetSymmetricPrediction(data.LastPrice, volatility, data.InterestRate, daysInFuture);
			return prediction;
		}

		public List<DateAndStandardDeviation> GetExpiriesAndStandardDeviations(IBasicPredictionCalculationData data, IReadOnlyList<DateAndNumberOfDaysUntil> referenceDates, double deviation)
		{
			List<DateAndStandardDeviations> expiryAndStandardDeviations = GetExpiriesAndStandardDeviations(data, new[] { deviation }, referenceDates).Item1;
			List<DateAndStandardDeviation> result = ToDateAndStandardDeviationList(expiryAndStandardDeviations);
			return result;
		}

		public List<DateAndStandardDeviation> GetStdDevPricesForDates(IBasicPredictionCalculationData data, IReadOnlyList<DateAndNumberOfDaysUntil> referenceDates, double deviation)
		{
			List<DateAndStandardDeviations> expiryAndStandardDeviations = GetStandardDeviationsForDates(
				data, referenceDates, new[] { deviation });
			List<DateAndStandardDeviation> result = ToDateAndStandardDeviationList(expiryAndStandardDeviations);
			return result;
		}

		public List<DateAndStandardDeviations> GetExpiriesAndDefaultStandardDeviations(IBasicPredictionCalculationData data, IReadOnlyList<DateAndNumberOfDaysUntil> referenceDates)
		{
			List<DateAndStandardDeviations> result = GetExpiriesAndStandardDeviations(data, _defaultStdDevs, referenceDates).Item1;
			return result;
		}

		public Tuple<List<DateAndStandardDeviations>, List<Prediction>> GetExpiriesAndDefaultStandardDeviationsWithPredictions(IBasicPredictionCalculationData data, IReadOnlyList<DateAndNumberOfDaysUntil> referenceDates)
		{
			Tuple<List<DateAndStandardDeviations>, List<Prediction>> result = GetExpiriesAndStandardDeviations(data, _defaultStdDevs, referenceDates);
			return result;
		}

		public List<DateAndStandardDeviation> GetStandardDeviationsForDates(IBasicPredictionCalculationData data, IReadOnlyList<DateAndNumberOfDaysUntil> referencePoints, double deviation)
		{
			List<DateAndStandardDeviations> expiryAndStandardDeviations = GetStandardDeviationsForDates(data, referencePoints, new[] { deviation });
			List<DateAndStandardDeviation> result = ToDateAndStandardDeviationList(expiryAndStandardDeviations);
			return result;
		}

		#endregion

		private List<DateAndStandardDeviations> GetStandardDeviationsForDates(IBasicPredictionCalculationData data, Dictionary<DateAndNumberOfDaysUntil, Prediction> predictions, IReadOnlyList<double> deviations)
		{
			List<DateAndStandardDeviations> stdDevs = new List<DateAndStandardDeviations>(predictions.Count);

			List<StdDevPrices> sdPrices = new List<StdDevPrices>();
			foreach (double dev in deviations)
			{
				sdPrices.Add(new StdDevPrices
				{
					Deviation = dev,
					DownPrice = data.LastPrice,
					UpPrice = data.LastPrice,
				});
			}

			stdDevs.Add(new DateAndStandardDeviations
			{
				DateAndNumberOfDaysUntil = new DateAndNumberOfDaysUntil
				{
					FutureDate = _marketWorkTimeService.NowInMarketTimeZone.Date
				},
				StdDevPrices = sdPrices
			});

			foreach (KeyValuePair<DateAndNumberOfDaysUntil, Prediction> kvp in predictions)
			{
				DateAndStandardDeviations expAndStdDev = new DateAndStandardDeviations();
				expAndStdDev.DateAndNumberOfDaysUntil = kvp.Key;
				expAndStdDev.StdDevPrices = new List<StdDevPrices>(deviations.Count);

				foreach (double defaultStdDev in deviations)
				{
					StdDevPrices stdDevPrices = kvp.Value.GetStdDevPrices(defaultStdDev);
					expAndStdDev.StdDevPrices.Add(stdDevPrices);
				}

				stdDevs.Add(expAndStdDev);
			}

			return stdDevs;
		}

		private static List<DateAndStandardDeviation> ToDateAndStandardDeviationList(List<DateAndStandardDeviations> expiryAndStandardDeviations)
		{
			List<DateAndStandardDeviation> stdDevs = new List<DateAndStandardDeviation>(expiryAndStandardDeviations.Count);
			stdDevs.AddRange(expiryAndStandardDeviations.Select(
				estdDev => new DateAndStandardDeviation
				{
					DateAndNumberOfDaysUntil = estdDev.DateAndNumberOfDaysUntil,
					StdDev = estdDev.StdDevPrices.Single()
				}));

			return stdDevs;
		}

		private Tuple<List<DateAndStandardDeviations>, List<Prediction>> GetExpiriesAndStandardDeviations(IBasicPredictionCalculationData data, IReadOnlyList<double> deviations, IReadOnlyList<DateAndNumberOfDaysUntil> referenceDates)
		{
			Dictionary<DateAndNumberOfDaysUntil, Prediction> predictions = MakePredictionsForDates(data, referenceDates);
			List<DateAndStandardDeviations> stdDevs = GetStandardDeviationsForDates(data, predictions, deviations);
			return Tuple.Create(stdDevs, predictions.Values.ToList());
		}
	}
}
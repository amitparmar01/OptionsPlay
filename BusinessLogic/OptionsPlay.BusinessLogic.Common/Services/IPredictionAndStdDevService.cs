using System;
using System.Collections.Generic;
using OptionsPlay.BusinessLogic.Common.Entities;
using OptionsPlay.TechnicalAnalysis.Entities;

namespace OptionsPlay.BusinessLogic.Common
{
	public interface IPredictionAndStdDevService
	{
		/// <summary>
		/// Makes prediction for each date in <paramref name="dates"/> collection
		/// </summary>
		Dictionary<DateAndNumberOfDaysUntil, Prediction> MakePredictionsForDates(IBasicPredictionCalculationData data, IEnumerable<DateAndNumberOfDaysUntil> dates);

		List<DateAndStandardDeviations> GetStandardDeviationsForDates(IBasicPredictionCalculationData data, IReadOnlyList<DateAndNumberOfDaysUntil> referencePoints, IReadOnlyList<double> deviations);

		List<DateAndStandardDeviation> GetStandardDeviationsForDates(IBasicPredictionCalculationData data, IReadOnlyList<DateAndNumberOfDaysUntil> referencePoints, double deviation);

		Prediction GetPrediction(IBasicPredictionCalculationData data, double daysInFuture);

		List<DateAndStandardDeviation> GetExpiriesAndStandardDeviations(IBasicPredictionCalculationData data, IReadOnlyList<DateAndNumberOfDaysUntil> referenceDates, double deviation);

		List<DateAndStandardDeviation> GetStdDevPricesForDates(IBasicPredictionCalculationData data, IReadOnlyList<DateAndNumberOfDaysUntil> referenceDates, double deviation);

		List<DateAndStandardDeviations> GetExpiriesAndDefaultStandardDeviations(IBasicPredictionCalculationData data, IReadOnlyList<DateAndNumberOfDaysUntil> referenceDates);

		Tuple<List<DateAndStandardDeviations>, List<Prediction>> GetExpiriesAndDefaultStandardDeviationsWithPredictions(IBasicPredictionCalculationData data, IReadOnlyList<DateAndNumberOfDaysUntil> referenceDates);
	}
}
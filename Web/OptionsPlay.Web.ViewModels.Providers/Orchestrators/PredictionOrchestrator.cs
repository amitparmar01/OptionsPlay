using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using OptionsPlay.BusinessLogic.Common;
using OptionsPlay.BusinessLogic.Common.Entities;
using OptionsPlay.TechnicalAnalysis.Entities;
using OptionsPlay.Web.ViewModels.Math;

namespace OptionsPlay.Web.ViewModels.Providers.Orchestrators
{
	public class PredictionOrchestrator
	{
		private readonly IPredictionAndStdDevService _predictionAndStdDevService;
		private readonly IMarketDataService _marketDataService;

		public PredictionOrchestrator(IPredictionAndStdDevService predictionAndStdDevService, IMarketDataService marketDataService)
		{
			_predictionAndStdDevService = predictionAndStdDevService;
			_marketDataService = marketDataService;
		}

		public PredictionViewModel GetPrediction(string underlying, int daysInFuture, double? volatility = null)
		{
			OptionChain optionChain = GetOptionChainWithPredefinedVolatility(underlying, volatility);
			Prediction result = _predictionAndStdDevService.GetPrediction(optionChain, daysInFuture);
			PredictionViewModel viewModel = Mapper.Map<Prediction, PredictionViewModel>(result);
			return viewModel;
		}
		
		public List<PredictionViewModel> GetPredictions(string underlying)
		{
			OptionChain optionChain = GetOptionChainWithPredefinedVolatility(underlying, null);
			List<Prediction> predictions =
				optionChain.ExpirationDates.Select(x => _predictionAndStdDevService.GetPrediction(optionChain, x.TotalNumberOfDaysUntilExpiry)).ToList();

			List<PredictionViewModel> results = Mapper.Map<List<Prediction>, List<PredictionViewModel>>(predictions);
			return results;
		}

		public List<DateAndStandardDeviationViewModel> GetProbabilityCone(string symbol, double sd = 1, double? volatility = null)
		{
			OptionChain optionChain = GetOptionChainWithPredefinedVolatility(symbol, volatility);
			List<DateAndStandardDeviation> expiryAndStandardDeviations = _predictionAndStdDevService.GetStandardDeviationsForDates(optionChain,
				optionChain.ExpirationDates, sd);
			List<DateAndStandardDeviationViewModel> viewModel =
				Mapper.Map<List<DateAndStandardDeviation>, List<DateAndStandardDeviationViewModel>>(expiryAndStandardDeviations);
			return viewModel;
		}

		public List<DateAndStandardDeviationViewModel> GetExpiriesAndStandardDeviations(string symbol, double sd, double? volatility)
		{
			OptionChain optionChain = GetOptionChainWithPredefinedVolatility(symbol, volatility);
			List<DateAndStandardDeviation> expiryAndStandardDeviation = _predictionAndStdDevService.GetExpiriesAndStandardDeviations(optionChain,
				optionChain.ExpirationDates,  sd);
			List<DateAndStandardDeviationViewModel> viewModel =
				Mapper.Map<List<DateAndStandardDeviation>, List<DateAndStandardDeviationViewModel>>(expiryAndStandardDeviation);
			return viewModel;
		}

		public List<DateAndDefaultStandardDeviationsViewModel> GetExpiriesAndDefaultStandardDeviations(string symbol, double? volatility)
		{
			OptionChain optionChain = GetOptionChainWithPredefinedVolatility(symbol, volatility);
			List<DateAndStandardDeviations> expiryAndStandardDeviation = _predictionAndStdDevService.GetExpiriesAndDefaultStandardDeviations(optionChain,
				optionChain.ExpirationDates);
			List<DateAndDefaultStandardDeviationsViewModel> viewModel =
				Mapper.Map<List<DateAndStandardDeviations>, List<DateAndDefaultStandardDeviationsViewModel>>(expiryAndStandardDeviation);
			return viewModel;
		}

		private OptionChain GetOptionChainWithPredefinedVolatility(string underlying, double? volatility)
		{
			OptionChain optionChain = _marketDataService.GetOptionChain(underlying);
			optionChain.SetPredefinedVolatility(volatility);
			return optionChain;
		}
	}
}
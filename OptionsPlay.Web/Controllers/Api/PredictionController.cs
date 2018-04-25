using System.Collections.Generic;
using System.Web.Http;
using OptionsPlay.Web.Infrastructure.Attributes.Api;
using OptionsPlay.Web.ViewModels.Math;
using OptionsPlay.Web.ViewModels.Providers.Orchestrators;

namespace OptionsPlay.Web.Controllers.Api
{
	[RoutePrefix("api/prediction")]
	[ApiAuthorize]
	public class PredictionController : ApiController
	{
		private readonly PredictionOrchestrator _predictionOrchestrator;

		public PredictionController(PredictionOrchestrator predictionOrchestrator)
		{
			_predictionOrchestrator = predictionOrchestrator;
		}

		[Route(@"{symbol}/{daysInFuture:regex(^\d{1,3}$)}")]
		public PredictionViewModel GetPrediction(string symbol, int daysInFuture, double? volatility = null)
		{
			PredictionViewModel r = _predictionOrchestrator.GetPrediction(symbol, daysInFuture, volatility);
			return r;
		}

		[Route("{symbol}")]
		public List<PredictionViewModel> GetPredictions(string symbol)
		{

			List<PredictionViewModel> r = _predictionOrchestrator.GetPredictions(symbol);
			return r;
		}

		[Route("probCone/{symbol}")]
		public List<DateAndStandardDeviationViewModel> GetProbabilityCone(string symbol, double sd = 1, double? volatility = null)
		{
			List<DateAndStandardDeviationViewModel> resul = _predictionOrchestrator.GetProbabilityCone(symbol, sd, volatility);
			return resul;
		}

		[Route(@"StdDev/{symbol}")]
		public List<DateAndStandardDeviationViewModel> GetExpiriesAndStandardDeviations(string symbol, double sd = 1,
																						double? volatility = null)
		{
			List<DateAndStandardDeviationViewModel> resul = _predictionOrchestrator.GetExpiriesAndStandardDeviations(symbol, sd, volatility);
			return resul;
		}

		[Route(@"StdDevs/{symbol}")]
		public List<DateAndDefaultStandardDeviationsViewModel> GetExpiriesAndDefaultStandardDeviations(string symbol,
																										double? volatility = null)
		{
			List<DateAndDefaultStandardDeviationsViewModel> stdDevs = 
				_predictionOrchestrator.GetExpiriesAndDefaultStandardDeviations(symbol, volatility);
			return stdDevs;
		}

		// todo: to be implemented in custom service
//		[Route(@"futureprices/{symbol}")]
//		public async Task<EntityResponse<FutureOptionPrices>> GetFutureOptionPrices(string symbol)
//		{
//			OptionChainsProcessorParams data = await _optionChainsProcessor.RequestOptionChainsProcessorParams(symbol);
//			EntityResponse<FutureOptionPrices> response = _optionChainsProcessor.GetFutureOptionPrices(data);
//			return response;
//		}
	}
}
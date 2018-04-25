using System.Collections.Generic;
using System.Web.Http;
using OptionsPlay.BusinessLogic.Common.Services;
using OptionsPlay.TechnicalAnalysis.Entities;
using OptionsPlay.Web.Infrastructure.Attributes.Api;
using OptionsPlay.Web.ViewModels.MarketData;
using OptionsPlay.Web.ViewModels.Providers.Orchestrators;
using OptionsPlay.BusinessLogic.Common.Entities;

namespace OptionsPlay.Web.Controllers.Api
{
	[RoutePrefix("api/suggestion")]
	[ApiAuthorize]
	public class SuggestionController : ApiController
	{
		private readonly CoveredCallOrchestrator _coveredCallOrchestrator;
		private readonly ISuggestedStrategiesService _suggestedStrategiesService;

		public SuggestionController(CoveredCallOrchestrator coveredCallOrchestrator, ISuggestedStrategiesService suggestedStrategiesService)
		{
			_coveredCallOrchestrator = coveredCallOrchestrator;
			_suggestedStrategiesService = suggestedStrategiesService;
		}

		[HttpGet]
		[Route("coveredCall/optimal/{symbol}")]
		[Route("coveredCall/optimal/{symbol}/{legType}")]
		public List<CoveredCallViewModel> GetOptimal(string symbol, LegType? legType = null, double? minimumReturn = null, double? minimumPremium = null, double? volatility = null)
		{
			List<CoveredCallViewModel> coveredCallViewModels = _coveredCallOrchestrator.FindOptimal(symbol, legType, minimumReturn, minimumPremium, volatility);
			return coveredCallViewModels;
		}

		[HttpGet]
		[Route("coveredCall/{symbol}")]
		[Route("coveredCall/{symbol}/{legType}")]
		public List<CoveredCallViewModel> GetAll(string symbol, LegType? legType = null, double? minimumReturn = null, double? minimumPremium = null, double? volatility = null)
		{
			List<CoveredCallViewModel> coveredCallViewModels = _coveredCallOrchestrator.GetAll(symbol, legType, minimumReturn, minimumPremium, volatility);
			return coveredCallViewModels;
		}


		[HttpGet]
		[Route("tradingStrategies/{symbol}")]
		[Route("tradingStrategies/{symbol}/{opposite}")]
		public List<SuggestedStrategy> GetTradingStrategies(string symbol, bool opposite = false)
		{
			return _suggestedStrategiesService.GetSuggestedTradingStrategies(symbol, opposite);
		}
	}
}
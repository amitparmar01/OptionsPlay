using System.Collections.Generic;
using AutoMapper;
using OptionsPlay.BusinessLogic.Common;
using OptionsPlay.BusinessLogic.Common.Entities;
using OptionsPlay.TechnicalAnalysis.Entities;
using OptionsPlay.Web.ViewModels.MarketData;

namespace OptionsPlay.Web.ViewModels.Providers.Orchestrators
{
	public class CoveredCallOrchestrator
	{
		private readonly IMarketDataService _marketDataService;
		private readonly ICoveredCallService _coveredCallService;

		#region Public

		public CoveredCallOrchestrator(IMarketDataService marketDataService, ICoveredCallService coveredCallService)
		{
			_marketDataService = marketDataService;
			_coveredCallService = coveredCallService;
		}

		public List<CoveredCallViewModel> FindOptimal(string underlying, LegType? legType = null, double? minimumReturn = null, double? minimumPremium = null, double? volatility = null)
		{
			OptionChain chain = GetOptionChainWithPredefinedVolatility(underlying, volatility);

			List<CoveredCall> coveredCalls = _coveredCallService.GetOptimalCoveredCalls(chain, legType, minimumPremium, minimumReturn);
			List<CoveredCallViewModel> viewModels = Mapper.Map<List<CoveredCall>, List<CoveredCallViewModel>>(coveredCalls);
			return viewModels;
		}

		public List<CoveredCallViewModel> GetAll(string underlying, LegType? legType = null, double? minimumReturn = null, double? minimumPremium = null, double? volatility = null)
		{
			OptionChain chain = GetOptionChainWithPredefinedVolatility(underlying, volatility);

			List<CoveredCall> coveredCalls = _coveredCallService.GetAllCoveredCalls(chain, legType, minimumPremium, minimumReturn);
			List<CoveredCallViewModel> viewModels = Mapper.Map<List<CoveredCall>, List<CoveredCallViewModel>>(coveredCalls);
			return viewModels;
		}

		#endregion Public

		private OptionChain GetOptionChainWithPredefinedVolatility(string underlying, double? volatility)
		{
			OptionChain optionChain = _marketDataService.GetOptionChain(underlying);
			optionChain.SetPredefinedVolatility(volatility);
			return optionChain;
		}
	}
}
using System.Web.Http;
using AutoMapper;
using OptionsPlay.Web.Infrastructure.Attributes.Api;
using OptionsPlay.Web.ViewModels.MarketData;
using OptionsPlay.BusinessLogic.Common;
using OptionsPlay.BusinessLogic.Common.Entities;

namespace OptionsPlay.Web.Controllers.Api
{
	[RoutePrefix("api/optionchains")]
	[ApiAuthorize]
	public class OptionChainsController : ApiController
	{
		private readonly IMarketDataService _marketDataService;

		public OptionChainsController(IMarketDataService marketDataService)
		{
			_marketDataService = marketDataService;
		}

		[Route("{underlying}")]
		public OptionChainViewModel GetOptionChains(string underlying)
		{
			OptionChain optionChain = _marketDataService.GetOptionChain(underlying);
			OptionChainViewModel result = Mapper.Map<OptionChainViewModel>(optionChain);
			return result;
		}
	}
}
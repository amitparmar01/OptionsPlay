using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using System.Web.Http.ModelBinding;
using AutoMapper;
using OptionsPlay.Common.ServiceResponses;
using OptionsPlay.DAL.SZKingdom.Common.Entities;
using OptionsPlay.Web.Infrastructure.Attributes.Api;
using OptionsPlay.Web.Infrastructure.ModelBinders;
using OptionsPlay.Web.ViewModels.MarketData;
using OptionsPlay.BusinessLogic.Common;
using OptionsPlay.BusinessLogic.Common.Entities;
using OptionsPlay.Web.ViewModels.MarketData.SZKingdom;

namespace OptionsPlay.Web.Controllers.Api
{
	[RoutePrefix("api")]
	[ApiAuthorize]
	public class QuotationController : ApiController
	{
		private readonly IMarketDataService _marketDataService;

		public QuotationController(IMarketDataService marketDataService)
		{
			_marketDataService = marketDataService;
		}

		[Route("quotation/{securityCode}")]
		public SecurityQuotationViewModel GetSecurityQuotation(string securityCode)
		{
			SecurityQuotation result = _marketDataService.GetSecurityQuotation(securityCode);
			return Mapper.Map<SecurityQuotationViewModel>(result);
		}

		[Route("quotations/{securityCodes}")]
		public List<EntityResponse<SecurityQuotationViewModel>> GetSecurityQuotations(
			[ModelBinder(typeof(CommaSeparatedStringToListModelBinder))] List<string> securityCodes)
		{
			List<EntityResponse<SecurityQuotation>> results = _marketDataService.GetSecurityQuotations(securityCodes);
			return Mapper.Map<List<EntityResponse<SecurityQuotationViewModel>>>(results);
		}

		[Route("optionables")]
		public List<SecurityInformationViewModel> GetOptionalSecurities()
		{
			List<SecurityInformation> results = _marketDataService.GetOptionableSecurities();
			return Mapper.Map<List<SecurityInformationViewModel>>(results);
		}

		[Route("optionables/quotes")]
		public List<SecurityQuotationViewModel> GetOptionalQuotes()
		{
			List<SecurityInformation> results = _marketDataService.GetOptionableSecurities();
			List<SecurityQuotationViewModel> quotes = results.Select(s => GetSecurityQuotation(s.SecurityCode)).ToList();
			return quotes;
		}
	}
}

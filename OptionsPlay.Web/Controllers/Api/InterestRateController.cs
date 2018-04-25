using System.Web.Http;
using OptionsPlay.BusinessLogic.Common;
using OptionsPlay.Web.Infrastructure.Attributes.Api;

namespace OptionsPlay.Web.Controllers.Api
{
	[ApiAuthorize]
	[RoutePrefix("api/interestRate")]
	public class InterestRateController : ApiController
	{
		private readonly IRiskFreeRateProvider _riskFreeRateProvider;

		public InterestRateController(IRiskFreeRateProvider riskFreeRateProvider)
		{
			_riskFreeRateProvider = riskFreeRateProvider;
		}

		[Route("")]
		public double GetInterestRate()
		{
			double riskFreeRate = _riskFreeRateProvider.GetRiskFreeRate();
			return riskFreeRate;
		}
	}
}
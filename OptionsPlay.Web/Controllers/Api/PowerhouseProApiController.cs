using OptionsPlay.Web.Infrastructure.Attributes.Api;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace OptionsPlay.Web.Controllers.Api
{
    [ApiAuthorize]
    [RoutePrefix("api/powerhouse/pro")]
    public class PowerhouseProApiController : ApiController
    {
        //
        // GET: /PowerhouseProApi/
        [HttpGet]
        [Route("tradeIdeas")]
        public async Task<PowerhouseProPartWhatTradeIdeas> TradeIdeas()
        {
            PowerhouseProPartWhatTradeIdeas tradeIdeas = await _powerhouseProOrchestrator.GetPartWhatTradeIdeas();
            return tradeIdeas;
        }
	}
}
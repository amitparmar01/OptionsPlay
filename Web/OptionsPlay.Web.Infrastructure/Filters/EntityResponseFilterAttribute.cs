using System.Net.Http;
using System.Web.Http.Filters;
using OptionsPlay.Common.Exceptions;
using OptionsPlay.Common.ServiceResponses;

namespace OptionsPlay.Web.Infrastructure.Filters
{
	public class EntityResponseFilterAttribute : ActionFilterAttribute
	{
		public override void OnActionExecuted(HttpActionExecutedContext actionExecutedContext)
		{
			if (actionExecutedContext.Response != null)
			{
				BaseResponse baseResponse;
				actionExecutedContext.Response.TryGetContentValue(out baseResponse);
				if (baseResponse != null)
				{
					if (!baseResponse.IsSuccess)
					{
						throw new InternalException(baseResponse);
					}
				}
			}

			base.OnActionExecuted(actionExecutedContext);
		}
	}
}
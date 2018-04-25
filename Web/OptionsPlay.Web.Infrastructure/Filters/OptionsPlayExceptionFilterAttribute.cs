using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Filters;
using OptionsPlay.Common.Exceptions;
using OptionsPlay.Logging;
using OptionsPlay.Web.ViewModels.Base;
using OptionsPlay.Web.ViewModels.Providers;

namespace OptionsPlay.Web.Infrastructure.Filters
{
	public class OptionsPlayExceptionFilterAttribute : ExceptionFilterAttribute
	{
		public override void OnException(HttpActionExecutedContext context)
		{
			InternalException internalException = context.Exception as InternalException;
			if (internalException != null)
			{
				AuthorizeException authorizeException = internalException as AuthorizeException;
				HttpStatusCode statusCode = authorizeException != null
					? HttpStatusCode.Forbidden
					: HttpStatusCode.InternalServerError;
				context.Response = new HttpResponseMessage(statusCode);

				ErrorResponse errResponse = ErrorCodeLocalizator.Localize(internalException);

				context.Response.Content = new ObjectContent(
					typeof(ErrorResponse), errResponse, GlobalConfiguration.Configuration.Formatters.JsonFormatter);

				Logger.Error(context.Exception.Message);
			}
			else
			{
				Logger.Error(context.Exception.Message, context.Exception);
			}
		}
	}
}
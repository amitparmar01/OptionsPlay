using System.Net.Http.Formatting;
using System.Web.Http;
using Newtonsoft.Json.Converters;
using Newtonsoft.Json.Serialization;
using OptionsPlay.Web.Infrastructure.Filters;
using OptionsPlay.Web.Infrastructure.Json;
using System.Net.Http;
using System.Threading.Tasks;
using System.Threading;
using System.Net;

namespace OptionsPlay.Web
{
	public static class GlobalConfig
	{
		public static void CustomizeConfig(HttpConfiguration config)
		{
			// Remove Xml formatters. This means when we visit an endpoint from a browser,
			// Instead of returning Xml, it will return Json.
			config.Formatters.Remove(config.Formatters.XmlFormatter);
			config.Formatters.Remove(config.Formatters.JsonFormatter);
			config.Formatters.Insert(0, new CustomJsonFormatter());

			JsonMediaTypeFormatter json = config.Formatters.JsonFormatter;
			json.SerializerSettings.Converters.Add(new StringEnumConverter());
			json.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();

			// Add model validation globally
			config.Filters.Add(new ModelStateValidationFilterAttribute());

            // suppress response in order to avoid iis crash and cpu performance higher than before
            config.MessageHandlers.Add(new CancelledTaskBugWorkaroundMessageHandler());
		}
        class CancelledTaskBugWorkaroundMessageHandler : DelegatingHandler
        {
            protected override async Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken cancellationToken)
            {
                HttpResponseMessage response = await base.SendAsync(request, cancellationToken);

                // Try to suppress response content when the cancellation token has fired; ASP.NET will log to the Application event log if there's content in this case.
                if (cancellationToken.IsCancellationRequested)
                {
                    Logging.Logger.Debug("IIS Crash but has suppressed response content ");
                    return new HttpResponseMessage(HttpStatusCode.InternalServerError);
                }

                return response;
            }
        }
	}
}
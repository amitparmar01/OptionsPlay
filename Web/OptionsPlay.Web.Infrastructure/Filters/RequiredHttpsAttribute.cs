using System;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;

namespace OptionsPlay.Web.Infrastructure.Filters
{
	public class RequireHttpsAttribute : ActionFilterAttribute, IActionFilter
	{
		public Task<HttpResponseMessage> ExecuteActionFilterAsync(HttpActionContext actionContext, CancellationToken cancellationToken, Func<Task<HttpResponseMessage>> continuation)
		{
			Uri uri = actionContext.Request.RequestUri;
			if (uri.Scheme != "https" && !uri.AbsolutePath.ToLower().Contains("powerhouse"))
			{
				return Task.Factory.StartNew(ac =>
				{
					Uri requestUri = ((HttpActionContext)ac).Request.RequestUri;
					HttpResponseMessage message = new HttpResponseMessage(HttpStatusCode.Redirect);
					message.Headers.Location = new Uri(requestUri.AbsoluteUri.Replace("http:", "https:"));
					return message;
				}, actionContext, cancellationToken);
			}

			return continuation.Invoke();
		}
	}
}
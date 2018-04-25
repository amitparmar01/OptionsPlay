using System;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;
using System.Web.Http.ModelBinding;
using Newtonsoft.Json.Linq;
using OptionsPlay.Logging;

namespace OptionsPlay.Web.Infrastructure.Filters
{
	public class ModelStateValidationFilterAttribute : ActionFilterAttribute
	{
		public override void OnActionExecuting(HttpActionContext context)
		{
			ModelStateDictionary modelState = context.ModelState;
			if (modelState.IsValid)
			{
				return;
			}
			JObject errors = new JObject();
			foreach (string key in modelState.Keys)
			{
				ModelState state = modelState[key];
				if (!state.Errors.Any())
				{
					continue;
				}
				string errorMessage = state.Errors.First().ErrorMessage;
				errors[key] = errorMessage;
				Logger.Error(errorMessage);
			}
			context.Response = context.Request.CreateResponse(HttpStatusCode.BadRequest, errors);
		}

		public override void OnActionExecuted(HttpActionExecutedContext actionExecutedContext)
		{
			Exception exception = actionExecutedContext.Exception;
			if (exception != null)
			{
				string errorMessage = string.Format("Unhandled exception: {0}", actionExecutedContext.Exception.Message);
				Logger.Error(errorMessage, actionExecutedContext.Exception);
			}

			base.OnActionExecuted(actionExecutedContext);
		}

	}
}

using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Threading.Tasks;
using OptionsPlay.Common.ServiceResponses;

namespace OptionsPlay.Web.Infrastructure.Json
{
	public class CustomJsonFormatter : JsonMediaTypeFormatter
	{
		public override Task WriteToStreamAsync(Type type, object value, Stream writeStream, HttpContent content,
			TransportContext transportContext)
		{
			EntityResponse entityResponse = value as EntityResponse;
			if (entityResponse != null)
			{
				return base.WriteToStreamAsync(
					entityResponse.Entity.GetType(),
					entityResponse.Entity,
					writeStream,
					content,
					transportContext);
			}

			IEnumerable<EntityResponse> responses = value as IEnumerable<EntityResponse>;
			if (responses != null)
			{
				List<object> result = responses.Select(response => !response.IsSuccess
					? response as object
					: response.Entity).ToList();
				return base.WriteToStreamAsync(result.GetType(), result, writeStream, content, transportContext);
			}


			return base.WriteToStreamAsync(type, value, writeStream, content, transportContext);
		}
	}
}
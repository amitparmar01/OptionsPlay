using System;
using OptionsPlay.Common.ServiceResponses;
using OptionsPlay.Common.Utilities;

namespace OptionsPlay.Common.Exceptions
{
	public class InternalException : Exception
	{
		public InternalException(BaseResponse response)
		{
			Response = response;
			ErrorCode = response.ErrorCode;
			ErrorMessage = response.FormattedMessage;
		}

		public InternalException(ErrorCode code)
		{
			Response = null;
			ErrorCode = code;
		}

		public BaseResponse Response { get; private set; }

		public ErrorCode ErrorCode { get; private set; }

		public string ErrorMessage { get; private set; }

		#region Overrides of Exception

		public override string Message
		{
			get
			{
				if (Response != null && !string.IsNullOrWhiteSpace(Response.FormattedMessage))
				{
					return Response.FormattedMessage;
				}
				return ErrorCode.SplitCamelCase();
			}
		}

		#endregion
	}
}

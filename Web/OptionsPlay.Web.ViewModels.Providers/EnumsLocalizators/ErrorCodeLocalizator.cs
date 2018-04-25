using OptionsPlay.Common.Exceptions;
using OptionsPlay.Common.ServiceResponses;
using OptionsPlay.Common.Utilities;
using OptionsPlay.Web.ViewModels.Base;

namespace OptionsPlay.Web.ViewModels.Providers
{
	public static class ErrorCodeLocalizator
	{
		public static ErrorResponse Localize(InternalException exception)
		{
			ErrorResponse errorResponse = exception.Response != null
				? Localize(exception.Response)
				: LocalizeMessage(exception.ErrorCode, exception.Message);

			return errorResponse;
		}

		private static ErrorResponse Localize(BaseResponse response)
		{
			ErrorResponse errorCodeLocalized = LocalizeMessage(response.ErrorCode, response.FormattedMessage);
			return errorCodeLocalized;
		}

		private static ErrorResponse LocalizeMessage(ErrorCode errorCode, string message)
		{
			ErrorResponse errorResponse = new ErrorResponse
			{
				Code = (int)errorCode,
			};

			errorResponse.Message = message ?? errorCode.SplitCamelCase();
			//TODO: implement
			//switch (error)
			//{
			//	case ErrorCode.SymbolNotFound:
			//		errorResponse.Title = ErrorMessages.InvalidSymbolMessageTitle;
			//		break;
			//	default:
			//		errorResponse.Title = ErrorMessages.InternalServerErrorTitle;
			//		break;
			//}

			return errorResponse;
		}
	}
}

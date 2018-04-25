namespace OptionsPlay.Common.ServiceResponses
{
	public class BaseResponse : IResponse
	{
		public BaseResponse()
		{
			ErrorCode = ErrorCode.None;
			FormattedMessage = null;
		}

		protected BaseResponse(ErrorCode error, string formattedMessage)
		{
			ErrorCode = error;
			FormattedMessage = formattedMessage;
		}

		public ErrorCode ErrorCode { get; set; }

		public string FormattedMessage { get; set; }

		public bool IsSuccess
		{
			get
			{
				bool isSuccess = ErrorCode == ErrorCode.None;
				return isSuccess;
			}
		}

		public static BaseResponse Success()
		{
			return new BaseResponse();
		}

		public static BaseResponse Error(ErrorCode errorCode, string formattedMessage = null)
		{
			BaseResponse result = new BaseResponse(errorCode, formattedMessage);
			return result;
		}

		public static implicit operator BaseResponse(ErrorCode code)
		{
			BaseResponse result = Error(code);
			return result;
		}
	}
}

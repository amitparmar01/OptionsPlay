using OptionsPlay.Common.ServiceResponses;

namespace OptionsPlay.Common.Exceptions
{
	public class AuthorizeException : InternalException
	{
		public string UserDisplayName { private set; get; }

		public string Permissions { private set; get; }

		public string CustomMessage { get; private set; }

		public AuthorizeException(ErrorCode errorCode)
			: base(errorCode)
		{
		}

		public AuthorizeException(ErrorCode errorCode, string userName, string permissions)
			: base(errorCode)
		{
			UserDisplayName = userName;
			Permissions = permissions;
		}

		public AuthorizeException(ErrorCode errorCode, string customMessage)
			: base(errorCode)
		{
			CustomMessage = customMessage;
		}
	}
}

namespace OptionsPlay.Common.ServiceResponses
{
	public interface IResponse
	{
		ErrorCode ErrorCode { get; }

		string FormattedMessage { get; }

		bool IsSuccess { get; }
	}
}

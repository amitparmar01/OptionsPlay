namespace OptionsPlay.Common.ServiceResponses
{
	public interface IEntityResponse : IResponse
	{
		object Entity { get; }
	}

	/// <summary>
	/// To provide covariance for mappers.
	/// </summary>
	/// <typeparam name="T"></typeparam>
	public interface IEntityResponse<out T> : IEntityResponse
	{
		new T Entity { get; }
	}
}

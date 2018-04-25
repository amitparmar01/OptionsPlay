using System.Collections.Generic;
using System.Threading.Tasks;

namespace OptionsPlay.Web.SignalR
{
	/// <summary>
	/// Maps connection id to user id and vice-versa.
	/// </summary>
	public interface IUserToConnectionMapper
	{
		/// <summary>
		/// Maps <paramref name="connectionId"/> to <paramref name="userId"/>
		/// </summary>
		void Connect(string connectionId, long userId);

		/// <summary>
		/// Deletes entry for <paramref name="connectionId"/> given.
		/// </summary>
		/// <returns>User id. null if no such connection ID has been found</returns>
		long? Disconnect(string connectionId);

		/// <summary>
		/// Tries to map <paramref name="connectionId"/> to user.
		/// </summary>
		/// <returns>User id. null if there is no such connection</returns>
		long? GetUserIdByConnectionId(string connectionId);

		/// <summary>
		/// tries to get all connection ids for specific user. 
		/// </summary>
		/// <returns>List of connection Ids. null if there is no such user registered.</returns>
		List<string> GetConnectionIdsByUser(long userId);

		Dictionary<string, Task> GetTasksByConnectionId(string connectionId);

		Dictionary<string, HashSet<string>> GetSubscriptionsByConnectionId(string connectionId);
	}
}

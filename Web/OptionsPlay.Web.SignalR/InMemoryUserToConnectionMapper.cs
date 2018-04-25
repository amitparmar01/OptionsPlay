using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OptionsPlay.Web.SignalR
{
	internal class InMemoryUserToConnectionMapper : IUserToConnectionMapper
	{
		private readonly Dictionary<long, HashSet<string>> _userIdToConnectionsIdMap = new Dictionary<long, HashSet<string>>();

		private readonly Dictionary<string, Dictionary<string, Task>> _connectionToTasksMap
			= new Dictionary<string, Dictionary<string, Task>>();

		private readonly Dictionary<string, Dictionary<string, HashSet<string>>> _connectionToSubscriptionsMap
			= new Dictionary<string, Dictionary<string, HashSet<string>>>();

		#region Implementation of IUserToConnectionMapper

		public void Connect(string connectionId, long userId)
		{
			lock (_userIdToConnectionsIdMap)
			{
				if (_userIdToConnectionsIdMap.ContainsKey(userId))
				{
					_userIdToConnectionsIdMap[userId].Add(connectionId);
				}
				else
				{
					_userIdToConnectionsIdMap[userId] = new HashSet<string>
					{
						connectionId
					};
				}
				if (!_connectionToTasksMap.ContainsKey(connectionId))
				{
					_connectionToTasksMap[connectionId] = new Dictionary<string, Task>();
					_connectionToSubscriptionsMap[connectionId] = new Dictionary<string, HashSet<string>>();
				}
			}
		}
		
		public long? Disconnect(string connectionId)
		{
			lock (_userIdToConnectionsIdMap)
			{
				KeyValuePair<long, HashSet<string>> userIdAndConnectionStrings
					= _userIdToConnectionsIdMap.FirstOrDefault(x => x.Value.Contains(connectionId));
				if (userIdAndConnectionStrings.Equals(default(KeyValuePair<long, HashSet<string>>)))
				{
					return null;
				}

				long userId = userIdAndConnectionStrings.Key;
				if (_userIdToConnectionsIdMap[userId].Count == 1)
				{
					_userIdToConnectionsIdMap.Remove(userId);
				}
				else
				{
					_userIdToConnectionsIdMap[userId].Remove(connectionId);
				}

				if (_connectionToTasksMap.ContainsKey(connectionId))
				{
					_connectionToTasksMap.Remove(connectionId);
					_connectionToSubscriptionsMap.Remove(connectionId);
				}

				return userId;
			}
		}

		public long? GetUserIdByConnectionId(string connectionId)
		{
			lock (_userIdToConnectionsIdMap)
			{
				KeyValuePair<long, HashSet<string>> userIdAndConnectionStrings
					= _userIdToConnectionsIdMap.FirstOrDefault(x => x.Value.Contains(connectionId));
				if (userIdAndConnectionStrings.Equals(default(KeyValuePair<long, HashSet<string>>)))
				{
					return null;
				}

				return userIdAndConnectionStrings.Key;
			}
		}

		public List<string> GetConnectionIdsByUser(long userId)
		{
			HashSet<string> connections;
			if (_userIdToConnectionsIdMap.TryGetValue(userId, out connections))
			{
				return connections.ToList();
			}

			return null;
		}

		public Dictionary<string, Task> GetTasksByConnectionId(string connectionId)
		{
			if (_connectionToTasksMap.ContainsKey(connectionId))
			{
				return _connectionToTasksMap[connectionId];
			}
			return null;
		}

		public Dictionary<string, HashSet<string>> GetSubscriptionsByConnectionId(string connectionId)
		{
			if (_connectionToSubscriptionsMap.ContainsKey(connectionId))
			{
				return _connectionToSubscriptionsMap[connectionId];
			}
			return null;
		}
		#endregion
	}
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Policy;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNet.SignalR;
using OptionsPlay.Security.Identities;
using StructureMap;

namespace OptionsPlay.Web.SignalR.Hubs
{
	public abstract class BaseHub : Hub
	{
		private readonly Lazy<IUserToConnectionMapper> _userToConnectionMapperLazy = 
			new Lazy<IUserToConnectionMapper>(ObjectFactory.GetInstance<IUserToConnectionMapper>);
		
		protected static readonly object Locker = new object();

		protected IUserToConnectionMapper UserToConnectionMapper
		{
			get
			{
				return _userToConnectionMapperLazy.Value;
			}
		}

		protected long UserId
		{
			get
			{
				long userId = ((OptionsPlayIdentity)Context.User.Identity).UserId;
				return userId;
			}
		}

		protected OptionsPlayFCUserIdentity FCIdentity
		{
			get
			{
				OptionsPlayFCUserIdentity identity = Context.User.Identity as OptionsPlayFCUserIdentity;
				return identity;
			}
		}

		protected Dictionary<string, Task> DataPushingTasks
		{
			get
			{
				return UserToConnectionMapper.GetTasksByConnectionId(Context.ConnectionId);
			}
		}

		protected Dictionary<string, HashSet<string>> Subscriptions
		{
			get
			{
				return UserToConnectionMapper.GetSubscriptionsByConnectionId(Context.ConnectionId);
			}
		}
		
		protected bool IsOnline
		{
			get
			{
				return UserToConnectionMapper.GetUserIdByConnectionId(Context.ConnectionId) != null;
			}
		}

		protected int Interval { get; set; }
		
		protected void ConfirmDataPushing(string taskName, string subscription, Action taskFunc)
		{
			lock (taskName)
			{
				if (DataPushingTasks != null)
				{
					if (subscription != null)
					{
						if (!Subscriptions.ContainsKey(taskName))
						{
							Subscriptions[taskName] = new HashSet<string>();
						}
						Subscriptions[taskName].Add(subscription);
					}
					if (!DataPushingTasks.ContainsKey(taskName))
					{
						DataPushingTasks[taskName] = new Task(() =>
						{
							while (true)
							{
								Thread.Sleep(Interval);
								lock (Locker)
								{
									if (!IsOnline)
									{
										break;
									}
									taskFunc.Invoke();
								}
							}
							if (DataPushingTasks != null)
							{
								DataPushingTasks.Remove(taskName);
								Subscriptions.Remove(taskName);
							}
						});
						DataPushingTasks[taskName].Start();
					}
				}
			}
		}

		#region Overrides of Hub

		public override Task OnConnected()
		{
			UserToConnectionMapper.Connect(Context.ConnectionId, UserId);
			return base.OnConnected();
		}

		public override Task OnDisconnected(bool stopCalled)
		{
			UserToConnectionMapper.Disconnect(Context.ConnectionId);
			return base.OnDisconnected(stopCalled);
		}

		public override Task OnReconnected()
		{
			UserToConnectionMapper.Connect(Context.ConnectionId, UserId);
			return base.OnReconnected();
		}

		#endregion
	}
}
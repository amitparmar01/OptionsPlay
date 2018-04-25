using System.Collections.Generic;
using System.Runtime.InteropServices.ComTypes;
using System.Security.Principal;
using System.Web;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;
using OptionsPlay.Security.Identities;
using OptionsPlay.Web.SignalR.Hubs;

namespace OptionsPlay.Web.SignalR.Push
{
	public class BasePush<T> where T : Hub
	{
		protected readonly IUserToConnectionMapper UserToConnectionMapper;
		protected readonly IHubConnectionContext<dynamic> Clients;

		public BasePush(IUserToConnectionMapper userToConnectionMapper)
		{
			UserToConnectionMapper = userToConnectionMapper;
			Clients = GlobalHost.ConnectionManager.GetHubContext<T>().Clients;
            //GlobalHost.Configuration.KeepAlive = null;
		}

		protected bool AreUserAndFunctionIsValid()
		{
			IOptionsPlayIdentity identity = FCIdentity;
			bool result;
			if (FCIdentity == null)
			{
				result = false;
			}
			else
			{
				List<string> connections = UserToConnectionMapper.GetConnectionIdsByUser(identity.UserId);
				result = connections != null;
			}
			return result;
		}

		protected static OptionsPlayFCUserIdentity FCIdentity
		{
			get
			{
				if (HttpContext.Current == null)
				{
					return null;
				}

				IPrincipal user = HttpContext.Current.User;
				if (user == null)
				{
					return null;
				}
				OptionsPlayFCUserIdentity identity = user.Identity as OptionsPlayFCUserIdentity;
				return identity;
			}
		}
	}
}
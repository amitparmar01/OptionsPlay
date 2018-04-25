using System;
using System.Collections.Generic;
using OptionsPlay.Common.ServiceResponses;
using OptionsPlay.Common.Tracing;
using OptionsPlay.Web.SignalR.Hubs;

namespace OptionsPlay.Web.SignalR.Push
{
	public class SZKingdomTraceManager : BasePush<SZKingdomTraceHub>, ITraceManager
	{
		private const string TraceFunction = "MarketDataLibrary.ExecuteCommand";

		public SZKingdomTraceManager(IUserToConnectionMapper userToConnectionMapper)
			: base(userToConnectionMapper)
		{
		}

		#region Implementation of ITraceManager

		public void TraceStart(TraceInfo traceInfo)
		{
			if (!AreUserAndFunctionIsValid(traceInfo))
			{
				return;
			}

			List<string> connections = UserToConnectionMapper.GetConnectionIdsByUser(FCIdentity.UserId);
			Clients.Clients(connections).traceStart(traceInfo.Parameters[0].ToString());
		}

		public void TraceFinish(TraceInfo traceInfo, object result, TimeSpan duration)
		{
			if (!AreUserAndFunctionIsValid(traceInfo))
			{
				return;
			}

			List<string> connections = UserToConnectionMapper.GetConnectionIdsByUser(FCIdentity.UserId);
			dynamic clientsEntryPoint = Clients.Clients(connections);

			EntityResponse er = (EntityResponse)result;
			if (er.IsSuccess)
			{
				clientsEntryPoint.traceResult(traceInfo.Parameters[0].ToString(), duration.TotalMilliseconds);
			}
			else
			{
				clientsEntryPoint.traceError(traceInfo.Parameters[0].ToString(), er.FormattedMessage, duration.TotalMilliseconds);
			}
		}

		public void TraceException(TraceInfo traceInfo, Exception exception, TimeSpan duration)
		{
			if (!AreUserAndFunctionIsValid(traceInfo))
			{
				return;
			}

			List<string> connections = UserToConnectionMapper.GetConnectionIdsByUser(FCIdentity.UserId);
			dynamic clientsEntryPoint = Clients.Clients(connections);
			clientsEntryPoint.traceError(traceInfo.Parameters[0].ToString(), exception.Message, duration.TotalMilliseconds);
		}

		#endregion

		private bool AreUserAndFunctionIsValid(TraceInfo trace)
		{
			if (trace.MethodName == null || !trace.MethodName.Contains(TraceFunction))
			{
				return false;
			}

			bool result;
			if (FCIdentity == null)
			{
				result = false;
			}
			else
			{
				List<string> connections = UserToConnectionMapper.GetConnectionIdsByUser(FCIdentity.UserId);
				result = connections != null;
			}
			return result;
		}

	}
}
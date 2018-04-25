using System;
using System.Collections.Generic;
using System.Data;
using OptionsPlay.Common.ServiceResponses;
using OptionsPlay.Common.Utilities;
using OptionsPlay.DAL.SZKingdom.Common.Configuration;
using OptionsPlay.DAL.SZKingdom.DataProvider.Entities;

namespace OptionsPlay.DAL.SZKingdom.DataProvider
{
	public class MarketDataLibraryWrapper : IMarketDataLibrary
	{
		public MarketDataLibraryWrapper()
		{
			int numberOfConcurrentConnections = SZKingdomConfiguration.LoadConfiguration().NumberOfConcurrentConnections;
			ObjectPool<MarketDataLibrary>.Instance.Limit = numberOfConcurrentConnections;
		}

		#region Implementation of IMarketDataLibrary

		public EntityResponse<DataTable> ExecuteCommand(SZKingdomRequest request, List<SZKingdomArgument> arguments)
		{
			return Wrap(library => library.ExecuteCommand(request, arguments));
		}

		public EntityResponse<T> ExecuteCommandSingleEntity<T>(SZKingdomRequest request, List<SZKingdomArgument> arguments) where T : new()
		{
			return Wrap(library => library.ExecuteCommandSingleEntity<T>(request, arguments));
		}

		public EntityResponse<List<T>> ExecuteCommandList<T>(SZKingdomRequest request, List<SZKingdomArgument> arguments) where T : new()
		{
			return Wrap(library => library.ExecuteCommandList<T>(request, arguments));
		}

		public string EncryptPassword(string key, string password)
		{
			return Wrap(library => library.EncryptPassword(key, password));
		}

		#endregion

		private T Wrap<T>(Func<IMarketDataLibrary, T> action)
		{
            //System.Diagnostics.Debug.WriteLine("Acquire Wrap : action = " + action);
			MarketDataLibrary lib = ObjectPool<MarketDataLibrary>.Instance.Acquire();
            T result;
            try
            {
                result = action(lib);
                //System.Diagnostics.Debug.WriteLine("Execute action = " + action);
            }
            finally
            {
                ObjectPool<MarketDataLibrary>.Instance.Release(lib);
                //System.Diagnostics.Debug.WriteLine("Release Wrap : action = " + action);
            }
			return result;
		}
	}
}
using System.Collections.Generic;
using System.Data;
using OptionsPlay.Common.ServiceResponses;
using OptionsPlay.DAL.SZKingdom.DataProvider.Entities;

namespace OptionsPlay.DAL.SZKingdom.DataProvider
{
	public interface IMarketDataLibrary
	{
		/// <summary>
		/// Executes command against market data library.
		/// </summary>
		/// <param name="request">request type to execute</param>
		/// <param name="arguments">input parameters for this request (name => value)</param>
		/// <returns></returns>
		EntityResponse<DataTable> ExecuteCommand(SZKingdomRequest request, List<SZKingdomArgument> arguments);

		EntityResponse<T> ExecuteCommandSingleEntity<T>(SZKingdomRequest request, List<SZKingdomArgument> arguments) where T : new();

		EntityResponse<List<T>> ExecuteCommandList<T>(SZKingdomRequest request, List<SZKingdomArgument> arguments) where T : new();

		string EncryptPassword(string key, string password);
	}
}
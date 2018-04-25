using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using OptionsPlay.Web.ViewModels.MarketData;

namespace OptionsPlay.Web.SignalR.Push
{
	public interface IMarketDataPusher
	{
		/// <summary>
		/// Adds <paramref name="securityCodes"/> to <paramref name="connectionId"/> subscription. 
		/// This method do not remove any securityCodes from current client subscription 
		/// </summary>
		void SubscribeQuotes(string connectionId, List<string> securityCodes);

		/// <summary>
		/// Removes <paramref name="securityCodes"/> from subscription list of <paramref name="connectionId"/>
		/// </summary>
		void UnsubscribeQuotes(string connectionId, List<string> securityCodes);

		/// <summary>
		/// Adds <paramref name="optionNumbers"/> to <paramref name="connectionId"/> subscription. 
		/// This method do not remove any optionNumbers from current client subscription 
		/// </summary>
		void SubscribeOptions(string connectionId, List<string> optionNumbers);

		/// <summary>
		/// Removes <paramref name="optionNumbers"/> from subscription list of <paramref name="connectionId"/>
		/// </summary>
		void UnsubscribeOptions(string connectionId, List<string> optionNumbers);
		
		/// <summary>
		/// Clears subscription list for <paramref name="connectionId"/>
		/// </summary>
		void UnsubscribeAll(string connectionId);

	}
}
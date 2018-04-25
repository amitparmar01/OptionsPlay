using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using System.Web.UI;
using AutoMapper;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;
using OptionsPlay.BusinessLogic.Common;
using OptionsPlay.BusinessLogic.Common.Entities;
using OptionsPlay.Common.ServiceResponses;
using OptionsPlay.Cache.Core;
using OptionsPlay.Common.Utilities;
using OptionsPlay.Web.SignalR.Hubs;
using OptionsPlay.Web.ViewModels.MarketData;
using OptionsPlay.Web.ViewModels.Providers.AsyncUpdater;
using OptionsPlay.Logging;
using System.Diagnostics;

namespace OptionsPlay.Web.SignalR.Push
{
	public class MarketDataPusher : IMarketDataPusher
	{
		private readonly SecurityQuoteUpdater _quoteUpdater;
		private readonly OptionQuoteUpdater _optionUpdater;
		private readonly object _lock = new object();

		private readonly IHubConnectionContext<dynamic> _clients;
		
		// maps from connection Id to set of securityCodes to update
		private readonly ConcurrentDictionary<string, HashSet<string>> _stocksToUpdate = new ConcurrentDictionary<string, HashSet<string>>();
		private readonly ConcurrentDictionary<string, HashSet<string>> _optionsToUpdate = new ConcurrentDictionary<string, HashSet<string>>();
		
		public MarketDataPusher(SecurityQuoteUpdater quoteUpdater, OptionQuoteUpdater optionUpdater)
		{
			_quoteUpdater = quoteUpdater;
			_optionUpdater = optionUpdater;
			_clients = GlobalHost.ConnectionManager.GetHubContext<MarketDataHub>().Clients;
            //GlobalHost.Configuration.KeepAlive = null;
			_quoteUpdater.QuotesUpdated += NotifyQuoteSubscribers;
			_optionUpdater.QuotesUpdated += NotifyOptionQuoteSubscribers;
		}

		#region Implementation of IMarketDataPusher

		public void SubscribeQuotes(string connectionId, List<string> securityCodes)
		{
			HashSet<string> codeSet;

			lock (_lock)
			{
				if (_stocksToUpdate.TryGetValue(connectionId, out codeSet))
				{
					foreach (string code in securityCodes)
					{
						codeSet.Add(code.ToUpper());
					}
				}
				else
				{
					codeSet = new HashSet<string>(securityCodes.Select(s => s.ToUpper()));
					_stocksToUpdate[connectionId] = codeSet;
				}
				_quoteUpdater.Register(codeSet);
			}
		}

		public void UnsubscribeQuotes(string connectionId, List<string> securityCodes)
		{
			HashSet<string> codeSet;
			if (!_stocksToUpdate.TryGetValue(connectionId, out codeSet))
			{
				return;
			}

			lock (_lock)
			{
				foreach (string code in securityCodes)
				{
					codeSet.Remove(code.ToUpper());
				}
			}
		}


		public void SubscribeOptions(string connectionId, List<string> optionNumbers)
		{
			HashSet<string> numbers;

			lock (_lock)
			{
				if (_optionsToUpdate.TryGetValue(connectionId, out numbers))
				{
					foreach (string code in optionNumbers)
					{
						numbers.Add(code.ToUpper());
					}
				}
				else
				{
					numbers = new HashSet<string>(optionNumbers.Select(s => s.ToUpper()));
					_optionsToUpdate[connectionId] = numbers;
				}
				_optionUpdater.Register(numbers);
			}
		}

		public void UnsubscribeOptions(string connectionId, List<string> optionNumbers)
		{
			HashSet<string> numbers;
			if (!_optionsToUpdate.TryGetValue(connectionId, out numbers))
			{
				return;
			}

			lock (_lock)
			{
				foreach (string code in optionNumbers)
				{
					numbers.Remove(code.ToUpper());
				}
			}
		}

		public void UnsubscribeAll(string connectionId)
		{
			HashSet<string> tmp;
			_stocksToUpdate.TryRemove(connectionId, out tmp);
			_optionsToUpdate.TryRemove(connectionId, out tmp);
		}
		
		private void NotifyQuoteSubscribers(object sender, QuotesUpdatedEventArgs eventArgs)
		{
			List<SecurityQuotationViewModel> quotes = eventArgs.UpdatedQuotes;

			lock (_lock)
			{
				foreach (KeyValuePair<string, HashSet<string>> clientCodes in _stocksToUpdate)
				{
					string clientId = clientCodes.Key;
					HashSet<string> codes = clientCodes.Value;
					List<SecurityQuotationViewModel> quotesForClient = quotes.Where(q => codes.Contains(q.SecurityCode)).ToList();
					if (!quotesForClient.IsNullOrEmpty())
					{
						_clients.Client(clientId).updateQuote(quotesForClient);
					}
				}
			}
		}

		private void NotifyOptionQuoteSubscribers(object sender, OptionQuotesUpdatedEventArgs eventArgs)
		{
			List<OptionViewModel> quotes = eventArgs.UpdatedQuotes;
            Logger.Debug("Push Data Start...");
            Stopwatch stopwatch = new Stopwatch();
            stopwatch.Start();
        
			lock (_lock)
			{
				foreach (KeyValuePair<string, HashSet<string>> clientNumbers in _optionsToUpdate)
				{
                   
					string clientId = clientNumbers.Key;
					HashSet<string> numbers = clientNumbers.Value;
					List<OptionViewModel> quotesForClient = quotes.Where(q => numbers.Contains(q.OptionNumber)).ToList();
					if (!quotesForClient.IsNullOrEmpty())
					{
                        foreach (OptionViewModel opvm in quotesForClient)
                            Logger.Debug("Quotes:" + "OptionNummber:" + opvm.OptionNumber + ",SecurityCode:" + opvm.SecurityCode);
						_clients.Client(clientId).updateOptionQuotes(quotesForClient);
					}
				}
			}
            stopwatch.Stop();
            Logger.Info("Push Data End...:" + stopwatch.ElapsedMilliseconds);
		}

		#endregion

	}
}
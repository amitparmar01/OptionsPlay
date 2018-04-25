using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNet.SignalR.Hubs;
using OptionsPlay.BusinessLogic.Common.Entities;
using OptionsPlay.Common.ServiceResponses;
using OptionsPlay.DAL.SZKingdom.Common.Entities;
using OptionsPlay.Web.Infrastructure.Attributes.SignalR;
using OptionsPlay.Web.SignalR.Push;
using OptionsPlay.Web.ViewModels.MarketData;
using OptionsPlay.BusinessLogic.Common;
using OptionsPlay.TechnicalAnalysis;
using OptionsPlay.Web.AutoMapperPlugin;
using System;

namespace OptionsPlay.Web.SignalR.Hubs
{
	[HubAuthorize]
	[HubName("MarketDataHub")]
	public class MarketDataHub : BaseHub
	{
		private readonly IMarketDataService _marketDataService;
		private readonly IMarketDataPusher _marketDataPusher;

		public MarketDataHub(IMarketDataService marketDataService, IMarketDataPusher marketDataPusher)
		{
			_marketDataService = marketDataService;
			_marketDataPusher = marketDataPusher;
			Interval = 10000;
		}

		private const string OptionChainsTask = "OptionChainsTask";
		
		[HubMethodName("getOptionChains")]
		public OptionChainViewModel GetOptionChains(string underlying)
		{
			//ConfirmDataPushing(OptionChainsTask, underlying, () =>
			//{
			//	if (Subscriptions != null && Subscriptions[OptionChainsTask] != null)
			//	{
			//		foreach (string securityCode in Subscriptions[OptionChainsTask])
			//		{
			//			OptionChain chain = _marketDataService.GetOptionChain(securityCode);
			//			Clients.Client(Context.ConnectionId).updateOptionChains(Mapper.Map<OptionChainViewModel>(chain), securityCode);
			//		}
			//	}
			//});
			OptionChain optionChain = _marketDataService.GetOptionChain(underlying);
			var optionNumbers = FlattenOptionNumbers(optionChain);
			_marketDataPusher.SubscribeOptions(Context.ConnectionId, optionNumbers);
            //OptionChainViewModel result = Mapper.Map<OptionChainViewModel>(optionChain);
            //OptionChainViewModel result = new OptionChainViewModel();
            return AutoMapperPlugin.AutoMapperPlugin.AutoMapperConverterOptionChain(optionChain);
			
		}


       

		private static List<string> FlattenOptionNumbers(OptionChain optionChain)
		{
			IEnumerable<string> calls = optionChain.Select(x => x.CallOption.OptionNumber);
			IEnumerable<string> puts = optionChain.Select(x => x.PutOption.OptionNumber);
			List<string> optionNumbers = new List<string>(calls);
			optionNumbers.AddRange(puts);
			return optionNumbers;
		}

		[HubMethodName("unsubscribeOptionChains")]
		public void UnsubscribeOptionChains(string underlying)
		{
			OptionChain optionChain = _marketDataService.GetOptionChain(underlying);
			var optionNumbers = FlattenOptionNumbers(optionChain);
			_marketDataPusher.UnsubscribeOptions(Context.ConnectionId, optionNumbers);
		}

		private const string QuoteTask = "QuoteTask";


		[HubMethodName("getQuote")]
		public List<SecurityQuotationViewModel> GetQuote()
		{

			List<string> codes = _marketDataService.GetOptionableSecurities().Select(x => x.SecurityCode).ToList();
			_marketDataPusher.SubscribeQuotes(Context.ConnectionId, codes);
            List<EntityResponse<SecurityQuotation>> quotes = _marketDataService.GetSecurityQuotations(codes);
            List<SecurityQuotationViewModel> results =
			//quotes.Where(x => x.IsSuccess).Select(x => Mapper.Map<SecurityQuotationViewModel>(x.Entity)).ToList();
            quotes.Where(x => x.IsSuccess).Select(x => OptionsPlay.Web.AutoMapperPlugin.AutoMapperPlugin.AutoMapperConverterSecurityQuotation(x.Entity)).ToList();
            return results;
		}

		[HubMethodName("getQuote")]
		public SecurityQuotationViewModel GetQuote(string securityCode)
		{
            try
            {
                List<string> codes = new List<string>();
                codes.Add(securityCode);
                _marketDataPusher.SubscribeQuotes(Context.ConnectionId, codes);
                SecurityQuotation result = _marketDataService.GetSecurityQuotation(securityCode);
                //return Mapper.Map<SecurityQuotationViewModel>(result);
                return OptionsPlay.Web.AutoMapperPlugin.AutoMapperPlugin.AutoMapperConverterSecurityQuotation(result);
            }
            catch (Exception ex)
            {
                Logging.Logger.Error("thread ID:" + System.Threading.Thread.CurrentThread.ManagedThreadId + ", getQuote innerException: " + ex.InnerException.ToString() +  ", getQuote stackTrace: " + ex.StackTrace + ", class is MarketDataHub");
                throw;
            }
		}

      
		[HubMethodName("unsubscribeQuote")]
		public void UnsubscribeQuote(string stockCodes)
		{
			string[] numbers = stockCodes.Replace(" ", "").Split(',');
			_marketDataPusher.UnsubscribeQuotes(Context.ConnectionId, numbers.ToList());
		}

		private const string OptionableQuotesTask = "OptionableQuotesTask";

		[HubMethodName("getOptionableQuotes")]
		public List<SecurityQuotationViewModel> GetOptionableQuotes()
		{
			List<SecurityInformation> results = _marketDataService.GetOptionableSecurities();

			List<SecurityQuotationViewModel> quotes = results.Select(s => Mapper.Map<SecurityQuotationViewModel>(_marketDataService.GetSecurityQuotation(s.SecurityCode).Entity)).ToList();
			return quotes;
		}

		#region Overrides of BaseHub

		public override Task OnDisconnected(bool stopCalled)
		{
			_marketDataPusher.UnsubscribeAll(Context.ConnectionId);
			return base.OnDisconnected(stopCalled);
		}

		#endregion
	}
}

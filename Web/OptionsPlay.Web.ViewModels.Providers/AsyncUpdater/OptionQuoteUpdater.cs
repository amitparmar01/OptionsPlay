using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using OptionsPlay.BusinessLogic.Common;
using OptionsPlay.BusinessLogic.Common.Entities;
using OptionsPlay.Cache.AsyncUpdate;
using OptionsPlay.Cache.Core;
using OptionsPlay.Common.Options;
using OptionsPlay.Model;
using OptionsPlay.Web.ViewModels.MarketData;

namespace OptionsPlay.Web.ViewModels.Providers.AsyncUpdater
{
	public class OptionQuotesUpdatedEventArgs : EventArgs
	{
		public OptionQuotesUpdatedEventArgs(List<OptionViewModel> updatedQuotes)
		{
			UpdatedQuotes = updatedQuotes;
		}

		public List<OptionViewModel> UpdatedQuotes { get; private set; }
	}

	public class OptionQuoteUpdater : KeyCachedUpdater<OptionViewModel>
	{

		private static readonly TimeSpan QuoteUpdateInterval = TimeSpan.FromMilliseconds(AppConfigManager.AsyncQuotesUpdateIntervalInMilliseconds);
		private readonly IMarketDataService _marketDataService;

		private EventHandler<OptionQuotesUpdatedEventArgs> _quotesUpdated;

		public OptionQuoteUpdater(ICache cache, IMarketDataService marketDataService)
			: base(cache)
		{
			_marketDataService = marketDataService;
			CacheUpdated += OnCachedUpdated;
		}
		
		public override TimeSpan UpdateInterval
		{
			get { return QuoteUpdateInterval; }
		}

		public override Func<List<string>, Task<List<KeyValuePair<string, OptionViewModel>>>> GetItems
		{
			get
			{
				return async optionNumbers =>
				{
					List<OptionQuotation> optionQuotes = _marketDataService.GetOptionQuotes(optionNumbers);

                    //List<OptionViewModel> results = optionQuotes.Select(Mapper.Map<OptionViewModel>).ToList();
                    List<OptionViewModel> results = optionQuotes.Select(x => AutoMapperConverterOptionQuotation(x)).ToList();
					List<KeyValuePair<string, OptionViewModel>> pairResults =
						results.Select(x => new KeyValuePair<string, OptionViewModel>(x.OptionNumber, x)).ToList();
					return pairResults;
				};
			}
		}
        private OptionViewModel AutoMapperConverterOptionQuotation(OptionQuotation optionQuotation)
        {
            OptionViewModel ovm = new OptionViewModel();
            ovm.Ask = optionQuotation.Ask;
            ovm.Ask2 = optionQuotation.Ask2;
            ovm.Ask3 = optionQuotation.Ask3;
            ovm.Ask4 = optionQuotation.Ask4;
            ovm.Ask5 = optionQuotation.Ask5;
            ovm.AskVolume = optionQuotation.AskVolume;
            ovm.AskVolume2 = optionQuotation.AskVolume2;
            ovm.AskVolume3 = optionQuotation.AskVolume3;
            ovm.AskVolume4 = optionQuotation.AskVolume4;
            ovm.AskVolume5 = optionQuotation.AskVolume5;
            ovm.AuctionReferencePrice = optionQuotation.AuctionReferencePrice;
            ovm.AuctionReferenceQuantity = optionQuotation.AuctionReferenceQuantity;
            ovm.Bid = optionQuotation.Bid;
            ovm.Bid2 = optionQuotation.Bid2;
            ovm.Bid3 = optionQuotation.Bid3;
            ovm.Bid4 = optionQuotation.Bid4;
            ovm.Bid5 = optionQuotation.Bid5;
            ovm.BidVolume = optionQuotation.BidVolume;
            ovm.BidVolume2 = optionQuotation.BidVolume2;
            ovm.BidVolume3 = optionQuotation.BidVolume3;
            ovm.BidVolume4 = optionQuotation.BidVolume4;
            ovm.BidVolume5 = optionQuotation.BidVolume5;
            ovm.Change = optionQuotation.Change;
            ovm.ChangePercentage = optionQuotation.ChangePercentage;
            ovm.Greeks = optionQuotation.Greeks;
            ovm.HighestPrice = optionQuotation.HighestPrice;
            ovm.LatestTradedPrice = optionQuotation.LatestTradedPrice;
            ovm.LowestPrice = optionQuotation.LowestPrice;

            ovm.OpeningPrice = optionQuotation.OpeningPrice;
            ovm.OptionCode = optionQuotation.OptionCode;
            ovm.OptionName = optionQuotation.OptionName;
            ovm.OptionNumber = optionQuotation.OptionNumber;
            ovm.PreviousSettlementPrice = optionQuotation.PreviousSettlementPrice;
            ovm.SecurityCode = optionQuotation.SecurityCode;
            ovm.TradeDate = optionQuotation.TradeDate;
            ovm.Turnover = optionQuotation.Turnover;
            ovm.UncoveredPositionQuantity = optionQuotation.UncoveredPositionQuantity;
            ovm.Volume = optionQuotation.Volume;
            //lstOvm.Add(ovm);
            //}
            return ovm;
        }

		public void OnCachedUpdated(object sender, CacheUpdatedEventArgs<List<KeyValuePair<string, OptionViewModel>>> eventArgs)
		{
			List<OptionViewModel> results = eventArgs.Entity.Select(x => x.Value).ToList();
			OnQuotesUpdated(new OptionQuotesUpdatedEventArgs(results));
		}

		public event EventHandler<OptionQuotesUpdatedEventArgs> QuotesUpdated
		{
			add
			{
				_quotesUpdated -= value;
				_quotesUpdated += value;
			}
			remove
			{
				_quotesUpdated -= value;
			}
		}

		protected virtual void OnQuotesUpdated(OptionQuotesUpdatedEventArgs e)
		{
			EventHandler<OptionQuotesUpdatedEventArgs> handler = _quotesUpdated;
			if (handler != null)
			{
				handler(this, e);
			}
		}

        protected override bool isNeedUpdate(object item, object cachedItem)
        {
            //bool equals = !item.Equals(cachedItem);

            //if (item is OptionViewModel && cachedItem is OptionViewModel)
            //{
            //    OptionViewModel ov = (OptionViewModel)item;
            //    OptionViewModel ovCache = (OptionViewModel)cachedItem;
            //    return equals && (ov.TradeDate > ovCache.TradeDate);
            //}
            //else 
            //{
            //    return equals;
            //}

            return !item.Equals(cachedItem);
        }

	}
}
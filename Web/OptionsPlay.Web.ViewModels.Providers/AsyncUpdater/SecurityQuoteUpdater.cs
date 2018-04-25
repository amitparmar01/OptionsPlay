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
using OptionsPlay.Common.ServiceResponses;
using OptionsPlay.Web.ViewModels.MarketData;

namespace OptionsPlay.Web.ViewModels.Providers.AsyncUpdater
{

	public class QuotesUpdatedEventArgs : EventArgs
	{
		public QuotesUpdatedEventArgs(List<SecurityQuotationViewModel> updatedQuotes)
		{
			UpdatedQuotes = updatedQuotes;
		}

		public List<SecurityQuotationViewModel> UpdatedQuotes { get; private set; }
	}

	public class SecurityQuoteUpdater : KeyCachedUpdater<SecurityQuotationViewModel>
	{

		private static readonly TimeSpan QuoteUpdateInterval = TimeSpan.FromMilliseconds(AppConfigManager.AsyncQuotesUpdateIntervalInMilliseconds);
		private readonly IMarketDataService _marketDataService;

		private EventHandler<QuotesUpdatedEventArgs> _quotesUpdated;

		public event EventHandler<QuotesUpdatedEventArgs> QuotesUpdated
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

		protected virtual void OnQuotesUpdated(QuotesUpdatedEventArgs e)
		{
			EventHandler<QuotesUpdatedEventArgs> handler = _quotesUpdated;
			if (handler != null)
			{
				handler(this, e);
			}
		}

		public SecurityQuoteUpdater(ICache cache, IMarketDataService marketDataService) : base(cache)
		{
			_marketDataService = marketDataService;
			CacheUpdated += OnCachedUpdated;
		}

		#region Overrides of KeyCachedUpdater<SecurityQuotationViewModel>

		public override TimeSpan UpdateInterval
		{
			get { return QuoteUpdateInterval; }
		}

		public override Func<List<string>, Task<List<KeyValuePair<string, SecurityQuotationViewModel>>>> GetItems
		{
			get
			{
				return async securityCodes =>
				{
					List<EntityResponse<SecurityQuotation>> quotes = _marketDataService.GetSecurityQuotations(securityCodes);
					List<SecurityQuotationViewModel> results =
                    //quotes.Where(x => x.IsSuccess).Select(x => Mapper.Map<SecurityQuotationViewModel>(x.Entity)).ToList();
                    quotes.Where(x => x.IsSuccess).Select(x => AutoMapperConverterSecurityQuotation(x.Entity)).ToList();
					List<KeyValuePair<string, SecurityQuotationViewModel>> pairResults =
						results.Select(x => new KeyValuePair<string, SecurityQuotationViewModel>(x.SecurityCode, x)).ToList();
					return pairResults;
				};
			}
		}

		#endregion

        public SecurityQuotationViewModel AutoMapperConverterSecurityQuotation(SecurityQuotation securityQuotation)
        {
            SecurityQuotationViewModel result = new SecurityQuotationViewModel();
            result.BuyPrice2 = securityQuotation.BuyPrice2;
            result.BuyPrice3 = securityQuotation.BuyPrice3;
            result.BuyPrice4 = securityQuotation.BuyPrice4;
            result.BuyPrice5 = securityQuotation.BuyPrice5;
            result.BuyVolume1 = securityQuotation.BuyVolume1;
            result.BuyVolume2 = securityQuotation.BuyVolume2;
            result.BuyVolume3 = securityQuotation.BuyVolume3;
            result.BuyVolume4 = securityQuotation.BuyVolume4;
            result.BuyVolume5 = securityQuotation.BuyVolume5;
            result.Currency = securityQuotation.Currency.ToString();
            result.CurrentAskPrice = securityQuotation.CurrentAskPrice;
            result.CurrentBidPrice = securityQuotation.CurrentBidPrice;
            result.HasOptions = securityQuotation.HasOptions;
            result.HighPrice = securityQuotation.HighPrice;
            result.LastPrice = securityQuotation.LastPrice;
            result.LimitDownPrice = securityQuotation.LimitDownPrice;
            result.LimitUpPrice = securityQuotation.LimitUpPrice;
            result.LotFlag = securityQuotation.LotFlag.ToString();
            result.LotSize = long.Parse(securityQuotation.LotSize.ToString());
            result.LowPrice = securityQuotation.LowPrice;
            result.OpenPrice = securityQuotation.OpenPrice;
            result.PERatio = securityQuotation.PERatio;
            result.PreviousClose = securityQuotation.PreviousClose;
            result.SecurityClass = securityQuotation.SecurityClass;
            result.SecurityCode = securityQuotation.SecurityCode;
            result.SecurityLevel = securityQuotation.SecurityLevel;
            result.SecurityName = securityQuotation.SecurityName;
            result.SecurityStatus = securityQuotation.SecurityStatus.ToString();
            result.SecuritySubClass = securityQuotation.SecuritySubClass;
            result.SellPrice2 = securityQuotation.SellPrice2;
            result.SellPrice3 = securityQuotation.SellPrice3;
            result.SellPrice4 = securityQuotation.SellPrice4;
            result.SellPrice5 = securityQuotation.SellPrice5;
            result.SellVolume1 = securityQuotation.SellVolume1;
            result.SellVolume2 = securityQuotation.SellVolume2;
            result.SellVolume3 = securityQuotation.SellVolume3;
            result.SellVolume4 = securityQuotation.SellVolume4;
            result.SellVolume5 = securityQuotation.SellVolume5;
            result.StockExchange = securityQuotation.StockExchange.ToString();
            result.SuspendedFlag = securityQuotation.SuspendedFlag.ToString();
            result.TradeDate = securityQuotation.TradeDate;
            result.TradeSector = securityQuotation.TradeSector.DisplayName;
            result.Turnover = securityQuotation.Turnover;
            result.UnderlyinSecurityCode = securityQuotation.UnderlyinSecurityCode;
            result.Volume = securityQuotation.Volume;
            return result;
        }

		public void OnCachedUpdated(object sender, CacheUpdatedEventArgs<List<KeyValuePair<string, SecurityQuotationViewModel>>> eventArgs)
		{
			List<SecurityQuotationViewModel> results = eventArgs.Entity.Select(x => x.Value).ToList();
			OnQuotesUpdated(new QuotesUpdatedEventArgs(results));
		}
	}
}
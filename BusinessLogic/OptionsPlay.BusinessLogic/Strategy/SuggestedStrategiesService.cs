using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using OptionsPlay.BusinessLogic.Common;
using OptionsPlay.BusinessLogic.Common.Entities;
using OptionsPlay.BusinessLogic.Common.Services;
using OptionsPlay.Common.Options;
using OptionsPlay.Common.Utilities;
using OptionsPlay.DAL.Interfaces;
using OptionsPlay.Model;
using OptionsPlay.Model.Enums;
using OptionsPlay.Model.Enums.StrategyLeg;

namespace OptionsPlay.BusinessLogic
{
	public class SuggestedStrategiesService : BaseService, ISuggestedStrategiesService
	{
		//private const int DefaultDaysInFutureForExpiry = 45;
        private const int DefaultDaysInFutureForExpiry = 20;

		private IPredictionAndStdDevService _predictionAndStdDevService;
		private IMarketDataService _marketDataService;
		private IStrategyService _strategyService;

		const string DefaultFirstStrategyName = "Stock";
		const string DefaultSecondStrategyName = "Call";
		const string DefaultThirdStrategyName = "Call Vertical";

		public SuggestedStrategiesService(IOptionsPlayUow uow, IPredictionAndStdDevService predictionAndStdDevService, IMarketDataService marketDataService, IStrategyService strategyService)
			: base(uow)
		{
			_predictionAndStdDevService = predictionAndStdDevService;
			_marketDataService = marketDataService;
			_strategyService = strategyService;
		}

		#region Implementation of ISuggestedStrategiesService

		public List<SuggestedStrategy> GetSuggestedTradingStrategies(string symbol, bool opposite = false)
		{
			List<Strategy> strategies = new List<Strategy>();
			strategies.Add(_strategyService.GetAll().Single(x => x.Name == DefaultFirstStrategyName));
			strategies.Add(_strategyService.GetAll().Single(x => x.Name == DefaultSecondStrategyName));
			strategies.Add(_strategyService.GetAll().Single(x => x.Name == DefaultThirdStrategyName));

			OptionChain chain = _marketDataService.GetOptionChain(symbol);

			List<SuggestedStrategy> result = strategies.Select(x => FullfillStrategy(chain, x, opposite)).ToList();

			return result;
		}

		public SuggestedStrategy FullfillStrategy(OptionChain chain, Strategy strategyTemplate, bool opposite = false)
		{

			bool invertLegs = false;
			if (opposite)
			{
				if (strategyTemplate.PairStrategyId == null)
				{
					// if there is no pair strategy defined we just invert legs for current strategy
				}
				else
				{
					strategyTemplate = _strategyService.GetById(strategyTemplate.PairStrategyId.Value);
				}
			}

			int zeroExpiryIndex = 0;
			if (chain != null)
			{
				DateAndNumberOfDaysUntil sigma1Date, sigma2Date;
				// expiry date that is closest to 45 (by default) days from today
				chain.GetClosestExpiryDatesToDaysInFeature(DefaultDaysInFutureForExpiry, out sigma1Date, out sigma2Date);
				// this should be threated as base index for expiryDate. Use ExpirationDates[one + strategy.Expiry] to get current one.
				zeroExpiryIndex = chain.ExpirationDates.ToList().IndexOf(sigma1Date) - 1;
			}

			SuggestedStrategy model = new SuggestedStrategy(strategyTemplate.Name, BuyOrSell.Buy);
			List<SuggestedStrategyLeg> legs = new List<SuggestedStrategyLeg>();
			foreach (StrategyLeg leg in strategyTemplate.Legs)
			{
				BuyOrSell buyOrSellForLeg = !invertLegs
					? leg.BuyOrSell.Value
					: leg.BuyOrSell == BuyOrSell.Buy
						? BuyOrSell.Sell
						: BuyOrSell.Buy;

				SuggestedStrategyLeg legModel = new SuggestedStrategyLeg(leg.LegType.Value, buyOrSellForLeg, leg.Quantity);

				if (legModel.LegType != LegType.Security)
				{
					if (chain == null)
					{
						return model;
					}

					Debug.Assert(leg.Expiry != null, "leg.Expiry != null");
					legModel.ExpirationDate = chain.ExpirationDates[zeroExpiryIndex + leg.Expiry.Value];
					legModel.StrikePrice = GetStrikePriceForLegOld(chain, leg, legModel.ExpirationDate);
					if (!legModel.StrikePrice.HasValue || !MeetMinBidResctictions(chain, legModel))
					{
						return model;
					}
				}

				legs.Add(legModel);
			}
			if (legs.Count == 2 &&
				legs[0].BuyOrSell != legs[1].BuyOrSell && legs[0].StrikePrice == legs[1].StrikePrice &&
				legs[0].ExpirationDate == legs[1].ExpirationDate)
			{
				// don't compose strategy if both legs have the same expiry and strike price
				return model;
			}
			model.Legs = legs;

			return model;
		}

		#endregion

		private bool MeetMinBidResctictions(OptionChain chain, SuggestedStrategyLeg strategyLeg)
		{
			Option targetOption = GetOptionMatchToStrategyLeg(chain, strategyLeg);
			if (targetOption == null)
			{
				return false;
			}
			double minimalBidPrice = AppConfigManager.MinimalBidForTradingStrategies;
			double currentBid = targetOption.Bid == 0 ? targetOption.PreviousSettlementPrice : targetOption.Bid;
			return currentBid > minimalBidPrice;
		}

		private Option GetOptionMatchToStrategyLeg(OptionChain chain, SuggestedStrategyLeg strategyLeg)
		{
			if (!strategyLeg.StrikePrice.HasValue || strategyLeg.LegType == LegType.Security)
			{
				throw new InvalidOperationException();
			}

			Option targetOptionChain = chain[strategyLeg.ExpirationDate.FutureDate, strategyLeg.StrikePrice.Value, strategyLeg.LegType == LegType.Put
				? LegType.Put
				: LegType.Call];

			return targetOptionChain;
		}

		private double? GetStrikePriceForLegOld(OptionChain chain, StrategyLeg leg, DateAndNumberOfDaysUntil date)
		{
			if (leg == null || leg.LegType == LegType.Security)
			{
				return null;
			}
			IList<double> strikePrices = chain.GetStrikePrices(date);

			if (leg.BuyOrSell == BuyOrSell.Buy)
			{
				double strikePrice = leg.LegType == LegType.Call ?
					strikePrices.LastAndIndex(d => d < chain.UnderlyingCurrentPrice).Item2 :
					strikePrices.FirstAndIndex(d => d > chain.UnderlyingCurrentPrice).Item2;
				return strikePrice;
			}
			else
			{
				List<DateAndStandardDeviation> stdDevs = _predictionAndStdDevService.GetExpiriesAndStandardDeviations(chain, chain.ExpirationDates, 1.0);
				DateAndStandardDeviation stdDevPricesForCurrentExpiry = stdDevs.Single(d => d.DateAndNumberOfDaysUntil.FutureDate.Equals(date.FutureDate));
				double strikePrice = leg.LegType == LegType.Call
					? strikePrices.GetClosest(stdDevPricesForCurrentExpiry.StdDev.UpPrice)
					: strikePrices.GetClosest(stdDevPricesForCurrentExpiry.StdDev.DownPrice);
				return strikePrice;
			}
		}

	}
}
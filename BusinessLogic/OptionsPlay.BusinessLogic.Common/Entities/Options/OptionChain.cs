using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using MathNet.Numerics;
using OptionsPlay.Common.Utilities;
using OptionsPlay.Model.Enums;
using OptionsPlay.TechnicalAnalysis;

namespace OptionsPlay.BusinessLogic.Common.Entities
{
	public class OptionChain : IReadOnlyList<OptionPair>, IBasicPredictionCalculationData
	{
		private readonly List<OptionPair> _chainsInternal;
		private readonly Dictionary<string, Option> _optionNumberToOption = new Dictionary<string, Option>();
		private readonly List<double> _strikePrices = new List<double>();
		private readonly List<DateAndNumberOfDaysUntil> _expiryDates = new List<DateAndNumberOfDaysUntil>();
		private readonly Dictionary<DateAndNumberOfDaysUntil, List<double>> _strikePricesMap = new Dictionary<DateAndNumberOfDaysUntil, List<double>>();

		private double? _predefinedVolatility;

		public OptionChain(IEnumerable<OptionPair> chains, double underlyingCurrentPrice, double riskFreeRate, IEnumerable<OptionQuotation> quotations) :
			this(chains, underlyingCurrentPrice, riskFreeRate)
		{
			UpdateQuotation(quotations);
		}

		public OptionChain(IEnumerable<OptionPair> chains, double underlyingCurrentPrice, double riskFreeRate)
		{
			RiskFreeRate = riskFreeRate;
			UnderlyingCurrentPrice = underlyingCurrentPrice;
			_chainsInternal = chains.Where(chain => chain.PutOption != null && chain.CallOption != null)
				.OrderBy(x => x.Expiry)
				.ThenBy(x => x.StrikePrice)
				.ThenBy(x => x.PremiumMultiplier)
				.ToList();

			DateAndNumberOfDaysUntil prevExpiry = null;
			foreach (OptionPair c in _chainsInternal)
			{
				_optionNumberToOption[c.PutOption.OptionNumber] = c.PutOption;
				_optionNumberToOption[c.CallOption.OptionNumber] = c.CallOption;

                // Update _strikePrices
				if (!_strikePrices.Contains(c.StrikePrice))
				{
					_strikePrices.Add(c.StrikePrice);
					// this list is already sorted.
                    //List<Double> strikesListForCurrentExpiry;
                    //if (!_strikePricesMap.TryGetValue(c.Expiry, out  strikesListForCurrentExpiry))
                    //{
                    //    _strikePricesMap[c.Expiry] = strikesListForCurrentExpiry = new List<double>();
                    //}
                    //strikesListForCurrentExpiry.Add(c.StrikePrice);
				}

                // Update _strikePricesMap
                List<Double> strikesListForCurrentExpiry;
                if (!_strikePricesMap.TryGetValue(c.Expiry, out strikesListForCurrentExpiry))
                {
                    _strikePricesMap[c.Expiry] = strikesListForCurrentExpiry = new List<double>();
                    strikesListForCurrentExpiry.Add(c.StrikePrice);
                }
                else {
                    strikesListForCurrentExpiry = _strikePricesMap[c.Expiry];
                    strikesListForCurrentExpiry.Add(c.StrikePrice);
                }

                // Update _expiryDates
				if (c.Expiry != prevExpiry)
				{
					_expiryDates.Add(c.Expiry);
					prevExpiry = c.Expiry;
				}
			}

			_strikePrices.Sort();
		}

		public double UnderlyingCurrentPrice { get; private set; }

		public double RiskFreeRate { get; private set; }

		public IEnumerator<OptionPair> GetEnumerator()
		{
			return _chainsInternal.GetEnumerator();
		}

		IEnumerator IEnumerable.GetEnumerator()
		{
			return GetEnumerator();
		}

		public int Count
		{
			get
			{
				return _chainsInternal.Count;
			}
		}

		public OptionPair this[int index]
		{
			get
			{
				return _chainsInternal[index];
			}
		}

		public Option this[string optionNumber]
		{
			get
			{
				Option result;
				_optionNumberToOption.TryGetValue(optionNumber, out result);
				return result;
			}
		}

		public OptionPair this[DateTime expiration, double strikePrice]
		{
			get
			{
				OptionPair result = this.FirstOrDefault(pair => pair.Expiry.Equals(expiration)&& pair.StrikePrice.AlmostEqual(strikePrice));
				return result;
			}
		}

		public Option this[DateTime expiration, double strikePrice, LegType optionType]
		{
			get
			{
				OptionPair targetOptionChain = this[expiration, strikePrice];

				if (targetOptionChain == null)
				{
					return null;
				}
				Option optionMatch = optionType == LegType.Put
					? targetOptionChain.PutOption
					: targetOptionChain.CallOption;
				return optionMatch;
			}
		}

		public IReadOnlyList<double> StrikePrices
		{
			get
			{
				return _strikePrices.AsReadOnly();
			}
		}

		public IList<double> GetStrikePrices(DateAndNumberOfDaysUntil date)
		{
			List<double> result = _strikePricesMap[date];
			return result.AsReadOnly();
		}


		public IReadOnlyList<DateAndNumberOfDaysUntil> ExpirationDates
		{
			get
			{
				return _expiryDates.AsReadOnly();
			}
		}

		public void UpdateQuotation(IEnumerable<OptionQuotation> quotations)
		{
			foreach (OptionQuotation optionQuotation in quotations)
			{
				Option option = this[optionQuotation.OptionNumber];
				if (option != null)
				{
					optionQuotation.SecurityCode = option.SecurityCode;
                    optionQuotation.OptionName = option.OptionName;
                    optionQuotation.OptionCode = option.OptionCode;
                    
					Mapper.Map(optionQuotation, option);
                    option.Name = optionQuotation.OptionName;
					
					option.Greeks = MarketMath.GetGreeks(option.RootPair.Expiry.TotalNumberOfDaysUntilExpiry,
						option.RootPair.StrikePrice, RiskFreeRate,
						UnderlyingCurrentPrice, option.Ask, option.Bid, option.LatestTradedPrice, option.LegType);
				}
			}
		}

        public void UpdateQuotation(double underlyingCurrentPrice, double riskFreeRate, IEnumerable<OptionQuotation> quotations)
        {
            RiskFreeRate = riskFreeRate;
            UnderlyingCurrentPrice = underlyingCurrentPrice;
            UpdateQuotation(quotations);
        }

		double IBasicPredictionCalculationData.InterestRate { get { return RiskFreeRate; } }

		double IBasicPredictionCalculationData.LastPrice { get { return UnderlyingCurrentPrice; } }

		public double GetVolatility(double daysInFuture)
		{
			if (_predefinedVolatility.HasValue)
			{
				return _predefinedVolatility.Value;
			}

			if (Count == 0)
			{
				return 0;
			}

			// get optionPairs with daysToExpire closest to daysInFuture
			DateAndNumberOfDaysUntil sigma1Date, sigma2Date;
			GetClosestExpiryDatesToDaysInFeature(daysInFuture, out sigma1Date, out sigma2Date);

			// we need to include sigma1Date and sigma2Date
			DateTime expirityFromDate = sigma1Date.FutureDate.AddDays(-1);
			DateTime expiryToDate = sigma2Date.FutureDate.AddDays(1);

			List<OptionPair> optionChainsFiltered = this.Where(item => item.Expiry.FutureDate > expirityFromDate && item.Expiry.FutureDate < expiryToDate)
				.ToList();

			double volatility = GetVolatilityForPrediction(optionChainsFiltered, daysInFuture);
			return volatility;
		}

		public void SetPredefinedVolatility(double? volatility)
		{
			_predefinedVolatility = volatility;
		}

		/// <summary>
		/// Get expire dates with days to expire closest to daysInFuture
		/// </summary>
		public void GetClosestExpiryDatesToDaysInFeature(double daysInFuture, out DateAndNumberOfDaysUntil low, out DateAndNumberOfDaysUntil highOrEqual)
		{
			Tuple<int, DateAndNumberOfDaysUntil> lastSmaler = ExpirationDates.LastAndIndex(e => e.TotalNumberOfDaysUntilExpiry < daysInFuture);
			Tuple<int, DateAndNumberOfDaysUntil> firstBigger = ExpirationDates.FirstAndIndex(e => e.TotalNumberOfDaysUntilExpiry >= daysInFuture);
			low = lastSmaler.Item1 == -1
				? ExpirationDates[0]
				: lastSmaler.Item2;
			highOrEqual = firstBigger.Item1 == -1
				? ExpirationDates[ExpirationDates.Count - 1]
				: firstBigger.Item2;
		}

		private double GetVolatilityForPrediction(IReadOnlyList<OptionPair> optionPairs, double daysInFuture)
		{
			double volatility;
			// if there are dates with NumOfDaysUntilExpired == daysInFuture
			// the volatility is calculated as average impliedVolatility from options with this date
			DateAndNumberOfDaysUntil futureExpiry = ExpirationDates.FirstOrDefault(date => date.TotalNumberOfDaysUntilExpiry.AlmostEqual(daysInFuture));
			if (futureExpiry != null)
			{
				List<OptionPair> chainsWithExpiry = optionPairs.Where(chain => chain.Expiry == futureExpiry).ToList();
				volatility = GetAverageVolatilityFromAtTheMoneyOption(chainsWithExpiry);
				return volatility;
			}

			DateAndNumberOfDaysUntil sigma1Date, sigma2Date;
			GetClosestExpiryDatesToDaysInFeature(daysInFuture, out sigma1Date, out sigma2Date);
			if (sigma1Date.FutureDate == sigma2Date.FutureDate)
			{
				List<OptionPair> chainsWithExpiry = optionPairs.Where(chain => chain.Expiry == sigma1Date).ToList();
				volatility = GetAverageVolatilityFromAtTheMoneyOption(chainsWithExpiry);
				return volatility;
			}

			List<OptionPair> optionChainsSigma1 = optionPairs.Where(chain => chain.Expiry == sigma1Date).ToList();
			List<OptionPair> optionChainsSigma2 = optionPairs.Where(chain => chain.Expiry == sigma2Date).ToList();

			double sigma1 = GetAverageVolatilityFromAtTheMoneyOption(optionChainsSigma1);
			double sigma2 = GetAverageVolatilityFromAtTheMoneyOption(optionChainsSigma2);

			double n1 = sigma1Date.TotalNumberOfDaysUntilExpiry;
			double n2 = sigma2Date.TotalNumberOfDaysUntilExpiry;

			volatility = Math.Sqrt(365.0 / daysInFuture *
				((n1 / 365.0 * sigma1 * sigma1) * (n2 - daysInFuture) / (n2 - n1) +
					n2 / 365.0 * sigma2 * sigma2 * (daysInFuture - n1) / (n2 - n1)));
			return volatility;
		}

		private double GetAverageVolatilityFromAtTheMoneyOption(IReadOnlyList<OptionPair> pairs)
		{
			if (pairs.Count == 0)
			{
				return 0;
			}

			// we only need the one option and three on either side of this option
			List<OptionPair> atTheMoneyOptions = FindAtTheMoneyOptions(pairs);
			if (atTheMoneyOptions.IsNullOrEmpty())
			{
				return 0;
			}

			double volatility = atTheMoneyOptions.SelectMany(o =>
			{
				if (o.CallOption.Greeks != null && o.PutOption.Greeks != null)
				{
					return new[] { o.CallOption.Greeks.Sigma, o.PutOption.Greeks.Sigma };
				}
				return new[] { 0d, 0d };
			}).Average();
			return volatility;
		}

		private List<OptionPair> FindAtTheMoneyOptions(IReadOnlyList<OptionPair> pairs)
		{
			List<OptionPair> atTheMoneyOptionChains = new List<OptionPair>();
			if (pairs.Count == 0)
			{
				return atTheMoneyOptionChains;
			}

			double minDiff = pairs.Min(chain => Math.Abs(chain.StrikePrice - UnderlyingCurrentPrice));

			foreach (OptionPair optionChain in pairs)
			{
				double diff = Math.Abs(optionChain.StrikePrice - UnderlyingCurrentPrice);
				if (diff.AlmostEqual(minDiff))
				{
					atTheMoneyOptionChains.Add(optionChain);
				}
			}
			return atTheMoneyOptionChains;
		}
	}
}
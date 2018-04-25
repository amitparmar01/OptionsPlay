using AutoMapper;
using OptionsPlay.BusinessLogic.Common;
using OptionsPlay.Logging;
using OptionsPlay.MarketData.Common;
using OptionsPlay.Model;
using OptionsPlay.Common.Utilities;
using OptionsPlay.Web.Infrastructure.Attributes.Api;
using OptionsPlay.Web.ViewModels.ViewModels.Signals;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using OptionsPlay.MarketData.Indicators;
using OptionsPlay.MarketData.Indicators.Helpers;
using OptionsPlay.BusinessLogic.Common.Indicators;
using OptionsPlay.Model.Enums;
using OptionsPlay.Web.ViewModels.Providers.Helpers;
using OptionsPlay.BusinessLogic;

namespace OptionsPlay.Web.Controllers.Api
{
    [ApiAuthorize]
    [RoutePrefix("api/signals")]
    public class SignalsController : ApiController
    {
        private readonly ISignalsProxyService _signalsProxyService;
        private readonly IMarketDataProviderQueryable _marketDataProvider;
        private readonly IMarketDataService _marketDataService;
        private readonly ISignalsCalculator _signalsCalculator;
        private readonly ITechnicalRankService _technicalRankService;
        private readonly SignalHelpers _signalHelpers;
        private readonly ConcurrentBag<Signal> _technicalRankScores = new ConcurrentBag<Signal>();
        private readonly TechnicalRankScore _technicalRankScoreIndicator = new TechnicalRankScore();
        private readonly TradeIdeasGenerator _tradeIdeasGenerator;
        private List<IIndicator> _indicatorsToCalculate;
        private int _lastSignalsCountForTradeIdeas;

        public SignalsController(ISignalsProxyService signalsProxyService, IMarketDataProviderQueryable marketDataProvider,
            IMarketDataService marketDataService, ISignalsCalculator signalsCalculator, ITechnicalRankService technicalRankService, SignalHelpers signalHelpers, TradeIdeasGenerator tradeIdeasGenerator)
        {
            _signalsProxyService = signalsProxyService;
            _marketDataProvider = marketDataProvider;
            _marketDataService = marketDataService;
            _signalsCalculator = signalsCalculator;
            _technicalRankService = technicalRankService;
            _signalHelpers = signalHelpers;
            _tradeIdeasGenerator = tradeIdeasGenerator;
        }

        [Route(@"supres/{symbol}/{timeframe:regex((?i)^\d+[d|m|y]$(?-i))?}")]
        public async Task<SupportAndResistanceViewModel> GetSupportAndResistance(string symbol, string timeframe = null)
        {
            SupportAndResistance supportAndResistance = await _signalsProxyService.GetSupportAndResistance(symbol, timeframe);
            SupportAndResistanceViewModel result = Mapper.Map<SupportAndResistance, SupportAndResistanceViewModel>(supportAndResistance);
            return result;
        }

        [Route("technicalRank")]
        public object GetTechnicalRankSignals()
        {
            string[] optionableSecurities = _marketDataProvider.GetAllOptionBasicInformation().Where(cache => cache.OptionStatus != " ").Select(obi => obi.OptionUnderlyingCode).Distinct().ToArray();
            ProcessDataInParallel(optionableSecurities);
            List<Signal> technicalRankSignals = _technicalRankService.GenerateTechnicalRank(optionableSecurities.ToList(), _technicalRankScores.ToList());
            technicalRankSignals.Sort(m => m.StockCode);
            return technicalRankSignals;
        }

        [Route("sentiments")]
        public object GetSyrahSentiments()
        {
            string[] optionableSecurities = _marketDataProvider.GetAllOptionBasicInformation().Where(cache => cache.OptionStatus != " ").Select(obi => obi.OptionUnderlyingCode).Distinct().ToArray();
            List<SentimentViewModel> sentiments = optionableSecurities.Select(GetPartWhy).ToList();
            sentiments.Sort(m => m.Signal);
            return sentiments;
        }

        [Route("tradeIdeas")]
        public object GetTradeIdeas()
        {
            DependencyScope tradeIdeaDeps = _tradeIdeasGenerator.GetDependencies();
            _indicatorsToCalculate = tradeIdeaDeps.GetIndicators();
            TechnicalRankScore technicalRankScoreIndicator = new TechnicalRankScore();
            _indicatorsToCalculate.Add(technicalRankScoreIndicator);
            _lastSignalsCountForTradeIdeas = tradeIdeaDeps.GetCountToTakeLast();
            string[] optionableSecurities = _marketDataProvider.GetAllOptionBasicInformation().Where(cache => cache.OptionStatus != " ").Select(obi => obi.OptionUnderlyingCode).Distinct().ToArray();
            ProcessDataInParallelForTradeIdeas(optionableSecurities);
            return 1;
        }

        private void ProcessDataInParallel(string[] symbols)
        {
            int count = symbols.Count();
            ParallelOptions opts = new ParallelOptions
            {
                MaxDegreeOfParallelism = 5
            };
            Parallel.For(0, count, opts, i =>
            {
                try
                {
                    GenerateDataForSymbol(symbols[i]);
                }
                catch (Exception exception)
                {
                    Logger.Error(string.Format("Exception occurred during processing symbol {0}", symbols[i]), exception);
                }
            });
        }

        private void ProcessDataInParallelForTradeIdeas(string[] symbols)
        {
            int count = symbols.Count();
            ParallelOptions opts = new ParallelOptions
            {
                MaxDegreeOfParallelism = 5
            };
            Parallel.For(0, count, opts, i =>
            {
                try
                {
                    GenerateTradeIdeasForSymbol(symbols[i]);
                }
                catch (Exception exception)
                {
                    Logger.Error(string.Format("Exception occurred during processing symbol {0}", symbols[i]), exception);
                }
            });
        }

        private void GenerateDataForSymbol(string symbol)
        {
            List<HistoricalQuote> historicalQuotes2YearsResponse = _marketDataService.GetHistoricalQuotes(symbol, "2y");
            DateTime yearAgo = DateTime.UtcNow.Date.AddYears(-1);
            List<HistoricalQuote> historicalQuotes1Year = historicalQuotes2YearsResponse.Where(h => h.TradeDate >= yearAgo).ToList();
            HistoricalData historicalData1Year = null;
            if (!historicalQuotes1Year.IsNullOrEmpty())
            {
                historicalData1Year = new HistoricalData(historicalQuotes1Year);
            }
            List<Signal> technicalRankSignals = _signalsCalculator
                    .CalculateSignals(historicalData1Year, new List<IIndicator> { _technicalRankScoreIndicator }, 1).ToList();
            Signal latestTechicalRankScore = technicalRankSignals.LatestForIndicator(_technicalRankScoreIndicator);
            if (latestTechicalRankScore != null)
            {
                _technicalRankScores.Add(latestTechicalRankScore);
            }
        }

        private void GenerateTradeIdeasForSymbol(string symbol)
        {
            List<HistoricalQuote> historicalQuotes1YearsResponse = _marketDataService.GetHistoricalQuotes(symbol, "1y");
            if (historicalQuotes1YearsResponse.Count == 0) { return; }
            HistoricalData historicalData1Year = null;
            if (!historicalQuotes1YearsResponse.IsNullOrEmpty())
            {
                historicalData1Year = new HistoricalData(historicalQuotes1YearsResponse);
            }
            List<Signal> signals = _signalsProxyService.GetSignals(historicalData1Year, _indicatorsToCalculate, _lastSignalsCountForTradeIdeas);
            _tradeIdeasGenerator.GenerateTradeIdeas(signals, historicalQuotes1YearsResponse);
        }

        private SentimentViewModel GetPartWhy(string stockCode)
        {
            List<HistoricalQuote> historicalQuotes2YearsResponse = _marketDataService.GetHistoricalQuotes(stockCode, "2y");

            List<Signal> syrahShortTermSignals;
            List<Signal> syrahLongTermSignals;

            int? sentimentShortTermValue = null;
            int? sentimentLongTermValue = null;

            Sentiment? sentiment = null;

            if (historicalQuotes2YearsResponse.Count == 0)
            {
                return new SentimentViewModel()
                {
                    Sentiment = sentiment,
                    Signal = stockCode
                };
            }

            Tuple<List<Signal>, List<Signal>> signals = _signalHelpers.GetSentiments(historicalQuotes2YearsResponse);

            syrahShortTermSignals = signals.Item1;
            syrahLongTermSignals = signals.Item2;

            Tuple<int?, int?> sentimentTermValues = _signalHelpers.GetSentimentTermValues(syrahShortTermSignals, syrahLongTermSignals);
            sentimentShortTermValue = sentimentTermValues.Item1;
            sentimentLongTermValue = sentimentTermValues.Item2;

            Tuple<int?, int?> sentimentValues = new Tuple<int?, int?>(sentimentShortTermValue, sentimentLongTermValue);
            sentiment = SyrahSentiment.MakeInterpretationInTermsOfSentiment(sentimentValues);

            //return new { sentiment, stockCode };
            return new SentimentViewModel()
            {
                Sentiment = sentiment,
                Signal = stockCode
            };
        }

    }

    internal class SentimentViewModel
    {
        public Sentiment? Sentiment { get; set; }

        public string Signal { get; set; }

    }
}
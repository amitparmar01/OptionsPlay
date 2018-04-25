using OptionsPlay.MarketData.Common;
using OptionsPlay.Model;
using OptionsPlay.Model.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using OptionsPlay.Common.Utilities;
using OptionsPlay.MarketData.Indicators.Helpers;

namespace OptionsPlay.BusinessLogic
{
    public class TradeIdeasGenerator
    {
        //private readonly ISafeConfigurationService _configurationService;

        #region Consts

        private double _rsiObThresh = 70.0;
        private double _cciObThresh = 200.0;
        private double _willrObThresh = -20.0;
        private double _mfiObThresh = 90.0;

        private double _rsiOsThresh = 30.0;
        private double _cciOsThresh = -200.0;
        private double _willrOsThresh = -80.0;
        private double _mfiOsThresh = 10.0;
        private double _stRsiBullThresh = 70.0;
        private double _ltRsiBearThresh = 45.0;
        private double _stCciBullThresh = 100.0;
        private double _ltCciBearThresh = -100.0;
        private double _stRsiBearThresh = 30.0;
        private double _ltRsiBullThresh = 60.0;
        private double _stCciBearThresh = -100.0;
        private double _ltCciBullThresh = 25.0;

        #endregion Consts

        //public TradeIdeasGenerator(ISafeConfigurationService configurationService)
        //{
        //    _configurationService = configurationService;
        //    ReadConfiguration();
        //}

        private void ReadConfiguration()
        {
            //ConfigSection rootSection = _configurationService.GetConfigSection(TradeIdeasConfigurationConstants.RootPath);
            //ConfigSection rsiSection = GetChildSection(rootSection, TradeIdeasConfigurationConstants.RsiSectionName);
            //ConfigSection cciSection = GetChildSection(rootSection, TradeIdeasConfigurationConstants.CciSectionName);
            //ConfigSection mfiSection = GetChildSection(rootSection, TradeIdeasConfigurationConstants.MfiSectionName);
            //ConfigSection willrSection = GetChildSection(rootSection, TradeIdeasConfigurationConstants.WillrSectionName);

            //_rsiObThresh = GetValue(rsiSection, TradeIdeasConfigurationConstants.OverboughtBearishSettingName);
            //_cciObThresh = GetValue(cciSection, TradeIdeasConfigurationConstants.OverboughtBearishSettingName);
            //_willrObThresh = GetValue(willrSection, TradeIdeasConfigurationConstants.OverboughtBearishSettingName);
            //_mfiObThresh = GetValue(mfiSection, TradeIdeasConfigurationConstants.OverboughtBearishSettingName);

            //_rsiOsThresh = GetValue(rsiSection, TradeIdeasConfigurationConstants.OversoldBullishSettingName);
            //_cciOsThresh = GetValue(cciSection, TradeIdeasConfigurationConstants.OversoldBullishSettingName);
            //_willrOsThresh = GetValue(willrSection, TradeIdeasConfigurationConstants.OversoldBullishSettingName);
            //_mfiOsThresh = GetValue(mfiSection, TradeIdeasConfigurationConstants.OversoldBullishSettingName);

            //_stRsiBullThresh = GetValue(rsiSection, TradeIdeasConfigurationConstants.ShortTermBullishSettingName);
            //_ltRsiBearThresh = GetValue(rsiSection, TradeIdeasConfigurationConstants.LongTermBearishSettingName);
            //_stCciBullThresh = GetValue(cciSection, TradeIdeasConfigurationConstants.ShortTermBullishSettingName);
            //_ltCciBearThresh = GetValue(cciSection, TradeIdeasConfigurationConstants.LongTermBearishSettingName);
            //_stRsiBearThresh = GetValue(rsiSection, TradeIdeasConfigurationConstants.ShortTermBearishSettingName);
            //_ltRsiBullThresh = GetValue(rsiSection, TradeIdeasConfigurationConstants.LongTermBullishSettingName);
            //_stCciBearThresh = GetValue(cciSection, TradeIdeasConfigurationConstants.ShortTermBearishSettingName);
            //_ltCciBullThresh = GetValue(cciSection, TradeIdeasConfigurationConstants.LongTermBullishSettingName);
        }

        //private static ConfigSection GetChildSection(ConfigSection rootSection, string name)
        //{
        //    ConfigSection result =
        //        rootSection.ChildSections.Single(s => s.Name.Equals(name));
        //    return result;
        //}

        //private static double GetValue(ConfigSection section, string settoingName)
        //{
        //    ConfigSetting setting = section.GetSingleSetting(settoingName);
        //    double result = setting.GetValue<double>();
        //    return result;
        //}

        /// <summary>
        /// Generate the latest trade ideas for the symbol. If no tradeideas - return null
        /// </summary>
        public List<Tuple<TradeIdea, TradeIdeaLog>> GenerateTradeIdeas(List<Signal> signals, List<HistoricalQuote> historicalQuotes, int numberOfBussinessDays = 1)
        {
            List<Tuple<TradeIdea, TradeIdeaLog>> result = new List<Tuple<TradeIdea, TradeIdeaLog>>();

            if (historicalQuotes.IsNullOrEmpty() || signals.IsNullOrEmpty())
            {
                return result;
            }

            for (int i = 0; i < numberOfBussinessDays; i++)
            {
                List<HistoricalQuote> historicalQuotesNew = historicalQuotes.Take(historicalQuotes.Count - i).ToList();
                HistoricalData historicalData = new HistoricalData(historicalQuotesNew);
                List<Signal> signalsNew = signals.Where(s => s.Date.Date <= historicalQuotesNew.Last().TradeDate.Date).ToList();

                Tuple<TradeIdea, TradeIdeaLog> tradeIdea = GenerateTradeIdeaForLatestDate(signalsNew, historicalData);
                result.Add(tradeIdea);
            }

            return result;
        }

        public DependencyScope GetDependencies(int numberOfBussinessDays = 1)
        {
            DependencyScope deps = TradeIdeasGeneratorArgument.GetDependencies(numberOfBussinessDays);
            return deps;
        }

        /// <summary>
        /// Generate trade ideas rules.
        /// </summary>
        public List<TradeIdeaRuleWrapper> GenerateTradeIdeas(TradeIdeasGeneratorArgument arg, TradeIdeaLog tradeIdeaLog)
        {
            const double period = 14;
            const string cciStudy = "CCI";
            const string rsiStudy = "RSI";
            const string mfiStudy = "MFI";
            const string williamsRStudy = "Williams %R";

            List<TradeIdeaRuleWrapper> returnList = new List<TradeIdeaRuleWrapper>();

            //if (arg.HasOption)
            //{
                //if (NearResistance(arg.LastPrice, arg.NearestResistance, arg.RangeStdDev))
                if (arg.LongTermSentiment != null
                    && arg.LongTermSentiment.Value == Sentiment.Bearish
                    && arg.ShortTermSentiment != null
                    && arg.ShortTermSentiment.Value != Sentiment.Bullish)
                {
                    if (ObBearScan(arg.YesterdayRsi14, arg.Rsi14, _rsiObThresh))
                    {
                        returnList.Add(new TradeIdeaRuleWrapper
                        {
                            Rule = TradeIdeaRule.RsiOverboughtBearishCrossover,
                            Study = rsiStudy,
                            Period = period,
                            OverBoughtLevel = _rsiObThresh,
                            OverSoldLevel = _rsiOsThresh
                        });
                    }
                    if (ObBearScan(arg.YesterdayCci14, arg.Cci14, _cciObThresh))
                    {
                        returnList.Add(new TradeIdeaRuleWrapper
                        {
                            Rule = TradeIdeaRule.CciOverboughtBearishCrossover,
                            Study = cciStudy,
                            Period = period,
                            OverBoughtLevel = _cciObThresh,
                            OverSoldLevel = _cciOsThresh
                        });
                    }
                    if (ObBearScan(arg.YesterdayWillR14, arg.WillR14, _willrObThresh))
                    {
                        returnList.Add(new TradeIdeaRuleWrapper
                        {
                            Rule = TradeIdeaRule.WilliamsOverboughtBearishCrossover,
                            Study = williamsRStudy,
                            Period = period,
                            OverBoughtLevel = _willrObThresh,
                            OverSoldLevel = _willrOsThresh
                        });
                    }
                    if (ObBearScan(arg.YesterdayMfi14, arg.Mfi14, _mfiObThresh))
                    {
                        returnList.Add(new TradeIdeaRuleWrapper
                        {
                            Rule = TradeIdeaRule.MfiOverboughtBearishCrossover,
                            Study = mfiStudy,
                            Period = period,
                            OverBoughtLevel = _mfiObThresh,
                            OverSoldLevel = _mfiOsThresh
                        });
                    }
                }

                //if (NearSupport(arg.LastPrice, arg.NearestSupport, arg.RangeStdDev))
                if (arg.LongTermSentiment != null
                    && arg.LongTermSentiment.Value == Sentiment.Bullish
                    && arg.ShortTermSentiment != null
                    && arg.ShortTermSentiment.Value != Sentiment.Bearish)
                {
                    if (OsBullScan(arg.YesterdayRsi14, arg.Rsi14, _rsiOsThresh))
                    {
                        returnList.Add(new TradeIdeaRuleWrapper
                        {
                            Rule = TradeIdeaRule.RsiOversoldBullishCrossover,
                            Study = rsiStudy,
                            Period = period,
                            OverBoughtLevel = _rsiObThresh,
                            OverSoldLevel = _rsiOsThresh
                        });
                    }
                    if (OsBullScan(arg.YesterdayCci14, arg.Cci14, _cciOsThresh))
                    {
                        returnList.Add(new TradeIdeaRuleWrapper
                        {
                            Rule = TradeIdeaRule.CciOversoldBullishCrossover,
                            Study = cciStudy,
                            Period = period,
                            OverBoughtLevel = _cciObThresh,
                            OverSoldLevel = _cciOsThresh
                        });
                    }
                    if (OsBullScan(arg.YesterdayWillR14, arg.WillR14, _willrOsThresh))
                    {
                        returnList.Add(new TradeIdeaRuleWrapper
                        {
                            Rule = TradeIdeaRule.WilliamsROversoldBullishCrossover,
                            Study = williamsRStudy,
                            Period = period,
                            OverBoughtLevel = _willrObThresh,
                            OverSoldLevel = _willrOsThresh
                        });
                    }
                    if (OsBullScan(arg.YesterdayMfi14, arg.Mfi14, _mfiOsThresh))
                    {
                        returnList.Add(new TradeIdeaRuleWrapper
                        {
                            Rule = TradeIdeaRule.MfiOversoldBullishCrossover,
                            Study = mfiStudy,
                            Period = period,
                            OverBoughtLevel = _mfiObThresh,
                            OverSoldLevel = _mfiOsThresh
                        });
                    }
                }

                if (LtStDisagreementFilter(arg.Atr20, arg.YesterdayHigh, arg.YesterdayLow))
                {
                    if (arg.LongTermSentiment != null
                        && arg.LongTermSentiment.Value == Sentiment.Bearish
                        && arg.ShortTermSentiment != null
                        && arg.ShortTermSentiment.Value == Sentiment.Bearish)
                    {
                        if (StLtBearDisagreementScan(arg.LtRsi50, arg.StRsi5, arg.YesterdayStRsi5, _ltRsiBearThresh, _stRsiBullThresh))
                        {
                            returnList.Add(new TradeIdeaRuleWrapper
                            {
                                Rule = TradeIdeaRule.RsiRallyInBearishTrend,
                                Study = rsiStudy,
                                Period = 5,
                                OverBoughtLevel = _stRsiBullThresh,
                                OverSoldLevel = _ltRsiBearThresh
                            });
                        }
                        if (StLtBearDisagreementScan(arg.LtCci50, arg.StCci5, arg.YesterdayStCci5, _ltCciBearThresh, _stCciBullThresh))
                        {
                            returnList.Add(new TradeIdeaRuleWrapper
                            {
                                Rule = TradeIdeaRule.CciRallyInBearishTrend,
                                Study = cciStudy,
                                Period = 5,
                                OverBoughtLevel = _stCciBullThresh,
                                OverSoldLevel = _ltCciBearThresh
                            });
                        }
                    }

                    if (arg.LongTermSentiment != null
                        && arg.LongTermSentiment.Value == Sentiment.Bullish
                        && arg.ShortTermSentiment != null
                        && arg.ShortTermSentiment.Value == Sentiment.Bullish)
                    {
                        if (StLtBullDisagreementScan(arg.LtRsi50, arg.StRsi5, arg.YesterdayStRsi5, _ltRsiBullThresh, _stRsiBearThresh))
                        {
                            returnList.Add(new TradeIdeaRuleWrapper
                            {
                                Rule = TradeIdeaRule.RsiDipInBullishTrend,
                                Study = rsiStudy,
                                Period = 5,
                                OverBoughtLevel = _ltRsiBullThresh,
                                OverSoldLevel = _stRsiBearThresh
                            });
                        }

                        if (StLtBullDisagreementScan(arg.LtCci50, arg.StCci5, arg.YesterdayStCci5, _ltCciBullThresh, _stCciBearThresh))
                        {
                            returnList.Add(new TradeIdeaRuleWrapper
                            {
                                Rule = TradeIdeaRule.CciDipInBullishTrend,
                                Study = cciStudy,
                                Period = 5,
                                OverBoughtLevel = _ltCciBullThresh,
                                OverSoldLevel = _stCciBearThresh
                            });
                        }
                    }
                }
            //}

            foreach (TradeIdeaRule tradeIdeaRule in returnList.Select(item => item.Rule))
            {
                tradeIdeaLog.Results.Add(tradeIdeaRule);
            }

            return returnList;
        }

        #region Private

        private Tuple<TradeIdea, TradeIdeaLog> GenerateTradeIdeaForLatestDate(List<Signal> signals, HistoricalData historicalData)
        {
            Tuple<TradeIdea, TradeIdeaLog> result;

            DateTime date = historicalData.LatestDate;

            //TODO: should we remove this at all? now delayed
            //SupportAndResistance sr = _algoService.GetSupportAndResistance(historicalData, expandedQuote.Last);
            TradeIdeasGeneratorArgument args = TradeIdeasGeneratorArgument.Create(signals, historicalData /*, sr*/);

            double marketCap = 0;
            //if (quote != null)
            //{
            //    marketCap = quote.MarketCapitalization ?? 0;
            //}

            TradeIdeaLog tradeIdeaLog = new TradeIdeaLog(historicalData.SecurityCode, args, date);
            List<TradeIdeaRuleWrapper> generatedTradeIdeas = GenerateTradeIdeas(args, tradeIdeaLog);

            Signal syrahSentiment = signals
                .ForIndicator(TradeIdeasGeneratorArgument.LongTermSentimentForDependencies)
                .FirstOrDefault(s => s.Date == date);
            int? syrahSentimentLongTerm = syrahSentiment == null
                ? null
                : (int?)syrahSentiment.Value;

            syrahSentiment = signals
                .ForIndicator(TradeIdeasGeneratorArgument.ShortTermSentimentForDependencies)
                .FirstOrDefault(s => s.Date == date);
            int? syrahSentimentShortTerm = syrahSentiment == null
                ? null
                : (int?)syrahSentiment.Value;

            double lastPrice = historicalData.Close.Last();

            string companyName = historicalData.SecurityCode;

            if (generatedTradeIdeas != null && generatedTradeIdeas.Any())
            {
                TradeIdea tradeIdea = new TradeIdea
                {
                    DailyPlay = false,
                    DateOfScan = date,
                    MarketCap = marketCap,
                    Price = lastPrice,
                    StockCode = historicalData.SecurityCode,
                    CompanyName = companyName,
                    SyrahSentimentValue = syrahSentimentLongTerm,
                    SyrahSentimentShortTerm = syrahSentimentShortTerm,
                    RuleMatch = generatedTradeIdeas.Select(item => item.Rule).ToList(),
                    RulesWithLogs = generatedTradeIdeas
                };

                result = Tuple.Create(tradeIdea, tradeIdeaLog);
            }
            else
            {
                result = Tuple.Create((TradeIdea)null, tradeIdeaLog);
            }

            return result;
        }

        /// <summary>
        /// Global filter (applied to every stock)
        /// </summary>
        private static bool PriceAndVolFilter(double lastPrice, double lastPriceThresh, double averageVolume, double avgVolThresh)
        {
            if (lastPrice > lastPriceThresh && averageVolume > avgVolThresh)
            {
                return true;
            }
            return false;
        }

        /// <summary>
        /// Support filter logic for oversold/buy the dip scans
        /// </summary>
        //private static bool NearSupport(double lastPrice, double nearestSupport, double rangeStdDev)
        //{
        //	if (Math.Abs(lastPrice - nearestSupport) < rangeStdDev)
        //	{
        //		return true;
        //	}
        //	return false;
        //}

        /// <summary>
        /// Resistance filter logic for overbought/short the rally scans
        /// </summary>
        //private static bool NearResistance(double lastPrice, double nearestResistance, double rangeStdDev)
        //{
        //	if (Math.Abs(nearestResistance - lastPrice) < rangeStdDev)
        //	{
        //		return true;
        //	}
        //	return false;
        //}

        /// <summary>
        /// ob/os filter (applied before running overbought/oversold scans)
        /// </summary>
        //private static bool ObOsFilter(double linRegSlope, double linRegUpperThresh, double linRegLowerThresh)
        //{
        //	if (linRegSlope > linRegLowerThresh && linRegSlope < linRegUpperThresh)
        //	{
        //		return true;
        //	}
        //	return false;
        //}

        /// <summary>
        /// Disagreement filter (run before all long-term/short-term disagreement scans)
        /// </summary>
        private static bool LtStDisagreementFilter(double atr, double yesterdayHigh, double yesterdayLow)
        {
            if ((yesterdayHigh - yesterdayLow) < 1.25 * atr)
            {
                return true;
            }
            return false;
        }

        /// <summary>
        /// Overbought Bearish Scans
        /// </summary>
        private static bool ObBearScan(double yesterdayVal, double val, double obThresh)
        {
            if (yesterdayVal >= obThresh && val < obThresh)
            {
                return true;
            }
            return false;
        }

        /// <summary>
        /// Oversold Bullish Scans
        /// </summary>
        private static bool OsBullScan(double yesterdayVal, double val, double osThresh)
        {
            if (yesterdayVal <= osThresh && val > osThresh)
            {
                return true;
            }
            return false;
        }

        /// <summary>
        /// Short-term/long-term Bearish Disagreement
        /// </summary>
        private static bool StLtBearDisagreementScan(double ltVal, double stVal, double yesterdayStVal,
                double ltCciBearThresh, double stCciBullThresh)
        {
            if (ltVal < ltCciBearThresh && yesterdayStVal >= stCciBullThresh && stVal < stCciBullThresh)
            {
                return true;
            }
            return false;
        }

        /// <summary>
        /// Short-term/long-term Bullish Disagreement
        /// </summary>
        private static bool StLtBullDisagreementScan(double ltVal, double stVal, double yesterdayStVal,
                double ltBullThresh, double stBearThresh)
        {
            if (ltVal > ltBullThresh && yesterdayStVal <= stBearThresh && stVal > stBearThresh)
            {
                return true;
            }
            return false;
        }

        #endregion Private
    }
}

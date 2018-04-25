using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using OptionsPlay.BusinessLogic.Common;
using OptionsPlay.DAL.Interfaces;
using OptionsPlay.Logging;
using OptionsPlay.MarketData;
using OptionsPlay.Model;
using MongoDB.Driver.Builders;
using OptionsPlay.BusinessLogic.Common.Entities;
using System;


namespace OptionsPlay.BusinessLogic.MarketData
{
    public class MarketDataPopulatorService : IMarketDataPopulatorService
    {
        private readonly IOptionsPlayUow _uow;
       
        public MarketDataPopulatorService(IOptionsPlayUow uow)
        {
            _uow = uow;
        }

        private static List<OptionQuoteInfo> _optionsQuoteInfo;
        private static List<StockQuoteInfo> _stocksQuoteInfo;

        private static readonly object Locker = new object();

        private static readonly object RealTimeOptionsQuotesLocker = new object();
        private static readonly object RealTimeStocksQuotesLocker = new object();
        private static readonly object RealTimeStocksPerMinuteQuotesLocker = new object();
        public void PopulateRealTimeQuotes()
        {
            lock (Locker)
            {
                try
                {
                    Task populateOptionQuotesInfo = new Task(() =>
                    {
                        Logger.Debug("Getting OptionQuotesInfo");
                        List<OptionQuoteInfo> optionQuotesInfo = MarketDataProvider.GetOptionQuotesInfo();
                        Logger.Debug("Saving OptionQuotesInfo");
                        _optionsQuoteInfo = _uow.OptionQuotesInfo.GetAll().ToList();
                        _uow.OptionQuotesInfo.Update(optionQuotesInfo, _optionsQuoteInfo);
                    });
                    populateOptionQuotesInfo.Start();

                    Task populateStockQuotesInfo = new Task(() =>
                    {
                        Logger.Debug("Getting StockQuotesInfo");
                        List<StockQuoteInfo> stockQuotesInfo = MarketDataProvider.GetStockQuotesInfo();
                        Logger.Debug("Saving StockQuotesInfo");
                        _stocksQuoteInfo = _uow.StockQuotesInfo.GetAll().ToList();
                        _uow.StockQuotesInfo.Update(stockQuotesInfo, _stocksQuoteInfo);

                    });
                    populateStockQuotesInfo.Start();

                    //Task.WaitAll(populateStockQuotesInfo);

                    Task.WaitAll(populateOptionQuotesInfo, populateStockQuotesInfo);

                }
                catch (System.IO.FileNotFoundException exFileNotFound)
                {
                    Logger.Debug(exFileNotFound.StackTrace.ToString());
                }
                catch (System.IO.IOException exIO)
                {
                    Logger.Debug(exIO.StackTrace.ToString());
                }
            }
        }

        public void PopulateHistoricalQuotes()
        {
            Logger.Debug("Getting StockQuotesInfo");
            List<StockQuoteInfo> quotes = _uow.StockQuotesInfo.GetAll().ToList();
            Logger.Debug("Mapping StockQuotesInfo");
            IEnumerable<HistoricalQuote> historicalQuotes = Mapper.Map<IEnumerable<StockQuoteInfo>, IEnumerable<HistoricalQuote>>(quotes);
            Logger.Debug("Saving StockQuotesInfo");
            _uow.HistoricalQuotes.Add(historicalQuotes);
            Logger.Debug("Completed");
        }

      


        public void ErasePerMinutesQuotes()
        {
            lock (Locker)
            {
                Task EraseOptionQuotesInfo = new Task(() =>
                {
                    Logger.Debug("Start Erasing OptionQuotesInfoPerMinute");
                    _uow.OptionQuotePerMinuteRepository.DeleteDataBeforeTwoDays();
                    Logger.Debug("End Erasing OptionQuotesInfoPerMinute");

                });
                EraseOptionQuotesInfo.Start();

                Task EraseStockQuotesInfo = new Task(() =>
                {
                    Logger.Debug("Start Erasing StockQuotesInfoPerMinute");
                    _uow.StockQuotePerMinuteRepository.DeleteDataBeforeTwoDays();
                    Logger.Debug("End Erasing StockQuotesInfoPerMinute");

                });
                EraseStockQuotesInfo.Start();
                Task.WaitAll(EraseOptionQuotesInfo, EraseStockQuotesInfo);
            }
        }


        public void PopulateLatestStockQuotesToHistoricalQuotesPerDay()
        {
           
                lock (Locker)
                {
                    Task a = new Task(() =>
                    {
                       
                        Logger.Debug("Getting LatestStockQuoteInfo");
                        var tradeDate = DateTime.UtcNow;
                        var lastWriteTime = MarketDataProvider.GetLastWriteTime();
                        if (lastWriteTime.ToShortDateString() != tradeDate.ToShortDateString())
                        {
                            Logger.Debug("The show2003 Dbf doesn't change intraday.");
                            return;
                        }
                        var stockQuotesInfo = _uow.StockQuotesInfo.GetAll().ToList();
                        foreach (var stockQuote in stockQuotesInfo)
                        {
                            var histQuotes = _uow.HistoricalQuotes.GetAll().Where(m => m.StockCode == stockQuote.SecurityCode).ToList();
                           
                            if (histQuotes.Count > 0)
                            {
                                var latestQuote = histQuotes.OrderByDescending(m => m.TradeDate).First();
                                if (latestQuote.TradeDate < tradeDate)
                                {
                                    HistoricalQuote historicalQuote = Mapper.Map<StockQuoteInfo, HistoricalQuote>(stockQuote);
                                    historicalQuote.Id = new MongoDB.Bson.ObjectId();
                                    historicalQuote.TradeDate = tradeDate;
                                    _uow.HistoricalQuotes.Add(historicalQuote);
                                }
                            }
                            else
                            {
                                HistoricalQuote historicalQuote = Mapper.Map<StockQuoteInfo, HistoricalQuote>(stockQuote);
                                historicalQuote.Id = new MongoDB.Bson.ObjectId();
                                historicalQuote.TradeDate = tradeDate;
                                _uow.HistoricalQuotes.Add(historicalQuote);
                            }
                         
                        }
                        Logger.Debug("PopulateLatestStockQuotesToHistoricalQuotesPerDay Completed");
                    });
                    a.Start();
                    Task.WaitAll(a);
                }
           

        }

        public void PopulateRealtimeOptionsQuotes()
        {
            lock (RealTimeOptionsQuotesLocker)
            {
                try
                {
                    Logger.Debug("option quots info start");
                    List<OptionQuoteInfo> optionQuotesInfo = MarketDataProvider.GetOptionQuotesInfo();
                    Logger.Debug("the item count of List Generic is:" + optionQuotesInfo.Count);
                    _optionsQuoteInfo = _uow.OptionQuotesInfo.GetAll().ToList();
                    _uow.OptionQuotesInfo.Update(optionQuotesInfo, _optionsQuoteInfo);
                    Logger.Debug("option quots info end");
                }
                catch (System.IO.FileNotFoundException exFileNotFound)
                {
                    Logger.Debug(exFileNotFound.StackTrace.ToString());
                }
                catch (System.IO.IOException exIO)
                {
                    Logger.Debug(exIO.StackTrace.ToString());

                }
                catch (Exception ex)
                {
                    Logger.Debug(ex.StackTrace.ToString());
                }
            }
        }

        public void PopulateRealtimeStocksQuotes()
        {
            lock (RealTimeStocksQuotesLocker)
            {
                try
                {
                    List<StockQuoteInfo> stockQuotesInfo = MarketDataProvider.GetStockQuotesInfo();
                    _stocksQuoteInfo = _uow.StockQuotesInfo.GetAll().ToList();
                    _uow.StockQuotesInfo.Update(stockQuotesInfo, _stocksQuoteInfo);

                }
                catch (System.IO.FileNotFoundException exFileNotFound)
                {
                    Logger.Debug(exFileNotFound.StackTrace.ToString());
                }
                catch (System.IO.IOException exIO)
                {
                    Logger.Debug(exIO.StackTrace.ToString());

                }
            }
        }



        public void PopulateStocksPerMinutesQuotes(string StockNameList)
        {
            
            lock (RealTimeStocksPerMinuteQuotesLocker)
            {
                List<string> StockNamedListResult = new List<string>();
                if (StockNameList.Contains(","))
                {
                    StockNamedListResult = StockNameList.Split(new char[] { ',' }).ToList();

                }
                else
                    StockNamedListResult.Add(StockNameList);

              // List<string> StockNamedListResult=StockNameList.Split(new char[]{','}).ToList();

                try
                {

                    Logger.Debug("Getting StockQuotesInfoPerMinute:StockNameListtest=" + StockNamedListResult.Count());

                    List<StockQuoteInfo> list = MarketDataProvider.GetStockQuotesInfo().Where(p => StockNamedListResult.Contains(p.SecurityCode)).ToList();

                    
                    Logger.Debug("Saving StockQuotesInfoPerMinute");
                    _uow.StockQuotePerMinuteRepository.Add(list);

                }
                catch (System.IO.FileNotFoundException exFileNotFound)
                {
                    Logger.Debug(exFileNotFound.StackTrace.ToString());
                }
                catch (System.IO.IOException exIO)
                {
                    Logger.Debug(exIO.StackTrace.ToString());

                }
               
             

            }
        }

    }
}

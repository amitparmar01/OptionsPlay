using OptionsPlay.BusinessLogic.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using OptionsPlay.Logging;
using Common.Logging;
using StructureMap;
using System.Diagnostics;
namespace OptionsPlay.Scheduler
{
    public class MarketDataPopulationService
    {
        private static MarketDataPopulationService _instance;
        private readonly IMarketDataPopulatorService _marketDataPopulatorService = ObjectFactory.GetInstance<IMarketDataPopulatorService>();
        private static Task tPopulateOptionsQuotes;
        private static Task tPopulateStockQuotes;
        private static Task tPopulateStockPerMinuteQuotes;
        private static CancellationTokenSource ctsOption, ctsStock, ctsStockPerMinute;

        private static StockPerMinuteConfiguration stockPerMinuteConfiguration = StockPerMinuteConfiguration.Instance;


         

        /// <summary>
        /// Get instance
        /// </summary>
        public static MarketDataPopulationService Instance
        {
            get
            {
                return _instance ?? (_instance = new MarketDataPopulationService());
            }
        }
   

      
        public void Start()
        {
          
           
             Thread P_th = new Thread(
                 () =>
                 {
                          ctsOption = new CancellationTokenSource();                     
                          ctsStock = new CancellationTokenSource();
                          ctsStockPerMinute = new CancellationTokenSource();
                         ThreadPopulateOptionsQuotes(ctsOption.Token);
                         ThreadPopulateStockQuotes(ctsStock.Token);
                         ThreadPopulateStockPerMinuteQuotes(ctsStockPerMinute.Token);
                     while (true)
                     {
                        if (tPopulateOptionsQuotes.Status == TaskStatus.Created)
                        {
                            tPopulateOptionsQuotes.Start();
                            tPopulateStockQuotes.Start();
                            tPopulateStockPerMinuteQuotes.Start();
                        }
                     }
                 });

             P_th.IsBackground = true;
             P_th.Start();
            
           
        }


        public void ThreadPopulateOptionsQuotes(CancellationToken token)
        {

            tPopulateOptionsQuotes = new Task(() =>
            {
                Logger.Debug("PopulateRealTimeOptionsQuotes Start……");

                while (true)
                {
                    DateTime now = DateTime.Now;
                    if (!token.IsCancellationRequested && (now.Hour >= 9 && now.Hour < 16))
                    {
                        Logger.Debug("PopulateRealTimeOptionsQuotes Begin……");
                        Stopwatch stopwatch = new Stopwatch();
                        stopwatch.Start();
                        _marketDataPopulatorService.PopulateRealtimeOptionsQuotes();
                        stopwatch.Stop();
                        Logger.Info("PopulateRealTimeOptionsQuotes cost: " + stopwatch.ElapsedMilliseconds + " ms");
                    }
                }

            });
        }

        public void ThreadPopulateStockQuotes(CancellationToken token)
        {
             tPopulateStockQuotes = new Task(() =>
            {
                Logger.Debug("PopulateRealTimeStocksQuotes Start……");

                while (true)
                {
                    DateTime now = DateTime.Now;
                    if (!token.IsCancellationRequested && (now.Hour >= 9 && now.Hour < 16))
                    {
                        Stopwatch stopwatch = new Stopwatch();
                        stopwatch.Start();
                        _marketDataPopulatorService.PopulateRealtimeStocksQuotes();
                        stopwatch.Stop();
                        Logger.Info("PopulateRealTimeStocksQuotes:" + stopwatch.ElapsedMilliseconds);
                    }
                }
            });
        }

        
        public void ThreadPopulateStockPerMinuteQuotes(CancellationToken token)
        {
            String StockNamelist="";


            StockNamelist = stockPerMinuteConfiguration.value;
           

                 tPopulateStockPerMinuteQuotes = new Task(() =>
                {
                    Logger.Debug("PopulateStockPerMinuteQuotes Start……");

                while (true)
                {
                    DateTime now = DateTime.Now;
                 
                 
                    if (!token.IsCancellationRequested && (now.Hour >= 9 && now.Hour < 16))
                    {
                      
                        Stopwatch stopwatch = new Stopwatch();
                        stopwatch.Start();
                        _marketDataPopulatorService.PopulateStocksPerMinutesQuotes(StockNamelist);
                       
                        stopwatch.Stop();
                        Logger.Info("PopulateStockPerMinuteQuotes:" + stopwatch.ElapsedMilliseconds);
                        
                        //TimeSpan ts = DateTime.Now - now;
                        Thread.Sleep(60000 - (DateTime.Now - now).Milliseconds);
                    }     
                }


                });
        }
    }
}

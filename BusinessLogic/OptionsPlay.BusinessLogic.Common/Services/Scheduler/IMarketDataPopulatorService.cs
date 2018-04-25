namespace OptionsPlay.BusinessLogic.Common
{
	public interface IMarketDataPopulatorService
	{
		void PopulateRealTimeQuotes();

		void PopulateHistoricalQuotes();

       
        //void PopulateStockOptionQuotes();

        void ErasePerMinutesQuotes();

        void PopulateLatestStockQuotesToHistoricalQuotesPerDay();

        void PopulateRealtimeOptionsQuotes();

        void PopulateRealtimeStocksQuotes();

        void PopulateStocksPerMinutesQuotes(string StockNameList);
	}
}

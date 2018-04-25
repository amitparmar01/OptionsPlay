namespace OptionsPlay.Model.Enums
{
	public enum SchedulerTaskType
	{
		RealTimeQuotesPopulating = 1,
		HistoricalQuotesPopulating = 2,
		TradeIdeasPopulating = 3,
        StockOptionPerMinuteQuotesPopulating=4,
        ErasePerMinuteQuotesPopulating=5,
        LatestStockQuotesToHistoricalQuotesPerDayPopulating=6
	}
}

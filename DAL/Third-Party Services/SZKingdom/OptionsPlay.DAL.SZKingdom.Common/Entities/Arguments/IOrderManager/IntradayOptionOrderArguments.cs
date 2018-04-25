using OptionsPlay.DAL.SZKingdom.Common.Enums;

namespace OptionsPlay.DAL.SZKingdom.Common.Entities.Arguments
{
	public class IntradayOptionOrderArguments
	{
		public IntradayOptionOrderArguments()
		{
			StockBoard = StockBoard.SHStockOptions;
		}

		public string CustomerCode { get; set; }
		public string CustomerAccountCode { get; set; }
		public StockBoard StockBoard { get; set; }
		public string TradeAccount { get; set; }
		public string OptionNumber { get; set; }
		public string OptionUnderlyingCode { get; set; }
		public string OrderId { get; set; }
		public long? OrderBatchSerialNo { get; set; }
		public string QueryPosition { get; set; }

        public string StockBusiness { get; set; }
        public string StockBusinessAction { get; set; }
	}
}
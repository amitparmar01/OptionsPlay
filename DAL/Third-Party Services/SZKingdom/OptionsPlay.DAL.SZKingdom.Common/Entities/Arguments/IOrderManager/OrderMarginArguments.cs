using OptionsPlay.DAL.SZKingdom.Common.Enums;

namespace OptionsPlay.DAL.SZKingdom.Common.Entities.Arguments
{
	public class OrderMarginArguments
	{
		
		public OrderMarginArguments()
		{
			//Assign default value
			StockBoard = StockBoard.SHStockOptions;
			Currency = Currency.ChineseYuan;
		}
		
		public string CustomerAccountCode { get; set; }
		public StockBoard StockBoard { get; set; }
		public Currency Currency { get; set; }
		public string TradeAccount { get; set; }
		public string OptionNumber { get; set; }
		public long OrderQuantity { get; set; }
	}
}
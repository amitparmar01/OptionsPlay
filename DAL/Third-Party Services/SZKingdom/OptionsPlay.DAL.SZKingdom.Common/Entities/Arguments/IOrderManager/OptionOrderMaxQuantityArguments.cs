using OptionsPlay.DAL.SZKingdom.Common.Enums;

namespace OptionsPlay.DAL.SZKingdom.Common.Entities.Arguments
{
	public class OptionOrderMaxQuantityArguments
	{
		public OptionOrderMaxQuantityArguments()
		{
			//Assign default value
			StockBoard = StockBoard.SHStockOptions;
		}

		public string CustomerCode { get; set; }
		public string CustomerAccountCode { get; set; }
		public StockBoard StockBoard { get; set; }
		public string TradeAccount { get; set; }
		public StockBusiness StockBusiness { get; set; }
		public StockBusinessAction StockBusinessAction { get; set; }
		public string OptionNumber { get; set; }
		public string SecurityCode { get; set; }
		public decimal? OrderPrice { get; set; }

	}
}
using OptionsPlay.DAL.SZKingdom.Common.Enums;

namespace OptionsPlay.DAL.SZKingdom.Common.Entities.Arguments
{
	public class OptionPositionsArguments
	{
		public OptionPositionsArguments()
		{
			StockBoard = StockBoard.SHStockOptions;
		}

		public string CustomerCode { get; set; }
		public string CustomerAccountCode { get; set; }
		public StockBoard StockBoard { get; set; }
		public string TradeAccount { get; set; }
		public string OptionNumber { get; set; }
		public string TradeUnit { get; set; }
		public OptionSide OptionSide { get; set; }
		public OptionCoveredFlag OptionCoveredFlag { get; set; }
		public string QueryPosition { get; set; }
	}
}
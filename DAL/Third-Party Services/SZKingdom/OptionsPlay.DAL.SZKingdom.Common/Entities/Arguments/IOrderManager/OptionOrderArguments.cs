using OptionsPlay.DAL.SZKingdom.Common.Enums;

namespace OptionsPlay.DAL.SZKingdom.Common.Entities.Arguments
{
	public class OptionOrderArguments
	{
		public OptionOrderArguments()
		{
			//Assign default value
			StockBoard = StockBoard.SHStockOptions;
			SecurityLevel = SecurityLevel.PasswordAuthentication;
		}

		public string CustomerAccountCode { get; set; }
		public StockBoard StockBoard { get; set; }
		public string TradeAccount { get; set; }
		public string OptionNumber { get; set; }
		public string SecurityCode { get; set; }
		public long OrderQuantity { get; set; }
		public StockBusiness StockBusiness { get; set; }
		public StockBusinessAction StockBusinessAction { get; set; }
		public SecurityLevel SecurityLevel { get; set; }
		public string SecurityInfo { get; set; }
		public string Password { get; set; }
		public decimal? OrderPrice { get; set; }
		public string CustomerCode { get; set; }
		public string TradeUnit { get; set; }
		public long? OrderBatchSerialNo { get; set; }
		public string ClientInfo { get; set; }

        public string InternalOrganization { get; set; }
	}
}
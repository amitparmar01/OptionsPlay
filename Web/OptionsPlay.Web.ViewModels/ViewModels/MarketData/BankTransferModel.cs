namespace OptionsPlay.Web.ViewModels.MarketData
{
	public class BankTransferModel
	{
		public long BankCode{ get; set; }
		public string FundPassword{ get; set; }
		public string BankPassword{ get; set; }
		public int TransferAmount{ get; set; }
		public int Dir{ get; set; }
	}
}

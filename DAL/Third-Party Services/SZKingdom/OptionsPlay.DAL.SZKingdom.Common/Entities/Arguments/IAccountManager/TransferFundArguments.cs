using OptionsPlay.DAL.SZKingdom.Common.Enums;

namespace OptionsPlay.DAL.SZKingdom.Common.Entities.Arguments
{
	public class TransferFundArguments
	{
		public TransferFundArguments()
		{
			Currency = Currency.ChineseYuan;
		}

		public string CustomerAccountCode { get; set; }
		public string FundPassword { get; set; }
		public string BankCode { get; set; }
		public string BankPassword { get; set; }
		public TransferType TransferType { get; set; }
		public decimal TransferAmount { get; set; }
		public Currency Currency { get; set; }

		public string OperationRemark { get; set; }

	}
}
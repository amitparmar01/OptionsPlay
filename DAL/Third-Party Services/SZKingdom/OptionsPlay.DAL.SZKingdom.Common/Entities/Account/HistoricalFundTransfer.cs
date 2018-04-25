using System;
using OptionsPlay.DAL.SZKingdom.Common.Enums;

namespace OptionsPlay.DAL.SZKingdom.Common.Entities
{
	public class HistoricalFundTransfer
	{
		[SZKingdomField("QRY_POS")]
		public int QtyPos { get; set; }

		[SZKingdomField("SERIAL_NO")]
		public int SerialNo { get; set; }

		[SZKingdomField("SETT_DATE")]
		public DateTime SettleDate { get; set; }

		[SZKingdomField("OCCUR_DATE")]
		public DateTime OccurDate { get; set; }

		[SZKingdomField("OCCUR_TIME")]
		public DateTime OccurTime { get; set; }

		[SZKingdomField("EXT_ORG")]
		public int ExternalOrganization { get; set; }

		[SZKingdomField("INT_ORG")]
		public int InternalOrganization { get; set; }

		[SZKingdomField("CUST_CODE")]
		public string CustomerCode { get; set; }

		[SZKingdomField("USER_TYPE")]
		public string UserType { get; set; }

		[SZKingdomField("CUST_NAME")]
		public string CustomerName { get; set; }

		[SZKingdomField("CUACCT_CODE")]
		public string CustomerAccountCode { get; set; }

		[SZKingdomField("CUACCT_ATTR")]
		public string CustomerAccountAttribute { get; set; }

		[SZKingdomField("BANK_ACCT")]
		public string BankAccount { get; set; }

		[SZKingdomField("BDMF_ACCT")]
		public string BdmfAccount { get; set; }

		[SZKingdomField("ID_TYPE")]
		public IdType IdType { get; set; }

		[SZKingdomField("ID_CODE")]
		public string IdCode { get; set; }

		[SZKingdomField("CURRENCY")]
		public Currency Currency { get; set; }

		[SZKingdomField("CUBSB_TRD_ID")]
		public string CubsbTradeId { get; set; }

		[SZKingdomField("BIZ_CODE")]
		public int BizCode { get; set; }

		[SZKingdomField("BIZ_AMT")]
		public decimal BidAmount { get; set; }

		[SZKingdomField("FUND_BLN")]
		public decimal FundBalance { get; set; }

		[SZKingdomField("CUBSB_TRD_STATUS")]
		public string CubsbTradeStatus { get; set; }

		[SZKingdomField("CANCEL_STATUS")]
		public string CancelStatus { get; set; }

		[SZKingdomField("ORIGINAL_SN")]
		public int OriginalSerialNumber { get; set; }

		[SZKingdomField("CUACCT_LOG_SN")]
		public int CustomerAccountLogSerialNumber { get; set; }
	}
}
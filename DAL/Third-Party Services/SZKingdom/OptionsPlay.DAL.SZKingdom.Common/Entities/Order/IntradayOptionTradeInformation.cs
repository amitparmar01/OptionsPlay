using System;
using OptionsPlay.DAL.SZKingdom.Common.Enums;

namespace OptionsPlay.DAL.SZKingdom.Common.Entities
{
	public class IntradayOptionTradeInformation : OptionOrderInformation
	{
		[SZKingdomField("QRY_POS")]
		public string QueryPosition { get; set; }

		[SZKingdomField("TRD_DATE")]
		public DateTime TradeDate { get; set; }

		[SZKingdomField("MATCHED_TIME")]
		public DateTime MatchedTime { get; set; }

		[SZKingdomField("ORDER_DATE")]
		public DateTime OrderDate { get; set; }

		[SZKingdomField("ORDER_SN")]
		public long OrderSerialNo { get; set; }

		[SZKingdomField("INT_ORG")]
		public long InternalOrganization { get; set; }

		[SZKingdomField("CUST_CODE")]
		public string CustomerCode { get; set; }

		[SZKingdomField("STKEX")]
		public StockExchange StockExchange { get; set; }

		[SZKingdomField("OWNER_TYPE")]
		public string OwnerType { get; set; }

		[SZKingdomField("CURRENCY")]
		public Currency Currency { get; set; }

		[SZKingdomField("OPT_UNDL_CLS")]
		public string OptionUnderlyingClass { get; set; }

		[SZKingdomField("MATCHED_TYPE")]
		public MatchedType MatchedType { get; set; }

		[SZKingdomField("MATCHED_SN")]
		public string MatchedSerialNo { get; set; }

		[SZKingdomField("MATCHED_QTY")]
		public long MatchedQuantity { get; set; }

		[SZKingdomField("MATCHED_PRICE")]
		public decimal MatchedPrice { get; set; }

		[SZKingdomField("MATCHED_AMT")]
		public decimal MatchedAmount { get; set; }

		[SZKingdomField("IS_WITHDRAW")]
		public IsWithdraw IsWithdraw { get; set; }
	}
}
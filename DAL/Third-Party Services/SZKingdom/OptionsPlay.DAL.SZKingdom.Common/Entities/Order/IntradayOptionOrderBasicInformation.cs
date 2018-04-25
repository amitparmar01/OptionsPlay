using System;
using OptionsPlay.DAL.SZKingdom.Common.Enums;

namespace OptionsPlay.DAL.SZKingdom.Common.Entities
{
	public class IntradayOptionOrderBasicInformation : OptionOrderInformation
	{

		[SZKingdomField("TRD_DATE")]
		public DateTime TradeDate { get; set; }

		[SZKingdomField("ORDER_DATE")]
		public DateTime OrderDate { get; set; }

		[SZKingdomField("ORDER_TIME")]
		public DateTime OrderTime { get; set; }

		[SZKingdomField("ORDER_STATUS")]
		public OrderStatus OrderStatus { get; set; }

		[SZKingdomField("ORDER_VALID_FLAG")]
		public OrderValidFlag OrderValidFlag { get; set; }

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

		[SZKingdomField("ORDER_UFZ_AMT")]
		public decimal OrderUnfrozenAmount { get; set; }

		[SZKingdomField("OFFER_QTY")]
		public long OfferQuantity { get; set; }

		// format: hhmmss
		[SZKingdomField("OFFER_STIME")]
		public DateTime OfferSTime { get; set; }

		[SZKingdomField("WITHDRAWN_QTY")]
		public long WithdrawnQuantity { get; set; }

		[SZKingdomField("MATCHED_QTY")]
		public long MatchedQuantity { get; set; }

		[SZKingdomField("MATCHED_AMT")]
		public decimal MatchedAmount { get; set; }

		[SZKingdomField("IS_WITHDRAW")]
		public IsWithdraw IsWithdraw { get; set; }

		[SZKingdomField("IS_WITHDRAWN")]
		public IsWithdrawn IsWithdrawn { get; set; }

		[SZKingdomField("OPT_UNDL_CLS")]
		public string OptionUnderlyingClass { get; set; }

		[SZKingdomField("UNDL_FRZ_QTY")]
		public long UnderlyingFrozenQuantity { get; set; }

		[SZKingdomField("UNDL_UFZ_QTY")]
		public long UnderlyingUnfrozenQuantity { get; set; }

		[SZKingdomField("UNDL_WTH_QTY")]
		public long UnderlyingWithdrawnQuantity { get; set; }
	}
}
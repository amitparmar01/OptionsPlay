
using System;
using OptionsPlay.DAL.SZKingdom.Common.Enums;

namespace OptionsPlay.DAL.SZKingdom.Common.Entities
{
    public class HistoricalOptionTradeInformation : OptionOrderCommonInformation
	{
		[SZKingdomField("REC_NUM")]
		public long RecordNumber { get; set; }

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

		[SZKingdomField("CURRENCY")]
		public Currency Currency { get; set; }

		[SZKingdomField("OPT_NUM")]
		public string OptionNumber { get; set; }
		
		[SZKingdomField("OPT_NAME")]
		public string OptionName { get; set; }

		[SZKingdomField("OPT_UNDL_CODE")]
		public string OptionUnderlyingCode { get; set; }

		[SZKingdomField("OPT_UNDL_NAME")]
		public string OptionUnderlyingName { get; set; }

		[SZKingdomField("OPT_UNDL_CLS")]
		public string OptionUnderlyingClass { get; set; }
		
		[SZKingdomField("MATCH_QTY")]
		public long MatchedQuantity { get; set; }

		[SZKingdomField("MATCH_PRICE")]
		public decimal MatchedPrice { get; set; }

		[SZKingdomField("MATCH_AMT")]
		public decimal MatchedAmount { get; set; }






        [SZKingdomField("ORDER_PRICE")]
        public decimal OrderPrice { get; set; }

        [SZKingdomField("ORDER_QTY")]
        public long OrderQuantity { get; set; }

        //[SZKingdomField("ORDER_AMT")]
        //public decimal OrderAmount { get; set; }

        [SZKingdomField("ORDER_FRZ_AMT")]
        public decimal OrderFrozenAmount { get; set; }

	}
}
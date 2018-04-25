namespace OptionsPlay.DAL.SZKingdom.Common.Entities
{
	public class OptionOrderBasicInformation : OptionOrderCommonInformation
	{
		[SZKingdomField("ORDER_PRICE")]
		public decimal OrderPrice { get; set; }

		[SZKingdomField("ORDER_QTY")]
		public long OrderQuantity { get; set; }

		[SZKingdomField("ORDER_AMT")]
		public decimal OrderAmount { get; set; }

		[SZKingdomField("ORDER_FRZ_AMT")]
		public decimal OrderFrozenAmount { get; set; }
	}
}

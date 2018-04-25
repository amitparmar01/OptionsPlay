using System;
using OptionsPlay.DAL.SZKingdom.Common.Enums;

namespace OptionsPlay.DAL.SZKingdom.Common.Entities
{
	public class QuotationInformation
	{
		[SZKingdomField("STKEX")]
		public StockExchange StockExchange { get; set; }

		[SZKingdomField("STKBD")]
		public StockBoard TradeSector { get; set; }

		[SZKingdomField("STK_CODE")]
		public string SecurityCode { get; set; }

		[SZKingdomField("CLOSING_PRICE")]
		public decimal ClosingPrice { get; set; }

		[SZKingdomField("OPENING_PRICE")]
		public decimal OpeningPrice { get; set; }

		[SZKingdomField("CURRENT_PRICE")]
		public decimal CurrentPrice { get; set; }

		[SZKingdomField("BOND_INT")]
		public decimal? BondInterest { get; set; }

		[SZKingdomField("BOND_INT_DATE")]
		public DateTime? BondInterestDate { get; set; }

		[SZKingdomField("ETF_IOPV")]
		public decimal ETF_IOPV { get; set; }

		[SZKingdomField("TRD_DATE")]
		public DateTime TradeDate { get; set; }
	}
}
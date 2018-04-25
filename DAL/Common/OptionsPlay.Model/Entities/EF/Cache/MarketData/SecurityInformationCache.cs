using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OptionsPlay.Model
{
	public class SecurityInformationCache : IBaseEntity<long>
	{
		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public long Id { get; set; }

		[Column(TypeName = "char")]
		[MaxLength(1)]
		public string StockExchange { get; set; }

		[Column(TypeName = "char")]
		[MaxLength(2)]
		public string TradeSector { get; set; }

		[MaxLength(8)]
		public string SecurityCode { get; set; }

		[MaxLength(16)]
		public string SecurityName { get; set; }

		[Column(TypeName = "char")]
		[MaxLength(1)]
		public string SecurityClass { get; set; }

		[Column(TypeName = "char")]
		[MaxLength(1)]
		public string SecurityStatus { get; set; }

		[Column(TypeName = "char")]
		[MaxLength(1)]
		public string Currency { get; set; }


		public decimal LimitUpRatio { get; set; }

		public decimal LimitDownRatio { get; set; }

		public decimal LimitUpPrice { get; set; }

		public decimal LimitDownPrice { get; set; }

		public long LimitUpQuantity { get; set; }

		public long LimitDownQuantity { get; set; }


		public long LotSize { get; set; }

		[Column(TypeName = "char")]
		[MaxLength(1)]
		public string LotFlag { get; set; }

		public long Spread { get; set; }

		[Column(TypeName = "char")]
		[MaxLength(1)]
		public string MarketValueFlag { get; set; }

		[Column(TypeName = "char")]
		[MaxLength(1)]
		public string SuspendedFlag { get; set; }

		[MaxLength(16)]
		public string ISIN { get; set; }

		[Column(TypeName = "char")]
		[MaxLength(1)]
		public string SecuritySubClass { get; set; }

		[MaxLength(512)]
		public string SecurityBusinesses { get; set; }

		[Column(TypeName = "char")]
		[MaxLength(1)]
		public string CustodyMode { get; set; }

		[MaxLength(8)]
		public string UnderlyinSecurityCode { get; set; }

		public int BuyUnit { get; set; }

		public int SellUnit { get; set; }

		public decimal? BondInterest { get; set; }

		[Column(TypeName = "char")]
		[MaxLength(1)]
		public string SecurityLevel { get; set; }

		public int TradeDeadline { get; set; }

		[MaxLength(128)]
		public string RemindMessage { get; set; }
	}
}
using System;
using OptionsPlay.DAL.SZKingdom.Common.Enums;

namespace OptionsPlay.DAL.SZKingdom.Common.Entities.Arguments
{
	public class HistoricalOptionOrdersArguments
	{
		public HistoricalOptionOrdersArguments()
		{
			//Assign default value
			StockBoard = StockBoard.SHStockOptions;
			BeginDate = DateTime.Today.AddDays(-7);
			EndDate = DateTime.Today;
			PageNumber = 1;
			PageRecordCount = 1000;
		}
		public string CustomerCode { get; set; }
		public string CustomerAccountCode { get; set; }
		public StockBoard StockBoard { get; set; }
		public string TradeAccount { get; set; }
		public string OptionNumber { get; set; }
		public string OptionUnderlyingCode { get; set; }
		public string OrderId { get; set; }
		public long? OrderBatchSerialNo { get; set; }

		/// <summary>
		/// Begin date of this query. Use toString("yyyyMMdd") instead of toString().
		/// </summary>
		public DateTime BeginDate { get; set; }

		/// <summary>
		/// End date of this query. Use toString("yyyyMMdd") instead of toString().
		/// </summary>
		public DateTime EndDate { get; set; }
		public long PageNumber { get; set; }
		public long PageRecordCount { get; set; }

	}
}
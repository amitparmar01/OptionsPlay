using OptionsPlay.DAL.SZKingdom.Common.Enums;

namespace OptionsPlay.DAL.SZKingdom.Common.Entities.Arguments
{
	public class OptionOrderCancellationArguments
	{
		public OptionOrderCancellationArguments()
		{
			//Assign default value
			StockBoard = StockBoard.SHStockOptions;
		}

		public string CustomerAccountCode { get; set; }
		public long InternalOrganization { get; set; }
		public StockBoard StockBoard { get; set; }
		public string OrderId { get; set; }
		public long? OrderBatchSerialNo { get; set; }
		public string ClientInfo { get; set; }
	}
}
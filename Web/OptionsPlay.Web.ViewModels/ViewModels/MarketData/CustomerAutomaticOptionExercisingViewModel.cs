 namespace OptionsPlay.Web.ViewModels.MarketData
{
	public class CustomerAutomaticOptionExercisingViewModel
	{
		public string ExercisingStrategyType { get; set; }
		public decimal ExercisingStrategyValue { get; set; }
		public bool AutomaticExcerciseControl { get; set; }
		public long ExercisingQuantity { get; set; }
		public string ContractNumber { get; set; }
		public string ContractName { get; set; }

	}
}

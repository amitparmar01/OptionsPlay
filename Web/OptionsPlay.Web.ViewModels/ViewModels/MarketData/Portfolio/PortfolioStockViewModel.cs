namespace OptionsPlay.Web.ViewModels.MarketData
{
	//todo: need to be implemented
	public class PortfolioStockViewModel : PortfolioItemViewModel
	{

		#region Overrided

		public override bool IsStock
		{
			get
			{
				return true;
			}
		}

		public override string ItemCode
		{
			get
			{
				return SecurityCode;
			}
		}

		public override string ItemName
		{
			get
			{
				return SecurityName;
			}
		}
		
		#endregion Overrided
	}
}

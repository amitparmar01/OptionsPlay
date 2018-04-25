namespace OptionsPlay.Web.ViewModels
{
	/// <summary>
	/// this class is essential due to http://stackoverflow.com/questions/15590319/asp-net-mvc-4-web-api-ambiguousmatchexception
	/// </summary>
	public class StrategyBase
	{
		public int Id { get; set; }

		public virtual string Name { get; set; }

		public virtual bool CanCustomizeWidth { get; set; }

		public virtual bool CanCustomizeWingspan { get; set; }

		public virtual bool CanCustomizeExpiry { get; set; }
		
		public virtual int? PairStrategyId { get; set; }
	}
}
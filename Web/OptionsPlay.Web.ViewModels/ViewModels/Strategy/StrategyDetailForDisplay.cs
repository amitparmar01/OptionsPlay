using OptionsPlay.Model.Enums;

namespace OptionsPlay.Web.ViewModels
{
	public class StrategyDetailForDisplay
	{
		public int Id { get; set; }

		public virtual Risk? Risk { get; set; }

		public virtual Sentiment? FirstSentiment { get; set; }

		public Sentiment? SecondSentiment { get; set; }

		public Sentiment? ThirdSentiment { get; set; }

		public virtual byte? OccLevel { get; set; }

		public virtual Risk? Reward { get; set; }

		/// <summary>
		/// Whether to display on the funnel page or not
		/// </summary>
		public virtual bool Display { get; set; }

		public virtual int? DisplayOrder { get; set; }
	}
}
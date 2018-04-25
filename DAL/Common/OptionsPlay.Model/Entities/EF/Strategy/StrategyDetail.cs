using System.ComponentModel.DataAnnotations;
using OptionsPlay.Model.Enums;

namespace OptionsPlay.Model
{
	public class StrategyDetail : IBaseEntity<int>
	{
		public int Id { get; set; }

		[Required]
		public Risk? Risk { get; set; }

		[Required]
		public Sentiment? FirstSentiment { get; set; }

		public Sentiment? SecondSentiment { get; set; }

		public Sentiment? ThirdSentiment { get; set; }

		[Required]
		public byte? OccLevel { get; set; }

		[Required]
		public Risk? Reward { get; set; }

		public int? DisplayOrder { get; set; }

		public bool Display { get; set; }
	}
}

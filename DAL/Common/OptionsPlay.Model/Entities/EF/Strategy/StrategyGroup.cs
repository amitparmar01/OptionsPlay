using System;
using System.ComponentModel.DataAnnotations;

namespace OptionsPlay.Model
{
	public class StrategyGroup : IBaseEntity<int>
	{
		public int Id { get; set; }

		[Required]
		public string Name { get; set; }

		[Required]
		public bool CanCustomizeWidth { get; set; }

		[Required]
		public bool CanCustomizeWingspan { get; set; }

		[Required]
		public bool CanCustomizeExpiry { get; set; }

		[Required]
		public bool Display { get; set; }

		public virtual Strategy CallStrategy { get; set; }

		[Required]
		public int CallStrategyId { get; set; }

		public virtual Strategy PutStrategy { get; set; }

		public int? PutStrategyId { get; set; }

		public int? DisplayOrder { get; set; }

		public virtual Image OriginalImage { get; set; }

		public virtual Image ThumbnailImage { get; set; }

		public Guid? OriginalImageId { get; set; }

		public Guid? ThumbnailImageId { get; set; }
	}
}

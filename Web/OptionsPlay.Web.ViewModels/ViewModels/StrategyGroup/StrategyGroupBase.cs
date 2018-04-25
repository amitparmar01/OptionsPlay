using System;

namespace OptionsPlay.Web.ViewModels
{
	public abstract class StrategyGroupBase
	{
		public int Id { get; set; }

		public virtual string Name { get; set; }

		public virtual bool CanCustomizeWidth { get; set; }

		public virtual bool CanCustomizeWingspan { get; set; }

		public virtual bool CanCustomizeExpiry { get; set; }

		public virtual bool Display { get; set; }

		public virtual int CallStrategyId { get; set; }

		public virtual int? PutStrategyId { get; set; }

		public virtual int? DisplayOrder { get; set; }
	}
}
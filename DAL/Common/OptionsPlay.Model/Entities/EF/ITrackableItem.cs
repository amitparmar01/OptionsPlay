using System;

namespace OptionsPlay.Model
{
	public interface ITrackableItem
	{
		User CreatedBy { get; set; }

		User ModifiedBy { get; set; }

		DateTime ModifiedDate { get; set; }
	}

	public interface IPricingModel
	{
		decimal MonthlyPrice { get; set; }

		decimal AnnualPrice { get; set; }
	}
}
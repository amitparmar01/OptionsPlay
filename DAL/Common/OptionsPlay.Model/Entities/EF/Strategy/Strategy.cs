using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace OptionsPlay.Model
{
	public class Strategy : IBaseEntity<int>
	{
		public int Id { get; set; }

		[Required]
		public string Name { get; set; }

		public int BuyDetailsId { get; set; }

		public virtual StrategyDetail BuyDetails { get; set; }

		public int SellDetailsId { get; set; }

		public virtual StrategyDetail SellDetails { get; set; }

		[Required]
		public bool CanCustomizeWidth { get; set; }

		[Required]
		public bool CanCustomizeWingspan { get; set; }

		[Required]
		public bool CanCustomizeExpiry { get; set; }
		
		public int? PairStrategyId { get; set; }

		public virtual ICollection<StrategyLeg> Legs { get; set; }
	}
}

using System.ComponentModel.DataAnnotations;
using OptionsPlay.Model.Enums;

namespace OptionsPlay.Model
{
	public class StrategyLeg : IBaseEntity<int>
	{
		public int Id { get; set; }

		[Required]
		public BuyOrSell? BuyOrSell { get; set; }

		[Required]
		public int Quantity { get; set; }

		public short? Strike { get; set; }

		public byte? Expiry { get; set; }

		[Required]
		public LegType? LegType { get; set; }

		public int StrategyId { get; set; }

		[Required]
		public virtual Strategy Strategy { get; set; }
	}
}

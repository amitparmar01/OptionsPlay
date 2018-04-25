using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OptionsPlay.Model
{
	public class MasterSecurity : IBaseEntity<long>
	{

		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public long Id { get; set; }

		public string MasterSecurityCode { get; set; }

		public string SecurityCode { get; set; }

		public string Name { get; set; }

		public string ISIN { get; set; }

		public bool UseAsMasterList { get; set; }

		public bool UseForTechnicalRank { get; set; }

		public bool UseForTradeIdeas { get; set; }

		public string Exchange { get; set; }
	}
}
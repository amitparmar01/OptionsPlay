using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OptionsPlay.Model
{
	public class Role : IBaseEntity<long>
	{
		[DatabaseGenerated(DatabaseGeneratedOption.None)]
		public long Id { get; set; }

		[MaxLength(255)]
		public string Description { get; set; }
	}
}

using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using OptionsPlay.Model.Enums;

namespace OptionsPlay.Model
{
	[Table("CacheStatuses")]
	public class CacheStatus : IBaseEntity<long>
	{
		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public long Id { get; set; }

		public CacheEntity EntityType { get; set; }

		public DateTime? LastUpdated { get; set; }

		public CacheEntryStatus Status { get; set; }

		[Timestamp]
		public byte[] RowVersion { get; set; }
	}
}

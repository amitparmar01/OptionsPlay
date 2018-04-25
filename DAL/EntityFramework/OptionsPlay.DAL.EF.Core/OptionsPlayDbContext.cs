using System.Data.Entity;
using OptionsPlay.Model;

namespace OptionsPlay.DAL.EF.Core
{
	public class OptionsPlayDbContext : DbContext
	{
		public OptionsPlayDbContext()
			: base("OptionsPlay")
		{

		}

		protected override void OnModelCreating(DbModelBuilder modelBuilder)
		{
		}

		public DbSet<User> Users { get; set; }

		public DbSet<ConfigDirectory> ConfigDirectories { get; set; }

		public DbSet<ConfigValue> ConfigValues { get; set; }

		public DbSet<Strategy> Strategies { get; set; }

		public DbSet<StrategyGroup> StrategyGroups { get; set; }

		public DbSet<CacheStatus> CacheStatuses { get; set; }

		public DbSet<SecurityInformationCache> SecuritiesInformation { get; set; }

		public DbSet<OptionBasicInformationCache> OptionsBasicInformation { get; set; }

		public DbSet<MasterSecurity> MasterSecurities { get; set; }

	}
}
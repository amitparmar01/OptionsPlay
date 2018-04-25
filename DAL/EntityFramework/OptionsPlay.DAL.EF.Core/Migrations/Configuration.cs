using System.Data.Entity.Migrations;

namespace OptionsPlay.DAL.EF.Core.Migrations
{
	public sealed class Configuration : DbMigrationsConfiguration<OptionsPlayDbContext>
	{
		public Configuration()
		{
			AutomaticMigrationsEnabled = false;
		}

		protected override void Seed(OptionsPlayDbContext context)
		{
		}
	}
}

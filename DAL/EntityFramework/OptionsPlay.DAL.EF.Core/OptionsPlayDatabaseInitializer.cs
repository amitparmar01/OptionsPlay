using System.Data.Entity;
using OptionsPlay.DAL.EF.Core.Migrations;

namespace OptionsPlay.DAL.EF.Core
{
	public class OptionsPlayDatabaseInitializer : MigrateDatabaseToLatestVersion<OptionsPlayDbContext, Configuration>
	{
	}
}
using OptionsPlay.DAL.EF.Core.Helpers;

namespace OptionsPlay.DAL.EF.Core.Migrations
{
	public abstract class DbMigration : System.Data.Entity.Migrations.DbMigration
	{
		protected static void DropTableIfExists(string name)
		{
			string query = string.Format("IF OBJECT_ID('{0}', 'U') IS NOT NULL DROP TABLE {0}", name);
			SqlExecute.ExecuteNonQuery(query);
		}
	}
}

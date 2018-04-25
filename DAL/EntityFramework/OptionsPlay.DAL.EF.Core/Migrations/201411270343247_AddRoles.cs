using OptionsPlay.DAL.EF.Core.Helpers;

namespace OptionsPlay.DAL.EF.Core.Migrations
{
    public partial class AddRoles : DbMigration
	{
		public override void Up()
		{
			SqlExecute.ExecuteNonQuery("DELETE FROM dbo.Roles");

			SqlExecute.ExecuteNonQuery("INSERT INTO [Roles](Id, Description) VALUES(1, 'Administrator')");
			SqlExecute.ExecuteNonQuery("INSERT INTO [Roles](Id, Description) VALUES(2, 'User')");
		}

		public override void Down()
		{
			SqlExecute.ExecuteNonQuery("DELETE FROM [Roles] WHERE Id = 1");
			SqlExecute.ExecuteNonQuery("DELETE FROM [Roles] WHERE Id = 2");
		}
    }
}

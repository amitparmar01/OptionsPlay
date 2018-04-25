using System.Data.Entity.Migrations;
using OptionsPlay.DAL.EF.Core.Helpers;

namespace OptionsPlay.DAL.EF.Core.Migrations
{
	public partial class AddSecurityFieldsToFCUser : DbMigration
	{
		public override void Up()
		{
			AddColumn("dbo.FCUsers", "Password", c => c.String());
			AddColumn("dbo.FCUsers", "SecurEntityData", c => c.String());
			AddColumn("dbo.FCUsers", "SecurEntityId", c => c.Guid(nullable: false));
			AddColumn("dbo.FCUsers", "SecurEntityThumbprint", c => c.Binary());

			bool makeDeleteOperation = true;

			while (makeDeleteOperation)
			{
				object id = SqlExecute.ExecuteScalar<object>("SELECT TOP 1 id FROM FCUsers");

				makeDeleteOperation = id != null;
				if (makeDeleteOperation)
				{
					SqlExecute.ExecuteNonQuery(string.Format("DELETE FROM FCUsers WHERE id = {0}", id));
					SqlExecute.ExecuteNonQuery(string.Format("DELETE FROM Users WHERE id = {0}", id));
				}
			}
		}

		public override void Down()
		{
			DropColumn("dbo.FCUsers", "SecurEntityThumbprint");
			DropColumn("dbo.FCUsers", "SecurEntityId");
			DropColumn("dbo.FCUsers", "SecurEntityData");
			DropColumn("dbo.FCUsers", "Password");
		}
	}
}

using System.Data.Entity.Migrations;

namespace OptionsPlay.DAL.EF.Core.Migrations
{
	public partial class UpdateFCUser : DbMigration
	{
		public override void Up()
		{
			AlterColumn("dbo.FCUsers", "StockExchange", c => c.String());
			AlterColumn("dbo.FCUsers", "StockBoard", c => c.String());
			AlterColumn("dbo.FCUsers", "TradeAccountStatus", c => c.String());
			AlterColumn("dbo.FCUsers", "LoginAccountType", c => c.String());
		}

		public override void Down()
		{
			AlterColumn("dbo.FCUsers", "LoginAccountType", c => c.Int(nullable: false));
			AlterColumn("dbo.FCUsers", "TradeAccountStatus", c => c.Int(nullable: false));
			AlterColumn("dbo.FCUsers", "StockBoard", c => c.Int(nullable: false));
			AlterColumn("dbo.FCUsers", "StockExchange", c => c.Int(nullable: false));
		}
	}
}

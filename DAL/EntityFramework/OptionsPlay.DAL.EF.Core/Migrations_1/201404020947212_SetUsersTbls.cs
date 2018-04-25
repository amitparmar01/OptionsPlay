using System.Data.Entity.Migrations;

namespace OptionsPlay.DAL.EF.Core.Migrations
{
	public partial class SetUsersTbls : DbMigration
	{
		public override void Up()
		{

			DropForeignKey("dbo.ConfigValues", "ModifiedBy_Id", "dbo.Users");
			DropForeignKey("dbo.ConfigDirectories", "ModifiedBy_Id", "dbo.Users");

			DropIndex("dbo.ConfigDirectories", new[] { "ModifiedBy_Id" });
			DropIndex("dbo.ConfigValues", new[] { "ModifiedBy_Id" });

			DropTable("dbo.Users");

			CreateTable(
				"dbo.Users",
				c => new
				{
					Id = c.Long(nullable: false, identity: true),
					RoleId = c.Int(nullable: false),
					RegistrationDate = c.DateTime(nullable: false),
				})
				.PrimaryKey(t => t.Id);

			CreateTable(
				"dbo.FCUsers",
				c => new
					{
						Id = c.Long(nullable: false),
						CustomerCode = c.String(),
						CustomerAccountCode = c.String(),
						InternalOrganization = c.Long(nullable: false),
						StockExchange = c.Int(nullable: false),
						StockBoard = c.Int(nullable: false),
						TradeAccount = c.String(),
						TradeAccountStatus = c.Int(nullable: false),
						TradeUnit = c.String(),
						LoginAccountType = c.Int(nullable: false),
						AccountId = c.String(),
						TradeAccountName = c.String(),
						UpdateDate = c.DateTime(nullable: false),
					})
				.PrimaryKey(t => t.Id)
				.ForeignKey("dbo.Users", t => t.Id)
				.Index(t => t.Id);

			CreateTable(
				"dbo.WebUsers",
				c => new
					{
						Id = c.Long(nullable: false),
						LoginName = c.String(maxLength: 255),
						DisplayName = c.String(maxLength: 255),
						PasswordHash = c.String(maxLength: 255),
						PasswordSalt = c.String(maxLength: 255),
						PasswordLastChangeDate = c.DateTime(),
					})
				.PrimaryKey(t => t.Id)
				.ForeignKey("dbo.Users", t => t.Id)
				.Index(t => t.Id);

			AlterColumn("dbo.ConfigDirectories", "ModifiedBy_Id", c => c.Long());
			AlterColumn("dbo.ConfigValues", "ModifiedBy_Id", c => c.Long());

			CreateIndex("dbo.ConfigDirectories", "ModifiedBy_Id");
			CreateIndex("dbo.ConfigValues", "ModifiedBy_Id");

			AddForeignKey("dbo.ConfigValues", "ModifiedBy_Id", "dbo.Users", "Id");
			AddForeignKey("dbo.ConfigDirectories", "ModifiedBy_Id", "dbo.Users", "Id");
		}

		public override void Down()
		{

			DropForeignKey("dbo.ConfigDirectories", "ModifiedBy_Id", "dbo.Users");
			DropForeignKey("dbo.ConfigValues", "ModifiedBy_Id", "dbo.Users");
			DropForeignKey("dbo.WebUsers", "Id", "dbo.Users");
			DropForeignKey("dbo.FCUsers", "Id", "dbo.Users");

			DropIndex("dbo.WebUsers", new[] { "Id" });
			DropIndex("dbo.FCUsers", new[] { "Id" });
			DropIndex("dbo.ConfigValues", new[] { "ModifiedBy_Id" });
			DropIndex("dbo.ConfigDirectories", new[] { "ModifiedBy_Id" });

			DropTable("dbo.Users");

			CreateTable(
				"dbo.Users",
				c => new
				{
					Id = c.Int(nullable: false, identity: true),
					RoleId = c.Int(nullable: false),
					RegistrationDate = c.DateTime(nullable: false),
				})
				.PrimaryKey(t => t.Id);

			AddColumn("dbo.Users", "CustomerPassword", c => c.String());
			AddColumn("dbo.Users", "CustomerCode", c => c.String());
			AddColumn("dbo.Users", "Status", c => c.Int(nullable: false));
			AddColumn("dbo.Users", "PasswordLastChangeDate", c => c.DateTime());
			AddColumn("dbo.Users", "PasswordSalt", c => c.String(maxLength: 255));
			AddColumn("dbo.Users", "PasswordHash", c => c.String(maxLength: 255));
			AddColumn("dbo.Users", "LastName", c => c.String(maxLength: 255));
			AddColumn("dbo.Users", "FirstName", c => c.String(maxLength: 255));
			AddColumn("dbo.Users", "DisplayName", c => c.String(maxLength: 255));
			AddColumn("dbo.Users", "LoginName", c => c.String(maxLength: 255));
			AddColumn("dbo.Users", "Email", c => c.String(maxLength: 255));

			AlterColumn("dbo.ConfigValues", "ModifiedBy_Id", c => c.Int());
			AlterColumn("dbo.ConfigDirectories", "ModifiedBy_Id", c => c.Int());

			DropTable("dbo.WebUsers");
			DropTable("dbo.FCUsers");

			CreateIndex("dbo.ConfigValues", "ModifiedBy_Id");
			CreateIndex("dbo.ConfigDirectories", "ModifiedBy_Id");

			AddForeignKey("dbo.ConfigDirectories", "ModifiedBy_Id", "dbo.Users", "Id");
			AddForeignKey("dbo.ConfigValues", "ModifiedBy_Id", "dbo.Users", "Id");
		}
	}
}

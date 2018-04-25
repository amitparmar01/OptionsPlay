using System.Data.Entity.Migrations;

namespace OptionsPlay.DAL.EF.Core.Migrations
{
	public partial class UpdateIndentitiesToInt : DbMigration
	{
		public override void Up()
		{
			DropForeignKey("dbo.ConfigDirectories", "ParentDirectory_Id", "dbo.ConfigDirectories");
			DropForeignKey("dbo.Users", "RoleId", "dbo.Roles");
			DropForeignKey("dbo.ConfigValues", "ModifiedBy_Id", "dbo.Users");
			DropForeignKey("dbo.ConfigValues", "ParentDirectory_Id", "dbo.ConfigDirectories");
			DropForeignKey("dbo.ConfigDirectories", "ModifiedBy_Id", "dbo.Users");

			DropIndex("dbo.ConfigDirectories", new[] { "ParentDirectory_Id" });
			DropIndex("dbo.ConfigDirectories", new[] { "ModifiedBy_Id" });
			DropIndex("dbo.ConfigValues", new[] { "ModifiedBy_Id" });
			DropIndex("dbo.ConfigValues", new[] { "ParentDirectory_Id" });
			DropIndex("dbo.Users", new[] { "RoleId" });

			Sql("IF OBJECT_ID('dbo.ConfigDirectories', 'U') IS NOT NULL DROP TABLE dbo.ConfigDirectories");
			Sql("IF OBJECT_ID('dbo.ConfigValues', 'U') IS NOT NULL DROP TABLE dbo.ConfigValues");
			Sql("IF OBJECT_ID('dbo.Users', 'U') IS NOT NULL DROP TABLE dbo.Users");
			Sql("IF OBJECT_ID('dbo.Roles', 'U') IS NOT NULL DROP TABLE dbo.Roles");

			CreateTable(
				"dbo.Users",
				c => new
				{
					Id = c.Long(nullable: false, identity: true),
					Email = c.String(maxLength: 255),
					LoginName = c.String(maxLength: 255),
					DisplayName = c.String(maxLength: 255),
					FirstName = c.String(maxLength: 255),
					LastName = c.String(maxLength: 255),
					PasswordHash = c.String(maxLength: 255),
					PasswordSalt = c.String(maxLength: 255),
					RoleId = c.Long(nullable: false),
					PasswordLastChangeDate = c.DateTime(),
					RegistrationDate = c.DateTime(nullable: false),
					Status = c.Int(nullable: false),
					CustomerCode = c.String(),
					CustomerPassword = c.String(),
				})
				.PrimaryKey(t => t.Id);

			CreateTable(
				"dbo.ConfigValues",
				c => new
				{
					Id = c.Long(nullable: false, identity: true),
					Name = c.String(nullable: false, maxLength: 442),
					Description = c.String(),
					ModifiedDate = c.DateTime(nullable: false),
					ValueString = c.String(),
					SettingTypeString = c.String(),
					ModifiedBy_Id = c.Long(),
					ParentDirectory_Id = c.Long(),
				})
				.PrimaryKey(t => t.Id);

			CreateTable(
				"dbo.ConfigDirectories",
				c => new
				{
					Id = c.Long(nullable: false, identity: true),
					Name = c.String(nullable: false),
					FullPath = c.String(nullable: false, maxLength: 450),
					Description = c.String(),
					ModifiedDate = c.DateTime(nullable: false),
					ParentDirectory_Id = c.Long(),
					ModifiedBy_Id = c.Long(),
				})
				.PrimaryKey(t => t.Id);

			CreateTable(
				"dbo.Roles",
				c => new
				{
					Id = c.Long(nullable: false),
					Description = c.String(maxLength: 255),
				})
				.PrimaryKey(t => t.Id);

			CreateIndex("dbo.Users", "RoleId");
			CreateIndex("dbo.ConfigValues", "ParentDirectory_Id");
			CreateIndex("dbo.ConfigValues", "ModifiedBy_Id");
			CreateIndex("dbo.ConfigDirectories", "ModifiedBy_Id");
			CreateIndex("dbo.ConfigDirectories", "ParentDirectory_Id");

			CreateIndex("ConfigValues", new[] { "ParentDirectory_Id", "Name" }, true, "IX_Unique_ConfigSection_Id_Name");
			CreateIndex("ConfigDirectories", "FullPath", true, "IX_Unique_FullPath");

			AddForeignKey("dbo.ConfigDirectories", "ModifiedBy_Id", "dbo.Users", "Id");
			AddForeignKey("dbo.ConfigValues", "ParentDirectory_Id", "dbo.ConfigDirectories", "Id");
			AddForeignKey("dbo.ConfigValues", "ModifiedBy_Id", "dbo.Users", "Id");
			AddForeignKey("dbo.Users", "RoleId", "dbo.Roles", "Id", cascadeDelete: true);
			AddForeignKey("dbo.ConfigDirectories", "ParentDirectory_Id", "dbo.ConfigDirectories", "Id");
		}

		public override void Down()
		{
			DropForeignKey("dbo.ConfigDirectories", "ParentDirectory_Id", "dbo.ConfigDirectories");
			DropForeignKey("dbo.Users", "RoleId", "dbo.Roles");
			DropForeignKey("dbo.ConfigValues", "ModifiedBy_Id", "dbo.Users");
			DropForeignKey("dbo.ConfigValues", "ParentDirectory_Id", "dbo.ConfigDirectories");
			DropForeignKey("dbo.ConfigDirectories", "ModifiedBy_Id", "dbo.Users");

			DropIndex("dbo.ConfigDirectories", new[] { "ParentDirectory_Id" });
			DropIndex("dbo.ConfigDirectories", new[] { "ModifiedBy_Id" });
			DropIndex("dbo.ConfigValues", new[] { "ModifiedBy_Id" });
			DropIndex("dbo.ConfigValues", new[] { "ParentDirectory_Id" });
			DropIndex("dbo.Users", new[] { "RoleId" });

			Sql("IF OBJECT_ID('dbo.ConfigDirectories', 'U') IS NOT NULL DROP TABLE dbo.ConfigDirectories");
			Sql("IF OBJECT_ID('dbo.ConfigValues', 'U') IS NOT NULL DROP TABLE dbo.ConfigValues");
			Sql("IF OBJECT_ID('dbo.Users', 'U') IS NOT NULL DROP TABLE dbo.Users");
			Sql("IF OBJECT_ID('dbo.Roles', 'U') IS NOT NULL DROP TABLE dbo.Roles");
		}
	}
}

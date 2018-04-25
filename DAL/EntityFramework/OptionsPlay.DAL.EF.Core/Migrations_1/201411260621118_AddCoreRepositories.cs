namespace OptionsPlay.DAL.EF.Core.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddCoreRepositories : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Users", "RoleId", "dbo.Roles");
            DropForeignKey("dbo.ConfigDirectories", "ParentDirectory_Id", "dbo.ConfigDirectories");
            DropForeignKey("dbo.ConfigValues", "ParentDirectory_Id", "dbo.ConfigDirectories");
            DropForeignKey("dbo.Users", "Role_Id", "dbo.Roles");
            DropIndex("dbo.ConfigDirectories", new[] { "ParentDirectory_Id" });
            DropIndex("dbo.ConfigValues", new[] { "ParentDirectory_Id" });
            DropIndex("dbo.Users", new[] { "RoleId" });
            DropPrimaryKey("dbo.CacheStatuses");
            DropPrimaryKey("dbo.ConfigDirectories");
            DropPrimaryKey("dbo.ConfigValues");
            DropPrimaryKey("dbo.Roles");
            AddColumn("dbo.Users", "Role_Id", c => c.Long());
			//AlterColumn("dbo.CacheStatuses", "Id", c => c.Long(nullable: false, identity: true));
			//AlterColumn("dbo.ConfigDirectories", "Id", c => c.Long(nullable: false, identity: true));
			//AlterColumn("dbo.ConfigDirectories", "ParentDirectory_Id", c => c.Long());
			//AlterColumn("dbo.ConfigValues", "Id", c => c.Long(nullable: false, identity: true));
			//AlterColumn("dbo.ConfigValues", "ParentDirectory_Id", c => c.Long());
			//AlterColumn("dbo.Roles", "Id", c => c.Long(nullable: false));
            AddPrimaryKey("dbo.CacheStatuses", "Id");
            AddPrimaryKey("dbo.ConfigDirectories", "Id");
            AddPrimaryKey("dbo.ConfigValues", "Id");
            AddPrimaryKey("dbo.Roles", "Id");
            CreateIndex("dbo.ConfigDirectories", "ParentDirectory_Id");
            CreateIndex("dbo.ConfigValues", "ParentDirectory_Id");
            CreateIndex("dbo.Users", "Role_Id");
            AddForeignKey("dbo.Users", "Role_Id", "dbo.Roles", "Id");
            AddForeignKey("dbo.ConfigDirectories", "ParentDirectory_Id", "dbo.ConfigDirectories", "Id");
            AddForeignKey("dbo.ConfigValues", "ParentDirectory_Id", "dbo.ConfigDirectories", "Id");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.ConfigValues", "ParentDirectory_Id", "dbo.ConfigDirectories");
            DropForeignKey("dbo.ConfigDirectories", "ParentDirectory_Id", "dbo.ConfigDirectories");
            DropForeignKey("dbo.Users", "Role_Id", "dbo.Roles");
            DropIndex("dbo.Users", new[] { "Role_Id" });
            DropIndex("dbo.ConfigValues", new[] { "ParentDirectory_Id" });
            DropIndex("dbo.ConfigDirectories", new[] { "ParentDirectory_Id" });
            DropPrimaryKey("dbo.Roles");
            DropPrimaryKey("dbo.ConfigValues");
            DropPrimaryKey("dbo.ConfigDirectories");
            DropPrimaryKey("dbo.CacheStatuses");
			//AlterColumn("dbo.Roles", "Id", c => c.Int(nullable: false));
			//AlterColumn("dbo.ConfigValues", "ParentDirectory_Id", c => c.Int());
			//AlterColumn("dbo.ConfigValues", "Id", c => c.Int(nullable: false, identity: true));
			//AlterColumn("dbo.ConfigDirectories", "ParentDirectory_Id", c => c.Int());
			//AlterColumn("dbo.ConfigDirectories", "Id", c => c.Int(nullable: false, identity: true));
			//AlterColumn("dbo.CacheStatuses", "Id", c => c.Int(nullable: false, identity: true));
            DropColumn("dbo.Users", "Role_Id");
            AddPrimaryKey("dbo.Roles", "Id");
            AddPrimaryKey("dbo.ConfigValues", "Id");
            AddPrimaryKey("dbo.ConfigDirectories", "Id");
            AddPrimaryKey("dbo.CacheStatuses", "Id");
            CreateIndex("dbo.Users", "RoleId");
            CreateIndex("dbo.ConfigValues", "ParentDirectory_Id");
            CreateIndex("dbo.ConfigDirectories", "ParentDirectory_Id");
            AddForeignKey("dbo.Users", "Role_Id", "dbo.Roles", "Id");
            AddForeignKey("dbo.ConfigValues", "ParentDirectory_Id", "dbo.ConfigDirectories", "Id");
            AddForeignKey("dbo.ConfigDirectories", "ParentDirectory_Id", "dbo.ConfigDirectories", "Id");
            AddForeignKey("dbo.Users", "RoleId", "dbo.Roles", "Id", cascadeDelete: true);
        }
    }
}

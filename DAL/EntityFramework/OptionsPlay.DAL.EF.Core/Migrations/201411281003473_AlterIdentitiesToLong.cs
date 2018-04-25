namespace OptionsPlay.DAL.EF.Core.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AlterIdentitiesToLong : DbMigration
    {
        public override void Up()
        {
            DropPrimaryKey("dbo.OptionBasicInformationCaches");
            DropPrimaryKey("dbo.SecurityInformationCaches");
            AlterColumn("dbo.OptionBasicInformationCaches", "Id", c => c.Long(nullable: false, identity: true));
            AlterColumn("dbo.SecurityInformationCaches", "Id", c => c.Long(nullable: false, identity: true));
            AddPrimaryKey("dbo.OptionBasicInformationCaches", "Id");
            AddPrimaryKey("dbo.SecurityInformationCaches", "Id");
        }
        
        public override void Down()
        {
            DropPrimaryKey("dbo.SecurityInformationCaches");
            DropPrimaryKey("dbo.OptionBasicInformationCaches");
            AlterColumn("dbo.SecurityInformationCaches", "Id", c => c.Int(nullable: false, identity: true));
            AlterColumn("dbo.OptionBasicInformationCaches", "Id", c => c.Int(nullable: false, identity: true));
            AddPrimaryKey("dbo.SecurityInformationCaches", "Id");
            AddPrimaryKey("dbo.OptionBasicInformationCaches", "Id");
        }
    }
}

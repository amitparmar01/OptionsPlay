using System.Data.Entity.Migrations;

namespace OptionsPlay.DAL.EF.Core.Migrations
{
	public partial class AddStrategiesInfrastructure : DbMigration
	{
		public override void Up()
		{
			DropForeignKey("dbo.Strategies", "BuyDetails_Id", "dbo.StrategyDetails");
			DropForeignKey("dbo.Strategies", "SellDetails_Id", "dbo.StrategyDetails");

			DropForeignKey("dbo.StrategyLegs", "Strategy_Id", "dbo.Strategies");
			DropForeignKey("dbo.StrategyGroups", "CallStrategyId", "dbo.Strategies");
			DropForeignKey("dbo.StrategyGroups", "PutStrategy_Id", "dbo.Strategies");


			DropIndex("dbo.Strategies", new[] { "BuyDetails_Id" });
			DropIndex("dbo.Strategies", new[] { "SellDetails_Id" });
			DropIndex("dbo.StrategyLegs", new[] { "Strategy_Id" });
			DropIndex("dbo.StrategyGroups", new[] { "CallStrategyId" });
			DropIndex("dbo.StrategyGroups", new[] { "PutStrategyId" });

			Sql("IF OBJECT_ID('dbo.Strategies', 'U') IS NOT NULL DROP TABLE dbo.Strategies");
			Sql("IF OBJECT_ID('dbo.StrategyDetails', 'U') IS NOT NULL DROP TABLE dbo.StrategyDetails");
			Sql("IF OBJECT_ID('dbo.StrategyLegs', 'U') IS NOT NULL DROP TABLE dbo.StrategyLegs");
			Sql("IF OBJECT_ID('dbo.StrategyGroups', 'U') IS NOT NULL DROP TABLE dbo.StrategyGroups");

			CreateTable(
				"dbo.Strategies",
				c => new
				{
					Id = c.Int(nullable: false, identity: true),
					Name = c.String(nullable: false),
					BuyDetailsId = c.Int(nullable: false),
					SellDetailsId = c.Int(nullable: false),
					CanCustomizeWidth = c.Boolean(nullable: false),
					CanCustomizeWingspan = c.Boolean(nullable: false),
					CanCustomizeExpiry = c.Boolean(nullable: false),
					PairStrategyId = c.Int(),
				})
				.PrimaryKey(t => t.Id)
				.ForeignKey("dbo.StrategyDetails", t => t.BuyDetailsId)
				.ForeignKey("dbo.StrategyDetails", t => t.SellDetailsId)
				.Index(t => t.BuyDetailsId)
				.Index(t => t.SellDetailsId);

			CreateTable(
				"dbo.StrategyDetails",
				c => new
				{
					Id = c.Int(nullable: false, identity: true),
					Risk = c.Int(nullable: false),
					FirstSentiment = c.Int(nullable: false),
					SecondSentiment = c.Int(),
					ThirdSentiment = c.Int(),
					OccLevel = c.Byte(nullable: false),
					Reward = c.Int(nullable: false),
					DisplayOrder = c.Int(),
					Display = c.Boolean(nullable: false),
				})
				.PrimaryKey(t => t.Id);

			CreateTable(
				"dbo.StrategyLegs",
				c => new
				{
					Id = c.Int(nullable: false, identity: true),
					BuyOrSell = c.Int(nullable: false),
					Quantity = c.Int(nullable: false),
					Strike = c.Short(),
					Expiry = c.Byte(),
					LegType = c.Int(nullable: false),
					StrategyId = c.Int(nullable: false),
				})
				.PrimaryKey(t => t.Id)
				.ForeignKey("dbo.Strategies", t => t.StrategyId, cascadeDelete: true)
				.Index(t => t.StrategyId);

			CreateTable(
				"dbo.StrategyGroups",
				c => new
				{
					Id = c.Int(nullable: false, identity: true),
					Name = c.String(nullable: false),
					CanCustomizeWidth = c.Boolean(nullable: false),
					CanCustomizeWingspan = c.Boolean(nullable: false),
					CanCustomizeExpiry = c.Boolean(nullable: false),
					Display = c.Boolean(nullable: false),
					CallStrategyId = c.Int(nullable: false),
					PutStrategyId = c.Int(),
					DisplayOrder = c.Int(),
				})
				.PrimaryKey(t => t.Id)
				.ForeignKey("dbo.Strategies", t => t.CallStrategyId, cascadeDelete: true)
				.ForeignKey("dbo.Strategies", t => t.PutStrategyId)
				.Index(t => t.CallStrategyId)
				.Index(t => t.PutStrategyId);

		}


		public override void Down()
		{
			DropForeignKey("dbo.StrategyGroups", "PutStrategyId", "dbo.Strategies");
			DropForeignKey("dbo.StrategyGroups", "CallStrategyId", "dbo.Strategies");
			DropForeignKey("dbo.Strategies", "SellDetailsId", "dbo.StrategyDetails");
			DropForeignKey("dbo.StrategyLegs", "StrategyId", "dbo.Strategies");
			DropForeignKey("dbo.Strategies", "BuyDetailsId", "dbo.StrategyDetails");

			DropIndex("dbo.StrategyGroups", new[] { "PutStrategyId" });
			DropIndex("dbo.StrategyGroups", new[] { "CallStrategyId" });
			DropIndex("dbo.StrategyLegs", new[] { "StrategyId" });
			DropIndex("dbo.Strategies", new[] { "SellDetailsId" });
			DropIndex("dbo.Strategies", new[] { "BuyDetailsId" });

			DropTable("dbo.StrategyGroups");
			DropTable("dbo.StrategyLegs");
			DropTable("dbo.StrategyDetails");
			DropTable("dbo.Strategies");
		}
	}
}

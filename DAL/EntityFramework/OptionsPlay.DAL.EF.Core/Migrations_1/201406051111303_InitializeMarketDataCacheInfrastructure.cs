using OptionsPlay.DAL.EF.Core.Helpers;

namespace OptionsPlay.DAL.EF.Core.Migrations
{
	public partial class InitializeMarketDataCacheInfrastructure : DbMigration
	{
		public override void Up()
		{
			SqlExecute.ExecuteNonQuery("DELETE FROM [dbo].[__MigrationHistory] WHERE [MigrationId] = N'201404040905330_InitializeMarketDataCacheInfrastructure'");

			DropTableIfExists("dbo.SecurityInformationCaches");
			DropTableIfExists("dbo.OptionBasicInformationCaches");
			DropTableIfExists("dbo.CacheStatuses");

			CreateTable(
				"dbo.CacheStatuses",
				c => new
				{
					Id = c.Int(nullable: false, identity: true),
					EntityType = c.Int(nullable: false),
					LastUpdated = c.DateTime(),
					Status = c.Int(nullable: false),
					RowVersion = c.Binary(nullable: false, fixedLength: true, timestamp: true, storeType: "rowversion"),
				})
				.PrimaryKey(t => t.Id);

			CreateIndex("CacheStatuses", "EntityType", true, "IX_Unique_EntityType");

			CreateTable(
				"dbo.OptionBasicInformationCaches",
				c => new
				{
					Id = c.Int(nullable: false, identity: true),
					StockExchange = c.String(maxLength: 1, fixedLength: true, unicode: false),
					TradeSector = c.String(maxLength: 2, fixedLength: true, unicode: false),
					OptionNumber = c.String(maxLength: 16),
					OptionCode = c.String(maxLength: 32),
					PreviousClosingPrice = c.Decimal(nullable: false, precision: 18, scale: 4),
					PreviousSettlementPrice = c.Decimal(nullable: false, precision: 18, scale: 4),
					OptionName = c.String(maxLength: 32),
					OptionType = c.String(maxLength: 1, fixedLength: true, unicode: false),
					OptionUnderlyingCode = c.String(maxLength: 8),
					OptionUnderlyingName = c.String(maxLength: 16),
					OptionUnderlyingClass = c.String(maxLength: 1, fixedLength: true, unicode: false),
					OptionExecuteType = c.String(maxLength: 1, fixedLength: true, unicode: false),
					OptionUnit = c.Long(nullable: false),
					StrikePrice = c.Decimal(nullable: false, precision: 18, scale: 4),
					TradeStartDate = c.DateTime(nullable: false),
					TradeEndDate = c.DateTime(nullable: false),
					ExerciseDate = c.DateTime(nullable: false),
					ExpireDate = c.DateTime(nullable: false),
					OptionContractVersion = c.String(maxLength: 1, fixedLength: true, unicode: false),
					UncoveredPositionQuantity = c.Long(nullable: false),
					UnderlyingClosingPrice = c.Decimal(nullable: false, precision: 18, scale: 4),
					PriceChangeLimitType = c.String(),
					LimitUpPrice = c.Decimal(nullable: false, precision: 18, scale: 4),
					LimitDownPrice = c.Decimal(nullable: false, precision: 18, scale: 4),
					MarginUnit = c.Decimal(nullable: false, precision: 18, scale: 4),
					MarginRatioParameter1 = c.Decimal(nullable: false, precision: 18, scale: 8),
					MarginRatioParameter2 = c.Decimal(nullable: false, precision: 18, scale: 8),
					BoardLotSize = c.Long(nullable: false),
					UpperLimitQtyForLimitPrice = c.Long(nullable: false),
					LowerLimitQtyForLimitPrice = c.Long(nullable: false),
					UpperLimitQtyForMarketPrice = c.Long(nullable: false),
					LowerLimitQtyForMarketPrice = c.Long(nullable: false),
					OpenPositionFlag = c.String(maxLength: 1, fixedLength: true, unicode: false),
					SuspendedFlag = c.String(maxLength: 1, fixedLength: true, unicode: false),
					ExpiredFlag = c.String(maxLength: 1, fixedLength: true, unicode: false),
					AdjustedFlag = c.String(maxLength: 1, fixedLength: true, unicode: false),
					OptionStatus = c.String(maxLength: 1, fixedLength: true, unicode: false),
					UpdateDate = c.DateTime(nullable: false),
				})
				.PrimaryKey(t => t.Id);

			CreateTable(
				"dbo.SecurityInformationCaches",
				c => new
				{
					Id = c.Int(nullable: false, identity: true),
					StockExchange = c.String(maxLength: 1, fixedLength: true, unicode: false),
					TradeSector = c.String(maxLength: 2, fixedLength: true, unicode: false),
					SecurityCode = c.String(maxLength: 8),
					SecurityName = c.String(maxLength: 16),
					SecurityClass = c.String(maxLength: 1, fixedLength: true, unicode: false),
					SecurityStatus = c.String(maxLength: 1, fixedLength: true, unicode: false),
					Currency = c.String(maxLength: 1, fixedLength: true, unicode: false),
					LimitUpRatio = c.Decimal(nullable: false, precision: 18, scale: 8),
					LimitDownRatio = c.Decimal(nullable: false, precision: 18, scale: 8),
					LimitUpPrice = c.Decimal(nullable: false, precision: 18, scale: 4),
					LimitDownPrice = c.Decimal(nullable: false, precision: 18, scale: 4),
					LimitUpQuantity = c.Long(nullable: false),
					LimitDownQuantity = c.Long(nullable: false),
					LotSize = c.Long(nullable: false),
					LotFlag = c.String(maxLength: 1, fixedLength: true, unicode: false),
					Spread = c.Long(nullable: false),
					MarketValueFlag = c.String(maxLength: 1, fixedLength: true, unicode: false),
					SuspendedFlag = c.String(maxLength: 1, fixedLength: true, unicode: false),
					ISIN = c.String(maxLength: 16),
					SecuritySubClass = c.String(maxLength: 1, fixedLength: true, unicode: false),
					SecurityBusinesses = c.String(maxLength: 512),
					CustodyMode = c.String(maxLength: 1, fixedLength: true, unicode: false),
					UnderlyinSecurityCode = c.String(maxLength: 8),
					BuyUnit = c.Int(nullable: false),
					SellUnit = c.Int(nullable: false),
					BondInterest = c.Decimal(precision: 18, scale: 4),
					SecurityLevel = c.String(maxLength: 1, fixedLength: true, unicode: false),
					TradeDeadline = c.Int(nullable: false),
					RemindMessage = c.String(maxLength: 128),
				})
				.PrimaryKey(t => t.Id);
		}

		public override void Down()
		{
			DropTable("dbo.SecurityInformationCaches");
			DropTable("dbo.OptionBasicInformationCaches");
			DropTable("dbo.CacheStatuses");
		}
	}
}

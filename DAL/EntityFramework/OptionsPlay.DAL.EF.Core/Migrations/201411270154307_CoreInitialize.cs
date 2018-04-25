namespace OptionsPlay.DAL.EF.Core.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class CoreInitialize : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.CacheStatuses",
                c => new
                    {
                        Id = c.Long(nullable: false, identity: true),
                        EntityType = c.Int(nullable: false),
                        LastUpdated = c.DateTime(),
                        Status = c.Int(nullable: false),
                        RowVersion = c.Binary(nullable: false, fixedLength: true, timestamp: true, storeType: "rowversion"),
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
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.ConfigDirectories", t => t.ParentDirectory_Id)
                .ForeignKey("dbo.Users", t => t.ModifiedBy_Id)
                .Index(t => t.ParentDirectory_Id)
                .Index(t => t.ModifiedBy_Id);
            
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
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Users", t => t.ModifiedBy_Id)
                .ForeignKey("dbo.ConfigDirectories", t => t.ParentDirectory_Id)
                .Index(t => t.ModifiedBy_Id)
                .Index(t => t.ParentDirectory_Id);
            
            CreateTable(
                "dbo.Users",
                c => new
                    {
                        Id = c.Long(nullable: false, identity: true),
                        RoleId = c.Int(nullable: false),
                        RegistrationDate = c.DateTime(nullable: false),
                        Role_Id = c.Long(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Roles", t => t.Role_Id)
                .Index(t => t.Role_Id);
            
            CreateTable(
                "dbo.Roles",
                c => new
                    {
                        Id = c.Long(nullable: false),
                        Description = c.String(maxLength: 255),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.MasterSecurities",
                c => new
                    {
                        Id = c.Long(nullable: false, identity: true),
                        MasterSecurityCode = c.String(),
                        SecurityCode = c.String(),
                        Name = c.String(),
                        ISIN = c.String(),
                        UseAsMasterList = c.Boolean(nullable: false),
                        UseForTechnicalRank = c.Boolean(nullable: false),
                        UseForTradeIdeas = c.Boolean(nullable: false),
                        Exchange = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.OptionBasicInformationCaches",
                c => new
                    {
                        Id = c.Long(nullable: false, identity: true),
                        StockExchange = c.String(maxLength: 1, fixedLength: true, unicode: false),
                        TradeSector = c.String(maxLength: 2, fixedLength: true, unicode: false),
                        OptionNumber = c.String(maxLength: 16),
                        OptionCode = c.String(maxLength: 32),
                        PreviousClosingPrice = c.Decimal(nullable: false, precision: 18, scale: 2),
                        PreviousSettlementPrice = c.Decimal(nullable: false, precision: 18, scale: 2),
                        OptionName = c.String(maxLength: 32),
                        OptionType = c.String(maxLength: 1, fixedLength: true, unicode: false),
                        OptionUnderlyingCode = c.String(maxLength: 8),
                        OptionUnderlyingName = c.String(maxLength: 16),
                        OptionUnderlyingClass = c.String(maxLength: 1, fixedLength: true, unicode: false),
                        OptionExecuteType = c.String(maxLength: 1, fixedLength: true, unicode: false),
                        OptionUnit = c.Long(nullable: false),
                        StrikePrice = c.Decimal(nullable: false, precision: 18, scale: 2),
                        TradeStartDate = c.DateTime(nullable: false),
                        TradeEndDate = c.DateTime(nullable: false),
                        ExerciseDate = c.DateTime(nullable: false),
                        ExpireDate = c.DateTime(nullable: false),
                        OptionContractVersion = c.String(maxLength: 1, fixedLength: true, unicode: false),
                        UncoveredPositionQuantity = c.Long(nullable: false),
                        UnderlyingClosingPrice = c.Decimal(nullable: false, precision: 18, scale: 2),
                        PriceChangeLimitType = c.String(),
                        LimitUpPrice = c.Decimal(nullable: false, precision: 18, scale: 2),
                        LimitDownPrice = c.Decimal(nullable: false, precision: 18, scale: 2),
                        MarginUnit = c.Decimal(nullable: false, precision: 18, scale: 2),
                        MarginRatioParameter1 = c.Decimal(nullable: false, precision: 18, scale: 2),
                        MarginRatioParameter2 = c.Decimal(nullable: false, precision: 18, scale: 2),
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
						Id = c.Long(nullable: false, identity: true),
                        StockExchange = c.String(maxLength: 1, fixedLength: true, unicode: false),
                        TradeSector = c.String(maxLength: 2, fixedLength: true, unicode: false),
                        SecurityCode = c.String(maxLength: 8),
                        SecurityName = c.String(maxLength: 16),
                        SecurityClass = c.String(maxLength: 1, fixedLength: true, unicode: false),
                        SecurityStatus = c.String(maxLength: 1, fixedLength: true, unicode: false),
                        Currency = c.String(maxLength: 1, fixedLength: true, unicode: false),
                        LimitUpRatio = c.Decimal(nullable: false, precision: 18, scale: 2),
                        LimitDownRatio = c.Decimal(nullable: false, precision: 18, scale: 2),
                        LimitUpPrice = c.Decimal(nullable: false, precision: 18, scale: 2),
                        LimitDownPrice = c.Decimal(nullable: false, precision: 18, scale: 2),
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
                        BondInterest = c.Decimal(precision: 18, scale: 2),
                        SecurityLevel = c.String(maxLength: 1, fixedLength: true, unicode: false),
                        TradeDeadline = c.Int(nullable: false),
                        RemindMessage = c.String(maxLength: 128),
                    })
                .PrimaryKey(t => t.Id);
            
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
                        OriginalImageId = c.Guid(),
                        ThumbnailImageId = c.Guid(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Strategies", t => t.CallStrategyId, cascadeDelete: true)
                .ForeignKey("dbo.Images", t => t.OriginalImageId)
                .ForeignKey("dbo.Strategies", t => t.PutStrategyId)
                .ForeignKey("dbo.Images", t => t.ThumbnailImageId)
                .Index(t => t.CallStrategyId)
                .Index(t => t.PutStrategyId)
                .Index(t => t.OriginalImageId)
                .Index(t => t.ThumbnailImageId);
            
            CreateTable(
                "dbo.Images",
                c => new
                    {
                        Id = c.Guid(nullable: false, identity: true),
                        Content = c.Binary(),
                        Type = c.String(),
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
                        StockExchange = c.String(),
                        StockBoard = c.String(),
                        TradeAccount = c.String(),
                        TradeAccountStatus = c.String(),
                        TradeUnit = c.String(),
                        LoginAccountType = c.String(),
                        AccountId = c.String(),
                        TradeAccountName = c.String(),
                        UpdateDate = c.DateTime(nullable: false),
                        Password = c.String(),
                        SecurEntityData = c.String(),
                        SecurEntityId = c.Guid(nullable: false),
                        SecurEntityThumbprint = c.Binary(),
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
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.WebUsers", "Id", "dbo.Users");
            DropForeignKey("dbo.FCUsers", "Id", "dbo.Users");
            DropForeignKey("dbo.StrategyGroups", "ThumbnailImageId", "dbo.Images");
            DropForeignKey("dbo.StrategyGroups", "PutStrategyId", "dbo.Strategies");
            DropForeignKey("dbo.StrategyGroups", "OriginalImageId", "dbo.Images");
            DropForeignKey("dbo.StrategyGroups", "CallStrategyId", "dbo.Strategies");
            DropForeignKey("dbo.Strategies", "SellDetailsId", "dbo.StrategyDetails");
            DropForeignKey("dbo.StrategyLegs", "StrategyId", "dbo.Strategies");
            DropForeignKey("dbo.Strategies", "BuyDetailsId", "dbo.StrategyDetails");
            DropForeignKey("dbo.ConfigDirectories", "ModifiedBy_Id", "dbo.Users");
            DropForeignKey("dbo.ConfigValues", "ParentDirectory_Id", "dbo.ConfigDirectories");
            DropForeignKey("dbo.ConfigValues", "ModifiedBy_Id", "dbo.Users");
            DropForeignKey("dbo.Users", "Role_Id", "dbo.Roles");
            DropForeignKey("dbo.ConfigDirectories", "ParentDirectory_Id", "dbo.ConfigDirectories");
            DropIndex("dbo.WebUsers", new[] { "Id" });
            DropIndex("dbo.FCUsers", new[] { "Id" });
            DropIndex("dbo.StrategyGroups", new[] { "ThumbnailImageId" });
            DropIndex("dbo.StrategyGroups", new[] { "OriginalImageId" });
            DropIndex("dbo.StrategyGroups", new[] { "PutStrategyId" });
            DropIndex("dbo.StrategyGroups", new[] { "CallStrategyId" });
            DropIndex("dbo.StrategyLegs", new[] { "StrategyId" });
            DropIndex("dbo.Strategies", new[] { "SellDetailsId" });
            DropIndex("dbo.Strategies", new[] { "BuyDetailsId" });
            DropIndex("dbo.Users", new[] { "Role_Id" });
            DropIndex("dbo.ConfigValues", new[] { "ParentDirectory_Id" });
            DropIndex("dbo.ConfigValues", new[] { "ModifiedBy_Id" });
            DropIndex("dbo.ConfigDirectories", new[] { "ModifiedBy_Id" });
            DropIndex("dbo.ConfigDirectories", new[] { "ParentDirectory_Id" });
            DropTable("dbo.WebUsers");
            DropTable("dbo.FCUsers");
            DropTable("dbo.Images");
            DropTable("dbo.StrategyGroups");
            DropTable("dbo.StrategyLegs");
            DropTable("dbo.StrategyDetails");
            DropTable("dbo.Strategies");
            DropTable("dbo.SecurityInformationCaches");
            DropTable("dbo.OptionBasicInformationCaches");
            DropTable("dbo.MasterSecurities");
            DropTable("dbo.Roles");
            DropTable("dbo.Users");
            DropTable("dbo.ConfigValues");
            DropTable("dbo.ConfigDirectories");
            DropTable("dbo.CacheStatuses");
        }
    }
}

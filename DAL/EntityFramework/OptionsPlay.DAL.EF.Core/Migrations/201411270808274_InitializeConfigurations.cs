using OptionsPlay.Common.ConfigurationConstants;
using OptionsPlay.Common.ObjectJsonSerialization;
using OptionsPlay.DAL.EF.Core.Helpers;

namespace OptionsPlay.DAL.EF.Core.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class InitializeConfigurations : DbMigration
    {
        public override void Up()
		{
			ConfigDirectoryInsert newDirectory = new ConfigDirectoryInsert
			{
				Name = MarketDataConfiguration.MarketDataDirectoryName,
				FullPath = MarketDataConfiguration.MarketDataDirectoryName, //must be recalculated for inner directories
			};

			newDirectory.Id = SqlExecute.InsertAndGetInt32Identity("ConfigDirectories", newDirectory);

			ConfigValueInsert riskFreeRateValue = new ConfigValueInsert
			{
				Description = "Risk free rate",
				Name = MarketDataConfiguration.RiskFreeRateValueName,
				ParentDirectory_Id = newDirectory.Id,
			};

			riskFreeRateValue.SetValue(0.03);
			SqlExecute.InsertAndGetInt32Identity("ConfigValues", riskFreeRateValue);
        }
        
        public override void Down()
		{
			Sql("DELETE FROM [ConfigValues]");
			Sql("DELETE FROM [ConfigDirectories]");
        }
    }
}

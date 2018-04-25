using OptionsPlay.Common.ConfigurationConstants;
using OptionsPlay.Common.ObjectJsonSerialization;
using OptionsPlay.DAL.EF.Core.Helpers;
using System.Data.Entity.Migrations;

namespace OptionsPlay.DAL.EF.Core.Migrations
{
	public partial class AddRiskFreeRateToConfiguration : DbMigration
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

			int parentDirId = SqlExecute.ExecuteScalar<int>("SELECT TOP 1 [Id] FROM [ConfigDirectories] WHERE [Name] = @name;", new[]
			{
				new SqlParameter("@name", MarketDataConfiguration.MarketDataDirectoryName)
			});

			ConfigValueInsert defaultDividendYield = new ConfigValueInsert
			{
				Name = MarketDataConfiguration.DefaultDividendYieldValueName,
				ParentDirectory_Id = parentDirId,
			};

			defaultDividendYield.SetValue(.0);
			SqlExecute.InsertAndGetInt32Identity("ConfigValues", defaultDividendYield);

			ConfigValueInsert daysOfDefaultExpiry = new ConfigValueInsert
			{
				Name = MarketDataConfiguration.DaysOfDefaultExpiryValueName,
				ParentDirectory_Id = parentDirId,
			};
			daysOfDefaultExpiry.SetValue(45.0);
			SqlExecute.InsertAndGetInt32Identity("ConfigValues", daysOfDefaultExpiry);
		}

		public override void Down()
		{
			Sql("DELETE FROM [ConfigValues]");
			Sql("DELETE FROM [ConfigDirectories]");
		}
	}
}

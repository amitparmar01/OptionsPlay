using System.Data.SqlClient;
using OptionsPlay.Common.ConfigurationConstants;
using OptionsPlay.Common.ObjectJsonSerialization;
using OptionsPlay.DAL.EF.Core.Helpers;

namespace OptionsPlay.DAL.EF.Core.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddMarketDataConfigurations : DbMigration
	{
		public override void Up()
		{
			long parentDirId = SqlExecute.ExecuteScalar<long>("SELECT TOP 1 [Id] FROM [ConfigDirectories] WHERE [Name] = @name;", new[]
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
			Sql(string.Format("Delete FROM [ConfigValues] WHERE [Name] = '{0}' OR [Name] = '{1}' ",
				MarketDataConfiguration.DaysOfDefaultExpiryValueName,
				MarketDataConfiguration.DefaultDividendYieldValueName));
		}
    }
}

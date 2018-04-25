using OptionsPlay.DAL.EF.Core.Helpers;
using OptionsPlay.DAL.EF.Core.Entities_20140605;

namespace OptionsPlay.DAL.EF.Core.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddCacheStatus : DbMigration
	{
		public override void Up()
		{
			SqlExecute.ExecuteNonQuery("DELETE FROM [dbo].[__MigrationHistory] WHERE [MigrationId] = N'201411270918013_AddCacheStatus'");

			CacheStatus securitiesInfoCacheEntry = new CacheStatus(CacheEntity.SecurityInformation);
			CacheStatus optionBasicInfoCacheEntry = new CacheStatus(CacheEntity.OptionBasicInformation);

			SqlExecute.InsertAndGetInt32Identity("CacheStatuses", securitiesInfoCacheEntry);
			SqlExecute.InsertAndGetInt32Identity("CacheStatuses", optionBasicInfoCacheEntry);
		}

		public override void Down()
		{
			Sql("DELETE FROM [CacheStatuses]");
		}
    }
}

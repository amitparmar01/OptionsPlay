using OptionsPlay.DAL.EF.Core.Helpers;
using OptionsPlay.DAL.EF.Core.Entities_20140605;

namespace OptionsPlay.DAL.EF.Core.Migrations
{
	public partial class AddCacheStatusEntries : DbMigration
	{
		public override void Up()
		{
			SqlExecute.ExecuteNonQuery("DELETE FROM [dbo].[__MigrationHistory] WHERE [MigrationId] = N'201404040907210_AddCacheStatusEntries'");

			CacheStatus securitiesInfoCacheEntry = new CacheStatus(CacheEntity.SecurityInformation);
			CacheStatus optionBasicInfoCacheEntry = new CacheStatus(CacheEntity.OptionBasicInformation);

			SqlExecute.InsertAndGetInt32Identity("CacheStatuses", securitiesInfoCacheEntry);
			SqlExecute.InsertAndGetInt32Identity("CacheStatuses", optionBasicInfoCacheEntry);
		}

		public override void Down()
		{
			Sql("TRUNCATE TABLE [CacheStatuses]");
		}
	}
}

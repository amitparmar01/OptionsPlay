namespace OptionsPlay.DAL.EF.Core.Entities_20140605
{
	internal class CacheStatus
	{
		public CacheStatus(CacheEntity type)
		{
			EntityType = (int)type;
			Status = (int)CacheEntryStatus.Empty;
		}

		public int EntityType { get; set; }

		public int Status { get; set; }
	}
}

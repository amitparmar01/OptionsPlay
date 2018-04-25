using System.Configuration;

namespace OptionsPlay.DAL.MongoDB.Repositories
{
	public class MongoDBLogsContext : MongoDBContext
	{
		const string SyrahMongoDBLogsConnectionString = "OptionsPlayMongoDBLogs";

		protected override string ConnectionString
		{
			get
			{
				if (StroredConnectionString == null)
				{
					StroredConnectionString = ConfigurationManager.ConnectionStrings[SyrahMongoDBLogsConnectionString].ConnectionString;
				}

				return StroredConnectionString;
			}
		}
	}
}

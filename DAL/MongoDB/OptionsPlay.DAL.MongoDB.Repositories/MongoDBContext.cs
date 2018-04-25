using System;
using System.Configuration;
using MongoDB.Driver;
using OptionsPlay.Logging;
using OptionsPlay.Optimization;

namespace OptionsPlay.DAL.MongoDB.Repositories
{
    public class MongoDBContext
    {
        const string SyrahMongoDBConnectionString = "OptionsPlayMongoDB";

        protected MongoDatabase MongoDbFactory;

        protected MongoDatabase InitializeDatabase()
        {
            // hack to fight with azure LB https://support.mongolab.com/entries/23009358-Handling-dropped-connections-on-Windows-Azure
            MongoDefaults.MaxConnectionIdleTime = TimeSpan.FromMinutes(1);
            MongoDefaults.MaxConnectionLifeTime = TimeSpan.FromMinutes(1);

            MongoUrlBuilder urlBuilder = new MongoUrlBuilder(ConnectionString);

            MongoClient client = new MongoClient(urlBuilder.ToMongoUrl());
            MongoServer server = client.GetServer();
            MongoDatabase result = server.GetDatabase(urlBuilder.DatabaseName);

            return result;
        }

        protected string StroredConnectionString;

        protected virtual string ConnectionString
        {
            get
            {
                string connectionString = StroredConnectionString ??
                    (StroredConnectionString = ConfigurationManager.ConnectionStrings[SyrahMongoDBConnectionString].ConnectionString);
                return connectionString;
            }
        }

        internal virtual MongoDatabase Database
        {
            get
            {
                //MongoDatabase database = MongoDbFactory ?? (MongoDbFactory = InitializeDatabase());
                //return database;
                return DataBasePool.GetAvailableMongoDB();
            }
        }

        internal MongoServer Server
        {
            get
            {
                return Database.Server;
            }
        }
    }
}
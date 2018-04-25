using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OptionsPlay.Optimization
{
    public static class DataBasePool
    {
        static List<MongoDatabase> MongoDbFactory = new List<MongoDatabase>();
        static List<string> MongoDbContext = new List<string>();
        const string MongoDBConnectionString = "OptionsPlayMongoDB";
        static object _lock = new object();

        public static void InitializeDatabase()
        {
            foreach (ConnectionStringSettings connStrSet in ConfigurationManager.ConnectionStrings)
            {
                var connStrlen = connStrSet.Name.Length;
                var constStrlen = MongoDBConnectionString.Length;
                if (connStrlen < constStrlen) { continue; }
                if (connStrSet.Name.Substring(0, constStrlen) == MongoDBConnectionString)
                {
                    MongoDefaults.MaxConnectionIdleTime = TimeSpan.FromMinutes(1);
                    MongoDefaults.MaxConnectionLifeTime = TimeSpan.FromMinutes(1);
                    MongoDbContext.Add(connStrSet.ConnectionString);
                }
            }
            InitializeMongoDb();
        }

        private static void InitializeMongoDb()
        {
            string tempContext = string.Empty;
            try
            {
                foreach (string context in MongoDbContext)
                {
                    tempContext = context;
                    MongoUrlBuilder urlBuilder = new MongoUrlBuilder(context);
                    MongoClient client = new MongoClient(urlBuilder.ToMongoUrl());
                    MongoServer server = client.GetServer();
                    MongoDatabase result = server.GetDatabase(urlBuilder.DatabaseName);
                    result.Server.Connect();
                    MongoDbFactory.Add(result);
                }
            }
            catch (Exception ex)
            {
                MongoDbContext.Remove(tempContext);
                InitializeMongoDb();
            }
        }

        public static MongoDatabase GetAvailableMongoDB()
        {
            lock(_lock)
            {
                if (MongoDbFactory.Count == 0)
                {
                    InitializeDatabase();
                }
            }
            foreach (MongoDatabase db in MongoDbFactory)
            {
                if (db.Server.State == MongoServerState.Connected)
                {
                    return db;
                }
            }
            return MongoDbFactory[0];
        }

    }

}

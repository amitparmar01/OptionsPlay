using OptionsPlay.DAL.MongoDB.Repositories;
using StructureMap.Configuration.DSL;

namespace OptionsPlay.IoC.Registries
{
	public class MongoDBContextRegistry : Registry
	{
		public MongoDBContextRegistry()
		{
			// MongoClient, MongoServer, MongoDatabase, MongoCollection and MongoGridFS are thread safe.
			// See http://docs.mongodb.org/ecosystem/tutorial/use-csharp-driver/#thread-safety for details
			// It is a common practice to make them singletons. 
			// Also we don't need to call Disconnect as the driver maintains a connection pool internally.
			For<MongoDBContext>().Singleton().Use<MongoDBContext>();
		}
	}
}

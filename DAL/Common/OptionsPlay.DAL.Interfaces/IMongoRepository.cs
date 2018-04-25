using System.Collections.Generic;
using MongoDB.Bson;

namespace OptionsPlay.DAL.Interfaces
{
	public interface IMongoRepository<TEntity> : IRepository<TEntity, ObjectId> where TEntity : class
	{
		void Add(IEnumerable<TEntity> entities);
	}
}

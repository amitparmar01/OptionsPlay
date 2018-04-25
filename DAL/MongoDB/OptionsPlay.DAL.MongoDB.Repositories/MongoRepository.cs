using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.Builders;
using MongoDB.Driver.Linq;
using OptionsPlay.Common.Utilities;
using OptionsPlay.DAL.Interfaces;
using OptionsPlay.Model;
using OptionsPlay.Logging;

namespace OptionsPlay.DAL.MongoDB.Repositories
{
	/// <summary>
	/// The Mongo-dependent, generic repository for data access
	/// </summary>
	/// <typeparam name="T">Type of entity for this Repository.</typeparam>
	public class MongoRepository<T> : IMongoRepository<T> where T : BaseMongoEntity
	{
		private string _collectionName;

		protected string CollectionName
		{
			get
			{
				string collectionName = _collectionName ?? (_collectionName = string.Format("{0}s", typeof(T).Name));
				return collectionName;
			}
			set
			{
				_collectionName = value;
			}
		}

		protected readonly MongoDBContext MongoDBContext;

		public MongoRepository(MongoDBContext monoDBContext)
		{
			MongoDBContext = monoDBContext;
		}

		protected MongoCollection<T> GetCollection()
		{
			MongoCollection<T> collection = MongoDBContext.Database.GetCollection<T>(CollectionName);
			return collection;
		}

		public virtual IQueryable<T> GetAll()
		{
			IQueryable<T> all = GetCollection().AsQueryable();
			return all;
		}

		public virtual T GetById(ObjectId id)
		{
			T result = GetCollection().FindOne(Query<T>.EQ(e => e.Id, id));
			return result;
		}

		public virtual void Add(T entity)
		{
            try
            {
                //var wr = WriteConcern.Unacknowledged;
                var wr = WriteConcern.Acknowledged;
                GetCollection().Insert(entity, wr);
            }
            catch (MongoDuplicateKeyException ex)
            {
                Logger.Debug(ex.ToString());
            }
		}

		public virtual void Add(IEnumerable<T> entities)
		{
			GetCollection().InsertBatch<T>(entities);
		}

		public virtual void Update(T entity)
		{
			throw new NotSupportedException();
		}

		public bool Delete(ObjectId id)
		{
			WriteConcernResult r = GetCollection().Remove(Query<T>.EQ(e => e.Id, id));
			return r.Ok;
		}

		public void Delete(T entity)
		{
			GetCollection().Remove(Query<T>.EQ(e => e.Id, entity.Id));
		}

		/// <summary>
		/// NOTE: not all expression configurations are supported by MongoDB c# driver
		/// </summary>
		public IQueryable<T> FindBy(Expression<Func<T, bool>> predicate)
		{
			IQueryable<T> filtered = GetAll().Where(predicate);
			return filtered;
		}

		protected void Delete(IMongoQuery query)
		{
			GetCollection().Remove(query);
		}

		protected void Update(IMongoQuery query, IMongoUpdate update, UpdateFlags updateFlags = UpdateFlags.Multi)
		{
			GetCollection().Update(query, update, updateFlags);
		}

		protected void Update(ObjectId id, T entity)
		{
			PropertyInfo[] propertyInfos = typeof (T).GetProps();
			UpdateBuilder updateBuilder = new UpdateBuilder();

			foreach (PropertyInfo propertyInfo in propertyInfos)
			{
				object value = propertyInfo.GetValue(entity);
				if (value == null)
				{
					updateBuilder = updateBuilder.Set(propertyInfo.Name, BsonNull.Value);
				}
				else if (propertyInfo.PropertyType == typeof (long))
				{
					updateBuilder = updateBuilder.Set(propertyInfo.Name, (long)value);
				}
				else if (propertyInfo.PropertyType == typeof(decimal) || propertyInfo.PropertyType == typeof(decimal?))
				{
					updateBuilder = updateBuilder.Set(propertyInfo.Name, Convert.ToDouble(value));
				}
				else if (propertyInfo.PropertyType == typeof(DateTime))
				{
					updateBuilder = updateBuilder.Set(propertyInfo.Name, (DateTime)value);
				}
				else if (propertyInfo.PropertyType == typeof(string))
				{
					updateBuilder = updateBuilder.Set(propertyInfo.Name, (string)value);
				}
			}

			Update(Query.EQ("_id", id), updateBuilder);
		}
	}
}

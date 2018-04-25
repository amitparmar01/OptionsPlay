using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Data.Entity;
using System.Data.SqlClient;
using System.Threading.Tasks;
using EntityFramework.BulkInsert.Extensions;
using EntityFramework.MappingAPI.Extensions;
using OptionsPlay.DAL.EF.Core;
using OptionsPlay.DAL.Interfaces.Repositories;
using OptionsPlay.Logging;
using OptionsPlay.Model;
using System;

namespace OptionsPlay.DAL.EF.Repositories
{
	public class CachedEntitiesRepository<T> : EFRepository<T>, ICachedEntitiesRepository<T> where T : class, IBaseEntity<long>
	{
		public CachedEntitiesRepository(DbContext context) : base(context)
		{
		}

		#region Implementation of ICachedEntitiesRepository<T>

		public Task UpdateCacheAsync(IEnumerable<T> entities)
		{
			return Task.Run(() =>
			{
				OptionsPlayDbContext context = new OptionsPlayDbContext();
				using (DbContextTransaction transaction = context.Database.BeginTransaction())
				{
					string tableName = context.Db<T>().TableName;
					try
					{
						context.Database.ExecuteSqlCommand(string.Format("TRUNCATE TABLE [{0}]", tableName));
						context.BulkInsert(entities, transaction.UnderlyingTransaction, SqlBulkCopyOptions.Default, 3000);
                        transaction.Commit();
					}
					catch (DataException ex)
					{
						transaction.Rollback();
						Logger.Error(string.Format("Error occurred during writing data to {0} table. Transaction Rolled Back", tableName), ex);
					}
					catch (DbException ex)
					{
						transaction.Rollback();
						Logger.Error(string.Format("Error occurred during writing data to {0} table. Transaction Rolled Back", tableName), ex);
					}
                    catch (Exception ex)
                    {
                        Logger.Error("thread ID:" + System.Threading.Thread.CurrentThread.ManagedThreadId.ToString() + ", UpdateCacheAsync Exception is:" + ex.StackTrace.ToString() + ", class is CachedEntitiesRepository");
                    }
				}
			});
		}

		#endregion
	}
}
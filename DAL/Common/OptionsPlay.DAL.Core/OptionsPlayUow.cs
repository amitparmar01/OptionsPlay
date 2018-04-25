using System;
using System.Data.Entity;
using System.Data.Entity.Validation;
using OptionsPlay.DAL.Interfaces;
using OptionsPlay.DAL.Interfaces.Repositories;
using OptionsPlay.EF.Encryption;
using OptionsPlay.Logging;
using OptionsPlay.Model;
using OptionsPlay.Resources;
using StructureMap;
using OptionsPlay.DAL.Interfaces.Repositories.MarketData;

namespace OptionsPlay.DAL.Core
{
	public class OptionsPlayUow : IOptionsPlayUow
	{
		private readonly DbContext _dbContext;
		private readonly IContainer _container;

		public OptionsPlayUow(DbContext dbContext, IContainer container)
		{
			_dbContext = dbContext;
			_container = container;

			// todo: why don't we move this functionality in OptionsPlayDbContext?
			//Entity Lib
			DbContextHelper.Initialize(dbContext);
		}

		#region Repositories

		public IRolesRepository Roles
		{
			get
			{
				return GetRepository<IRolesRepository>();
			}
		}

		public IUsersRepository Users
		{
			get
			{
				return GetRepository<IUsersRepository>();
			}
		}

		public IConfigDirectoriesRepository ConfigDirectories
		{
			get
			{
				return GetRepository<IConfigDirectoriesRepository>();
			}
		}

		public IRepository<ConfigValue> ConfigValues
		{
			get
			{
				return GetRepository<IRepository<ConfigValue>>();
			}
		}

		public IStrategiesRepository Strategies
		{
			get
			{
				return GetRepository<IStrategiesRepository>();
			}
		}

		public IStrategyGroupsRepository StrategyGroups
		{
			get
			{
				return GetRepository<IStrategyGroupsRepository>();
			}
		}

		public ICacheStatusesRepository CacheStatusesRepository
		{
			get
			{
				return GetRepository<ICacheStatusesRepository>();
			}
		}

		#region MongoDB Repositories

		public ISchedulerQueueRepository SchedulerQueues
		{
			get
			{
				return GetRepository<ISchedulerQueueRepository>();
			}
		}

		public ISchedulerTaskRepository SchedulerTasks
		{
			get
			{
				return GetRepository<ISchedulerTaskRepository>();
			}
		}

		#endregion MongoDB Repositories

		public IHistoricalQuoteRepository HistoricalQuotes
		{
			get
			{
				return GetRepository<IHistoricalQuoteRepository>();
			}
		}

		public IOptionQuotesInfoRepository OptionQuotesInfo
		{
			get
			{
				return GetRepository<IOptionQuotesInfoRepository>();
			}
		}

		public IStockQuotesInfoRepository StockQuotesInfo
		{
			get
			{
				return GetRepository<IStockQuotesInfoRepository>();
			}
		}

        public IStockQuotePerMinuteRepository StockQuotePerMinuteRepository
        {
            get
            {
                return GetRepository<IStockQuotePerMinuteRepository>();
            }
        }

        public IOptionQuotePerMinuteRepository OptionQuotePerMinuteRepository
        {
            get
            {
                return GetRepository<IOptionQuotePerMinuteRepository>();
            }
        }

		public ITradeIdeasRepository TradeIdeasRepository
		{
			get { return GetRepository<ITradeIdeasRepository>(); }
		}
		
		#endregion Repositories

		/// <summary>
		/// Save pending changes to the database
		/// </summary>
		public void Commit()
		{
			try
			{
				_dbContext.SaveChanges();
			}
			catch (DbEntityValidationException e)
			{
				Logger.Error(ErrorMessages.DbCommitError, e);
				foreach (DbEntityValidationResult validationErrors in e.EntityValidationErrors)
				{
					foreach (DbValidationError validationError in validationErrors.ValidationErrors)
					{
						string errorMessage = string.Format("DB validation error. Property name: '{0}'. Error message: {1}",
							validationError.PropertyName, validationError.ErrorMessage);
						Logger.Error(errorMessage);
					}
				}
				throw;
			}
			catch (Exception e)
			{
				Logger.Error(ErrorMessages.DbCommitError, e);
				throw;
			}
		}

		public T GetRepository<T>() where T : class
		{
			T repository = _container.TryGetInstance<T>();
			return repository;
		}

		public void Dispose()
		{
			_dbContext.Dispose();
		}
	}
}
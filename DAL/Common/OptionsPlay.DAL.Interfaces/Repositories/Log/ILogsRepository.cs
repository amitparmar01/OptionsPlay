using System;
using System.Linq;
using OptionsPlay.Model;
using OptionsPlay.Model.Enums;

namespace OptionsPlay.DAL.Interfaces.Repositories
{
	public interface ILogsRepository : IMongoRepository<Log>
	{
		IQueryable<Log> GetLogs(string messagePart, ApplicationType applicationType, LogLevel logLevel, DateTime startDate, DateTime endDate);
	}
}
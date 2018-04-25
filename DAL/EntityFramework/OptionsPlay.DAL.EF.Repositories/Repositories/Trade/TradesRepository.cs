using System.Data.Entity;
using OptionsPlay.DAL.Interfaces.Repositories;
using OptionsPlay.Model;

namespace OptionsPlay.DAL.EF.Repositories
{
	public class TradesRepository : EFRepository<Trade>, ITradesRepository
	{
		public TradesRepository(DbContext dbContext) : base(dbContext)
		{
		}
	}
}
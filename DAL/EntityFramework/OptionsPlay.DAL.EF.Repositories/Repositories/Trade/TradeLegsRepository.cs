using System.Data.Entity;
using OptionsPlay.DAL.Interfaces.Repositories;
using OptionsPlay.Model;

namespace OptionsPlay.DAL.EF.Repositories
{
	public class TradeLegsRepository:EFRepository<TradeLeg>, ITradeLegsRepository
	{
		public TradeLegsRepository(DbContext dbContext) : base(dbContext)
		{
		}


	}
}
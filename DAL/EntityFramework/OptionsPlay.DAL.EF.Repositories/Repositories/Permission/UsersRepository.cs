using System.Data.Entity;
using System.Linq;
using OptionsPlay.DAL.Interfaces.Repositories;
using OptionsPlay.EF.Encryption;
using OptionsPlay.Model;

namespace OptionsPlay.DAL.EF.Repositories
{
	public class UsersRepository : EFRepository<User, long>, IUsersRepository
	{
		public UsersRepository(DbContext context) : base(context) { }

		public WebUser GetByLoginName(string loginName)
		{
			string lowerLoginName = loginName.ToLower();
			WebUser result = GetAllWebUsers()
				.SingleOrDefault(item => item.LoginName.Equals(lowerLoginName));
			return result;
		}

		public FCUser GetByCustomerCode(string customerCode)
		{
			byte[] thumbprint = (new FCUser()).GetThumbprint(customerCode);

			FCUser result = GetAllFCUsers()
				.SingleOrDefault(item => item.SecurEntityThumbprint == thumbprint);
			return result;
		}

		public FCUser GetByFundAccountCode(string fundAccountCode)
		{
			FCUser result = GetAllFCUsers()
				.SingleOrDefault(item => item.CustomerAccountCode == fundAccountCode);
			return result;
		}

		public FCUser GetBySHTradeAccount(string shTradeAccount)
		{
			FCUser result = GetAllFCUsers()
				.SingleOrDefault(item => item.TradeAccount == shTradeAccount);
			return result;
		}

		public FCUser GetBySZTradeAccount(string szTradeAccount)
		{
			throw new System.NotImplementedException();
		}

		private IQueryable<WebUser> GetAllWebUsers()
		{
			return DbContext.Set<WebUser>();
		}

		private IQueryable<FCUser> GetAllFCUsers()
		{
			return DbContext.Set<FCUser>();
		}
	}
}

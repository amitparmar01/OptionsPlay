using OptionsPlay.Model;

namespace OptionsPlay.DAL.Interfaces.Repositories
{
	public interface IUsersRepository : IRepository<User, long>
	{
		WebUser GetByLoginName(string loginName);

		FCUser GetByCustomerCode(string customerCode);

		FCUser GetByFundAccountCode(string fundAccountCode);

		FCUser GetBySHTradeAccount(string shTradeAccount);

		FCUser GetBySZTradeAccount(string szTradeAccount);
	}
}

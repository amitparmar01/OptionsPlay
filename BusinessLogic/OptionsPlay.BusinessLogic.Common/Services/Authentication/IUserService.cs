using System.Linq;
using OptionsPlay.Common.ServiceResponses;
using OptionsPlay.DAL.SZKingdom.Common.Entities;
using OptionsPlay.Model;

namespace OptionsPlay.BusinessLogic.Common.Authentication
{
	public interface IUserService
	{
		EntityResponse<FCUser> AddOrUpdateFCUser(UserLoginInformation userLoginInformation, string password);

		IQueryable<User> GetAll();

		EntityResponse<FCUser> GetByCustomerCode(string customerCode);

		EntityResponse<User> VerifyAccount(string hash, string salt);
	}
}

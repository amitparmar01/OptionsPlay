using System;
using System.Linq;
using OptionsPlay.BusinessLogic.Common.Authentication;
using OptionsPlay.BusinessLogic.Helpers.Convertors;
using OptionsPlay.Common.Exceptions;
using OptionsPlay.Common.ServiceResponses;
using OptionsPlay.DAL.Interfaces;
using OptionsPlay.DAL.SZKingdom.Common.Entities;
using OptionsPlay.Model;
using OptionsPlay.Model.Enums;

namespace OptionsPlay.BusinessLogic.Authentication
{
	public class UserService : BaseService, IUserService
	{
		public UserService(IOptionsPlayUow uow) : base(uow)
		{
		}

		public EntityResponse<FCUser> AddOrUpdateFCUser(UserLoginInformation userLoginInformation, string password)
		{
			FCUser result;

			FCUser fcUser = Uow.Users.GetByCustomerCode(userLoginInformation.CustomerCode);
			if (fcUser == null)
			{
				fcUser = new FCUser
				{
					Role = Uow.Roles.GetByRoleCollection(RoleCollection.FCUser),
					RegistrationDate = DateTime.UtcNow,
					UpdateDate = DateTime.UtcNow
				};

				userLoginInformation.ToFCUser(fcUser);
				fcUser.Password = password;

				result = fcUser.Clone();
				Uow.Users.Add(fcUser);
			}
			else
			{
				userLoginInformation.ToFCUser(fcUser);
				fcUser.UpdateDate = DateTime.UtcNow;
				fcUser.Password = password;

				result = fcUser.Clone();
				Uow.Users.Update(fcUser);
			}

			Uow.Commit();
			result.Id = fcUser.Id;

			return result;
		}

		public IQueryable<User> GetAll()
		{
			return Uow.Users.GetAll();
		}

		public EntityResponse<FCUser> GetByCustomerCode(string customerCode)
		{
			FCUser fcUser = Uow.Users.GetByCustomerCode(customerCode);
			if (fcUser == null)
			{
				//HARDCODE for admin user stable work
				if (customerCode.Equals("108054788"))
				{
					fcUser = new FCUser
					{
						Password = "123123"
					};
				}
				else
				{
					return ErrorCode.FCUserNotFound;
				}
			}

			return fcUser;
		}

		public EntityResponse<User> VerifyAccount(string hash, string salt)
		{
			throw new NotImplementedException();
		}
	}
}

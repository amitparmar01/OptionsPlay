using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using OptionsPlay.BusinessLogic.Common.Authentication;
using OptionsPlay.Model;
using OptionsPlay.Security.Identities;
using OptionsPlay.Web.Infrastructure.Helpers;
using StructureMap;

namespace OptionsPlay.Web.Controllers.Api
{
	public abstract class BaseApiController : ApiController
	{
		private IOptionsPlayIdentity Identity
		{
			get
			{
				IOptionsPlayIdentity optionsPlayIdentity = SessionHelper.GetIdentity();
				return optionsPlayIdentity;
			}
		}

		protected OptionsPlayFCUserIdentity FCIdentity
		{
			get
			{
				OptionsPlayFCUserIdentity optionsPlayIdentity = Identity as OptionsPlayFCUserIdentity;
				return optionsPlayIdentity;
			}
		}

		protected FCUser FCUser
		{
			get
			{
				IUserService userService = ObjectFactory.GetInstance<IUserService>();
				FCUser fcUser = userService.GetByCustomerCode(FCIdentity.CustomerCode);
				return fcUser;
			}
		}

		protected static void ThrowNotFoundException()
		{
			HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.NotFound);
			throw new HttpResponseException(response);
		}

		protected List<string> GetValidationErrorMessages()
		{
			List<string> errorMessages = new List<string>();
			ModelState.Values.Select(m => m.Errors).ToList().ForEach(m => m.ToList().ForEach(error => errorMessages.Add(error.ErrorMessage)));
			return errorMessages;
		}
	}
}

using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using OptionsPlay.Common.Utilities;
using OptionsPlay.DAL.Interfaces.Repositories;
using OptionsPlay.Model;

namespace OptionsPlay.DAL.EF.Repositories
{
	public class MasterSecurtiesRepository : EFRepository<MasterSecurity>, IMasterSecuritiesRepository
	{
		#region Implementation of IMasterSecuritiesRepository

		public MasterSecurtiesRepository(DbContext dbContext) : base(dbContext)
		{
		}

		public List<string> GetSecurityCodes()
		{
			return GetAll().Select(item => item.SecurityCode).Distinct().ToList();
		}

		public MasterSecurity GetByMasterSecurityCode(string masterSecurityCode)
		{
			return GetAll().SingleOrDefault(item => item.MasterSecurityCode.IgnoreCaseEquals(masterSecurityCode));
		}

		public List<MasterSecurity> GetTradeIdeasSecuritiies()
		{
			return GetAll().Where(item => item.UseForTradeIdeas).ToList();
		}

		public List<MasterSecurity> GetMasterSecuritiies()
		{
			return GetAll().Where(item => item.UseAsMasterList).ToList();
		}

		public void UpdateSecurities(Dictionary<string, string> codeWithName)
		{
			codeWithName.Select(item =>
			{
				MasterSecurity security = GetByMasterSecurityCode(item.Key);
				if (security != null)
				{
					security.Name = item.Value;
					Update(security);
				}
				return true;
			});
		}

		public List<MasterSecurity> GetFilteredSecurities(string filter, int limit)
		{
			return GetMasterSecuritiies().Where(item => item.Name.StartsWith(filter, true, null)).OrderBy(item => item.Name).Take(limit).ToList();
		}

		public MasterSecurity GetDetailsForCode(string code, string exchange)
		{
			return GetAll().SingleOrDefault(item => item.SecurityCode.Equals(code) && item.Exchange.Equals(exchange));
		}

		public MasterSecurity GetDetailsForISIN(string isin)
		{
			return GetAll().SingleOrDefault(item => item.ISIN.IgnoreCaseEquals(isin));
		}

		public void UpdateSecurities(List<MasterSecurity> securityList)
		{
			securityList.Select(item =>
			{
				MasterSecurity security = GetByMasterSecurityCode(item.MasterSecurityCode);
				if (security != null)
				{
					security.Name = item.Name;
					security.ISIN = item.ISIN;
					security.SecurityCode = item.SecurityCode;
					security.Exchange = item.Exchange;
				}
				return true;
			});
		}

		#endregion

	}
}
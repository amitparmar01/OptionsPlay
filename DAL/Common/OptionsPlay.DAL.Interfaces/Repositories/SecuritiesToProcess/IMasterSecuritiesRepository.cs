using System.Collections.Generic;
using OptionsPlay.Model;

namespace OptionsPlay.DAL.Interfaces.Repositories
{
	public interface IMasterSecuritiesRepository : IRepository<MasterSecurity>
	{
		List<string> GetSecurityCodes();

		MasterSecurity GetByMasterSecurityCode(string masterSecurityCode);
		
		List<MasterSecurity> GetTradeIdeasSecuritiies();

		List<MasterSecurity> GetMasterSecuritiies();

		void UpdateSecurities(Dictionary<string, string> codeWithName);

		List<MasterSecurity> GetFilteredSecurities(string filter, int limit);

		MasterSecurity GetDetailsForCode(string code, string exchange);

		MasterSecurity GetDetailsForISIN(string isin);
		
		void UpdateSecurities(List<MasterSecurity> securityList);
	}
}
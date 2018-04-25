using System.Collections.Generic;
using System.Linq;
using OptionsPlay.Model;

namespace OptionsPlay.DAL.Interfaces.Repositories
{
	public interface ISectorsAndIndustriesRepository : IMongoRepository<SectorAndIndustry>
	{
		/// <summary>
		/// Get SectorAndIndustry by <param name="symbol">Symbol</param>
		/// </summary>
		SectorAndIndustry GetBySymbol(string symbol);

		List<SectorAndIndustry> GetBySymbols(IEnumerable<string> symbols);

		void AddOrUpdate(IEnumerable<SectorAndIndustry> sectorsAndIndustries);

		/// <summary>
		/// Get SectorsAndIndustries from DB with SectorId equal <param name="id"></param>
		/// </summary>
		IQueryable<SectorAndIndustry> GetSectorAndIndustryBySectorId(int id);

		/// <summary>
		/// Get SectorsAndIndustries from DB with IndustryId equal <param name="id"></param>
		/// </summary>
		IQueryable<SectorAndIndustry> GetSectorAndIndustryByIndustryId(int id);
	}
}
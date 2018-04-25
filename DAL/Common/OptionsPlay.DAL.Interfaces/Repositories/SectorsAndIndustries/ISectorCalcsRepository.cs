using System.Collections.Generic;
using OptionsPlay.Model;

namespace OptionsPlay.DAL.Interfaces.Repositories
{
	public interface ISectorCalcsRepository : IMongoRepository<SectorCalculation>
	{
		SectorCalculation GetById(int id);

		SectorCalculation GetByName(string name);

		void AddOrUpdate(IEnumerable<SectorCalculation> sectorCalcs);
	}
}
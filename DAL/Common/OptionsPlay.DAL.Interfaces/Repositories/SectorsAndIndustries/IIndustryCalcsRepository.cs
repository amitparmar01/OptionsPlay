using System.Collections.Generic;
using OptionsPlay.Model;

namespace OptionsPlay.DAL.Interfaces.Repositories
{
	public interface IIndustryCalcsRepository : IMongoRepository<IndustryCalculation>
	{
		IndustryCalculation GetById(int id);

		IndustryCalculation GetByName(string name);

		void AddOrUpdate(List<IndustryCalculation> industryCalcs);
	}
}
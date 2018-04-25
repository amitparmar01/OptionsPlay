using System.Linq;
using OptionsPlay.Model;

namespace OptionsPlay.DAL.Interfaces.Repositories
{
	public interface IConfigDirectoriesRepository : IRepository<ConfigDirectory>
	{
		ConfigDirectory GetBySections(string[] configSections);

		ConfigDirectory GetByFullPath(string fullPath);

		IQueryable<ConfigDirectory> GetAllRoots();
	}
}
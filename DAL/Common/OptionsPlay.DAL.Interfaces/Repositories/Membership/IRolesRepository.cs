using OptionsPlay.Model;
using OptionsPlay.Model.Enums;

namespace OptionsPlay.DAL.Interfaces.Repositories
{
	public interface IRolesRepository : IRepository<Role>
	{
		Role GetByRoleCollection(RoleCollection roleCollection);
	}
}

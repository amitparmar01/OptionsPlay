using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using OptionsPlay.DAL.Interfaces.Repositories;
using OptionsPlay.Model;
using OptionsPlay.Model.Enums;

namespace OptionsPlay.DAL.EF.Repositories
{
	public class RolesRepository : EFRepository<Role>, IRolesRepository
	{
		public RolesRepository(DbContext context) : base(context) { }

		public Role GetByRoleCollection(RoleCollection roleCollection)
		{
			Role role = GetAll().SingleOrDefault(item => item.Id == (int)roleCollection);
			return role;
		}
	}
}

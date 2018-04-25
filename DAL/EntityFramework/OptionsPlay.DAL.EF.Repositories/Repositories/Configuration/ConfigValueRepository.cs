
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using OptionsPlay.Common.Exceptions;
using OptionsPlay.Common.ServiceResponses;
using OptionsPlay.Common.Utilities;
using OptionsPlay.DAL.Interfaces.Repositories;
using OptionsPlay.Model;

namespace OptionsPlay.DAL.EF.Repositories
{
	public class ConfigValueRepository : EFRepository<ConfigValue>, IConfigValuesRepository
	{
		public ConfigValueRepository(DbContext context) : base(context) { }
		
		public List<ConfigValue> GetByName(string name)
		{
			string lowerName = name.ToLower().Trim();
			List<ConfigValue> result = GetAll().Where(item => item.Name.IgnoreCaseEquals(lowerName)).ToList();

			return result;
		}

		public override void Add(ConfigValue entity)
		{
			entity.ModifiedDate = DateTime.UtcNow;

			List<ConfigValue> duplicateConfig = GetByName(entity.Name);
			if (duplicateConfig != null && duplicateConfig.Any(x => x.ParentDirectory.Id == entity.ParentDirectory.Id))
			{
				throw new InternalException(ErrorCode.ConfigurationDuplicateSettingName);
			}

			base.Add(entity);
		}

		public override void Update(ConfigValue entity)
		{
			entity.ModifiedDate = DateTime.UtcNow;

			List<ConfigValue> duplicateConfig = GetByName(entity.Name);
			if (duplicateConfig != null && duplicateConfig.Any(x => x.ParentDirectory.Id == entity.ParentDirectory.Id && x.Id != entity.Id))
			{
				throw new InternalException(ErrorCode.ConfigurationDuplicateSettingName);
			}
			base.Update(entity);
		}

	}
}
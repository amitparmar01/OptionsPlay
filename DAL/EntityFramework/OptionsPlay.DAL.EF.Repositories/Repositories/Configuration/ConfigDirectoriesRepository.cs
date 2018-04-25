using System;
using System.Data.Entity;
using System.Linq;
using System.Text;
using OptionsPlay.Common.Exceptions;
using OptionsPlay.Common.ServiceResponses;
using OptionsPlay.DAL.Interfaces.Repositories;
using OptionsPlay.Model;

namespace OptionsPlay.DAL.EF.Repositories
{
	public class ConfigDirectoriesRepository : EFRepository<ConfigDirectory>, IConfigDirectoriesRepository
	{
		public ConfigDirectoriesRepository(DbContext dbContext)
			: base(dbContext)
		{
		}

		public ConfigDirectory GetBySections(string[] configSections)
		{
			string fullPath = string.Join("|", configSections.Select(item => item.Trim()));
			ConfigDirectory configSection = GetByFullPath(fullPath);

			return configSection;
		}

		public ConfigDirectory GetByFullPath(string fullPath)
		{
			ConfigDirectory section = GetAll()
				.Include(item => item.ChildDirectories)
				.Include(item => item.ChildValues)
				.Include(item => item.ParentDirectory)
				.SingleOrDefault(item => item.FullPath.Equals(fullPath));

			return section;
		}

		public IQueryable<ConfigDirectory> GetAllRoots()
		{
			return GetAll().Where(item => item.ParentDirectory == null);
		}

		public override void Add(ConfigDirectory configSection)
		{
			throw new NotSupportedException();
		}

		public override void Update(ConfigDirectory configSection)
		{
			configSection.ModifiedDate = DateTime.UtcNow;

			StringBuilder pathBuilder = new StringBuilder();
			ConfigDirectory section = configSection;
			while (section != null)
			{
				string parentName = pathBuilder.Length > 0
					? string.Format("{0}|", section.Name)
					: section.Name;

				pathBuilder.Insert(0, parentName);

				section = section.ParentDirectory;
			}

			configSection.FullPath = pathBuilder.ToString();

			ConfigDirectory duplicateSection = GetByFullPath(configSection.FullPath);
			if (duplicateSection != null && duplicateSection.Id != configSection.Id)
			{
				throw new InternalException(ErrorCode.ConfigurationDuplicateSectionName);
			}

			base.Update(configSection);
		}
	}
}
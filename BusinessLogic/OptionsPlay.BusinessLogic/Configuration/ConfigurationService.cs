using System.Collections.Generic;
using System.Linq;
using OptionsPlay.BusinessLogic.Common;
using OptionsPlay.Common.ObjectJsonSerialization;
using OptionsPlay.Common.ServiceResponses;
using OptionsPlay.DAL.Interfaces;
using OptionsPlay.Model;

namespace OptionsPlay.BusinessLogic
{
	public class ConfigurationService : BaseService, IConfigurationService
	{
		public ConfigurationService(IOptionsPlayUow uow)
			: base(uow)
		{
		}

		/// <summary>
		/// Get ConfigSections by sections path
		/// </summary>
		public EntityResponse<ConfigDirectory> GetConfigDirectory(params string[] path)
		{
			ConfigDirectory  configSection = Uow.ConfigDirectories.GetBySections(path);
			if (configSection == null)
			{
				return ErrorCode.ConfigurationSectionNotFound;
			}

			return configSection;
		}

		/// <summary>
		/// Get ConfigSetting by sections path and a <param name="settingName">key</param>
		/// </summary>
		public EntityResponse<ConfigValue> GetConfigValue(string[] configSections, string settingName)
		{
			ConfigDirectory configSection = Uow.ConfigDirectories.GetBySections(configSections);
			if (configSection == null)
			{
				return ErrorCode.ConfigurationSectionNotFound;
			}

			ConfigValue entity = configSection.ChildValues.SingleOrDefault(item => item.Name.Equals(settingName));
			if (entity == null)
			{
				return ErrorCode.ConfigurationSettingNotFound;
			}

			return entity;
		}

		public EntityResponse<T> GetValueOnly<T>(string[] configDirectories, string valueName)
		{
			EntityResponse<ConfigValue> valueResponse = GetConfigValue(configDirectories, valueName);
			if (!valueResponse.IsSuccess)
			{
				return EntityResponse<T>.Error(valueResponse);
			}

			T value = valueResponse.Entity.GetValue<T>();
			return value;
		}

		/// <summary>
		/// Update ConfigSection without deletes
		/// </summary>
		public BaseResponse UpdateConfigDirectory(ConfigDirectory configSection)
		{
			EntityResponse<IQueryable<ConfigDirectory>> response = GetConfigDirectoryById(configSection.Id);
			if (!response.IsSuccess)
			{
				return response.ErrorCode;
			}

			if (response.Entity.Count() > 1)
			{
				// Clients are not available to modify root configSection
				return ErrorCode.ConfigurationForbiddenToModify;
			}

			ConfigDirectory oldConfigSection = response.Entity.Single();
			oldConfigSection.Description = configSection.Description;
			oldConfigSection.ModifiedBy = configSection.ModifiedBy;

			foreach (ConfigValue oldSetting in oldConfigSection.ChildValues)
			{
				ConfigValue newSetting = configSection.ChildValues.SingleOrDefault(s => oldSetting.Id.Equals(s.Id));
				if (newSetting == null)
				{
					// Clients are not available to remove settings
					return ErrorCode.ConfigurationForbiddenToModify;
				}

				object result;
				if (!newSetting.TryGetValue(out result))
				{
					return ErrorCode.ConfigurationSettingDeserializationError;
				}

				oldSetting.ValueString = newSetting.ValueString;
				oldSetting.Description = newSetting.Description;
				oldSetting.ModifiedBy = newSetting.ModifiedBy;
			}

			Uow.ConfigDirectories.Update(oldConfigSection);
			Uow.Commit();

			return BaseResponse.Success();
		}

		/// <summary>
		/// Update ConfigSetting
		/// </summary>
		public BaseResponse UpdateConfigValue(ConfigValue configSetting)
		{
			if (configSetting.Id == default(int))
			{
				return ErrorCode.ConfigurationSettingNotFound;
			}

			ConfigValue oldSetting = Uow.ConfigValues.GetById(configSetting.Id);
			if (oldSetting == null)
			{
				return ErrorCode.ConfigurationSettingNotFound;
			}

			if (configSetting.SettingTypeString != oldSetting.ValueString)
			{
				return ErrorCode.ConfigurationForbiddenToModify;
			}

			object result;
			if (!configSetting.TryGetValue(out result))
			{
				return ErrorCode.ConfigurationSettingDeserializationError;
			}

			oldSetting.Description = configSetting.Description;
			oldSetting.ModifiedBy = configSetting.ModifiedBy;
			oldSetting.ValueString = configSetting.ValueString;

			Uow.ConfigValues.Update(oldSetting);
			Uow.Commit();

			return BaseResponse.Success();
		}

		/// <summary>
		/// Get ConfigSection by Id or All Root Sections
		/// </summary>
		public EntityResponse<IQueryable<ConfigDirectory>> GetConfigDirectoryById(long? id)
		{
			IQueryable<ConfigDirectory> configSectionQueryable;
			if (id.HasValue)
			{
				ConfigDirectory configSection = Uow.ConfigDirectories.GetById(id.Value);
				if (configSection == null)
				{
					return ErrorCode.ConfigurationSectionNotFound;
				}

				configSectionQueryable = (new List<ConfigDirectory> { configSection }).AsQueryable();
			}
			else
			{
				configSectionQueryable = Uow.ConfigDirectories.GetAllRoots();
			}

			EntityResponse<IQueryable<ConfigDirectory>> result = EntityResponse<IQueryable<ConfigDirectory>>.Success(configSectionQueryable);
			return result;
		}

		/// <summary>
		/// Get ConfigSetting by Id
		/// </summary>
		public EntityResponse<ConfigValue> GetConfigValueById(int id)
		{
			ConfigValue setting = Uow.ConfigValues.GetById(id);
			if (setting == null)
			{
				return ErrorCode.ConfigurationSectionNotFound;
			}

			return setting;
		}
	}
}

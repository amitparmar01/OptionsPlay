using System.Linq;
using OptionsPlay.Common.ServiceResponses;
using OptionsPlay.Model;

namespace OptionsPlay.BusinessLogic.Common
{
	public interface IConfigurationService
	{
		/// <summary>
		/// Get ConfigSection by sections path
		/// </summary>
		EntityResponse<ConfigDirectory> GetConfigDirectory(params string[] configDirectories);

		/// <summary>
		/// Get ConfigSetting by sections path and a <param name="valueName">key</param>
		/// </summary>
		EntityResponse<ConfigValue> GetConfigValue(string[] configDirectories, string valueName);

		/// <summary>
		/// Returns only value from <see cref="ConfigValue"/> entity. <seealso cref="GetConfigValue"/>
		/// </summary>
		EntityResponse<T> GetValueOnly<T>(string[] configDirectories, string valueName);

		/// <summary>
		/// Update ConfigSection without deletes
		/// </summary>
		BaseResponse UpdateConfigDirectory(ConfigDirectory configSection);

		/// <summary>
		/// Update ConfigSetting
		/// </summary>
		BaseResponse UpdateConfigValue(ConfigValue configSetting);

		/// <summary>
		/// Get ConfigSection by Id or All Root Sections
		/// </summary>
		EntityResponse<IQueryable<ConfigDirectory>> GetConfigDirectoryById(long? id);

		/// <summary>
		/// Get ConfigSetting by Id
		/// </summary>
		EntityResponse<ConfigValue> GetConfigValueById(int id);

       
	}
}

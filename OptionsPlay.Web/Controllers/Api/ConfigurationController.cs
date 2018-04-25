using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Description;
using AutoMapper;
using OptionsPlay.BusinessLogic.Common;
using OptionsPlay.Common.ServiceResponses;
using OptionsPlay.Model;
using OptionsPlay.Model.Enums;
using OptionsPlay.Web.Infrastructure.Attributes.Api;
using OptionsPlay.Web.ViewModels.Configuration;
using OptionsPlay.Web.ViewModels.Providers.Orchestrators;

namespace OptionsPlay.Web.Controllers.Api
{
	[RoutePrefix("api/configurations")]
	[ApiAuthorize(PermissionCollection.ManageConfigurationsData)]
	[ApiExplorerSettings(IgnoreApi = true)]
	public class ConfigurationController : BaseApiController
	{
		private readonly IConfigurationService _configurationService;
		private readonly ConfigurationOrchestrator _orchestrator;

		public ConfigurationController(IConfigurationService configurationService, ConfigurationOrchestrator orchestrator)
		{
			_configurationService = configurationService;
			_orchestrator = orchestrator;
		}

		[Route("")]
		public List<ConfigDirectoryViewModel> GetAll()
		{
			EntityResponse<IQueryable<ConfigDirectory>> configSections = _configurationService.GetConfigDirectoryById(null);

			IQueryable<ConfigDirectory> entities = configSections.Entity
				.Include(item => item.ChildDirectories)
				.Include(item => item.ChildValues);

			List<ConfigDirectoryViewModel> result = Mapper.Map<List<ConfigDirectory>, List<ConfigDirectoryViewModel>>(entities.ToList());
			return result;
		}

		[Route("{*path}")]
		public ConfigDirectoryViewModel Get(string path)
		{
			string[] pathParts = path.Split(new[] { '/' }, StringSplitOptions.RemoveEmptyEntries);
			ConfigDirectory directory = _configurationService.GetConfigDirectory(pathParts);

			ConfigDirectoryViewModel result = Mapper.Map<ConfigDirectoryViewModel>(directory);
			return result;
		}

		[Route("{*path}")]
		public ConfigValueViewModel Get(string path, string key)
		{
			string[] pathParts = path.Split(new[] { '/' }, StringSplitOptions.RemoveEmptyEntries);

			ConfigValue value = _configurationService.GetConfigValue(pathParts, key);
			ConfigValueViewModel response = Mapper.Map<ConfigValueViewModel>(value);
			return response;
		}

		[Route("updateSection")]
		public BaseResponse UpdateSection(ConfigDirectoryUpdateViewModel configDirectoryModel)
		{
			ConfigDirectory model = Mapper.Map<ConfigDirectory>(configDirectoryModel);
			BaseResponse response = _configurationService.UpdateConfigDirectory(model);
			return response;
		}

		[Route("updateKey")]
		public BaseResponse UpdateKey(ConfigValueUpdateViewModel configValueModel)
		{
			ConfigValue model = Mapper.Map<ConfigValue>(configValueModel);
			BaseResponse response = _configurationService.UpdateConfigValue(model);
			return response;
		}

		[Route("getOneLevel/{id:guid?}")]
		public IEnumerable<ConfigDirectoryViewModel> GetOneLevel(int? id = null)
		{
			IQueryable<ConfigDirectory> configSections = _configurationService.GetConfigDirectoryById(id).Entity;
			IQueryable<ConfigDirectory> entities = configSections
				.Include(item => item.ChildDirectories)
				.Include(item => item.ChildValues);

			List<ConfigDirectoryViewModel> result = Mapper.Map<List<ConfigDirectory>, List<ConfigDirectoryViewModel>>(entities.ToList());
			return result;
		}

		[ApiAuthorize]
		[Route("clientConfiguration")]
		public ClientConfiguration GetClientConfiguration()
		{
			ClientConfiguration result = _orchestrator.GetClientConfiguration();
			return result;
		}
	}
}

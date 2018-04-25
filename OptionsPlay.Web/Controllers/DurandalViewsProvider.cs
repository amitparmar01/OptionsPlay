using System;
using System.Collections.Generic;
using System.IO;
using System.Text.RegularExpressions;
using System.Web.Mvc;
using IntelliLock;
using OptionsPlay.Web.ViewModels;
using OptionsPlay.Web.Infrastructure.Helpers;

namespace OptionsPlay.Web.Controllers
{
	public class DurandalViewsProviderController : Controller
	{
		[Obfuscation(Exclude = true)]
		public ActionResult GetView(string name)
		{
			string durandalViewsFolder = "~/App/views";

            if(ScriptsVersioning.IsReleaseBuild())
                durandalViewsFolder = "~/build/views";
			string viewRelativePath = string.Format("{0}{1}", durandalViewsFolder, name);
			string viewAbsolutePath = HttpContext.Server.MapPath(viewRelativePath);

			ActionResult actionResult;
			if (System.IO.File.Exists(viewAbsolutePath))
			{
				actionResult = new FilePathResult(viewAbsolutePath, "text/html");
			}
			else
			{
				viewAbsolutePath = ReplaceHtmlWithCshtml(viewAbsolutePath);
				if (!System.IO.File.Exists(viewAbsolutePath))
				{
					throw new FileNotFoundException();
				}

				viewRelativePath = ReplaceHtmlWithCshtml(viewRelativePath);
				Type viewModelType;
				if (!ViewModels.TryGetValue(viewRelativePath, out viewModelType))
				{
					actionResult = PartialView(viewRelativePath);
				}
				else
				{
					object viewModel = Activator.CreateInstance(viewModelType);
					actionResult = PartialView(viewRelativePath, viewModel);
				}
			}

			return actionResult;
		}

		// holds correlation between views and viewModels
		private static readonly Dictionary<string, Type> ViewModels = new Dictionary<string, Type>
		{
			{ "~/App/views/strategy/new.cshtml", typeof (StrategyViewModel) },
			{ "~/App/views/strategy/edit.cshtml", typeof (StrategyViewModel) },
			{ "~/App/views/strategy/group/new.cshtml", typeof (StrategyGroupViewModel) },
			{ "~/App/views/strategy/group/edit.cshtml", typeof (StrategyGroupViewModel) }
		};

		private static string ReplaceHtmlWithCshtml(string path)
		{
			string result = Regex.Replace(path, @"\.html$", ".cshtml");
			return result;
		}
	}
}
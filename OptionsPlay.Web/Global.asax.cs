using System;
using System.Data.Entity;
using System.Web;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using System.Web.Http;
using OptionsPlay.DAL.EF.Core;
using OptionsPlay.Security;
using OptionsPlay.Web.SignalR;
using OptionsPlay.Web.ViewModels.Providers;
using StructureMap.Web.Pipeline;
using OptionsPlay.Optimization;

namespace OptionsPlay.Web
{
	public class Global : HttpApplication
	{
		void Application_Start(object sender, EventArgs e)
		{
            // to expose native dlls of SZKingdom
            String path = String.Concat(Environment.GetEnvironmentVariable("PATH"), ";", AppDomain.CurrentDomain.RelativeSearchPath);
            Environment.SetEnvironmentVariable("PATH", path, EnvironmentVariableTarget.Process);

            SignalRStartup.InitializeIoc();
            AutoMapperWebConfiguration.Configure();

            DataBasePool.InitializeDatabase();

            // Code that runs on application startup
            AreaRegistration.RegisterAllAreas();
            GlobalConfig.CustomizeConfig(GlobalConfiguration.Configuration);
            GlobalConfiguration.Configure(WebApiConfig.Register);
            FiltersConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            FiltersConfig.RegisterWebApiFilters(GlobalConfiguration.Configuration.Filters);

            RouteConfig.RegisterRoutes(RouteTable.Routes);

            BundleConfig.RegisterBundles(BundleTable.Bundles);

            //HibernatingRhinos.Profiler.Appender.EntityFramework.EntityFrameworkProfiler.Initialize();
            Database.SetInitializer(new OptionsPlayDatabaseInitializer());
		}

		protected void Application_EndRequest(object sender, EventArgs e)
		{
			HttpContextLifecycle.DisposeAndClearAll();
		}

		protected void Application_PostAuthenticateRequest(Object sender, EventArgs e)
		{
			WebFormsAuthenticator authenticator = new WebFormsAuthenticator();
			authenticator.AuthenticateFromCookie();
		}
	}
}
using System.Web.Optimization;
using OptionsPlay.Web.Helpers;

namespace OptionsPlay.Web
{
	public class BundleConfig
	{
		public static void RegisterBundles(BundleCollection bundles)
		{
			bundles.Add(
				new ScriptBundle("~/Scripts/jquery")
					.Include("~/Scripts/jquery-{version}.js")
					.Include("~/Scripts/knockout-{version}.js")
					.Include("~/Scripts/kendo/kendo.all.min.js")
				);

			bundles.Add(new ScriptBundle("~/Scripts/chartIQBundle")
				.Include("~/Scripts/chartIQ/stx.js")
				.Include("~/Scripts/chartIQ/stxThirdParty.js")
				.Include("~/Scripts/chartIQ/stxTimeZoneData.js")
				.Include("~/Scripts/chartIQ/stxModulus.js")
				.Include("~/Scripts/chartIQ/stxKernelOs.js"));
	
			//bundles.Add(new LessBundle("~/Content/custom/views/all").IncludeDirectory("~/Content/custom/views/", "*.less"));

			// Powerhouse Pro all JS In One Bundle.
            //bundles.AddJsBundle("~/main-built", new[]
            //{
            //    "~/App/main-built.js"
            //});
			
			bundles.Add(
				new LessBundle("~/Content/custom/global")
					.Include("~/Content/custom/global.less")
					.Include("~/Content/custom/kendoGlobalOverrides.less")
					.Include("~/Content/custom/chartIQ.less")
				);

			bundles.AddLessBundleWithDirectory("~/Content/powerhousePro/styles",
				"~/Content/powerhouse/powerhousePro/themes/",
				"~/Content/powerhouse/powerhousePro/powerhouse-pro.less");

            bundles.Add(new StyleBundle("~/Content/vendor")
                .Include("~/Content/font-awesome.css")
                .Include("~/Content/bootstrap.css")
                .Include("~/Content/themes/base/jquery-ui.css")
                .Include("~/Content/perfect-scrollbar.css")
                .Include("~/Content/pace.css"));

			bundles.Add(
				new StyleBundle("~/Content/kendo/css")
					.Include("~/Content/kendo/kendo.common.core.min.css")
					.Include("~/Content/kendo/kendo.common.min.css")
					.Include("~/Content/kendo/kendo.silver.min.css")
					.Include("~/Content/kendo/kendo.web.plugins.min.css")
				);
		}
	}
}
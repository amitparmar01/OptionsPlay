using System.Web.Optimization;
using BundleTransformer.Core.Bundles;

namespace OptionsPlay.Web.Helpers
{
	internal static class BundleExtensions
	{
		public static void AddJsBundle(this BundleCollection bundles, string bundlePath, params string[] filePaths)
		{
			Bundle jsBundle = new CustomScriptBundle(bundlePath).Include(filePaths);
			bundles.Add(jsBundle);
		}

		public static void AddCssBundle(this BundleCollection bundles, string bundlePath, params string[] filePaths)
		{
			Bundle cssBundle = new CustomStyleBundle(bundlePath).Include(filePaths);
			bundles.Add(cssBundle);
		}

		public static void AddLessBundle(this BundleCollection bundles, string bundlePath, params string[] filePaths)
		{
			Bundle lessBundle = new CustomStyleBundle(bundlePath).Include(filePaths);
			bundles.Add(lessBundle);
		}

		public static void AddLessBundleWithDirectory(this BundleCollection bundles, string bundlePath, string directory, params string[] filePaths)
		{
			Bundle lessBundle = new CustomStyleBundle(bundlePath).IncludeDirectory(directory, "*.less").Include(filePaths);
			bundles.Add(lessBundle);
		}
	}
}
using System;
using System.Globalization;

namespace OptionsPlay.Web.Infrastructure.Helpers
{
	/// <summary>
	/// Used for JS cache busting. New hash is generated each server restart
	/// </summary>
	public static class ScriptsVersioning
	{
		private static readonly string Version;

		static ScriptsVersioning()
		{
			Version = DateTime.UtcNow.Ticks.ToString(CultureInfo.InvariantCulture);
		}

		public static string ScriptsVersion
		{
			get
			{
				return IsReleaseBuild()
					? Version
					: String.Empty;
			}
		}

		public static bool IsReleaseBuild()
		{
#if DEBUG
			return false;
#else
			return true;
#endif
		}
	}
}
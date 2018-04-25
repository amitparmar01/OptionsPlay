using System;
using System.Text;
using System.Text.RegularExpressions;
using System.Web;

namespace OptionsPlay.Web.Infrastructure.Helpers
{
	public class UrlHelper
	{
		public static string GenerateHostUrl(string addition)
		{
			Uri url = HttpContext.Current.Request.Url;

			StringBuilder confirmUrl = new StringBuilder();
			confirmUrl.AppendFormat("{0}://{1}", url.Scheme, url.Host);
			if (url.Port != 80)
			{
				confirmUrl.AppendFormat(":{0}", url.Port);
			}

			Regex regex = new Regex(@"/api/.*", RegexOptions.IgnoreCase);
			string path = regex.Replace(url.PathAndQuery, string.Empty);
			confirmUrl.Append(path);

			if (!string.IsNullOrEmpty(addition))
			{
				confirmUrl.Append(addition);
			}

			string result = confirmUrl.ToString();
			return result;
		}
	}
}

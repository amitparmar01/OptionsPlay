using System;
using System.Globalization;
using System.IO;
using System.Text;
using System.Threading;
using System.Web;
using System.Web.Configuration;
using System.Web.Security;
using OptionsPlay.Common.Options;
using OptionsPlay.Model;
using OptionsPlay.Security.AuthorizationCookie;
using OptionsPlay.Security.Identities;
using ProtoBuf;

namespace OptionsPlay.Security
{
	public class WebFormsAuthenticator
	{
		private readonly string _cookieName;

		public WebFormsAuthenticator(string cookieName = null)
		{
			_cookieName = !string.IsNullOrEmpty(cookieName) ? cookieName : FormsAuthentication.FormsCookieName;
		}

		/// <summary>
		/// Authenticates the user in the application.
		/// </summary>
		public void Authenticate(User user, bool rememberMe = false)
		{
			AuthorizationCookieModel cookieModel = user.ToAuthorizationCookieModel();

			Authenticate(cookieModel, rememberMe);
		}

		/// <summary>
		/// Authenticates the user from cookie data.
		/// </summary>
		public void AuthenticateFromCookie()
		{
			// Get the authentication cookie
			HttpCookie authCookie = HttpContext.Current.Request.Cookies[_cookieName];

			// If the cookie can't be found, don't issue the ticket
			if (authCookie == null) return;

			// Get the authentication ticket
			FormsAuthenticationTicket authTicket = FormsAuthentication.Decrypt(authCookie.Value);
			byte[] userDataBytes = HexStringToBytes(authTicket.UserData);
			try
			{
				AuthorizationCookieModel cookieModel;
				using (MemoryStream ms = new MemoryStream(userDataBytes, false))
				{
					cookieModel = Serializer.Deserialize<AuthorizationCookieModel>(ms);
				}

				if (cookieModel != null)
				{
					AssignPrincipal(cookieModel);
				}
				else
				{
					ClearPrincipals();
				}
			}
			catch
			{
				//ObjectFactory.GetInstance<ILoggerFactory>().LoggerFor("WebFormsAuthenticator").Error(LogMessagesResources.CanntParseCookieFormat(authTicket.UserData));
			}
		}

		/// <summary>
		/// Logs the user out of the application.
		/// </summary>
		public void LogOut()
		{
			FormsAuthentication.SignOut();

			ClearPrincipals();
		}

		/// <summary>
		/// Clear HttpContext identity and thread principal
		/// </summary>
		public static void ClearPrincipals()
		{
			HttpContext.Current.User = null;
			Thread.CurrentPrincipal = null;
		}

		/// <summary>
		/// Authenticates the user in the application using cookieModel.
		/// </summary>
		private void Authenticate(AuthorizationCookieModel cookieModel, bool rememberMe = false)
		{
			HttpContext context = HttpContext.Current;

			//Create a new ticket
			AuthenticationSection config = (AuthenticationSection)context.GetSection("system.web/authentication");

			//Update Cookie
			bool isRememberMePreviousCookie = false;
			HttpCookie authCookie = HttpContext.Current.Request.Cookies[_cookieName];

			if (authCookie != null && !string.IsNullOrEmpty(authCookie.Value))
			{
				FormsAuthenticationTicket authTicket = FormsAuthentication.Decrypt(authCookie.Value);
				if (authTicket != null)
				{
					isRememberMePreviousCookie = authTicket.IsPersistent;
				}
			}

			DateTime expirationDate = rememberMe || isRememberMePreviousCookie
											? DateTime.Now.AddDays(AppConfigManager.RememberMeExpirationTimeFrameInDays)
											: DateTime.Now.AddMinutes(config.Forms.Timeout.TotalMinutes);

			//todo: move to separate method
			string cookieBody;
			using (MemoryStream ms = new MemoryStream())
			{
				Serializer.Serialize(ms, cookieModel);
				cookieBody = BytesToHexString((ms.ToArray()));
			}

			FormsAuthenticationTicket ticket = new FormsAuthenticationTicket(
				1,
				cookieModel.UserId.ToString(CultureInfo.InvariantCulture),
				DateTime.Now,
				expirationDate,
				rememberMe || isRememberMePreviousCookie,
				cookieBody,
				FormsAuthentication.FormsCookiePath);

			//Assign ticket to cookie
			string encryptedTicket = FormsAuthentication.Encrypt(ticket);
			HttpCookie cookie = new HttpCookie(_cookieName, encryptedTicket) { HttpOnly = true };

			//Remember Me
			if (rememberMe || isRememberMePreviousCookie)
			{
				cookie.Expires = expirationDate;
			}

			context.Response.Cookies.Clear();
			context.Response.Cookies.Add(cookie);
			AssignPrincipal(cookieModel);
		}

		private static void AssignPrincipal(AuthorizationCookieModel cookieModel)
		{
			OptionsPlayIdentity identity = cookieModel.ToOptionsPlayIdentity();
			OptionsPlayPrincipal principal = new OptionsPlayPrincipal(identity, identity.Role);

			HttpContext.Current.User = principal;
			Thread.CurrentPrincipal = principal;
		}

		private static string BytesToHexString(byte[] bytes)
		{
			return BitConverter.ToString(bytes).Replace("-", "");
		}

		private static byte[] HexStringToBytes(string hexString)
		{
			int numberChars = hexString.Length;
			byte[] bytes = new byte[numberChars / 2];
			for (int i = 0; i < numberChars; i += 2)
				bytes[i / 2] = Convert.ToByte(hexString.Substring(i, 2), 16);
			return bytes;
		}
	}
}
using System.Text;

namespace OptionsPlay.EF.Encryption
{
	internal sealed class SecretKeyStorage
	{
		private static SecretKeyStorage _instance;

		public static SecretKeyStorage Instance
		{
			get
			{
				return _instance ?? (_instance = new SecretKeyStorage());
			}
		}

		private SecretKeyStorage()
		{
			SecretKey = Encoding.UTF8.GetBytes("SecretKeyfigudpoaslfgojtuposdkfahsdirweodsarfoajfcalsfpasofi34978509327459781");
		}

		public byte[] SecretKey { get; set; }
	}
}

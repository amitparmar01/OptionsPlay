using System;
using System.Configuration;
using System.Linq;
using System.Security.Cryptography;

namespace OptionsPlay.SecurEntityLib
{
	public sealed class SecretKeyStorage
	{
		/// <summary>
		/// Open the certificate store
		/// </summary>
		private SecretKeyStorage()
		{
			string secretKey = ConfigurationManager.AppSettings["SecretKey"];

			byte[] data = StringToByteArray(secretKey);

			if (null == secretKey || secretKey.Length % 2 == 1)
			{
				throw new Exception("No valid SecurEntity Secret Key found");
			}

			// Create a hash
			SHA512Managed sha = new SHA512Managed();
			sha.Initialize();
			sha.TransformBlock(data, 0, data.Length, data, 0);

			SecretKey = sha.Hash;
		}

		private static byte[] StringToByteArray(string hex)
		{
			return Enumerable.Range(0, hex.Length)
							 .Where(x => x % 2 == 0)
							 .Select(x => Convert.ToByte(hex.Substring(x, 2), 16))
							 .ToArray();
		}

		static SecretKeyStorage()
		{
			Instance = new SecretKeyStorage();
		}

		public static SecretKeyStorage Instance { get; private set; }

		public byte[] SecretKey { get; set; }
	}
}

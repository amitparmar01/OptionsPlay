using System;
using System.IO;
using System.Linq;
using System.Security.Cryptography;

namespace OptionsPlay.EF.Encryption
{
	class CryptoHelper
	{
		private const UInt32 CurrentVersion = 1;
		private const UInt32 SecretLength = 32;
		private const UInt32 CipherBlockLength = 16;
		private const UInt32 AesKeyBits = 256;

		private byte[] _cipherSalt;
		private byte[] _hmacSalt;
		private byte[] _iv;
		private readonly byte[] _hmacResult;

		private byte[] _secretKey;
		private HMACSHA512 _hmac512;
		private AesManaged _aes;

		public CryptoHelper()
		{
		}

		public CryptoHelper(byte[] key, string securEntityData)
		{
			_hmac512 = new HMACSHA512();

			MemoryStream ms = new MemoryStream(
				Convert.FromBase64String(securEntityData));
			BinaryReader br = new BinaryReader(ms);
			br.ReadUInt32();
			_cipherSalt = br.ReadBytes((int)SecretLength);
			_hmacSalt = br.ReadBytes((int)SecretLength);
			_iv = br.ReadBytes((int)CipherBlockLength);
			_hmacResult = br.ReadBytes(_hmac512.HashSize / 8);

			_secretKey = key;

			DeriveHmac();
			DeriveCipher();
		}

		private void DeriveHmac()
		{
			_hmac512 = new HMACSHA512(_secretKey);
			_hmac512.TransformBlock(
				_hmacSalt,
				0,
				_hmacSalt.Length,
				_hmacSalt,
				0);
		}

		private void DeriveCipher()
		{
			SHA512Managed sha = new SHA512Managed();
			sha.TransformBlock(_secretKey, 0, _secretKey.Length, _secretKey, 0);
			sha.TransformFinalBlock(_cipherSalt, 0, _cipherSalt.Length);

			_aes = new AesManaged();
			_aes.KeySize = (int)AesKeyBits;
			_aes.IV = _iv;
			_aes.Key = new byte[AesKeyBits / 8];
			Array.Copy(sha.Hash, _aes.Key, _aes.Key.Length);
			_aes.Mode = CipherMode.CBC;
		}

		public void Initialize(byte[] key)
		{
			_secretKey = key;
			_cipherSalt = new byte[SecretLength];
			_hmacSalt = new byte[SecretLength];
			_iv = new byte[CipherBlockLength];

			RNGCryptoServiceProvider rng = new RNGCryptoServiceProvider();
			rng.GetBytes(_cipherSalt);
			rng.GetBytes(_hmacSalt);
			rng.GetBytes(_iv);

			DeriveHmac();
			DeriveCipher();
		}

		public enum AddDataAction
		{
			Encrypt,
			Decrypt,
			DoNothing
		}

		public void AddData(
			byte[] data,
			AddDataAction action,
			bool final,
			ref string plaintext,
			ref string ciphertext)
		{
			//
			// Need to decrypt?
			//

			if (AddDataAction.Decrypt == action)
			{
				byte[] decoded = Convert.FromBase64String(ciphertext);
				ICryptoTransform decryptor = _aes.CreateDecryptor();
				byte[] decrypted = decryptor.TransformFinalBlock(
					decoded, 0, decoded.Length);

				data = decrypted;

				using (MemoryStream ms = new MemoryStream(decrypted))
				{
					BinaryReader bw = new BinaryReader(ms);
					plaintext = bw.ReadString();
				}
			}

			//
			// Add the property to integrity
			//

			if (false == final)
				_hmac512.TransformBlock(
					data, 0, data.Length, data, 0);
			else
				_hmac512.TransformFinalBlock(data, 0, data.Length);

			//
			// Need to encrypt?
			//

			if (AddDataAction.Encrypt == action)
			{
				ICryptoTransform encryptor = _aes.CreateEncryptor();
				byte[] toEncode = encryptor.TransformFinalBlock(
					data, 0, data.Length);
				ciphertext = Convert.ToBase64String(toEncode);
			}
		}

		public override string ToString()
		{
			MemoryStream ms = new MemoryStream();
			BinaryWriter bw = new BinaryWriter(ms);
			bw.Write(CurrentVersion);
			bw.Write(_cipherSalt);
			bw.Write(_hmacSalt);
			bw.Write(_iv);
			bw.Write(_hmac512.Hash);
			bw.Close();

			return Convert.ToBase64String(ms.ToArray());
		}

		public bool Verify()
		{
			return _hmacResult.SequenceEqual(_hmac512.Hash);
		}

		public static byte[] GetStringColumnValueThumbprint(
			byte[] secretKey,
			string colVal,
			string extraData)
		{
			HMACSHA512 hmac512 = new HMACSHA512(secretKey);

			//
			// Add the data
			//

			MemoryStream ms = new MemoryStream();
			BinaryWriter bw = new BinaryWriter(ms);
			bw.Write(colVal);
			bw.Write(extraData);
			bw.Close();

			hmac512.TransformFinalBlock(
				ms.ToArray(),
				0,
				ms.ToArray().Length);

			//
			// Return the hash
			//

			return hmac512.Hash;
		}
	}
}

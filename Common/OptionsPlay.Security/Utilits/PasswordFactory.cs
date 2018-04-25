using System;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using OptionsPlay.Model;

namespace OptionsPlay.Security.Utilits
{
	public class PasswordFactory
	{
		private const int MinimumLanguageCharactersInPassword = 3;
		private const int MinimumNumericCharactersInPassword = 3;
		private const int MinimumSpecialCharactersInPassword = 3;

		private const int SaltSize = 32;
		private const int HashSize = 32;

		private const string LanguageCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
		private const string NumericCharacters = "1234567890";
		private const string NoneSpecialCharacters = LanguageCharacters + NumericCharacters;
		private const string SpecialCharacters = "!@#$%^&*()_+|";
		private const string AllCharacters = LanguageCharacters + NumericCharacters + SpecialCharacters;

		/// <summary>
		/// Generates random password.
		/// </summary>
		/// <returns>Generated password.</returns>
		public virtual string GenerateRandomPassword()
		{
			return GenerateRandomString(MinimumNumericCharactersInPassword, MinimumSpecialCharactersInPassword, MinimumLanguageCharactersInPassword);
		}

		/// <summary>
		/// Sets new password value.
		/// </summary>
		/// <param name="user"></param>
		/// <param name="password">New password in plain text.</param>
		/// <exception cref="ArgumentNullException">If <c>password</c> is <c>null</c>.</exception>
		public virtual void SetPassword(WebUser user, string password)
		{
			string hash;
			string salt;

			GetPasswordHashAndSalt(password, out hash, out salt);

			user.PasswordHash = hash;
			user.PasswordSalt = salt;

			user.PasswordLastChangeDate = DateTime.UtcNow;
		}

		/// <summary>
		/// Checks whether password matches current one.
		/// </summary>
		/// <param name="user"></param>
		/// <param name="passwordToCheck">Password to be checked in plain text.</param>
		/// <returns><c>true</c> if passwords do match otherwise - <c>false</c>.</returns>
		public virtual bool CheckPassword(WebUser user, string passwordToCheck)
		{
			return user.PasswordHash == GetPasswordHash(passwordToCheck, user.PasswordSalt);
		}

		/// <summary>
		/// Generates the random string.
		/// </summary>
		/// <returns>The generated random string.</returns>
		public static string GenerateRandomString(int minNumericCharacters, int minSpecialCharacters, int minLanguageCharacters)
		{
			RandomNumberGenerator generator = RandomNumberGenerator.Create();

			int passwordLength = minNumericCharacters
								 + minSpecialCharacters
								 + minLanguageCharacters;

			byte[] randomData = new byte[passwordLength];
			char[] randomPassword = new char[passwordLength];
			int shift = 0;
			generator.GetBytes(randomData);

			for (int i = 0; i < minNumericCharacters; i++)
			{
				randomPassword[shift + i] = NumericCharacters[randomData[shift + i] % NumericCharacters.Length];
			}

			shift += minNumericCharacters;

			for (int i = 0; i < minSpecialCharacters; i++)
			{
				randomPassword[shift + i] = SpecialCharacters[randomData[shift + i] % SpecialCharacters.Length];
			}

			shift += minSpecialCharacters;

			for (int i = 0; i < minLanguageCharacters; i++)
			{
				randomPassword[shift + i] = LanguageCharacters[randomData[shift + i] % LanguageCharacters.Length];
			}

			shift += minLanguageCharacters;

			for (int i = 0; i < passwordLength - shift; i++)
			{
				randomPassword[shift + i] = AllCharacters[randomData[shift + i] % AllCharacters.Length];
			}

			Random random = new Random();
			randomPassword = randomPassword.OrderBy(x => random.Next()).ToArray();
			return new StringBuilder().Append(randomPassword).ToString();
		}

		public static string GenerateRandomNoneSpecialString(int length)
		{
			RandomNumberGenerator generator = RandomNumberGenerator.Create();

			byte[] randomData = new byte[length];
			char[] randomPassword = new char[length];
			generator.GetBytes(randomData);

			for (int i = 0; i < length; i++)
			{
				randomPassword[i] = NoneSpecialCharacters[randomData[i] % NoneSpecialCharacters.Length];
			}

			Random random = new Random();
			randomPassword = randomPassword.OrderBy(x => random.Next()).ToArray();
			return new StringBuilder().Append(randomPassword).ToString();
		}

		/// <summary>
		/// Create hash for specified string value
		/// </summary>
		/// <param name="password">Value to be hashed</param>
		/// <param name="hash">Hash of the value</param>
		/// <param name="salt">Salt for the hashed value</param>
		/// <exception cref="ArgumentNullException"/>
		private static void GetPasswordHashAndSalt(string password, out string hash, out string salt)
		{
			if (string.IsNullOrEmpty(password))
			{
				throw new ArgumentNullException("password", @"Hashed value cannot be null");
			}

			RNGCryptoServiceProvider rng = new RNGCryptoServiceProvider();
			byte[] bSalt = new byte[SaltSize];
			rng.GetBytes(bSalt);

			hash = CryptoHelper.GetStringHash(password, bSalt, HashSize);
			salt = Convert.ToBase64String(bSalt);
		}

		/// <summary>
		/// Hashes the valued.
		/// </summary>
		/// <param name="password">Value to be hashed.</param>
		/// <param name="salt">The value salt.</param>
		/// <returns>The hashed value.</returns>
		public static string GetPasswordHash(string password, string salt)
		{
			if (string.IsNullOrEmpty(password))
			{
				throw new ArgumentNullException("password", @"Hashed value cannot be null");
			}

			string hash = CryptoHelper.GetStringHash(password, Convert.FromBase64String(salt), HashSize);

			return hash;
		}
	}
}

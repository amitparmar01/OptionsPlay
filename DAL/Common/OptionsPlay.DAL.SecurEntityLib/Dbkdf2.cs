//Copyright (c) 2012 Josip Medved <jmedved@jmedved.com>

//2012-04-12: Initial version.


using System;
using System.Security.Cryptography;
using System.Text;

namespace OptionsPlay.SecurEntityLib
{
	/// <summary>
	/// Generic PBKDF2 implementation.
	/// </summary>
	/// <example>This sample shows how to initialize class with SHA-256 HMAC.
	/// <code>
	/// using (HMACSHA256 hmac = new HMACSHA256()) {
	///     Pbkdf2 df = new Pbkdf2(hmac, "password", "salt");
	///     byte[] bytes = df.GetBytes();
	/// }
	/// </code>
	/// </example>
	[System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Naming", "CA1704:IdentifiersShouldBeSpelledCorrectly", MessageId = "Pbkdf", Justification = "Spelling is correct.")]
	public class Pbkdf2
	{
		private const Int32 DefaultIterationsCount = 4096;

		public Pbkdf2(HMAC algorithm, Int32 iterations = DefaultIterationsCount)
		{
			if (algorithm == null) { throw new ArgumentNullException("algorithm", "Algorithm cannot be null."); }
			Algorithm = algorithm;
			IterationCount = iterations;
			blockSize = Algorithm.HashSize / 8;
			bufferBytes = new byte[blockSize];
		}

		/// <summary>
		/// Creates new instance.
		/// </summary>
		/// <param name="algorithm">HMAC algorithm to use.</param>
		/// <param name="password">The password used to derive the key.</param>
		/// <param name="salt">The key salt used to derive the key.</param>
		/// <param name="iterations">The number of iterations for the operation.</param>
		/// <exception cref="System.ArgumentNullException">Algorithm cannot be null - Password cannot be null. -or- Salt cannot be null.</exception>
		public Pbkdf2(HMAC algorithm, Byte[] password, Byte[] salt, Int32 iterations = DefaultIterationsCount)
		{
			if (algorithm == null) { throw new ArgumentNullException("algorithm", "Algorithm cannot be null."); }
			if (salt == null) { throw new ArgumentNullException("salt", "Salt cannot be null."); }
			if (password == null) { throw new ArgumentNullException("password", "Password cannot be null."); }
			Algorithm = algorithm;
			Algorithm.Key = password;
			Salt = salt;
			IterationCount = iterations;
			blockSize = Algorithm.HashSize / 8;
			bufferBytes = new byte[blockSize];
		}

		/// <summary>
		/// Creates new instance.
		/// </summary>
		/// <param name="algorithm">HMAC algorithm to use.</param>
		/// <param name="password">The password used to derive the key.</param>
		/// <param name="salt">The key salt used to derive the key.</param>
		/// <param name="iterations">The number of iterations for the operation.</param>
		/// <exception cref="System.ArgumentNullException">Algorithm cannot be null - Password cannot be null. -or- Salt cannot be null.</exception>
		public Pbkdf2(HMAC algorithm, String password, String salt, Int32 iterations) :
			this(algorithm, Encoding.UTF8.GetBytes(password), Encoding.UTF8.GetBytes(salt), iterations)
		{
		}

		/// <summary>
		/// Creates new instance.
		/// </summary>
		/// <param name="algorithm">HMAC algorithm to use.</param>
		/// <param name="password">The password used to derive the key.</param>
		/// <param name="salt">The key salt used to derive the key.</param>
		/// <exception cref="System.ArgumentNullException">Algorithm cannot be null - Password cannot be null. -or- Salt cannot be null.</exception>
		public Pbkdf2(HMAC algorithm, String password, String salt) :
			this(algorithm, password, salt, 1000)
		{
		}

		private readonly int blockSize;
		private uint blockIndex = 1;

		private byte[] bufferBytes;
		private int bufferStartIndex;
		private int bufferEndIndex;


		/// <summary>
		/// Gets algorithm used for generating key.
		/// </summary>
		public HMAC Algorithm { get; private set; }

		/// <summary>
		/// Gets salt bytes.
		/// </summary>
		[System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Performance", "CA1819:PropertiesShouldNotReturnArrays", Justification = "Byte array is proper return value in this case.")]
		public Byte[] Salt { get; private set; }

		/// <summary>
		/// Gets iteration count.
		/// </summary>
		public Int32 IterationCount { get; private set; }

		/// <summary>
		/// Returns a pseudo-random key from a password, salt and iteration count.
		/// </summary>
		/// <param name="count">Number of bytes to return.</param>
		/// <returns>Byte array.</returns>
		public Byte[] GetBytes(int count)
		{
			byte[] result = new byte[count];
			int resultOffset = 0;
			int bufferCount = bufferEndIndex - bufferStartIndex;

			if (bufferCount > 0)
			{ //if there is some data in buffer
				if (count < bufferCount)
				{ //if there is enough data in buffer
					Buffer.BlockCopy(bufferBytes, bufferStartIndex, result, 0, count);
					bufferStartIndex += count;
					return result;
				}
				Buffer.BlockCopy(bufferBytes, bufferStartIndex, result, 0, bufferCount);
				bufferStartIndex = bufferEndIndex = 0;
				resultOffset += bufferCount;
			}

			while (resultOffset < count)
			{
				int needCount = count - resultOffset;
				bufferBytes = Func();
				if (needCount > blockSize)
				{ //we one (or more) additional passes
					Buffer.BlockCopy(bufferBytes, 0, result, resultOffset, blockSize);
					resultOffset += blockSize;
				}
				else
				{
					Buffer.BlockCopy(bufferBytes, 0, result, resultOffset, needCount);
					bufferStartIndex = needCount;
					bufferEndIndex = blockSize;
					return result;
				}
			}

			return result;
		}

		private byte[] Func()
		{
			byte[] hash1Input = new byte[Salt.Length + 4];
			Buffer.BlockCopy(Salt, 0, hash1Input, 0, Salt.Length);
			Buffer.BlockCopy(GetBytesFromInt(blockIndex), 0, hash1Input, Salt.Length, 4);
			byte[] hash1 = Algorithm.ComputeHash(hash1Input);

			byte[] finalHash = hash1;
			for (int i = 2; i <= IterationCount; i++)
			{
				hash1 = Algorithm.ComputeHash(hash1, 0, hash1.Length);
				for (int j = 0; j < blockSize; j++)
				{
					finalHash[j] = (byte)(finalHash[j] ^ hash1[j]);
				}
			}
			if (blockIndex == uint.MaxValue) { throw new InvalidOperationException("Derived key too long."); }
			blockIndex += 1;

			return finalHash;
		}

		private static byte[] GetBytesFromInt(uint i)
		{
			byte[] bytes = BitConverter.GetBytes(i);
			if (BitConverter.IsLittleEndian)
			{
				return new[] { bytes[3], bytes[2], bytes[1], bytes[0] };
			}

			return bytes;
		}

	}
}

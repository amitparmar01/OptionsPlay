using System;
using System.Collections.Generic;
using System.Reflection;
using System.IO;

namespace OptionsPlay.SecurEntityLib
{
	public abstract class SecurEntity
	{
		public virtual string SecurEntityData { get; set; }

		public virtual Guid SecurEntityID { get; set; }

		public abstract string GetPrimaryKeyPropertyName();

		private bool _IsPropertyForEncryption(PropertyInfo pi)
		{
			object o = pi.GetValue(this, null);
			if (o is string && Attribute.IsDefined(pi, typeof(EncryptAttribute)))
			{
				return true;
			}

			return false;
		}

		private bool _IsPropertyForIntegrity(PropertyInfo pi, out bool isPlainStringType)
		{
			isPlainStringType = false;

			if (String.Equals(pi.Name, "SecurEntityID", StringComparison.OrdinalIgnoreCase))
			{
				return true;
			}

			if (String.Equals(pi.Name, "SecurEntityData", StringComparison.OrdinalIgnoreCase))
			{
				return false;
			}

			if (pi.Name.ToLower().EndsWith("id", StringComparison.InvariantCultureIgnoreCase))
			{
				return false;
			}

			if (String.Equals(pi.Name, GetPrimaryKeyPropertyName(), StringComparison.OrdinalIgnoreCase))
			{
				return false;
			}

			if (pi.PropertyType.IsGenericType)
			{
				return false;
			}

			object o = pi.GetValue(this, null);
			if (o is DateTime ||
				o is string ||
				o is int ||
				o is uint ||
				o is SecurEntity)
			{
				if (_IsPropertyForEncryption(pi))
				{
					isPlainStringType = true;
				}
				return true;
			}

			return false;
		}

		private static int ComparePropertyInfos(PropertyInfo pi1, PropertyInfo pi2)
		{
			return String.CompareOrdinal(pi1.Name, pi2.Name);
		}

		private static void _CheckSecurEntityID(bool read, SecurEntity se)
		{
			if (false == read)
			{
				long pk = Convert.ToInt64(se.GetType().GetProperty(se.GetPrimaryKeyPropertyName()).GetValue(se, null));

				if (pk == 0)
				{
					//
					// N.B. - this library assumes that the Primary Key of any 
					// SecurEntity is of type int. However, since that value
					// is generated automatically by SQL the first time the 
					// object/row is written, it can't be used in the hash
					// computation. 
					//
					// Instead, this GUID property is used in order to support
					// the cryptographic binding of relationships between 
					// SecurEntity objects.
					//

					if (se.SecurEntityID == Guid.Empty)
					{
						se.SecurEntityID = Guid.NewGuid();
					}
				}
			}
			else if (se.SecurEntityID == Guid.Empty)
			{
				throw new Exception("SecurEntity integrity verification failed.");
			}
		}

		private void _AddProperties(bool read, ref CryptoHelper ch)
		{
			PropertyInfo[] sourcePropertyInfos = GetType().GetProperties(BindingFlags.Instance | BindingFlags.Public);
			List<PropertyInfo> filteredPropertyInfos = new List<PropertyInfo>();

			//
			// Check if this appears to be a brand new object
			//

			_CheckSecurEntityID(read, this);

			//
			// Filter out the unsupported property types
			//

			for (int i = 0; i < sourcePropertyInfos.Length; i++)
			{
				bool colIsStringType;
				if (_IsPropertyForIntegrity(sourcePropertyInfos[i], out colIsStringType))
				{
					filteredPropertyInfos.Add(sourcePropertyInfos[i]);
				}
			}

			//
			// Sort the filtered property list to ensure that the same field 
			// order is always used for the following cryptographic operations
			//

			filteredPropertyInfos.Sort(ComparePropertyInfos);

			//
			// Iterate again through the supported property types
			//

			for (int i = 0; i < filteredPropertyInfos.Count; i++)
			{
				//
				// Turn the property into a byte array
				//

				MemoryStream ms = new MemoryStream();
				BinaryWriter bw = new BinaryWriter(ms);
				object o = filteredPropertyInfos[i].GetValue(this, null);
				SecurEntity se = o as SecurEntity;
				if (se != null)
				{
					_CheckSecurEntityID(read, se);
					bw.Write(se.SecurEntityID.ToString());
				}
				else
				{
					bw.Write(null == o ? "" : o.ToString());
				}
				bw.Close();

				//
				// Determine whether to encrypt, decrypt, or neither
				//

				string plaintext = null;
				string ciphertext = null;
				CryptoHelper.AddDataAction action;
				if (_IsPropertyForEncryption(filteredPropertyInfos[i]))
				{
					if (read)
					{
						action = CryptoHelper.AddDataAction.Decrypt;
						ciphertext = (string)o;
					}
					else
					{
						action = CryptoHelper.AddDataAction.Encrypt;
					}
				}
				else
				{
					action = CryptoHelper.AddDataAction.DoNothing;
				}

				//
				// Perform the required crypto
				//

				ch.AddData(
					ms.ToArray(),
					action,
					i == filteredPropertyInfos.Count - 1,
					ref plaintext,
					ref ciphertext);

				//
				// Set the encrypted or decrypted property, if appropriate
				//

				switch (action)
				{
					case CryptoHelper.AddDataAction.Decrypt:
						filteredPropertyInfos[i].SetValue(this, plaintext, null);
						break;
					case CryptoHelper.AddDataAction.Encrypt:
						filteredPropertyInfos[i].SetValue(this, ciphertext, null);
						break;
				}
			}
		}

		public void Encrypt()
		{
			CryptoHelper ch = new CryptoHelper();
			ch.Initialize(SecretKeyStorage.Instance.SecretKey);

			_AddProperties(false, ref ch);
			SecurEntityData = ch.ToString();
		}

		public void Decrypt()
		{
			CryptoHelper ch = new CryptoHelper(SecretKeyStorage.Instance.SecretKey, SecurEntityData);

			_AddProperties(true, ref ch);
			if (!ch.Verify())
			{
				throw new Exception("SecurEntity integrity verification failed.");
			}
		}

		public byte[] GetThumbprint(string columnValue)
		{
			return CryptoHelper.GetStringColumnValueThumbprint(
				SecretKeyStorage.Instance.SecretKey,
				columnValue,
				GetPrimaryKeyPropertyName());
		}
	}
}

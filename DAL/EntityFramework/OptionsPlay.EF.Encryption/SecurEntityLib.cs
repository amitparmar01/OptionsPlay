using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;

namespace OptionsPlay.EF.Encryption
{
	public static class SecurEntityHelper
	{
		private static string GetPrimaryKeyPropertyName(this ISecurEntity securEntity)
		{
			return "Id";
		}

		private static bool IsPropertyForThumbprint(PropertyInfo pi)
		{
			IEnumerable<Attribute> encryptAttributes = pi.GetCustomAttributes(typeof(EncryptAttribute));
			EncryptAttribute encryptAttribute = encryptAttributes.FirstOrDefault() as EncryptAttribute;

			if (encryptAttribute != null)
			{
				return encryptAttribute.IsThumbprint;
			}

			return false;
		}
		
		private static bool IsPropertyForEncryption(PropertyInfo pi)
		{
			return pi.PropertyType == typeof(string);
		}

		private static bool IsPropertyForIntegrity(ISecurEntity securEntity, PropertyInfo pi)
		{
			if (string.Equals(pi.Name, "SecurEntityId", StringComparison.InvariantCultureIgnoreCase))
			{
				return true;
			}

			if (pi.Name.EndsWith("Id", StringComparison.InvariantCultureIgnoreCase))
			{
				return false;
			}

			if (string.Equals(pi.Name, "SecurEntityData", StringComparison.InvariantCultureIgnoreCase))
			{
				return false;
			}

			if (string.Equals(pi.Name, "SecurEntityThumbprint", StringComparison.OrdinalIgnoreCase))
			{
				return true;
			}

			if (string.Equals(pi.Name, GetPrimaryKeyPropertyName(securEntity), StringComparison.InvariantCultureIgnoreCase))
			{
				return false;
			}

			if (pi.PropertyType.IsGenericType)
			{
				return false;
			}

			IEnumerable<Attribute> encryptAttributes = pi.GetCustomAttributes(typeof(EncryptAttribute));
			EncryptAttribute encryptAttribute = encryptAttributes.FirstOrDefault() as EncryptAttribute;

			if (encryptAttribute != null)
			{
				Type propertyType = pi.PropertyType;

				if (propertyType == typeof(DateTime)
					|| propertyType == typeof(string)
					|| propertyType == typeof(int)
					|| propertyType == typeof(uint)
					|| propertyType == typeof(ISecurEntity))
				{
					return true;
				}
			}

			return false;
		}

		private static int ComparePropertyInfos(PropertyInfo pi1, PropertyInfo pi2)
		{
			int comparePropertyInfos = string.Compare(pi1.Name, pi2.Name, StringComparison.InvariantCulture);
			return comparePropertyInfos;
		}

		private static void CheckSecurEntityID(bool read, ISecurEntity se)
		{
			if (!read)
			{
				long pk = Convert.ToInt64(se.GetType().GetProperty(se.GetPrimaryKeyPropertyName()).GetValue(se, null));

				if (pk == 0)
				{
					//
					// N.B. - this library assumes that the Primary Key of any 
					// SecurEntityHelper is of type int. However, since that value
					// is generated automatically by SQL the first time the 
					// object/row is written, it can't be used in the hash
					// computation. 
					//
					// Instead, this GUID property is used in order to support
					// the cryptographic binding of relationships between 
					// SecurEntityHelper objects.
					//

					if (se.SecurEntityId == Guid.Empty)
					{
						se.SecurEntityId = Guid.NewGuid();
					}
				}
			}
			else if (se.SecurEntityId == Guid.Empty)
			{
				throw new Exception("SecurEntityHelper integrity verification failed.");
			}
		}

		private static void AddProperties(
			ISecurEntity securEntity,
			bool read,
			ref CryptoHelper ch)
		{
			PropertyInfo[] sourcePropertyInfos = securEntity.GetType().GetProperties(BindingFlags.Instance | BindingFlags.Public);
			List<PropertyInfo> filteredPropertyInfos = new List<PropertyInfo>();

			//
			// Check if this appears to be a brand new object
			//

			CheckSecurEntityID(read, securEntity);

			//
			// Filter out the unsupported property types
			//

			foreach (PropertyInfo propertyInfo in sourcePropertyInfos)
			{
				if (IsPropertyForIntegrity(securEntity, propertyInfo))
				{
					filteredPropertyInfos.Add(propertyInfo);
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
				object o = filteredPropertyInfos[i].GetValue(securEntity, null);

				ISecurEntity se = o as ISecurEntity;
				if (se != null)
				{
					CheckSecurEntityID(read, se);
					bw.Write(se.SecurEntityId.ToString());
				}
				else
				{
					bw.Write(o == null ? string.Empty : o.ToString());
				}
				bw.Close();

				//
				// Determine whether to encrypt, decrypt, or neither
				//

				string plaintext = null;
				string ciphertext = null;
				CryptoHelper.AddDataAction action;
				if (IsPropertyForEncryption(filteredPropertyInfos[i]))
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

				if (IsPropertyForThumbprint(filteredPropertyInfos[i]))
				{
					string columnStringValue = o as string;
					if (!string.IsNullOrEmpty(columnStringValue))
					{
						securEntity.SecurEntityThumbprint = securEntity.GetThumbprint(columnStringValue);
					}
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
						filteredPropertyInfos[i].SetValue(securEntity, plaintext, null);
						break;
					case CryptoHelper.AddDataAction.Encrypt:
						filteredPropertyInfos[i].SetValue(securEntity, ciphertext, null);
						break;
				}
			}
		}

		public static void Encrypt(this ISecurEntity entity)
		{
			CryptoHelper ch = new CryptoHelper();
			ch.Initialize(SecretKeyStorage.Instance.SecretKey);

			AddProperties(entity, false, ref ch);
			entity.SecurEntityData = ch.ToString();
		}

		public static void Decrypt(this ISecurEntity entity)
		{
			CryptoHelper ch =
				new CryptoHelper(SecretKeyStorage.Instance.SecretKey, entity.SecurEntityData);

			AddProperties(entity, true, ref ch);
			if (ch.Verify() == false)
			{
				throw new Exception("SecurEntityHelper integrity verification failed.");
			}
		}

		public static byte[] GetThumbprint(this ISecurEntity securEntity, string columnValue)
		{
			return CryptoHelper.GetStringColumnValueThumbprint(
				SecretKeyStorage.Instance.SecretKey,
				columnValue,
				GetPrimaryKeyPropertyName(securEntity));
		}
	}
}

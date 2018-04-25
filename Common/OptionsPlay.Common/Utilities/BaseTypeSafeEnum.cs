using System;
using System.Collections.Generic;
using System.Reflection;
using OptionsPlay.Resources;

namespace OptionsPlay.Common.Utilities
{
	public abstract class BaseTypeSafeEnum 
	{
		private static readonly Dictionary<Type, Dictionary<string, object>> NameToEnumMap = new Dictionary<Type, Dictionary<string, object>>();
		private readonly string _name;

		protected BaseTypeSafeEnum(Type t, string name)
		{
			_name = name;
			if (!NameToEnumMap.ContainsKey(t))
			{
				NameToEnumMap[t] = new Dictionary<string, object>();
			}
			if (NameToEnumMap[t].ContainsKey(name))
			{
				throw new InvalidOperationException(ErrorMessages.DoubleEnumDeclaration);
			}
			NameToEnumMap[t][name] = this;
		}

		public static object Parse(string name, Type enumType)
		{
			EnsureInitialised(enumType);
			object result;
			if(!NameToEnumMap[enumType].TryGetValue(name, out result))
			{
				throw new FormatException(string.Format(ErrorMessages.InvalidEnumValue, name, enumType.Name));
			}

			return result;
		}

		public static bool TryParse(string name, Type enumType, out object result)
		{
			EnsureInitialised(enumType);
			bool isSuccess = NameToEnumMap[enumType].TryGetValue(name, out result);
			return isSuccess;
		}

		public override string ToString()
		{
			return _name;
		}

		// HACK: If we try to access static member through reflection first time it is not initialized by CLR. 
		// CLR initializes static fields on first access to any static member. We simulate this trying to get value for any public static field.
		private static void EnsureInitialised(Type enumType)
		{
			FieldInfo[] fields = enumType.GetFields(BindingFlags.Public | BindingFlags.Static);
			if (fields.Length > 0)
			{
				fields[0].GetValue(null);
			}
		}
	}

	/// <summary>
	/// Base class for custom Enum implementation.
	/// Provides custom string representation, display name and mapping from string to custom enum.
	/// //todo: add parsing from display name
	/// </summary>
	/// <typeparam name="T">Type of the internal value (for ordinary enums it should be some value type (e.g. int, byte etc.) )</typeparam>
	/// <typeparam name="TParent">Type of the enum itself (should be a base type of this class)</typeparam>
	public abstract class BaseTypeSafeEnum<T, TParent> : BaseTypeSafeEnum where TParent : BaseTypeSafeEnum<T, TParent>
	{
		private readonly T _internalCode;

		private readonly string _displayName;

		protected BaseTypeSafeEnum(T internalCode) 
			: this(internalCode, internalCode.ToString())
		{
		}

		protected BaseTypeSafeEnum(T internalCode, string name)
			: this(internalCode, name, name)
		{
		}

		protected BaseTypeSafeEnum(T internalCode, string name, string displayName): base(typeof(TParent), name)
		{
			_internalCode = internalCode;
			_displayName = displayName;
		}

		public string DisplayName
		{
			get
			{
				return _displayName;
			}
		}

		public T InternalValue
		{
			get
			{
				return _internalCode;
			}
		}

		public static TParent Parse(string name)
		{
			TParent result = (TParent)Parse(name, typeof(TParent));
			return result;
		}

		public static bool TryParse(string name, out TParent result)
		{
			object objectResult;
			bool isSuccess = TryParse(name, typeof(TParent), out objectResult);
			result = (TParent)objectResult;
			return isSuccess;
		}
	}
}
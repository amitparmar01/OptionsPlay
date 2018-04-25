using System;
using Newtonsoft.Json;

namespace OptionsPlay.Common.ObjectJsonSerialization
{
	public static class ObjectJsonSerializationHelper
	{
		/// <summary>
		/// Resolves value type from <paramref name="setting"/>.
		/// </summary>
		public static Type GetValueType(this ISerealizedValueTypeProvider setting)
		{
			Type result = Type.GetType(setting.SettingTypeString);
			return result;
		}

		/// <exception cref="ArgumentException"></exception>
		/// <exception cref="JsonReaderException"></exception>
		public static object GetValue(this ISerealizedValueTypeProvider configSetting)
		{
			if (configSetting.ValueString == null)
			{
				return null;
			}

			Type type = configSetting.GetValueType();
			object result = JsonConvert.DeserializeObject(configSetting.ValueString, type);
			return result;
		}

		public static bool TryGetValue(this ISerealizedValueTypeProvider configSetting, out object result)
		{
			if (configSetting.ValueString == null)
			{
				result = null;
				return true;
			}

			bool hasError = false;
			JsonSerializerSettings serializerSettings = new JsonSerializerSettings
			{
				Error = (sender, args) => hasError = true
			};

			Type type = configSetting.GetValueType();
			result = JsonConvert.DeserializeObject(configSetting.ValueString, type, serializerSettings);
			return hasError;
		}

		/// <exception cref="ArgumentException"></exception>
		/// <exception cref="JsonReaderException"></exception>
		public static T GetValue<T>(this ISerealizedValueTypeProvider configSetting)
		{
			T result = (T)configSetting.GetValue();
			return result;
		}

		public static void SetValue(this ISerealizedValueTypeProvider configSetting, object value, Type type = null)
		{
			if (value == null)
			{
				configSetting.ValueString = null;
				return;
			}

			configSetting.ValueString = SerializeForConfiguration(value);
			type = type ?? value.GetType();
			configSetting.SettingTypeString = GetTypeNameForConfiguration(type);
		}

		public static string SerializeForConfiguration(object value)
		{
			string result = JsonConvert.SerializeObject(value);
			return result;
		}

		public static string GetTypeNameForConfiguration(object value)
		{
			return GetTypeNameForConfiguration(value.GetType());
		}

		public static string GetTypeNameForConfiguration(Type type)
		{
			if (type.Namespace != null && type.Namespace.StartsWith("System"))
			{
				return type.FullName;
			}
			return type.AssemblyQualifiedName;
		}
	}
}

using System;
using System.Collections.Generic;

namespace OptionsPlay.Model.Enums
{
	/// <summary>
	/// Do not modify values. You should add new entry to CacheStatuses table if you add new enum value.
	/// </summary>
	public enum CacheEntity
	{
		SecurityInformation = 1,
		OptionBasicInformation = 2,
	}

	public static class CacheEntityMap
	{
		private static readonly Dictionary<Type, CacheEntity> TypeMap = new Dictionary<Type, CacheEntity>
		{
			{ typeof (OptionBasicInformationCache), CacheEntity.OptionBasicInformation },
			{ typeof (SecurityInformationCache), CacheEntity.SecurityInformation },
		};

		public static CacheEntity GetEntityTypeForDBEntity<T>()
		{
			Type type = typeof (T);
			if (!TypeMap.ContainsKey(type))
			{
				throw new InvalidOperationException(string.Format("Type {0} is not registered to be DB cached", type.Name));
			}
			CacheEntity result = TypeMap[type];
			return result;
		}
	}
}
using System;
using System.Collections.Generic;
using System.Data;
using System.Globalization;
using System.Linq;
using System.Reflection;
using System.Runtime.ExceptionServices;
using Fasterflect;
using OptionsPlay.Common.Utilities;
using OptionsPlay.DAL.SZKingdom.Common.Entities;
using OptionsPlay.DAL.SZKingdom.Common.Enums;
using OptionsPlay.Resources;

namespace OptionsPlay.DAL.SZKingdom.DataProvider
{
	internal static class SZKingdomMappingHelper
	{
		/// <summary>
		/// Date format used in SZKingdom lib
		/// </summary>
		public const string SZKingdomDateFormat = "yyyyMMdd";

		/// <summary>
		/// Date Time format used in SZKingdom lib
		/// </summary>
		public const string SZKingdomDateTimeFormat = "yyyy-MM-dd HH:mm:ss.fff";

		/// <summary>
		/// Date Time format used for time format "hhmmss"
		/// </summary>
		public const string SZKingdomTimeFormat = "HHmmss";

		private static readonly Dictionary<Type, List<Tuple<string, PropertyInfo>>> Cache
			= new Dictionary<Type, List<Tuple<string, PropertyInfo>>>();

		private static readonly Dictionary<Type, Func<string, object>> ParsingFunctions
			= new Dictionary<Type, Func<string, object>>();

		private const char Separator = ',';

		static SZKingdomMappingHelper()
		{
			// place custom parsing functions here
			ParsingFunctions[typeof(List<StockBusinessAction>)] = s => s.Split(Separator).Select(StockBusinessAction.Parse).ToList();
			ParsingFunctions[typeof(DateTime)] = s => ParseDate(s);
		}

		public static List<T> ReadEntitiesFromTable<T>(DataTable table) where T : new()
		{
			List<T> result = new List<T>();
			foreach (DataRow row in table.Rows)
			{
				result.Add(ReadEntityFromRow<T>(row));
			}

			return result;
		}

		public static T ReadEntityFromRow<T>(DataRow row) where T : new()
		{
			Type tType = typeof(T);
			List<Tuple<string, PropertyInfo>> properties = GetSZKingdomProperties(tType);
			T result = new T();

			foreach (Tuple<string, PropertyInfo> property in properties)
			{
				string stringValue = (string)row[property.Item1];

				if (!string.IsNullOrEmpty(stringValue))
				{
					stringValue = stringValue.Trim();
				}

				property.Item2.SetValue(result, ConvertValue(stringValue, property.Item2.PropertyType));
			}

			return result;
		}

		public static List<Tuple<string, PropertyInfo>> GetSZKingdomProperties(Type t)
		{
			if (Cache.ContainsKey(t))
			{
				return Cache[t];
			}

			HashSet<string> definedFields = new HashSet<string>();
			List<Tuple<string, PropertyInfo>> result = new List<Tuple<string, PropertyInfo>>();
			PropertyInfo[] allProperties = t.GetProperties();
			foreach (PropertyInfo propertyInfo in allProperties)
			{
				SZKingdomField fieldAttribute = (SZKingdomField)propertyInfo.GetCustomAttributes(typeof(SZKingdomField), true).Single();
				if (!definedFields.Add(fieldAttribute.FieldName))
				{
					throw new InvalidOperationException(string.Format(ErrorMessages.SZKingdom_DublicateProperty, fieldAttribute.FieldName, propertyInfo.Name));
				}
				result.Add(Tuple.Create(fieldAttribute.FieldName, propertyInfo));
			}

			Cache[t] = result;
			return result;
		}

		private static object ConvertValue(string value, Type type)
		{
			object result;
			if (type == typeof(string))
			{
				return value;
			}

			if (string.IsNullOrWhiteSpace(value))
			{
				return null;
			}

			if (ParsingFunctions.ContainsKey(type))
			{
				result = ParsingFunctions[type](value);
				return result;
			}

			Func<string, object> f = GetParseFunction(type);
			if (f == null)
			{
				return null;
			}

			ParsingFunctions[type] = f;
			result = f(value);
			return result;
		}

		private static Func<string, object> GetParseFunction(Type typeToParseTo)
		{
			if (typeof(BaseTypeSafeEnum).IsAssignableFrom(typeToParseTo))
			{
				return s => BaseTypeSafeEnum.Parse(s, typeToParseTo);
			}

			Type nullableUnderlying = Nullable.GetUnderlyingType(typeToParseTo);
			if (nullableUnderlying != null)
			{
				Func<string, object> func = GetParseFunction(nullableUnderlying);
				return s => TryConvert(s, func);
			}

			MethodInvoker methodDelegate = typeToParseTo.DelegateForCallMethod("Parse", typeof (string) );
			return s => UnwrapInvokeExceptionOfStaticMethod(methodDelegate, new object[] { s });
		}

		private static object UnwrapInvokeExceptionOfStaticMethod(MethodInvoker inf, object[] arguments)
		{
			try
			{
				return inf(null, arguments);
			}
			catch (TargetInvocationException ex)
			{
				ExceptionDispatchInfo.Capture(ex.InnerException).Throw();
			}
			return null;
		}

		private static object TryConvert(string value, Func<string, object> converter)
		{
			if (converter == null)
			{
				return null;
			}

			try
			{
				object result = converter(value);
				return result;
			}
			catch (FormatException)
			{
				return null;
			}
		}

		private static DateTime ParseDate(string value)
		{
			DateTime dateTime;
			string dateFormat = SZKingdomDateFormat;
			if (value.Length == SZKingdomDateTimeFormat.Length)
			{
				dateFormat = SZKingdomDateTimeFormat;
			}
			else if (value.Length <= SZKingdomTimeFormat.Length)
			{
				dateFormat = SZKingdomTimeFormat;
				int noOfZero = SZKingdomTimeFormat.Length - value.Length;
				for (int i = 0; i < noOfZero; i++) { value = value.Insert(0, "0"); }
			}
			bool parseResult = DateTime.TryParseExact(value, dateFormat, null, DateTimeStyles.None, out dateTime);
			if (!parseResult)
			{
				string errorMessage = string.Format(ErrorMessages.InvalidDateDormat, value, dateFormat);
				throw new FormatException(errorMessage);
			}
			return dateTime;
		}
	}
}
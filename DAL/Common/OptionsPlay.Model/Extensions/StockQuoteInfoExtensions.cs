using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using OptionsPlay.Common.Utilities;
using OptionsPlay.Model.Attributes;

namespace OptionsPlay.Model.Extensions
{
	public static class StockQuoteInfoExtensions
	{
		private static readonly List<PropertyInfo> SignificantProperties = new List<PropertyInfo>();

		static StockQuoteInfoExtensions()
		{
			PropertyInfo[] props = typeof(StockQuoteInfo).GetProps();
			foreach (PropertyInfo prop in props)
			{
				object attribute = prop.GetCustomAttributes(true).SingleOrDefault(m => m.GetType() == typeof(DbfFileMapAttribute));
                //if (attribute != null)
                //{
                    SignificantProperties.Add(prop);
                //}
			}
		}

		public static bool IsEquals(this StockQuoteInfo stockQuote1, StockQuoteInfo stockQuote2)
		{
			foreach (PropertyInfo significantProperty in SignificantProperties)
			{
				object value1 = significantProperty.GetValue(stockQuote1);
				object value2 = significantProperty.GetValue(stockQuote2);
				if ((value1 == null && value2 != null) 
					|| (value1 != null && value2 == null) 
					|| (value1 != null && !value1.Equals(value2)))
				{
					return false;
				}
			}
			return true;
		}
	}
}

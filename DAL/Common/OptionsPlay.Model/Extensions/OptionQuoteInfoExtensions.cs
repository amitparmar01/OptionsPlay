using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using OptionsPlay.Common.Utilities;
using OptionsPlay.Model.Attributes;

namespace OptionsPlay.Model.Extensions
{
	public static class OptionQuoteInfoExtensions
	{
		private static readonly List<PropertyInfo> SignificantProperties = new List<PropertyInfo>();

		static OptionQuoteInfoExtensions()
		{
			PropertyInfo[] props = typeof(OptionQuoteInfo).GetProps();
			foreach (PropertyInfo prop in props)
			{
				object attribute = prop.GetCustomAttributes(true).SingleOrDefault(m => m.GetType() == typeof(TxtFileMapAttribute));
				if (attribute != null)
				{
					SignificantProperties.Add(prop);
				}
			}
			SignificantProperties.Remove(typeof (OptionQuoteInfo).GetProperty("TradeDate"));
		}

		public static bool IsEquals(this OptionQuoteInfo optionQuote1, OptionQuoteInfo optionQuote2)
		{
			foreach (PropertyInfo significantProperty in SignificantProperties)
			{
				if (!significantProperty.GetValue(optionQuote1).Equals(significantProperty.GetValue(optionQuote2)))
				{
					return false;
				}
			}
			return true;
		}
	}
}

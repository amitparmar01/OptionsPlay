using System;
using System.Linq.Expressions;
using System.Reflection;

namespace OptionsPlay.Common.Utilities
{
	public static class ReflectionExtensions
	{
		public static PropertyInfo[] GetProps(this Type type)
		{
			// get only props from declared type (not props from inherited classes)
			PropertyInfo[] props = type.GetProperties(BindingFlags.Public | BindingFlags.Instance | BindingFlags.DeclaredOnly);
			return props;
		}
		public static string GetPropertyName<T>(Expression<Func<T, object>> property)
		{
			PropertyInfo propertyInfo = GetProperty(property);
			return propertyInfo.Name;
		}

		public static PropertyInfo GetProperty<T>(Expression<Func<T, object>> property)
		{
			if (property == null)
			{
				throw new ArgumentNullException("property");
			}

			PropertyInfo info = GetMemberInfo(property) as PropertyInfo;
			if (info == null)
			{
				throw new ArgumentException(string.Format("{0} is not a property", property.Name));
			}

			return info;
		}

		private static MemberInfo GetMemberInfo(Expression member)
		{
			LambdaExpression lambdaExpression = member as LambdaExpression;
			if (lambdaExpression == null)
			{
				throw new ArgumentException("Invalid expression.");
			}

			MemberExpression memberExpr = null;
			switch (lambdaExpression.Body.NodeType)
			{
				case ExpressionType.Convert:
					memberExpr = ((UnaryExpression)lambdaExpression.Body).Operand as MemberExpression;
					break;
				case ExpressionType.MemberAccess:
					memberExpr = lambdaExpression.Body as MemberExpression;
					break;
			}

			if (memberExpr == null)
			{
				throw new ArgumentException("Invalid member access.");
			}

			return memberExpr.Member;
		}
	}
}

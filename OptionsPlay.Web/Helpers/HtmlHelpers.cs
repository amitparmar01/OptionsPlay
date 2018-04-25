using System;
using System.Linq.Expressions;
using System.Web.Mvc;
using System.Web.Mvc.Html;

namespace OptionsPlay.Web.Helpers
{
	public static class HtmlHelpers
	{
		/// <summary>
		/// Renders partial view with prefix from the parent view
		/// </summary>
		public static void RenderPartialFor<TModel, TProperty>(this HtmlHelper<TModel> htmlHelper, Expression<Func<TModel, TProperty>> expression, string partialViewName)
		{
			object model = ModelMetadata.FromLambdaExpression(expression, htmlHelper.ViewData).Model;

			string htmlFieldPrefix = ExpressionHelper.GetExpressionText(expression);
			ViewDataDictionary viewData = new ViewDataDictionary
			{
				TemplateInfo = new TemplateInfo
				{
					HtmlFieldPrefix = htmlFieldPrefix
				}
			};

			htmlHelper.RenderPartial(partialViewName, model, viewData);
		}
	}
}
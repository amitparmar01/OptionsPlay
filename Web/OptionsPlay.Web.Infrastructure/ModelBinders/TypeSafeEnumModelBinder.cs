using System.Web.Http.Controllers;
using System.Web.Http.ModelBinding;
using System.Web.Http.ValueProviders;
using OptionsPlay.Common.Utilities;

namespace OptionsPlay.Web.Infrastructure.ModelBinders
{
	public class TypeSafeEnumModelBinder : IModelBinder
	{
		public bool BindModel(HttpActionContext actionContext, ModelBindingContext bindingContext)
		{
			if (!typeof (BaseTypeSafeEnum).IsAssignableFrom(bindingContext.ModelType))
			{
				return false;
			}

			ValueProviderResult value = bindingContext.ValueProvider.GetValue(bindingContext.ModelName);
			if (value == null || string.IsNullOrEmpty(value.AttemptedValue))
			{
				return false;
			}

			object model;
			if(!BaseTypeSafeEnum.TryParse(value.AttemptedValue, bindingContext.ModelType, out model))
			{
				return false;
			}
			bindingContext.Model = model;
			return true;
		}
	}
}
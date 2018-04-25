using System.Linq;
using System.Web.Http.Controllers;
using System.Web.Http.ModelBinding;
using System.Web.Http.ValueProviders;

namespace OptionsPlay.Web.Infrastructure.ModelBinders
{
	public class CommaSeparatedStringToListModelBinder : IModelBinder
	{
		public bool BindModel(HttpActionContext actionContext, ModelBindingContext bindingContext)
		{
			ValueProviderResult value = bindingContext.ValueProvider.GetValue(bindingContext.ModelName);
			if (value == null || string.IsNullOrEmpty(value.AttemptedValue))
			{
				return false;
			}

			bindingContext.Model = value.AttemptedValue.Split(',').ToList();
			return true;
		}
	}
}

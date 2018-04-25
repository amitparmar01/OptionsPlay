using AutoMapper;
using OptionsPlay.Common.Utilities;

namespace OptionsPlay.Web.ViewModels.Providers
{
	public class TypeSafeEnumConverter<T> : ITypeConverter<string, T> where T : BaseTypeSafeEnum
	{
		public T Convert(ResolutionContext context)
		{
			if (context.SourceValue == null)
			{
				return null;
			}
			T result = (T)BaseTypeSafeEnum.Parse((string)context.SourceValue, context.DestinationType);
			return result;
		}
	}
}
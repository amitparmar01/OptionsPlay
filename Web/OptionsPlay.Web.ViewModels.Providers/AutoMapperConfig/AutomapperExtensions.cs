using System;
using System.Linq;
using AutoMapper;
using OptionsPlay.Common.ServiceResponses;

namespace OptionsPlay.Web.ViewModels.Providers
{
	public static class AutomapperExtensions
	{
		/// <summary>
		/// WARN: Use this extension carefully. It might hide bugs in viewmodel on in conversion logic.
		/// </summary>
		public static IMappingExpression<TSource, TDestination> IgnoreAllNonExisting<TSource, TDestination>(this IMappingExpression<TSource, TDestination> expression)
		{
			Type sourceType = typeof(TSource);
			Type destinationType = typeof(TDestination);
			TypeMap existingMaps = Mapper.GetAllTypeMaps().First(x => x.SourceType == sourceType && x.DestinationType == destinationType);
			foreach (string property in existingMaps.GetUnmappedPropertyNames())
			{
				expression.ForMember(property, opt => opt.Ignore());
			}
			return expression;
		}

		public static IMappingExpression<TSrc, TDest> IncludeEntityResponse<TSrc, TDest>(this IMappingExpression<TSrc, TDest> expression)
		{
			Mapper.CreateMap<IEntityResponse<TSrc>, EntityResponse<TDest>>().ConvertUsing(response =>
			{
				if (!response.IsSuccess)
				{
					return EntityResponse<TDest>.Error(response);
				}

				return Mapper.Map<TDest>(response.Entity);
			});

			return expression;
		}
	}
}
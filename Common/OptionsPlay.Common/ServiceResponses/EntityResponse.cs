using System;
using OptionsPlay.Common.Exceptions;

namespace OptionsPlay.Common.ServiceResponses
{
	public class EntityResponse : BaseResponse, IEntityResponse
	{
		protected EntityResponse(ErrorCode code, string formattedMessage)
			: base(code, formattedMessage)
		{
			Entity = null;
		}

		protected EntityResponse(object entity)
		{
			Entity = entity;
		}

		#region Implementation of IEntityResponse

		public object Entity { get; private set; }

		#endregion
	}

	public class EntityResponse<T> : EntityResponse, IEntityResponse<T>
	{
		protected EntityResponse(ErrorCode code, string formattedMessage)
			: base(code, formattedMessage)
		{

		}

		protected EntityResponse(T entity)
			: base(entity)
		{
			Entity = entity;
		}

		public new T Entity { get; private set; }

		public static EntityResponse<T> Success(T entity)
		{
			EntityResponse<T> result = new EntityResponse<T>(entity);
			return result;
		}

		public static EntityResponse<T> Error(IResponse errorResponce)
		{
			if (errorResponce.IsSuccess)
			{
				throw new InvalidOperationException("The response given should contain error");
			}

			EntityResponse<T> result = new EntityResponse<T>(errorResponce.ErrorCode, errorResponce.FormattedMessage);
			return result;
		}

		public new static EntityResponse<T> Error(ErrorCode errorCode, string formattedmessage = null)
		{
			EntityResponse<T> result = new EntityResponse<T>(errorCode, formattedmessage);
			return result;
		}

		public static implicit operator T(EntityResponse<T> entityResponse)
		{
			if (entityResponse.ErrorCode != ErrorCode.None)
			{
				throw new InternalException(entityResponse);
			}
			return entityResponse.Entity;
		}

		public static implicit operator EntityResponse<T>(ErrorCode code)
		{
			EntityResponse<T> result = Error(code);
			return result;
		}

		public static implicit operator EntityResponse<T>(T t)
		{
			EntityResponse<T> result = Success(t);
			return result;
		}
	}
}

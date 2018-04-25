using System;
using System.Linq;
using System.Reflection;
using Fasterflect;
using OptionsPlay.Cache.Configuration;
using OptionsPlay.Cache.Core;
using OptionsPlay.Common.ServiceResponses;
using PostSharp;
using PostSharp.Aspects;
using PostSharp.Extensibility;
using StructureMap;

namespace OptionsPlay.Aspects
{
	[Serializable]
	public class CacheAttribute : MethodInterceptionAspect
	{
		private string _methodFullName;
		private bool _isEntityResponse;
		private TimeSpan _slidingExpiration;

		[NonSerialized]
		private ICache _cache;

		[NonSerialized]
		private MethodInvoker _createEntityResponseDelegate;

		[NonSerialized]
		private object _syncRoot;

		#region Public

		public CacheAttribute()
		{
			CacheExpirationInSeconds = -1;
		}

		/// <summary>
		/// Set this value if values should be cached using per-symbol basis. 
		/// In this case method, which is market by this attribute, should take the list of symbols as first parameter 
		/// and returns a list of entities of some type. NOTE: Both lists should match by number and position of entities
		/// e.g. you requested [a, b, c]. In this case result should contain [ExpandedQuote for a, ExpandedQuote for b, ExpandedQuote for c].
		/// You also should register appropriate <see cref="ICache"/> implementation in structure map container
		/// </summary>
		public Type SymbolBasedEntityType { get; set; }

		/// <summary>
		/// Values less than 0 stands for default expiration. 0 - no expiration
		/// </summary>
		public int CacheExpirationInSeconds { get; set; }

		/// <summary>
		/// If this method is set, cache can be ignored if the last bool parameter of intercepted method is false.
		/// </summary>
		public bool IsIgnorable { get; set; }

		public override bool CompileTimeValidate(MethodBase method)
		{
			if (IsIgnorable)
			{
				ParameterInfo lastParam = method.GetParameters().Last();
				if (lastParam.ParameterType != typeof(bool))
				{
					Message.Write(MessageLocation.Of(method), SeverityType.Error, "CUSTOM03",
						String.Format("Method '{0}' must have the last parameter of bool type if IsIgnorable flag is set", method.Name));
					return false;
				}
			}

			return base.CompileTimeValidate(method);
		}

		public override void CompileTimeInitialize(MethodBase method, AspectInfo aspectInfo)
		{
			_methodFullName = string.Format("{0}.{1}", method.ReflectedType, method.Name);

			MethodInfo methodInfo = (MethodInfo)method;

			_isEntityResponse = typeof(EntityResponse).IsAssignableFrom(methodInfo.ReturnType);

			base.CompileTimeInitialize(method, aspectInfo);
		}

		public override void RuntimeInitialize(MethodBase method)
		{
			base.RuntimeInitialize(method);
			_syncRoot = new object();

			_cache = SymbolBasedEntityType == null
				? ObjectFactory.GetInstance<ICache>()
				: ObjectFactory.GetNamedInstance<ICache>(SymbolBasedEntityType.Name);

			int expirationInSeconds = CacheExpirationInSeconds < 0
				? CacheConfiguration.Configuration.DefaultDurationInSeconds
				: CacheExpirationInSeconds;

			_slidingExpiration = expirationInSeconds == 0
				? TimeSpan.Zero
				: TimeSpan.FromSeconds(expirationInSeconds);

			_createEntityResponseDelegate = null;
			if (_isEntityResponse)
			{
				MethodInfo methodInfo = (MethodInfo)method;
				Type entityType = methodInfo.ReturnType.GetGenericArguments()[0];
				Type genericType = (typeof(EntityResponse<>)).MakeGenericType(entityType);
				_createEntityResponseDelegate =
					genericType.DelegateForCallMethod("Success", Flags.StaticPublicDeclaredOnly, entityType);
			}
		}

		/// <summary>
		/// This method implements thread-safe access for cached objects. Double-checked locking is used.
		/// </summary>
		public override void OnInvoke(MethodInterceptionArgs args)
		{
			if (IsIgnorable && (bool)args.Arguments.Last())
			{
				base.OnInvoke(args);
				return;
			}

			KeyObject keyObject = new KeyObject(_methodFullName, args.Arguments);
			object valueFromCache = _cache.Get(keyObject);
			if (valueFromCache != null)
			{
				args.ReturnValue = GetReturnValue(valueFromCache);
				return;
			}

			lock (_syncRoot)
			{
				valueFromCache = _cache.Get(keyObject);
				if (valueFromCache != null)
				{
					args.ReturnValue = GetReturnValue(valueFromCache);
					return;
				}

				object methodResult = args.Invoke(args.Arguments);
				EntityResponse response = methodResult as EntityResponse;
				if (response == null)
				{
					_cache.Insert(keyObject, methodResult, _slidingExpiration);
				}
				else if (response.IsSuccess)
				{
					_cache.Insert(keyObject, response.Entity, _slidingExpiration);
				}
				args.ReturnValue = methodResult;
			}
		}

		private object GetReturnValue(object fromCache)
		{
			object wrappedResult = _createEntityResponseDelegate != null
				? _createEntityResponseDelegate(null, fromCache)
				: fromCache;
			return wrappedResult;
		}

		#endregion Public
	}
}

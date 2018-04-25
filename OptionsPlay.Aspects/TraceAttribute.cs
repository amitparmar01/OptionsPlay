using System;
using System.Diagnostics;
using System.Linq;
using System.Reflection;
using OptionsPlay.Common.Tracing;
using OptionsPlay.Logging;
using PostSharp.Aspects;

namespace OptionsPlay.Aspects
{
	/// <summary>
	/// Uses <see cref="ITraceManager"/> to trace method calls.
	/// Specify <see cref="TraceManagerImplementationName"/> to select any <see cref="ITraceManager"/> implementation you want.
	/// </summary>
	[Serializable]
	public class TraceAttribute : OnMethodBoundaryAspect, IInstanceScopedAspect
	{
		[Obfuscation(Exclude = true)]
		private string _methodFullName;

		[NonSerialized] 
		private Stopwatch _stopwatch;

		[NonSerialized]
		private ITraceManager _traceManager;

		/// <summary>
		/// Used to resolve <see cref="ITraceManager"/> dependency.
		/// </summary>
		public string TraceManagerImplementationName { get; set; }

		public override void CompileTimeInitialize(MethodBase method, AspectInfo aspectInfo)
		{
			_methodFullName = string.Format("{0}.{1}", method.ReflectedType, method.Name);

			base.CompileTimeInitialize(method, aspectInfo);
		}

		public override void OnEntry(MethodExecutionArgs args)
		{
			_stopwatch.Restart();
			TraceInfo traceInfo = new TraceInfo(_methodFullName, args.Arguments.ToArray());
			_traceManager.TraceStart(traceInfo);
			Logger.Debug(string.Format("{0} invoked.", traceInfo.Parameters[0]));
			base.OnEntry(args);
		}

		public override void OnSuccess(MethodExecutionArgs args)
		{
			base.OnSuccess(args);
			_stopwatch.Stop();
			TraceInfo traceinfo = new TraceInfo(_methodFullName, args.Arguments.ToArray());
			Logger.Debug(string.Format("{0} invoke ends in {1}ms", traceinfo.Parameters[0], _stopwatch.Elapsed.Milliseconds));
			_traceManager.TraceFinish(traceinfo, args.ReturnValue, _stopwatch.Elapsed);
		}

		public override void OnException(MethodExecutionArgs args)
		{
			_stopwatch.Stop();
			TraceInfo traceinfo = new TraceInfo(_methodFullName, args.Arguments.ToArray());
			_traceManager.TraceException(traceinfo, args.Exception, _stopwatch.Elapsed);
			Logger.Error(string.Format("{0} invoke exception {1} in {2}ms", traceinfo.Parameters[0], args.Exception, _stopwatch.Elapsed.Milliseconds));
			base.OnException(args);
		}

		public object CreateInstance(AdviceArgs adviceArgs)
		{
			return MemberwiseClone();
		}

		public void RuntimeInitializeInstance()
		{
			_traceManager = string.IsNullOrWhiteSpace(TraceManagerImplementationName)
				? StructureMap.ObjectFactory.GetInstance<ITraceManager>()
				: StructureMap.ObjectFactory.GetNamedInstance<ITraceManager>(TraceManagerImplementationName);
			_stopwatch = new Stopwatch();
		}
	}
}
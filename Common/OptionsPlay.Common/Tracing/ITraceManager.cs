using System;

namespace OptionsPlay.Common.Tracing
{
	public interface ITraceManager
	{
		void TraceStart(TraceInfo traceInfo);

		void TraceFinish(TraceInfo traceInfo, object result, TimeSpan duration);

		void TraceException(TraceInfo traceInfo, Exception exception, TimeSpan duration);
	}
}
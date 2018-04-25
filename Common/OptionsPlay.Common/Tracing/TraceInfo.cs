namespace OptionsPlay.Common.Tracing
{
	public class TraceInfo
	{
		public TraceInfo()
		{
		}

		public TraceInfo(string methodName, object[] parameters)
		{
			MethodName = methodName;
			Parameters = parameters;
		}

		public string MethodName { get; set; }

		public object[] Parameters { get; set; }
	}
}
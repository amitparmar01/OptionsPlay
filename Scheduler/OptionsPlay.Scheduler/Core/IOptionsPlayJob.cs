using Quartz;

namespace OptionsPlay.Scheduler.Core
{
	/// <summary>
	/// Base type for all jobs to be executed.
	/// </summary>
	public interface IOptionsPlayJob: IJob
	{
	}
}
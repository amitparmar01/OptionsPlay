using System;

namespace OptionsPlay.Common.Scheduler
{
	public interface IScheduler
	{
		IScheduledTask ScheduleTask(Action job, TimeSpan repeatInterval);
	}
}
using System;
using System.Collections.Generic;
using System.Threading;

namespace OptionsPlay.Common.Scheduler
{
	/// <summary>
	/// Has many implications in IIS env. Be careful when use this approach
	/// </summary>
	public class TimerBasedScheduler : IScheduler
	{
		private readonly List<IScheduledTask> _tasks = new List<IScheduledTask>();

		#region Implementation of IScheduler

		public IScheduledTask ScheduleTask(Action job, TimeSpan repeatInterval)
		{
			var task = new ScheduledTask(this, job, repeatInterval);
			_tasks.Add(task);
			return task;
		}

		#endregion

		private void RemoveTask(IScheduledTask task)
		{
			_tasks.Remove(task);
		}

		private class ScheduledTask : IScheduledTask
		{
			private readonly TimerBasedScheduler _parent;
			private readonly Action _job;
			private readonly Timer _timer;

			public ScheduledTask(TimerBasedScheduler parent, Action job, TimeSpan repeatInterval)
			{
				_parent = parent;
				_job = job;
				_timer = new Timer(Execute, null, repeatInterval, repeatInterval);
			}

			public void Stop()
			{
				_timer.Dispose();
				_parent.RemoveTask(this);
			}

			private void Execute(object o)
			{
				_job();
			}
		}
	}
}
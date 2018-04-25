using System;
using OptionsPlay.Common.Options;
using OptionsPlay.Logging;
using OptionsPlay.Resources;
using Quartz;

namespace OptionsPlay.Scheduler.Core
{
	/// <summary>
	/// Adds logging to <seealso cref="IOptionsPlayJob"/> and implements Quartz IJob interface.
	/// see <seealso cref="OptionsPlayJobFactory"/> for details.
	/// </summary>
	internal class QuartzCommonJob : IJob
	{
		private readonly IOptionsPlayJob _syrahJob;

		public QuartzCommonJob(IOptionsPlayJob syrahJob)
		{
			_syrahJob = syrahJob;
		}

		public IOptionsPlayJob SyrahJob
		{
			get { return _syrahJob; }
		}

		public void Execute(IJobExecutionContext context)
		{
			try
			{
				Logger.Debug(string.Format(LogMessages.Info_StartSchedulerJob, _syrahJob));
				_syrahJob.Execute(context);
				Logger.Debug(string.Format(LogMessages.Info_StopSchedulerJob, _syrahJob));
			}
			catch (Exception ex)
			{
				Logger.FatalError(string.Format(LogMessages.Error_FailedSchedulerJob, AppConfigManager.Environment, _syrahJob), ex);
			}
		}
	}
}
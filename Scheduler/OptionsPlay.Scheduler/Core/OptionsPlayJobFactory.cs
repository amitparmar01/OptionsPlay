using System;
using Quartz;
using Quartz.Spi;
using StructureMap;

namespace OptionsPlay.Scheduler.Core
{
	/// <summary>
	/// Custom Job factory. Use StructureMap to instanitate jobs. Should be set to IScheduler.JobFactory property.
	/// </summary>
	public class OptionsPlayJobFactory: IJobFactory
	{
		#region Implementation of IJobFactory

		public IJob NewJob(TriggerFiredBundle bundle, IScheduler scheduler)
		{
			try
			{
				IOptionsPlayJob syrahJob = (IOptionsPlayJob)ObjectFactory.GetInstance(bundle.JobDetail.JobType);
				QuartzCommonJob result = new QuartzCommonJob(syrahJob);
				return result;
			}
			catch (Exception e)
			{
				SchedulerException se = new SchedulerException("Problem instantiating class", e);
				throw se;
			}
		}

		public void ReturnJob(IJob job)
		{
			IDisposable disp = job as IDisposable;
			if (disp != null)
			{
				disp.Dispose();
			}
		}

		#endregion
	}
}
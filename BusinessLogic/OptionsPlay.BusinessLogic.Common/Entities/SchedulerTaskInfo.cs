using OptionsPlay.Model.Mongo.Scheduler;

namespace OptionsPlay.BusinessLogic.Common.Entities
{
	public class SchedulerTaskInfo
	{
		public SchedulerTask SchedulerTask { get; set; }

		public SchedulerQueue LastSchedulerQueue { get; set; }
		public SchedulerQueue PreviosSchedulerQueue { get; set; }
	}
}

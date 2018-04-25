using System;
using System.Collections.Generic;
using OptionsPlay.Model.Enums;

namespace OptionsPlay.Model.Mongo.Scheduler
{
	public class SchedulerQueue : BaseMongoEntity
	{
		public DateTime PlannedDate { get; set; }

		public DateTime? StartDate { get; set; }

		public DateTime? StopDate { get; set; }

		public SchedulerExecutionStatus Status { get; set; }

		public string Description { get; set; }

		public string Destination { get; set; }

		public SchedulerTaskType TaskType { get; set; }

		public List<SchedulerTaskType> Dependencies { get; set; }

		public long LockerMask { get; set; }
	}
}

using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using OptionsPlay.Model.Enums;

namespace OptionsPlay.Model.Mongo.Scheduler
{
	public class SchedulerTask : BaseMongoEntity
	{
		[MaxLength(255)]
		public string Name { get; set; }

		//http://www.cronmaker.com/
		[MaxLength(255)]
		public string CronExpression { get; set; }

		public string Description { get; set; }

		public string Destination { get; set; }

		public SchedulerTaskType Type { get; set; }

		public List<SchedulerTaskType> Dependencies { get; set; }

		public long LockerMask { get; set; }
	}
}

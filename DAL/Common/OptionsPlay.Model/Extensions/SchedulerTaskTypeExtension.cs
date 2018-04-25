using OptionsPlay.Model.Enums;

namespace OptionsPlay.Model.Extensions
{
	public static class SchedulerTaskTypeExtension
	{
		public static long GetLockerMask(this SchedulerTaskType schedulerTaskType)
		{
			long mask = 0x0000000000000001 << (int)schedulerTaskType;
			return mask;
		}
	}
}

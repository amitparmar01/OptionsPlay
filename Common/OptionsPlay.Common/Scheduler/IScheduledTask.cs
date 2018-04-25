namespace OptionsPlay.Common.Scheduler
{
	public interface IScheduledTask
	{
		/// <summary>
		/// Stops this task from being executed by schedule. 
		/// Reference to this object should be removed to allow it being GCed
		/// Note that callbacks can occur after this method is called.
		/// </summary>
		void Stop();
	}
}
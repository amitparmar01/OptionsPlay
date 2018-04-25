using System.ServiceProcess;

namespace OptionsPlay.Scheduler.WinService
{
	static class Program
	{
		/// <summary>
		/// The main entry point for the application.
		/// </summary>
		static void Main()
		{
			ServiceBase[] servicesToRun =
				{ 
					new SchedulerService()
				};
			ServiceBase.Run(servicesToRun);
		}
	}
}

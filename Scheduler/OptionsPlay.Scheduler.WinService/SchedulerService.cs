using System.ServiceProcess;
using OptionsPlay.Logging;

namespace OptionsPlay.Scheduler.WinService
{
	partial class SchedulerService : ServiceBase
	{
		public SchedulerService()
		{
			InitializeComponent();
		}

		protected override void OnStart(string[] args)
		{
			Logger.Debug("SchedulerService Started");
            SchedulerManager.Instance.Initialize();
            Logger.Debug("RealTimePopulateThread Started");
            MarketDataPopulationService.Instance.Start();
          
		}

		protected override void OnStop()
		{
			Logger.Debug("SchedulerService Stopped");
		}
	}
}

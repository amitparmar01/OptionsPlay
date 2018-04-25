using System.Collections.Generic;

namespace OptionsPlay.Common.Options
{
	public static partial class AppConfigManager
	{
		public static List<string> HealthNotificationsRecipients
		{
			get
			{
				List<string> result = ExtractEmails("HealthNotificationsRecipients");
				return result;
			}
		}

		public static int CyclesBeforeChange
		{
			get
			{
				int result = GetValueFromConfig<int>("CyclesBeforeChange");
				return result;
			}
		}

		public static int HealthCheckerTimerPeriodInSeconds
		{
			get
			{
				int result = GetValueFromConfig<int>("HealthCheckerTimerPeriodInSeconds");
				return result;
			}
		}
	}
}

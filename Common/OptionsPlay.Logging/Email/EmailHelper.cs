using System;
using System.Configuration;

namespace OptionsPlay.Logging.Email
{
	internal static class EmailHelper
	{
		public static void FatalError(Exception ex)
		{
			string emailsString = ConfigurationManager.AppSettings["FatalErrorsRecipients"];
			string[] emails = emailsString.Split(new[] { "|" }, StringSplitOptions.RemoveEmptyEntries);

			string applicationType = ConfigurationManager.AppSettings["ApplicationType"];

			if (emails.Length > 0 && !string.IsNullOrWhiteSpace(applicationType))
			{
				string subject = string.Format("Fatal Error in {0}", applicationType);
				const string body = @"
						<html>
							<head>
							</head>
							<body>
								<div>
									<b>Machine Name:</b>
									<br/>
									{0}
								</div>
								<div>
									<b>Short Message:</b>
									<br/>
									{1}
								</div>
								<br/>
								<div>
									<b>Inner Exception:</b>
									<br/>
									{2}
								</div>
								<br/>
								<div>
									<b>Stack Trace:</b>
									<br/>
									{3}
								</div>
							</body>
						</html>";
				string messageBody = string.Format(body, Environment.MachineName, ex.Message, ex.InnerException, ex.StackTrace);

				foreach (string email in emails)
				{
					EmailSender.SendBy(email, subject, messageBody);
				}
			}
		}

		public static void FatalError(string message, Exception ex)
		{
			string emailsString = ConfigurationManager.AppSettings["FatalErrorsRecipients"];
			string[] emails = emailsString.Split(new[] { "|" }, StringSplitOptions.RemoveEmptyEntries);

			string applicationType = ConfigurationManager.AppSettings["ApplicationType"];

			if (emails.Length > 0 && !string.IsNullOrWhiteSpace(applicationType))
			{
				string subject = string.Format("Fatal Error in {0}", applicationType);
				const string body = @"
						<html>
							<head>
							</head>
							<body>
								<div>
									<b>Machine Name:</b>
									<br/>
									{0}
								</div>
								<div>
									<b>Message:</b>
									<br/>
									{1}
								</div>
								<div>
									<b>Short Message:</b>
									<br/>
									{2}
								</div>
								<br/>
								<div>
									<b>Inner Exception:</b>
									<br/>
									{3}
								</div>
								<br/>
								<div>
									<b>Stack Trace:</b>
									<br/>
									{4}
								</div>
							</body>
						</html>";

				string messageBody = string.Format(body, Environment.MachineName, message, ex.Message, ex.InnerException, ex.StackTrace);

				foreach (string email in emails)
				{
					EmailSender.SendBy(email, subject, messageBody);
				}
			}
		}
	}
}

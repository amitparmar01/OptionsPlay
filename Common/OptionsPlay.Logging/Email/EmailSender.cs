using System;
using System.Net.Mail;

namespace OptionsPlay.Logging.Email
{
	internal class EmailSender
	{
		public static void SendBy(string to, string subject, string body)
		{
			MailMessage mailMessage = new MailMessage();
			mailMessage.To.Add(to);
			mailMessage.Subject = subject;
			mailMessage.Body = body;
			mailMessage.IsBodyHtml = true;

			SmtpClient smtpClient = new SmtpClient { EnableSsl = true };

			try
			{
				smtpClient.Send(mailMessage);
			}
			catch (Exception ex)
			{
				Logger.Error("Email Sending", ex);
			}
		}
	}
}

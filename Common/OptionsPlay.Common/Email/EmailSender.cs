using System;
using System.Collections.Generic;
using System.Net.Mail;
using OptionsPlay.Logging;

namespace OptionsPlay.Common.Email
{
	public class EmailSender
	{
		public static void SendBy(string recipient, string subject, string body)
		{
			MailMessage mailMessage = new MailMessage();
			mailMessage.To.Add(recipient);
			mailMessage.Subject = subject;
			mailMessage.Body = body;
			mailMessage.IsBodyHtml = true;

			Send(mailMessage);
		}

		public static void SendBy(IEnumerable<string> recipients, string subject, string body)
		{
			MailMessage mailMessage = new MailMessage();
			foreach (string recipient in recipients)
			{
				mailMessage.To.Add(recipient);
			}
			mailMessage.Subject = subject;
			mailMessage.Body = body;
			mailMessage.IsBodyHtml = true;

			Send(mailMessage);
		}

		private static void Send(MailMessage mailMessage)
		{
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

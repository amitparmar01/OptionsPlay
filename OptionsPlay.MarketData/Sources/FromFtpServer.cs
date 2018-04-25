using System;
using System.Diagnostics;
using System.Net;
using System.Threading;
using OptionsPlay.Logging;

namespace OptionsPlay.MarketData.Sources
{
	internal static class FromFtpServer
	{
		//Files in common updated each minute. So 10 * 5sec = 50sec. 
		//During 50sec we definetly will have an ability to read the file.
		private const int NumberOfCircles = 19;
		private static readonly TimeSpan RequestsDelayTime = new TimeSpan(0, 0, 0, 3);

		public static byte[] GetData(string url, string fileName)
		{
			int counter = NumberOfCircles;
			while (true)
			{
				try
				{
					using (WebClient webClient = new WebClient())
					{
						MarketDataConfiguration configuration = MarketDataConfiguration.Instance;
						// for ftp download performance evaluation.
						webClient.Credentials = new NetworkCredential(configuration.FtpUsername, configuration.FtpPassword);
						Logger.Debug(string.Format("Connected to FTP URL: {0}", url));

						Stopwatch stopwatch = new Stopwatch();
						stopwatch.Start();
						byte[] data = webClient.DownloadData(url + fileName);
						stopwatch.Stop();

						Logger.Debug(string.Format("File {0} downloaded in {1}ms", fileName, stopwatch.ElapsedMilliseconds));
						return data;
					}
				}
				catch (Exception ex)
				{
					if (counter > 0)
					{
						Logger.Debug(string.Format("FromFtpServer {0} GetData Error {1} {2}", fileName, ex.Message, ex.StackTrace));

						counter--;
						Thread.Sleep(RequestsDelayTime);
					}
					else
					{
						Logger.Error(string.Format("FromFtpServer {0} GetData Error", fileName), ex);
						throw;
					}
				}
			}
		}
	}
}

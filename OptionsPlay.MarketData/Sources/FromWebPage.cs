using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using OptionsPlay.Logging;
using System.Diagnostics;
using System.Net;
using System.Threading;
using System.IO;

namespace OptionsPlay.MarketData.Sources
{
    class FromWebPage
    {
        //WebPage to request it in common updated each minute. So 10 * 5sec = 50sec. 
        //During 50sec we definetly will have an ability to read the file.
        private const int NumberOfCircles = 19;
        private static readonly TimeSpan RequestsDelayTime = new TimeSpan(0, 0, 0, 3);

        public static string GetData(string url)
        {
            int counter = NumberOfCircles;
            while (true)
            {
                try
                {
                    HttpWebRequest httpWebRequest = HttpWebRequest.Create(url) as System.Net.HttpWebRequest;
                    httpWebRequest.Method = "GET";
                    
                    Stopwatch stopwatch = new Stopwatch();
                    stopwatch.Start();
                    HttpWebResponse response2 = (HttpWebResponse)httpWebRequest.GetResponse();    // Read the stream into a string
                    StreamReader sr = new StreamReader(response2.GetResponseStream(), Encoding.Default);
                    string resultstring = sr.ReadToEnd();
                    //byte[] buffer = new byte[ReceiveStream.Length + 1];
                    //ReceiveStream.Read(buffer, 0, buffer.Length);
                    stopwatch.Stop();
                    return resultstring;
                   
                }
                catch (Exception ex)
                {
                    if (counter > 0)
                    {
                         counter--;
                        Thread.Sleep(RequestsDelayTime);
                    }
                    else
                    {
                    throw;
                    }
                }
            }
        }
    }
}

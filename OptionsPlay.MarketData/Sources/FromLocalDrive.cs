using System;
using System.IO;
using OptionsPlay.Logging;
using System.Diagnostics;
using System.Runtime.InteropServices;
using System.Text;

namespace OptionsPlay.MarketData.Sources
{
	internal static class FromLocalDrive
	{
        private static readonly int lineSize = 427;

        [DllImport("OptionsPlay.SharedFile.dll", EntryPoint = "ReadSharedFolder", CharSet = CharSet.Auto, CallingConvention = CallingConvention.Cdecl)]
        public static extern int ReadSharedFolder(IntPtr p, [MarshalAs(UnmanagedType.LPStr)] string targetFile, int lineNum);
        public static byte[] GetData(string folder, string fileName, int lineNum, int filetypeFlag)
        {
            IntPtr p = System.IntPtr.Zero;
            try
            {
                if (filetypeFlag == 1)
                {
                    Stopwatch stopwatch = new Stopwatch();
                    stopwatch.Start();
                    p = Marshal.AllocHGlobal(sizeof(char) * lineNum * lineSize);
                    if (ReadSharedFolder(p, fileName, lineNum) == -1)
                    {
                        Logger.Debug(string.Format("Error opening file ", fileName, stopwatch.ElapsedMilliseconds));
                        throw new System.IO.IOException("error opening txt file");
                    }
                    byte[] b = new byte[lineNum * lineSize];
                    Marshal.Copy(p, b, 0, lineNum * lineSize);
                    stopwatch.Stop();
                    Logger.Debug(string.Format("File {0} Copied in {1}ms", fileName, stopwatch.ElapsedMilliseconds));
                    return b;
                }
                else
                {
                    Stopwatch stopwatch = new Stopwatch();
                    stopwatch.Start();

                    string path = Path.Combine(folder, fileName);
                    byte[] result = File.ReadAllBytes(path);
                    stopwatch.Stop();

                    Logger.Debug(string.Format("File {0} Copied in {1}ms", fileName, stopwatch.ElapsedMilliseconds));
                    return result;
                }
            }
            catch (Exception ex)
            {
                Logger.Error("FromLocalDrive GetData Error", ex);
                throw;
            }
            finally
            {
                Marshal.FreeHGlobal(p);
            }
        }
        public static byte[] GetData(string folder, string fileName)
        {
            try
            {
                Stopwatch stopwatch = new Stopwatch();
                stopwatch.Start();


                string path = Path.Combine(folder, fileName);
                byte[] result = File.ReadAllBytes(path);
                stopwatch.Stop();

                Logger.Debug(string.Format("File {0} Copied in {1}ms", fileName, stopwatch.ElapsedMilliseconds));
                return result;
            }
            catch (Exception ex)
            {
                Logger.Error("FromLocalDrive GetData Error", ex);
                throw;
            }
        }
	}
}

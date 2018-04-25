using System;
using System.Configuration;
using System.Reflection;
using log4net;
using OptionsPlay.Logging.Email;

namespace OptionsPlay.Logging
{
	public static class Logger
	{
		private static readonly ILog Log;

		static Logger()
		{
			log4net.Config.XmlConfigurator.Configure();
			Log = LogManager.GetLogger(MethodBase.GetCurrentMethod().DeclaringType);
		}

		private static void SetProperties(LogLevel level)
		{
			GlobalContext.Properties["applicationType"] =
				(int) (Enum.Parse(typeof(ApplicationType), ConfigurationManager.AppSettings["ApplicationType"]));
			GlobalContext.Properties["levelNumber"] = (int) level;
		}

		public static void Debug(string message)
		{
			SetProperties(LogLevel.Debug);
			Log.Debug(message);
		}

		public static void Info(string message)
		{
			SetProperties(LogLevel.Info);
			Log.Info(message);
		}

		public static void Warn(string message)
		{
			SetProperties(LogLevel.Warn);
			Log.Warn(message);
		}

		public static void Warn(string message, Exception exception)
		{
			SetProperties(LogLevel.Warn);
			Log.Warn(message, exception);
		}

		public static void Error(string message)
		{
			SetProperties(LogLevel.Error);
			Log.Error(message);
		}

		public static void Error(string message, Exception exception)
		{
			SetProperties(LogLevel.Error);
			Log.Error(message, exception);
		}

		public static void FatalError(string message)
		{
			SetProperties(LogLevel.Fatal);
			Log.Fatal(message);
		}

		public static void FatalError(string message, Exception exception)
		{
			SetProperties(LogLevel.Fatal);
			Log.Fatal(message, exception);

           
            //EmailHelper.FatalError(message, exception);
           
		}

		public static void LogErrorAndThrow(string message)
		{
			Error(message);
			throw new Exception(message);
		}
	}
}

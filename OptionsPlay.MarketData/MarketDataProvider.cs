using System;
using System.Collections.Generic;
using System.Configuration;
using OptionsPlay.MarketData.Sources;
using OptionsPlay.Model;
using System.Data;
using OptionsPlay.Logging;
using System.IO;

namespace OptionsPlay.MarketData
{
	public static class MarketDataProvider
	{
		private readonly static MarketDataConfiguration Configuration = MarketDataConfiguration.Instance;

		public static List<OptionQuoteInfo> GetOptionQuotesInfo()
		{
			byte[] data = GetData(Configuration.TxtFileName,"TxtFileName");
            Logger.Debug("optionQuotesInfo parsing start..");
			List<OptionQuoteInfo> optionQuotesInfo = Parser.ParseTxtFile(data);
            Logger.Debug("optionQuotesInfo parsing ending...");
			return optionQuotesInfo;
		}

		public static List<StockQuoteInfo> GetStockQuotesInfo()
		{
			//byte[] data = GetData(Configuration.DbfFileName,"DbfFileName");
			//List<StockQuoteInfo> stockQuotesInfo = Parser.ParseDbfFile(data);
            DataSet mySet = Parser.ReadShow2003();
            List<StockQuoteInfo> stockQuotesInfo = (List<StockQuoteInfo>)Parser.DataSetToList<StockQuoteInfo>(mySet, 0);
			return stockQuotesInfo;
		}

    

        public static StockMarketIndex GetStockMarketIndex(string url)
        {
            StockMarketIndex result = new StockMarketIndex();

            string str= FromWebPage.GetData(url);

            string[] str2=str.Split(',');
          
            result.CurrentPeriod=str2[1];
            result.CurrentPrice=str2[2];
            result.Change=str2[3];
            result.TradeQuantity=str2[4];
            result.Turnover=str2[5].Substring(0,str2[5].IndexOf('"'));
            return result;
        }

        public static DateTime GetLastWriteTime()
        {
            try
            {
                string path = Path.Combine(Configuration.LocationDbf, Configuration.DbfFileName);
                Logger.Debug("GetLastWriteTime path is: " + path);
                return File.GetLastWriteTime(path);
            }
            catch (Exception ex)
            {
                Logger.Error("GetLastWriteTime Error: ", ex);
                throw;
            }
        }

		private static byte[] GetData(string fileName,string fileNameType)
		{
			byte[] result={0};

            //switch (Configuration.Source)
            //{
                //case MarketDataSources.FtpServer:
            if (Configuration.Source == MarketDataSources.FtpServer)
            {
                if (fileNameType == "TxtFileName")
                {

                    result = FromFtpServer.GetData(Configuration.LocationTxt, fileName);
                    
                    //break;
                }
                else if (fileNameType == "DbfFileName")
                {

                    result = FromFtpServer.GetData(Configuration.LocationDbf, fileName);
                 
                    //break;
                }
               
               
            }
            //case MarketDataSources.LocalDrive:
            else if (Configuration.Source == MarketDataSources.LocalDrive)
            {
                if (fileNameType == "TxtFileName")
                {

                    result = FromLocalDrive.GetData(Configuration.LocationTxt, Configuration.UncTxtFileName, Configuration.LineNum, 1);
                    
                    //break;
                }
                else if (fileNameType == "DbfFileName")
                {

                    result = FromLocalDrive.GetData(Configuration.LocationDbf, fileName);
                   
                    //break;
                }
            }
            //default:
            else if (Configuration.Source == MarketDataSources.SharedFolders)
            {
                if (fileNameType == "TxtFileName")
                {

                    result = FromShared_Folders.GetData(Configuration.LocationTxt,"z:", fileName);

                    //break;
                }
                else if (fileNameType == "DbfFileName")
                {

                    result = FromShared_Folders.GetData(Configuration.LocationDbf, "y:", fileName);

                    //break;
                }
            }
            else if (Configuration.Source == MarketDataSources.SharedFolderInDomain)
            {
                if (fileNameType == "TxtFileName")
                {

                    result = FromSharedFoldersInDomain.GetData(Configuration.LocationTxt, fileName);

                    //break;
                }
                else if (fileNameType == "DbfFileName")
                {

                    result = FromSharedFoldersInDomain.GetData(Configuration.LocationDbf, fileName);

                    //break;
                }
            }
            else
            {
                throw new ConfigurationErrorsException();


            }
            //}

            return result;
		}

    
	}
}

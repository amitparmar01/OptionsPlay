using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;
using NDbfReader;
using OptionsPlay.Common.Utilities;
using OptionsPlay.Model;
using OptionsPlay.Model.Attributes;
using System.Threading.Tasks;
using System.Data;
using OptionsPlay.Common.Options;
using System.Data.OleDb;
using System.Runtime.InteropServices;
using OptionsPlay.Logging;

namespace OptionsPlay.MarketData
{
	internal static class Parser
	{
		#region Private

		private static readonly Dictionary<string, PropertyInfo> DbfFileMapping = new Dictionary<string, PropertyInfo>();

		private static readonly Dictionary<int, PropertyInfo> TxtFileMapping = new Dictionary<int, PropertyInfo>();

        private static readonly string tradeDate = "TradeDate";

		private static bool IsNumericType(this Type type)
		{
			TypeCode typeCode = Type.GetTypeCode(type);
			switch (typeCode)
			{
				case TypeCode.Byte:
				case TypeCode.SByte:
				case TypeCode.UInt16:
				case TypeCode.UInt32:
				case TypeCode.UInt64:
				case TypeCode.Int16:
				case TypeCode.Int32:
				case TypeCode.Int64:
				case TypeCode.Decimal:
				case TypeCode.Double:
				case TypeCode.Single:
					return true;
				default:
					return false;
			}
		}

		#endregion Private

		#region Public

		static Parser()
		{
			PropertyInfo[] props = typeof(StockQuoteInfo).GetProps();
			foreach (PropertyInfo prop in props)
			{
				object attribute = prop.GetCustomAttributes(true).SingleOrDefault(m => m.GetType() == typeof(DbfFileMapAttribute));
                if (attribute != null)
                {
                    DbfFileMapAttribute fileMapAttribute = (DbfFileMapAttribute)attribute;
                    DbfFileMapping[fileMapAttribute.ColumnName] = prop;
                }
                else {
                    DbfFileMapping[tradeDate] = prop;
                }
			}

			props = typeof(OptionQuoteInfo).GetProps();
			foreach (PropertyInfo prop in props)
			{
				object attribute = prop.GetCustomAttributes(true).SingleOrDefault(m => m.GetType() == typeof(TxtFileMapAttribute));
				if (attribute != null)
				{
					TxtFileMapAttribute fileMapAttribute = (TxtFileMapAttribute)attribute;
					TxtFileMapping[fileMapAttribute.ColumnNumber] = prop;
				}
			}
		}

		public static List<OptionQuoteInfo> ParseTxtFile(byte[] fileData)
		{
            List<OptionQuoteInfo> result = new List<OptionQuoteInfo>();
            try
            {
                string fileString = Encoding.UTF8.GetString(fileData);
                //string fileString=System.Text.Encoding.UTF8.GetString(System.Text.Encoding.Convert(System.Text.Encoding.Unicode, System.Text.Encoding.UTF8, fileData));
                List<string> lines = fileString.Split(new[] { "\n" }, StringSplitOptions.RemoveEmptyEntries).ToList();
                // delete header line
                //lines.RemoveAt(0);
                // delete footer line
                Logger.Debug("lines count: " + lines.Count);
                lines.RemoveAt(lines.Count - 1);
                foreach (string line in lines)
                {
                    List<string> data = line.Split('|').Select(m => m.Trim()).ToList();

                    OptionQuoteInfo optionQuoteInfo = new OptionQuoteInfo();
                    for (int i = 0; i < data.Count; i++)
                    {
                        PropertyInfo prop;
                        bool success = TxtFileMapping.TryGetValue(i, out prop);
                        if (!success)
                        {
                            continue;
                        }

                        string currentData = data[i];
                        Type propType = prop.PropertyType;
                        if (currentData == string.Empty && propType.IsNumericType())
                        {
                            currentData = "0";
                        }
                        object value = Convert.ChangeType(currentData, prop.PropertyType);
                        prop.SetValue(optionQuoteInfo, value, null);
                    }
                    result.Add(optionQuoteInfo);
                }
                return result;
            }
            catch (Exception ex)
            {
                Logger.Debug("file parsing error:" + ex.StackTrace);
                return result;
            }
		}

		public static List<StockQuoteInfo> ParseDbfFile(byte[] data)
		{
			Stream stream = new MemoryStream(data);
			Table table = Table.Open(stream);

			const string chineseSimplifiedEncodingCodepage = "gb2312";
			Reader reader = table.OpenReader(Encoding.GetEncoding(chineseSimplifiedEncodingCodepage));
			List<StockQuoteInfo> result = new List<StockQuoteInfo>();
			DateTime tradeTime = DateTime.Now;
			// ignore the first row and read the current trade time.
			//todo: should be reviewed----------------------
			//if (reader.Read())
			//{
			//	string timeString = reader.GetString("S2");
			//	string dateString = reader.GetString("S6");
			//	DateTime.TryParseExact(dateString + timeString, "yyyyMMddHHmmss", null, DateTimeStyles.None, out tradeTime);
			//}

			while (reader.Read())
			{
				StockQuoteInfo stockQuoteInfo = new StockQuoteInfo();
				stockQuoteInfo.TradeDate = tradeTime;
                foreach (KeyValuePair<string, PropertyInfo> column in DbfFileMapping)
                {
                    object value;
                    try
                    {
                        value = reader.GetValue(column.Key);
                    }
                    // todo: column "S13" always throws FormatException
                    catch (FormatException)
                    {
                        value = null;
                    }
                    column.Value.SetValue(stockQuoteInfo, value, null);
                }

                // todo: split serial task to fill the value into stockQuoteInfo
                //if (DbfFileMapping.Count > 4000)
                //{
                //    System.Threading.Tasks.Parallel.ForEach(DbfFileMapping, (index) => {

                //        object value;
                //        try
                //        {
                //            value = reader.GetValue(index.Key);
                //        }
                //        // todo: column "S13" always throws FormatException
                //        catch (FormatException)
                //        {
                //            value = null;
                //        }
                //        index.Value.SetValue(stockQuoteInfo, value, null);
                    
                //    });
                
                //}
              
				result.Add(stockQuoteInfo);
			}
			return result;
		}

        public static DataSet ReadShow2003()
        {
            string strConn = AppConfigManager.OleDbConn;
            using (OleDbConnection myConnection = new OleDbConnection(strConn))
            {
                myConnection.Open();
                OleDbCommand cmd = new OleDbCommand();
                cmd.Connection = myConnection;
                cmd.CommandType = CommandType.Text;
                //cmd.CommandText = "SET DELETED OFF";
                //cmd.ExecuteNonQuery(); 
                OleDbDataAdapter adpt = new OleDbDataAdapter("SELECT * FROM SHOW2003", myConnection);
                DataSet mySet = new DataSet();
                adpt.Fill(mySet);
                return mySet;
            }
        }

        public static IList<T> DataSetToList<T>(DataSet dataSet, int tableIndex)
        {
            if (dataSet == null || dataSet.Tables.Count <= 0 || tableIndex < 0)
            {
                return null;
            }
            DataTable dt = dataSet.Tables[tableIndex];
            IList<T> list = new List<T>();
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                T _t = Activator.CreateInstance<T>();
                for (int j = 0; j < dt.Columns.Count; j++)
                {
                    PropertyInfo propertyInfo;
                    if (DbfFileMapping.TryGetValue(dt.Columns[j].ColumnName.ToUpper(), out propertyInfo))
                    {
                        propertyInfo.SetValue(_t, dt.Rows[i][j], null);
                    }
                    else
                    {
                        propertyInfo.SetValue(_t, null, null);
                    }
                }
                PropertyInfo propertyInfo4TradeDate;
                if (DbfFileMapping.TryGetValue(tradeDate, out propertyInfo4TradeDate))
                {
                    propertyInfo4TradeDate.SetValue(_t, DateTime.Now, null);
                }
                list.Add(_t);
            }
            return list;
        }

		#endregion Public
	}

   
}

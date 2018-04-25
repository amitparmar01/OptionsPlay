using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using OptionsPlay.Aspects;
using OptionsPlay.Common.ServiceResponses;
using OptionsPlay.Common.Utilities;
using OptionsPlay.DAL.SZKingdom.Common.Configuration;
using OptionsPlay.DAL.SZKingdom.Common.Enums;
using OptionsPlay.DAL.SZKingdom.DataProvider.Entities;
using OptionsPlay.Resources;

namespace OptionsPlay.DAL.SZKingdom.DataProvider
{
	internal class MarketDataLibrary : IMarketDataLibrary, IDisposable
	{

        //private static readonly SZKingdomConfiguration Configuration = SZKingdomConfiguration.LoadConfiguration();

       
         private readonly   KCBPLibraryWrapper _wrapper;
         private static KCBPConnectionOptions _connectionOptions;
         private static SZKingdomConfiguration Configuration;
         private Dictionary<KCBPConnectionOptions, SZKingdomConfiguration> _collections;
		public MarketDataLibrary()
		{
             _wrapper=new KCBPLibraryWrapper();
            if (_wrapper.GetConnectionOption().Address== "") {
                //_connectionOptions = SZKingdomPool.GetAvailableSZKingdom();
                _collections = SZKingdomPool.GetAvailableSZKingdom();
                foreach (KeyValuePair<KCBPConnectionOptions, SZKingdomConfiguration> kv in _collections)
                {
                    _connectionOptions = kv.Key;
                    Configuration = kv.Value;
                }
                _wrapper.SetConnectionOption(_connectionOptions);
                _wrapper.SetCliTimeOut(Configuration.Timeout);
                Logging.Logger.Debug("connect to SZKingdom server:ipAddress=" + Configuration.IpAddress + "port=" + Configuration.Port + "ServerName=" + Configuration.ServerName + "UserName=" + Configuration.UserName + "Password=" + Configuration.Password);
                IsConnected = false;
            }
		}

		public EntityResponse<T> ExecuteCommandSingleEntity<T>(SZKingdomRequest request, List<SZKingdomArgument> arguments) where T : new()
		{
			EntityResponse<DataTable> response = ExecuteCommand(request, arguments);
			if (!response.IsSuccess)
			{
				return EntityResponse<T>.Error(response);
			}

			List<T> results = SZKingdomMappingHelper.ReadEntitiesFromTable<T>(response);
			if (results.Count == 0)
			{
				return EntityResponse<T>.Error(ErrorCode.SZKingdomLibraryNoRecords,
					string.Format(ErrorMessages.SZKingdom_NoResults, request, string.Join("; ", arguments.Select(p =>
						string.Format("{0} = {1}", p.Name, p.Value)))));
			}
			if (results.Count > 1)
			{
				return EntityResponse<T>.Error(ErrorCode.SZKingdomLibraryError,
					string.Format(ErrorMessages.SZKingdom_SingleResultExpected, request, string.Join("; ", arguments.Select(p =>
						string.Format("{0} = {1}", p.Name, p.Value)))));
			}
			return results.Single();
		}

		public EntityResponse<List<T>> ExecuteCommandList<T>(SZKingdomRequest request, List<SZKingdomArgument> arguments) where T : new()
		{
			EntityResponse<DataTable> response = ExecuteCommand(request, arguments);
			if (!response.IsSuccess)
			{
				return EntityResponse<List<T>>.Error(response);
			}

			List<T> results = SZKingdomMappingHelper.ReadEntitiesFromTable<T>(response);
			return results;
		}

		public string EncryptPassword(string key, string password)
		{
			if (key == null)
			{
				throw new ArgumentNullException("key");
			}
			if (password == null)
			{
				throw new ArgumentNullException("password");
			}
			return _wrapper.EncryptPassword(key, password);
		}

		[Trace]
		public EntityResponse<DataTable> ExecuteCommand(SZKingdomRequest request, List<SZKingdomArgument> arguments)
		{
			try
			{
				EntityResponse<DataTable> result = Retry.Do(() => ExecuteInternal(request, arguments), TimeSpan.FromMilliseconds(10), 1, exception =>
				{
					_wrapper.Disconnect();
                    //_connectionOptions = SZKingdomPool.GetAvailableSZKingdom();
                    //_wrapper.SetConnectionOption(_connectionOptions);
                    _collections = SZKingdomPool.GetAvailableSZKingdom();
                    foreach (KeyValuePair<KCBPConnectionOptions, SZKingdomConfiguration> kv in _collections)
                    {
                        _connectionOptions = kv.Key;
                        Configuration = kv.Value;
                    }
                    _wrapper.SetConnectionOption(_connectionOptions);
                    _wrapper.SetCliTimeOut(Configuration.Timeout);
                    Logging.Logger.Debug("failover to SZKingdom Server:ipAddress=" + Configuration.IpAddress + "port=" + Configuration.Port + "ServerName=" + Configuration.ServerName + "UserName=" + Configuration.UserName + "Password=" + Configuration.Password);
                    IsConnected = false;
           
				});

				return result;
			}
			catch (AggregateException exception)
			{
				KCBPLibraryWrapperException inner =
					exception.InnerExceptions.OfType<KCBPLibraryWrapperException>().FirstOrDefault();
				if (inner == null)
				{
					throw;
				}
                Logging.Logger.Error("thread ID:" + System.Threading.Thread.CurrentThread.ManagedThreadId + ", ExecuteCommand innerException:" + exception.InnerException.ToString() + "ExecuteCommand stackTraceException:" + exception.StackTrace.ToString() + ", class is MarketDataLibrary");
                throw new Exception("金正服务暂时不可用");
                //return EntityResponse<DataTable>.Error(ErrorCode.SZKingdomLibraryError,
                //    string.Format("KCBP error code: {0}. Message: {1}.", inner.ErrorCode, inner.Message));
			}
            catch (Exception ex)
            {
                Logging.Logger.Error("thread ID:" + System.Threading.Thread.CurrentThread.ManagedThreadId + ", ExecuteCommand Exception:" + ex.StackTrace.ToString() + ", class is MarketDataLibrary");
                throw;
            }
		}

		public void Dispose()
		{
			if (_wrapper != null)
			{
				_wrapper.Dispose();
			}
		}

		private static readonly SZKingdomArgument NullCustomerCodeArgument = SZKingdomArgument.CustomerCode(null);
		private static void SetFixedParameters(SZKingdomRequest function, List<SZKingdomArgument> inputParameters)
		{
			//todo: add more required fixed parameters here.
			string operatorCode = Configuration.OperatorCode;
			string operatorRole = Configuration.OperatorRole;
			foreach (SZKingdomArgument argument in inputParameters)
			{
				if (argument.Name.Equals(NullCustomerCodeArgument.Name) && !string.IsNullOrWhiteSpace(argument.Value))
				{
					operatorCode = argument.Value;
					operatorRole = UserRole.Customer.InternalValue;
				}
			}
			inputParameters.Add(SZKingdomArgument.OperatorCode(operatorCode));
			inputParameters.Add(SZKingdomArgument.OperatorRole(operatorRole));
			inputParameters.Add(SZKingdomArgument.OperateChannel(Configuration.Channel));
			inputParameters.Add(SZKingdomArgument.OperatorSite(Configuration.OperatorSite));
			inputParameters.Add(SZKingdomArgument.OperateOrganization(Configuration.OperateOrganization));
			inputParameters.Add(SZKingdomArgument.FunctionNo(function.InternalValue));
			inputParameters.Add(SZKingdomArgument.RunTime(DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss.fff")));
		}

		private EntityResponse<DataTable> ExecuteInternal(SZKingdomRequest function, List<SZKingdomArgument> inputParamenters)
		{
            
			SetFixedParameters(function, inputParamenters);
			EnsureConnected();
			_wrapper.BeginWrite();
			foreach (SZKingdomArgument input in inputParamenters)
			{
				if (!string.IsNullOrWhiteSpace(input.Value))
				{
					_wrapper.SetValue(input.Name, input.Value);
				}
			}

			_wrapper.CallProgramAndCommit(function.InternalValue);
            
			// Get the first ResultSet, refer to 2.1.3 Response package 
			_wrapper.RsOpen();

			// There is only one row in the first response status ResultSet
			_wrapper.RsFetchRow(); //skip first row with responseStatus

			int messageCode = int.Parse(_wrapper.RsGetCol("MSG_CODE"));
			string messageText = _wrapper.RsGetCol("MSG_TEXT");
			// MSG_CODE: 0 means successful, others are error code.
			if (messageCode != 0)
			{
				_wrapper.RsClose();
				if (messageCode == 100)
				{
					return EntityResponse<DataTable>.Success(new DataTable());
				}
				return EntityResponse<DataTable>.Error(ErrorCode.SZKingdomLibraryError,
					string.Format(messageText));
                    //string.Format("KCBP error code: {0}. Message: {1}.", messageCode, messageText));
			}

			DataTable tableResult = new DataTable();
			// Get the second ResultSet, which is the output of the request.
			if (_wrapper.RsMore())
			{
				// Get number of rows.
				int numberOfrows = _wrapper.RsGetRowNum() - 1;
				int numberOfColumns = _wrapper.RsGetColNum();

				for (int i = 1; i <= numberOfColumns; i++)
				{
					// Get column name by column index, column index starts from 1.
					string columnName = _wrapper.RsGetColName(i);
					tableResult.Columns.Add(columnName.Trim());
				}

				// Get results row by row
				for (int i = 0; i < numberOfrows; i++)
				{
					if (!_wrapper.RsFetchRow())
					{
						continue;
					}

					object[] items = new object[numberOfColumns];
					for (int j = 1; j <= numberOfColumns; j++)
					{
						items[j - 1] = _wrapper.RsGetCol(j);
					}
					tableResult.Rows.Add(items);
				}
			}
			_wrapper.RsClose();
			return tableResult;
		}

		private bool IsConnected { get; set; }

		private void EnsureConnected()
		{
            if (!IsConnected)
            {
                Connect();
                IsConnected = true;
            }
           
		}

		private void Connect()
		{
			_wrapper.ConnectToServer(_connectionOptions.ServerName, Configuration.UserName, Configuration.Password);
		}
	}
}
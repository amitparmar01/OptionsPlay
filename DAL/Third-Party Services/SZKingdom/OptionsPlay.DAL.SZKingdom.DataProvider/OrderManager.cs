using System.Collections.Generic;
using OptionsPlay.Common.ServiceResponses;
using OptionsPlay.Common.Utilities;
using OptionsPlay.DAL.SZKingdom.Common;
using OptionsPlay.DAL.SZKingdom.Common.Entities;
using OptionsPlay.DAL.SZKingdom.Common.Entities.Arguments;
using OptionsPlay.DAL.SZKingdom.Common.Enums;
using OptionsPlay.DAL.SZKingdom.DataProvider.Entities;
using OptionsPlay.Resources;

namespace OptionsPlay.DAL.SZKingdom.DataProvider
{
	public class OrderManager : IOrderManager
	{
		private const string SameCodesErrorMessage = "Customer code and Account code cannot be empty at the same time.";

		private readonly IMarketDataLibrary _marketDataLibrary;

		private static readonly StockBusiness[] OptionOrderBusinesses =
		{
			StockBusiness.BuyToOpen, StockBusiness.SellToClose, StockBusiness.BuyToClose,
			StockBusiness.SellToClose, StockBusiness.CoveredCall, StockBusiness.CloseCoveredCall,
			StockBusiness.ExerciseCallOption, StockBusiness.ExercisePutOption
		};

		private static readonly StockBusiness[] PriceNecessaryBusinesses =
		{
			StockBusiness.BuyToOpen, StockBusiness.SellToClose, StockBusiness.BuyToClose,
			StockBusiness.SellToClose, StockBusiness.CoveredCall, StockBusiness.CloseCoveredCall
		};

		private static readonly StockBusiness[] StockOrderBusinesses =
		{
			StockBusiness.LockSecurities, StockBusiness.UnlockSecurities
		};

		public OrderManager(IMarketDataLibrary marketDataLibrary)
		{
			_marketDataLibrary = marketDataLibrary;
		}

		public EntityResponse<OptionOrderInformation> SubmitOptionOrder(OptionOrderArguments orderArguments)
		{
			List<SZKingdomArgument> arguments = new List<SZKingdomArgument>();

			arguments.Add(SZKingdomArgument.CustomerAccountCode(orderArguments.CustomerAccountCode));
			arguments.Add(SZKingdomArgument.StockBoard(orderArguments.StockBoard));
			arguments.Add(SZKingdomArgument.TradeAccount(orderArguments.TradeAccount));
			arguments.Add(SZKingdomArgument.OptionNumber(orderArguments.OptionNumber));
			arguments.Add(SZKingdomArgument.SecurityCode(orderArguments.SecurityCode));
			arguments.Add(SZKingdomArgument.OrderQuantity(orderArguments.OrderQuantity));
			arguments.Add(SZKingdomArgument.StockBusiness(orderArguments.StockBusiness));
			arguments.Add(SZKingdomArgument.StockBusinessAction(orderArguments.StockBusinessAction));
			arguments.Add(SZKingdomArgument.SecurityLevel(orderArguments.SecurityLevel));
			arguments.Add(SZKingdomArgument.OrderPrice(orderArguments.OrderPrice));
			arguments.Add(SZKingdomArgument.CustomerCode(orderArguments.CustomerCode));
			arguments.Add(SZKingdomArgument.TradeUnit(orderArguments.TradeUnit));
			arguments.Add(SZKingdomArgument.OrderBatchSerialNo(orderArguments.OrderBatchSerialNo));
			arguments.Add(SZKingdomArgument.ClientInfo(orderArguments.ClientInfo));
            arguments.Add(SZKingdomArgument.InternalOrganization(orderArguments.InternalOrganization));

			if (orderArguments.SecurityLevel != SecurityLevel.NoSecurity)
			{
				if (!string.IsNullOrWhiteSpace(orderArguments.SecurityInfo))
				{
					arguments.Add(SZKingdomArgument.SecurityInfo(orderArguments.SecurityInfo));
				}
				else if (!string.IsNullOrWhiteSpace(orderArguments.Password))
				{
					orderArguments.SecurityInfo = _marketDataLibrary.EncryptPassword(orderArguments.CustomerAccountCode, orderArguments.Password);
				}
				else
				{
					EntityResponse<OptionOrderInformation> entityResponse = EntityResponse<OptionOrderInformation>
						.Error(ErrorCode.SZKingdomLibraryError, "No security info");
					return entityResponse;
				}
			}

			EntityResponse<OptionOrderInformation> result =
				_marketDataLibrary.ExecuteCommandSingleEntity<OptionOrderInformation>(SZKingdomRequest.OptionOrder, arguments);

			return result;
		}

        public EntityResponse<List<AssignableExerciseDetail>> AssignableExerciseDetail(AssignableExerciseDetailArguments assignableExerciseDetailArguments)
		{
			List<SZKingdomArgument> arguments = new List<SZKingdomArgument>();
            
            arguments.Add(SZKingdomArgument.CustomerCode(assignableExerciseDetailArguments.CustomerCode));
            arguments.Add(SZKingdomArgument.CustomerAccountCode(assignableExerciseDetailArguments.CustomerAccountCode));
            arguments.Add(SZKingdomArgument.Currency(assignableExerciseDetailArguments.Currency));
            arguments.Add(SZKingdomArgument.StockBoard(assignableExerciseDetailArguments.StockBoard));
          
            arguments.Add(SZKingdomArgument.TradeAccount(assignableExerciseDetailArguments.TradeAccount));
            arguments.Add(SZKingdomArgument.OptionNumber(assignableExerciseDetailArguments.OptionNumber));
            arguments.Add(SZKingdomArgument.OptionUnderlyingCode(assignableExerciseDetailArguments.OptionUnderlyingCode));
            arguments.Add(SZKingdomArgument.OptionType(assignableExerciseDetailArguments.OptionType));
            arguments.Add(SZKingdomArgument.OptionCoveredFlag(assignableExerciseDetailArguments.OptionCoveredFlag));
            arguments.Add(SZKingdomArgument.ExerciseSide(assignableExerciseDetailArguments.ExerciseSide));
            arguments.Add(SZKingdomArgument.QueryPosition(assignableExerciseDetailArguments.QueryPosition));
            arguments.Add(SZKingdomArgument.QueryNumer(assignableExerciseDetailArguments.QueryNumer));
           


     
           
           

            //if (orderArguments.SecurityLevel != SecurityLevel.NoSecurity)
            //{
            //    if (!string.IsNullOrWhiteSpace(orderArguments.SecurityInfo))
            //    {
            //        arguments.Add(SZKingdomArgument.SecurityInfo(orderArguments.SecurityInfo));
            //    }
            //    else if (!string.IsNullOrWhiteSpace(orderArguments.Password))
            //    {
            //        orderArguments.SecurityInfo = _marketDataLibrary.EncryptPassword(orderArguments.CustomerAccountCode, orderArguments.Password);
            //    }
            //    else
            //    {
            //        EntityResponse<OptionOrderInformation> entityResponse = EntityResponse<OptionOrderInformation>
            //            .Error(ErrorCode.SZKingdomLibraryError, "No security info");
            //        return entityResponse;
            //    }
            //}

			EntityResponse<List<AssignableExerciseDetail>> result =
                _marketDataLibrary.ExecuteCommandList<AssignableExerciseDetail>(SZKingdomRequest.AssignableExerciseDetail, arguments);

			return result;
		}

        public EntityResponse<List<AssignableHistoricalExerciseDetail>> AssignableHistoricalExerciseDetail(AssignableHistoricalExerciseDetailArguments assignableHistoricalExerciseDetailArguments)
        {
            List<SZKingdomArgument> arguments = new List<SZKingdomArgument>();

            arguments.Add(SZKingdomArgument.CustomerCode(assignableHistoricalExerciseDetailArguments.CustomerCode));
            arguments.Add(SZKingdomArgument.CustomerAccountCode(assignableHistoricalExerciseDetailArguments.CustomerAccountCode));
            arguments.Add(SZKingdomArgument.Currency(assignableHistoricalExerciseDetailArguments.Currency));
            arguments.Add(SZKingdomArgument.StockBoard(assignableHistoricalExerciseDetailArguments.StockBoard));

            arguments.Add(SZKingdomArgument.TradeAccount(assignableHistoricalExerciseDetailArguments.TradeAccount));
            arguments.Add(SZKingdomArgument.OptionNumber(assignableHistoricalExerciseDetailArguments.OptionNumber));
            arguments.Add(SZKingdomArgument.OptionUnderlyingCode(assignableHistoricalExerciseDetailArguments.OptionUnderlyingCode));
            arguments.Add(SZKingdomArgument.OptionType(assignableHistoricalExerciseDetailArguments.OptionType));
            arguments.Add(SZKingdomArgument.OptionCoveredFlag(assignableHistoricalExerciseDetailArguments.OptionCoveredFlag));
            arguments.Add(SZKingdomArgument.ExerciseSide(assignableHistoricalExerciseDetailArguments.ExerciseSide));
            arguments.Add(SZKingdomArgument.QueryPosition(assignableHistoricalExerciseDetailArguments.QueryPosition));
            arguments.Add(SZKingdomArgument.QueryNumer(assignableHistoricalExerciseDetailArguments.QueryNumer));
            arguments.Add(SZKingdomArgument.BeginDate(assignableHistoricalExerciseDetailArguments.BeginDate.ToString(SZKingdomMappingHelper.SZKingdomDateFormat)));
            arguments.Add(SZKingdomArgument.EndDate(assignableHistoricalExerciseDetailArguments.EndDate.ToString(SZKingdomMappingHelper.SZKingdomDateFormat)));
            //if (orderArguments.SecurityLevel != SecurityLevel.NoSecurity)
            //{
            //    if (!string.IsNullOrWhiteSpace(orderArguments.SecurityInfo))
            //    {
            //        arguments.Add(SZKingdomArgument.SecurityInfo(orderArguments.SecurityInfo));
            //    }
            //    else if (!string.IsNullOrWhiteSpace(orderArguments.Password))
            //    {
            //        orderArguments.SecurityInfo = _marketDataLibrary.EncryptPassword(orderArguments.CustomerAccountCode, orderArguments.Password);
            //    }
            //    else
            //    {
            //        EntityResponse<OptionOrderInformation> entityResponse = EntityResponse<OptionOrderInformation>
            //            .Error(ErrorCode.SZKingdomLibraryError, "No security info");
            //        return entityResponse;
            //    }
            //}

            EntityResponse<List<AssignableHistoricalExerciseDetail>> result =
                _marketDataLibrary.ExecuteCommandList<AssignableHistoricalExerciseDetail>(SZKingdomRequest.AssignableHistoricalExerciseDetail, arguments);

            return result;
        }
		public BaseResponse CancelOptionOrder(OptionOrderCancellationArguments cancellationArguments)
		{
			List<SZKingdomArgument> arguments = new List<SZKingdomArgument>();

			arguments.Add(SZKingdomArgument.CustomerAccountCode(cancellationArguments.CustomerAccountCode));
			arguments.Add(SZKingdomArgument.StockBoard(cancellationArguments.StockBoard.ToString()));
			arguments.Add(SZKingdomArgument.InternalOrganization(cancellationArguments.InternalOrganization));
			arguments.Add(SZKingdomArgument.OrderId(cancellationArguments.OrderId));
			arguments.Add(SZKingdomArgument.OrderBatchSerialNo(cancellationArguments.OrderBatchSerialNo));

			if (string.IsNullOrWhiteSpace(cancellationArguments.OrderId) && cancellationArguments.OrderBatchSerialNo == null)
			{
				EntityResponse<OptionOrderCancellationInformation> entityResponse = EntityResponse<OptionOrderCancellationInformation>
					.Error(ErrorCode.SZKingdomLibraryError, "Order Id and Order BSN cannot be empty at the same time");
				return entityResponse;
			}

			BaseResponse result = _marketDataLibrary.ExecuteCommand(SZKingdomRequest.CancelOptionOrder, arguments);

			return result;
		}

		public EntityResponse<OptionOrderMaxQuantityInformation> GetOptionOrderMaxQuantity(OptionOrderMaxQuantityArguments maxQuantityArguments)
		{
			List<SZKingdomArgument> arguments = new List<SZKingdomArgument>();

			arguments.Add(SZKingdomArgument.CustomerCode(maxQuantityArguments.CustomerCode));
			arguments.Add(SZKingdomArgument.CustomerAccountCode(maxQuantityArguments.CustomerAccountCode));
			arguments.Add(SZKingdomArgument.TradeAccount(maxQuantityArguments.TradeAccount));
			arguments.Add(SZKingdomArgument.StockBoard(maxQuantityArguments.StockBoard));
			arguments.Add(SZKingdomArgument.StockBusiness(maxQuantityArguments.StockBusiness));
			arguments.Add(SZKingdomArgument.StockBusinessAction(maxQuantityArguments.StockBusinessAction));

			if (maxQuantityArguments.StockBusiness.In(OptionOrderBusinesses) && string.IsNullOrWhiteSpace(maxQuantityArguments.OptionNumber))
			{
				EntityResponse<OptionOrderMaxQuantityInformation> entityResponse = EntityResponse<OptionOrderMaxQuantityInformation>.Error(
					ErrorCode.SZKingdomLibraryError,
					ErrorMessages.SZKingdom_OptionNumberCanNotBeEmpty);
				return entityResponse;
			}
			if (maxQuantityArguments.StockBusiness.In(StockOrderBusinesses) && string.IsNullOrWhiteSpace(maxQuantityArguments.SecurityCode))
			{
				EntityResponse<OptionOrderMaxQuantityInformation> entityResponse = EntityResponse<OptionOrderMaxQuantityInformation>.Error(
					ErrorCode.SZKingdomLibraryError,
					ErrorMessages.SZKingdom_StockCanNotBeEmpty);
				return entityResponse;
			}
			arguments.Add(SZKingdomArgument.OptionNumber(maxQuantityArguments.OptionNumber));
			arguments.Add(SZKingdomArgument.SecurityCode(maxQuantityArguments.SecurityCode));


			if (maxQuantityArguments.StockBusiness.In(PriceNecessaryBusinesses) && maxQuantityArguments.OrderPrice == null)
			{
				EntityResponse<OptionOrderMaxQuantityInformation> entityResponse = EntityResponse<OptionOrderMaxQuantityInformation>
					.Error(ErrorCode.SZKingdomLibraryError, ErrorMessages.SZKingdom_OrderPriceCanNotBeEmpty);
				return entityResponse;
			}
			arguments.Add(SZKingdomArgument.OrderPrice(maxQuantityArguments.OrderPrice));


			EntityResponse<OptionOrderMaxQuantityInformation> result =
				_marketDataLibrary.ExecuteCommandSingleEntity<OptionOrderMaxQuantityInformation>(SZKingdomRequest.OptionOrderMaxQuantity, arguments);

			return result;
		}

		public EntityResponse<OrderMarginInformation> GetOptionOrderMargin(OrderMarginArguments orderArguments)
		{

			List<SZKingdomArgument> arguments = new List<SZKingdomArgument>();

			arguments.Add(SZKingdomArgument.CustomerAccountCode(orderArguments.CustomerAccountCode));
			arguments.Add(SZKingdomArgument.StockBoard(orderArguments.StockBoard));
			arguments.Add(SZKingdomArgument.Currency(orderArguments.Currency));
			arguments.Add(SZKingdomArgument.TradeAccount(orderArguments.TradeAccount));
			arguments.Add(SZKingdomArgument.OptionNumber(orderArguments.OptionNumber));
			arguments.Add(SZKingdomArgument.OrderQuantity(orderArguments.OrderQuantity));

			EntityResponse<OrderMarginInformation> result =
				_marketDataLibrary.ExecuteCommandSingleEntity<OrderMarginInformation>(SZKingdomRequest.OptionOrderMargin, arguments);

			return result;
		}

		public EntityResponse<UnderlyingSecurityLockUnlockInformation> LockUnlockUnderlyingSecurity(
			UnderlyingSecurityLockUnlockArguments lockUnlockArguments)
		{
			List<SZKingdomArgument> arguments = new List<SZKingdomArgument>();

			arguments.Add(SZKingdomArgument.CustomerAccountCode(lockUnlockArguments.CustomerAccountCode));
			arguments.Add(SZKingdomArgument.TradeAccount(lockUnlockArguments.TradeAccount));
			arguments.Add(SZKingdomArgument.StockBoard(lockUnlockArguments.StockBoard));
			arguments.Add(SZKingdomArgument.SecurityCode(lockUnlockArguments.SecurityCode));
			arguments.Add(SZKingdomArgument.OrderQuantity(lockUnlockArguments.OrderQuantity));
			arguments.Add(SZKingdomArgument.StockBusiness(lockUnlockArguments.StockBusiness));
			arguments.Add(SZKingdomArgument.StockBusinessAction(StockBusinessAction.OrderDeclaration));
			arguments.Add(SZKingdomArgument.SecurityLevel(lockUnlockArguments.SecurityLevel));
            arguments.Add(SZKingdomArgument.InternalOrganization(lockUnlockArguments.InternalOrganization));

			if (lockUnlockArguments.SecurityLevel != SecurityLevel.NoSecurity)
			{
				lockUnlockArguments.SecurityInfo = _marketDataLibrary.EncryptPassword(lockUnlockArguments.CustomerAccountCode, lockUnlockArguments.Password);

				if (!string.IsNullOrWhiteSpace(lockUnlockArguments.SecurityInfo))
				{
					arguments.Add(SZKingdomArgument.SecurityInfo(lockUnlockArguments.SecurityInfo));
				}
				else
				{
					EntityResponse<UnderlyingSecurityLockUnlockInformation> entityResponse = EntityResponse<UnderlyingSecurityLockUnlockInformation>
						.Error(ErrorCode.SZKingdomLibraryError, "No security info");
					return entityResponse;
				}
			}

			arguments.Add(SZKingdomArgument.CustomerCode(lockUnlockArguments.CustomerCode));
			arguments.Add(SZKingdomArgument.TradeUnit(lockUnlockArguments.TradeUnit));
			arguments.Add(SZKingdomArgument.OrderBatchSerialNo(lockUnlockArguments.OrderBatchSerialNo));
			arguments.Add(SZKingdomArgument.ClientInfo(lockUnlockArguments.ClientInfo));

			EntityResponse<UnderlyingSecurityLockUnlockInformation> result = _marketDataLibrary
				.ExecuteCommandSingleEntity<UnderlyingSecurityLockUnlockInformation>(SZKingdomRequest.UnderlyingSecurityLockUnlock, arguments);
			return result;
		}

		public EntityResponse<List<IntradayOptionOrderInformation>> GetIntradayOptionOrders(IntradayOptionOrderArguments intradayOrderArguments)
		{
			List<SZKingdomArgument> arguments = new List<SZKingdomArgument>();

			if (intradayOrderArguments.CustomerCode == null && intradayOrderArguments.CustomerAccountCode == null)
			{
				EntityResponse<List<IntradayOptionOrderInformation>> entityResponse = EntityResponse<List<IntradayOptionOrderInformation>>
					.Error(ErrorCode.SZKingdomLibraryError, SameCodesErrorMessage);
				return entityResponse;
			}

			arguments.Add(SZKingdomArgument.CustomerCode(intradayOrderArguments.CustomerCode));
			arguments.Add(SZKingdomArgument.CustomerAccountCode(intradayOrderArguments.CustomerAccountCode));
			arguments.Add(SZKingdomArgument.StockBoard(intradayOrderArguments.StockBoard));
			arguments.Add(SZKingdomArgument.TradeAccount(intradayOrderArguments.TradeAccount));
			arguments.Add(SZKingdomArgument.OptionNumber(intradayOrderArguments.OptionNumber));
			arguments.Add(SZKingdomArgument.OptionUnderlyingCode(intradayOrderArguments.OptionUnderlyingCode));
			arguments.Add(SZKingdomArgument.OrderId(intradayOrderArguments.OrderId));
			arguments.Add(SZKingdomArgument.OrderBatchSerialNo(intradayOrderArguments.OrderBatchSerialNo));
			arguments.Add(SZKingdomArgument.QueryPosition(intradayOrderArguments.QueryPosition));

			EntityResponse<List<IntradayOptionOrderInformation>> result = _marketDataLibrary
				.ExecuteCommandList<IntradayOptionOrderInformation>(SZKingdomRequest.IntradayOptionOrders, arguments);

			return result;
		}

        public EntityResponse<List<IntradayOptionOrderInformation>> GetIntradayOptionExercises(IntradayOptionOrderArguments intradayOrderArguments)
        {
            List<SZKingdomArgument> arguments = new List<SZKingdomArgument>();

            if (intradayOrderArguments.CustomerCode == null && intradayOrderArguments.CustomerAccountCode == null)
            {
                EntityResponse<List<IntradayOptionOrderInformation>> entityResponse = EntityResponse<List<IntradayOptionOrderInformation>>
                    .Error(ErrorCode.SZKingdomLibraryError, SameCodesErrorMessage);
                return entityResponse;
            }

            arguments.Add(SZKingdomArgument.CustomerCode(intradayOrderArguments.CustomerCode));
            arguments.Add(SZKingdomArgument.CustomerAccountCode(intradayOrderArguments.CustomerAccountCode));
            arguments.Add(SZKingdomArgument.StockBoard(intradayOrderArguments.StockBoard));
            arguments.Add(SZKingdomArgument.TradeAccount(intradayOrderArguments.TradeAccount));
            arguments.Add(SZKingdomArgument.OptionNumber(intradayOrderArguments.OptionNumber));
            arguments.Add(SZKingdomArgument.OptionUnderlyingCode(intradayOrderArguments.OptionUnderlyingCode));
            arguments.Add(SZKingdomArgument.OrderId(intradayOrderArguments.OrderId));
            arguments.Add(SZKingdomArgument.OrderBatchSerialNo(intradayOrderArguments.OrderBatchSerialNo));
            arguments.Add(SZKingdomArgument.QueryPosition(intradayOrderArguments.QueryPosition));
           arguments.Add(SZKingdomArgument.StockBusiness(intradayOrderArguments.StockBusiness));

            EntityResponse<List<IntradayOptionOrderInformation>> result = _marketDataLibrary
                .ExecuteCommandList<IntradayOptionOrderInformation>(SZKingdomRequest.IntradayOptionOrders, arguments);

            return result;
        }

		public EntityResponse<List<IntradayOptionTradeInformation>> GetIntradayOptionTrades(IntradayOptionOrderArguments intradayOrderArguments)
		{
			List<SZKingdomArgument> arguments = new List<SZKingdomArgument>();

			if (intradayOrderArguments.CustomerCode == null && intradayOrderArguments.CustomerAccountCode == null)
			{
				EntityResponse<List<IntradayOptionTradeInformation>> entityResponse = EntityResponse<List<IntradayOptionTradeInformation>>
					.Error(ErrorCode.SZKingdomLibraryError, SameCodesErrorMessage);
				return entityResponse;
			}

			arguments.Add(SZKingdomArgument.CustomerCode(intradayOrderArguments.CustomerCode));
			arguments.Add(SZKingdomArgument.CustomerAccountCode(intradayOrderArguments.CustomerAccountCode));
			arguments.Add(SZKingdomArgument.StockBoard(intradayOrderArguments.StockBoard));
			arguments.Add(SZKingdomArgument.TradeAccount(intradayOrderArguments.TradeAccount));
			arguments.Add(SZKingdomArgument.OptionNumber(intradayOrderArguments.OptionNumber));
			arguments.Add(SZKingdomArgument.OptionUnderlyingCode(intradayOrderArguments.OptionUnderlyingCode));
			arguments.Add(SZKingdomArgument.OrderId(intradayOrderArguments.OrderId));
			arguments.Add(SZKingdomArgument.OrderBatchSerialNo(intradayOrderArguments.OrderBatchSerialNo));
			arguments.Add(SZKingdomArgument.QueryPosition(intradayOrderArguments.QueryPosition));

			EntityResponse<List<IntradayOptionTradeInformation>> result = _marketDataLibrary
				.ExecuteCommandList<IntradayOptionTradeInformation>(SZKingdomRequest.IntradayOptionTrades, arguments);

			return result;
		}

		public EntityResponse<List<IntradayOptionOrderBasicInformation>> GetCancellableOrders(IntradayOptionOrderArguments intradayOrderArguments)
		{
			List<SZKingdomArgument> arguments = new List<SZKingdomArgument>();

			if (intradayOrderArguments.CustomerCode == null && intradayOrderArguments.CustomerAccountCode == null)
			{
				EntityResponse<List<IntradayOptionOrderBasicInformation>> entityRespose = EntityResponse<List<IntradayOptionOrderBasicInformation>>
					.Error(ErrorCode.SZKingdomLibraryError, SameCodesErrorMessage);
				return entityRespose;
			}

			arguments.Add(SZKingdomArgument.CustomerCode(intradayOrderArguments.CustomerCode));
			arguments.Add(SZKingdomArgument.CustomerAccountCode(intradayOrderArguments.CustomerAccountCode));
			arguments.Add(SZKingdomArgument.StockBoard(intradayOrderArguments.StockBoard));
			arguments.Add(SZKingdomArgument.TradeAccount(intradayOrderArguments.TradeAccount));
			arguments.Add(SZKingdomArgument.OptionNumber(intradayOrderArguments.OptionNumber));
			arguments.Add(SZKingdomArgument.OptionUnderlyingCode(intradayOrderArguments.OptionUnderlyingCode));
			arguments.Add(SZKingdomArgument.OrderId(intradayOrderArguments.OrderId));
			arguments.Add(SZKingdomArgument.QueryPosition(intradayOrderArguments.QueryPosition));

			EntityResponse<List<IntradayOptionOrderBasicInformation>> result = _marketDataLibrary
				.ExecuteCommandList<IntradayOptionOrderBasicInformation>(SZKingdomRequest.CancelableOptionOrders, arguments);

			return result;
		}

		public EntityResponse<List<LockableUnderlyingInformation>> GetLockableUnderlyings(StockBoard stockBoard, string tradeAccount,
																						string customerCode = null, string accountCode = null)
		{
			List<SZKingdomArgument> arguments = new List<SZKingdomArgument>();

			if (customerCode == null && accountCode == null)
			{
				EntityResponse<List<LockableUnderlyingInformation>> entityReponse = EntityResponse<List<LockableUnderlyingInformation>>
					.Error(ErrorCode.SZKingdomLibraryError, SameCodesErrorMessage);
				return entityReponse;
			}

			arguments.Add(SZKingdomArgument.CustomerCode(customerCode));
			arguments.Add(SZKingdomArgument.CustomerAccountCode(accountCode));
			arguments.Add(SZKingdomArgument.StockBoard(stockBoard));
			arguments.Add(SZKingdomArgument.TradeAccount(tradeAccount));

			EntityResponse<List<LockableUnderlyingInformation>> result = _marketDataLibrary
				.ExecuteCommandList<LockableUnderlyingInformation>(SZKingdomRequest.LockableUnderlyings, arguments);

			return result;
		}

		public EntityResponse<List<HistoricalOptionOrderInformation>> GetHistoricalOptionOrders(HistoricalOptionOrdersArguments historicalOrderArguments)
		{
			List<SZKingdomArgument> arguments = new List<SZKingdomArgument>();

			if (historicalOrderArguments.CustomerCode == null && historicalOrderArguments.CustomerAccountCode == null)
			{
				EntityResponse<List<HistoricalOptionOrderInformation>> entityResponse = EntityResponse<List<HistoricalOptionOrderInformation>>
					.Error(ErrorCode.SZKingdomLibraryError, SameCodesErrorMessage);
				return entityResponse;
			}

			arguments.Add(SZKingdomArgument.CustomerCode(historicalOrderArguments.CustomerCode));
			arguments.Add(SZKingdomArgument.CustomerAccountCode(historicalOrderArguments.CustomerAccountCode));
			arguments.Add(SZKingdomArgument.StockBoard(historicalOrderArguments.StockBoard));
			arguments.Add(SZKingdomArgument.TradeAccount(historicalOrderArguments.TradeAccount));
			arguments.Add(SZKingdomArgument.OptionNumber(historicalOrderArguments.OptionNumber));
			arguments.Add(SZKingdomArgument.OptionUnderlyingCode(historicalOrderArguments.OptionUnderlyingCode));
			arguments.Add(SZKingdomArgument.OrderId(historicalOrderArguments.OrderId));
			arguments.Add(SZKingdomArgument.OrderBatchSerialNo(historicalOrderArguments.OrderBatchSerialNo));
			arguments.Add(SZKingdomArgument.BeginDate(historicalOrderArguments.BeginDate.ToString(SZKingdomMappingHelper.SZKingdomDateFormat)));
			arguments.Add(SZKingdomArgument.EndDate(historicalOrderArguments.EndDate.ToString(SZKingdomMappingHelper.SZKingdomDateFormat)));
			arguments.Add(SZKingdomArgument.PageNumber(historicalOrderArguments.PageNumber));
			arguments.Add(SZKingdomArgument.PageRecordCount(historicalOrderArguments.PageRecordCount));

			EntityResponse<List<HistoricalOptionOrderInformation>> result = _marketDataLibrary
				.ExecuteCommandList<HistoricalOptionOrderInformation>(SZKingdomRequest.HistoricalOptionOrders, arguments);

			return result;
		}

		public EntityResponse<List<HistoricalOptionTradeInformation>> GetHistoricalOptionTrades(HistoricalOptionOrdersArguments historicalOrderArguments)
		{
			List<SZKingdomArgument> arguments = new List<SZKingdomArgument>();

			if (historicalOrderArguments.CustomerCode == null && historicalOrderArguments.CustomerAccountCode == null)
			{
				EntityResponse<List<HistoricalOptionTradeInformation>> entityResponse = EntityResponse<List<HistoricalOptionTradeInformation>>
					.Error(ErrorCode.SZKingdomLibraryError, SameCodesErrorMessage);
				return entityResponse;
			}

			arguments.Add(SZKingdomArgument.CustomerCode(historicalOrderArguments.CustomerCode));
			arguments.Add(SZKingdomArgument.CustomerAccountCode(historicalOrderArguments.CustomerAccountCode));
			arguments.Add(SZKingdomArgument.StockBoard(historicalOrderArguments.StockBoard));
			arguments.Add(SZKingdomArgument.TradeAccount(historicalOrderArguments.TradeAccount));
			arguments.Add(SZKingdomArgument.OptionNumber(historicalOrderArguments.OptionNumber));
			arguments.Add(SZKingdomArgument.OptionUnderlyingCode(historicalOrderArguments.OptionUnderlyingCode));
			arguments.Add(SZKingdomArgument.OrderId(historicalOrderArguments.OrderId));
			arguments.Add(SZKingdomArgument.OrderBatchSerialNo(historicalOrderArguments.OrderBatchSerialNo));
			arguments.Add(SZKingdomArgument.BeginDate(historicalOrderArguments.BeginDate.ToString(SZKingdomMappingHelper.SZKingdomDateFormat)));
			arguments.Add(SZKingdomArgument.EndDate(historicalOrderArguments.EndDate.ToString(SZKingdomMappingHelper.SZKingdomDateFormat)));
			arguments.Add(SZKingdomArgument.PageNumber(historicalOrderArguments.PageNumber));
			arguments.Add(SZKingdomArgument.PageRecordCount(historicalOrderArguments.PageRecordCount));

			EntityResponse<List<HistoricalOptionTradeInformation>> result = _marketDataLibrary
				.ExecuteCommandList<HistoricalOptionTradeInformation>(SZKingdomRequest.HistoricalOptionTrades, arguments);

			return result;
		}
	}
}
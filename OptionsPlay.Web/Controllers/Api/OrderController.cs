using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Web.Http;
using AutoMapper;
using OptionsPlay.Common.ServiceResponses;
using OptionsPlay.DAL.SZKingdom.Common;
using OptionsPlay.DAL.SZKingdom.Common.Entities;
using OptionsPlay.DAL.SZKingdom.Common.Entities.Arguments;
using OptionsPlay.DAL.SZKingdom.Common.Enums;
using OptionsPlay.Web.Infrastructure.Attributes.Api;
using OptionsPlay.Web.ViewModels.MarketData.Order;
using OptionsPlay.Web.ViewModels.Providers.Orchestrators;

namespace OptionsPlay.Web.Controllers.Api
{
	[RoutePrefix("api/order")]
	[ApiAuthorize]
	public class OrderController : BaseApiController
	{
		private readonly IOrderManager _orderManager;
		private readonly OrderOrchestrator _orderOrchestrator;

		public OrderController(IOrderManager orderManager, OrderOrchestrator orderOrchestrator)
		{
			_orderManager = orderManager;
			_orderOrchestrator = orderOrchestrator;
		}

		[Route("submit")]
		public OptionOrderViewModel PostOptionOrder(OptionOrderTicketViewModel orderTicket)
		{
			OptionOrderArguments orderArguments = new OptionOrderArguments
			{
				CustomerAccountCode = FCIdentity.CustomerAccountCode,
				TradeAccount = FCIdentity.TradeAccount,
				OptionNumber = orderTicket.OptionNumber,
				SecurityCode = orderTicket.UnderlyingCode,
				StockBusiness = StockBusiness.Parse(orderTicket.StockBusiness),
				StockBusinessAction = StockBusinessAction.Parse(orderTicket.OrderType),
				OrderQuantity = orderTicket.OrderQuantity,
				OrderPrice = orderTicket.OrderPrice,
                InternalOrganization = Convert.ToString(FCUser.InternalOrganization),
				Password = FCUser.Password
			};

			OptionOrderInformation order = _orderManager.SubmitOptionOrder(orderArguments);

			OptionOrderViewModel result = Mapper.Map<OptionOrderInformation, OptionOrderViewModel>(order);
			return result;
		}

		[Route("submitLegs")]
		public List<OptionOrderViewModel> PostOptionOrder(OptionOrderTicketViewModel[] orderTickets)
		{
			List<OptionOrderViewModel> results = new List<OptionOrderViewModel>();
			foreach (OptionOrderTicketViewModel orderTicket in orderTickets)
			{
				OptionOrderArguments orderArguments = new OptionOrderArguments
				{
					CustomerAccountCode = FCIdentity.CustomerAccountCode,
					TradeAccount = FCIdentity.TradeAccount,
					OptionNumber = orderTicket.OptionNumber,
					SecurityCode = orderTicket.SecurityCode ?? orderTicket.UnderlyingCode,
					StockBusiness = StockBusiness.Parse(orderTicket.StockBusiness),
					StockBusinessAction = StockBusinessAction.Parse(orderTicket.OrderType),
					OrderQuantity = orderTicket.OrderQuantity,
					OrderPrice = orderTicket.OrderPrice,
					Password = FCUser.Password
				};

				OptionOrderInformation order = _orderManager.SubmitOptionOrder(orderArguments);

				OptionOrderViewModel result = Mapper.Map<OptionOrderInformation, OptionOrderViewModel>(order);
				results.Add(result);
			}
			return results;
		}

		[Route("maxOrderQuantity")]
		public object PostOpenOrdersMaxQuantity(OptionOrderTicketViewModel orderTicket)
		{
          
            string currentStockBusinessAction;
            if(orderTicket.OrderType!=null)
             currentStockBusinessAction= orderTicket.OrderType;
            else
             currentStockBusinessAction= "100";
			  OptionOrderMaxQuantityArguments reqArguments = new OptionOrderMaxQuantityArguments
			{
				CustomerAccountCode = FCIdentity.CustomerAccountCode,
				TradeAccount = FCIdentity.TradeAccount,
                StockBusiness = StockBusiness.Parse(orderTicket.StockBusiness),
                StockBusinessAction = StockBusinessAction.Parse(currentStockBusinessAction),
                //行权与证券锁定解锁送100
                //StockBusinessAction = StockBusinessAction.OrderDeclaration, 
				OptionNumber = orderTicket.OptionNumber,
				SecurityCode = orderTicket.SecurityCode ?? orderTicket.UnderlyingCode,
				OrderPrice = orderTicket.OrderPrice
			};

			OptionOrderMaxQuantityInformation result = _orderManager.GetOptionOrderMaxQuantity(reqArguments);
			return result;
		}

		[Route("cancel/{orderId}")]
		public BaseResponse PostCancelOrders(string orderId)
		{
			OptionOrderCancellationArguments arguments = new OptionOrderCancellationArguments
			{
				CustomerAccountCode = FCIdentity.CustomerAccountCode,
				OrderId = orderId,
				InternalOrganization = FCIdentity.InternalOrganization
			};

			BaseResponse result = _orderManager.CancelOptionOrder(arguments);
			return result;
		}

		[Route("exercise")]
		public OptionOrderViewModel PostExerciseOptionPosition(OptionOrderTicketViewModel orderTicket)
		{
			OptionOrderArguments orderArguments = new OptionOrderArguments
			{
				CustomerAccountCode = FCIdentity.CustomerAccountCode,
				TradeAccount = FCIdentity.TradeAccount,
                OptionNumber = orderTicket.OptionNumber,//11000033
				OrderQuantity = orderTicket.OrderQuantity,
				StockBusiness = StockBusiness.Parse(orderTicket.StockBusiness),
                //StockBusiness = StockBusiness.ExerciseCallOption,
                StockBusinessAction = StockBusinessAction.OrderDeclaration,
				Password = FCUser.Password,
                InternalOrganization = Convert.ToString(FCUser.InternalOrganization)
			};

			OptionOrderInformation order = _orderManager.SubmitOptionOrder(orderArguments);

			OptionOrderViewModel result = Mapper.Map<OptionOrderInformation, OptionOrderViewModel>(order);
			return result;
		}

        [Route("exerciseDetail/{QryPos}/{QryNum}"), AcceptVerbs("GET")]
        public List<HistoricalTradeViewModel> AssignableExerciseDetail(string QryPos,string QryNum)
        {
            AssignableExerciseDetailArguments arguments = new AssignableExerciseDetailArguments
            {
                QueryPosition = QryPos,
                QueryNumer = QryNum,
                 CustomerCode = FCIdentity.CustomerCode,
                 CustomerAccountCode = FCIdentity.CustomerAccountCode,
              
            };
            EntityResponse<List<AssignableExerciseDetail>> result = _orderManager.AssignableExerciseDetail(arguments);
            return Mapper.Map<List<HistoricalTradeViewModel>>(result.Entity);
        }

        [Route("historicalExerciseDetail/{beginDate}/{endDate}"), AcceptVerbs("GET")]
        public List<AssignableHistoricalExerciseDetail> AssignableHistoricalExerciseDetail(string beginDate, string endDate)
        {
            DateTime begin, end;
            bool success = DateTime.TryParseExact(beginDate, SZKingdomDateFormat, null, DateTimeStyles.None, out begin);
            success &= DateTime.TryParseExact(endDate, SZKingdomDateFormat, null, DateTimeStyles.None, out end);
            if (!success)
            {
                return null;
            }

            AssignableHistoricalExerciseDetailArguments arguments = new AssignableHistoricalExerciseDetailArguments
            {
                CustomerCode = FCIdentity.CustomerCode,
                CustomerAccountCode = FCIdentity.CustomerAccountCode,
                BeginDate = begin,
                EndDate = end,
            };
            EntityResponse<List<AssignableHistoricalExerciseDetail>> result = _orderManager.AssignableHistoricalExerciseDetail(arguments);
            return Mapper.Map<List<AssignableHistoricalExerciseDetail>>(result.Entity);
        }

		[Route("shares/lock")]
		public void LockShares(StockLockingViewModel stockViewModel)
		{
			UnderlyingSecurityLockUnlockArguments orderArguments = new UnderlyingSecurityLockUnlockArguments
			{
				CustomerAccountCode = FCIdentity.CustomerAccountCode,
				TradeAccount = FCIdentity.TradeAccount,
				SecurityCode = stockViewModel.SecurityCode,
				OrderQuantity = stockViewModel.Quantity,
				StockBusiness = StockBusiness.LockSecurities,
				Password = FCUser.Password,
                InternalOrganization = Convert.ToString(FCUser.InternalOrganization)
			};

			UnderlyingSecurityLockUnlockInformation order = _orderManager.LockUnlockUnderlyingSecurity(orderArguments);

		}

		[Route("shares/unlock")]
		public void UnlockShares(StockLockingViewModel stockViewModel)
		{
			UnderlyingSecurityLockUnlockArguments orderArguments = new UnderlyingSecurityLockUnlockArguments
			{
				CustomerAccountCode = FCIdentity.CustomerAccountCode,
				TradeAccount = FCIdentity.TradeAccount,
				SecurityCode = stockViewModel.SecurityCode,
				OrderQuantity = stockViewModel.Quantity,
				StockBusiness = StockBusiness.UnlockSecurities,
				Password = FCUser.Password,
                InternalOrganization = Convert.ToString(FCUser.InternalOrganization)
			};

			UnderlyingSecurityLockUnlockInformation order = _orderManager.LockUnlockUnderlyingSecurity(orderArguments);

		}

		[Route("intradayOrders")]
		public List<IntradayOrderViewModel> GetIntrdayOptionOrders()
		{
			return _orderOrchestrator.GetIntrdayOptionOrders(FCIdentity.CustomerCode, FCIdentity.CustomerAccountCode);
		}


        [Route("intradayExercises")]
        public List<IntradayOrderViewModel> GetIntrdayOptionExercises()
        {
            return _orderOrchestrator.GetIntrdayOptionExercises(FCIdentity.CustomerCode, FCIdentity.CustomerAccountCode);
        }

		[Route("intradayTrades")]
		public List<IntradayTradeViewModel> GetIntrdayOptionTrades()
		{
			return _orderOrchestrator.GetIntrdayOptionTrades(FCIdentity.CustomerCode, FCIdentity.CustomerAccountCode); ;
		}
		
		private const string SZKingdomDateFormat = "yyyyMMdd";

        [Route("historicalTrades/{beginDate}/{endDate}")]
		public List<HistoricalTradeViewModel> GetHistoricalOptionTrades(string beginDate, string endDate)
		{
			DateTime begin, end;
			bool success = DateTime.TryParseExact(beginDate, SZKingdomDateFormat, null, DateTimeStyles.None, out begin);
			success &= DateTime.TryParseExact(endDate, SZKingdomDateFormat, null, DateTimeStyles.None, out end);
			if (!success)
			{
				return null;
			}

			HistoricalOptionOrdersArguments arguments = new HistoricalOptionOrdersArguments
			{
				CustomerCode = FCIdentity.CustomerCode,
				CustomerAccountCode = FCIdentity.CustomerAccountCode,
				BeginDate = begin,
				EndDate = end
			};
			EntityResponse<List<HistoricalOptionTradeInformation>> result = _orderManager.GetHistoricalOptionTrades(arguments);
			return Mapper.Map<List<HistoricalTradeViewModel>>(result.Entity);
		}

        [Route("historicalOrders/{beginDate}/{endDate}")]
		public List<HistoricalOrderViewModel> GetHistoricalOptionOrders(string beginDate, string endDate)
		{
			DateTime begin, end;
			bool success = DateTime.TryParseExact(beginDate, SZKingdomDateFormat, null, DateTimeStyles.None, out begin);
			success &= DateTime.TryParseExact(endDate, SZKingdomDateFormat, null, DateTimeStyles.None, out end);
			if (!success)
			{
				return null;
			}

			HistoricalOptionOrdersArguments arguments = new HistoricalOptionOrdersArguments
			{
				CustomerAccountCode = FCIdentity.CustomerAccountCode,
				BeginDate = begin,
				EndDate = end
			};
			List<HistoricalOptionOrderInformation> results = _orderManager.GetHistoricalOptionOrders(arguments);
			return Mapper.Map<List<HistoricalOrderViewModel>>(results);
		}
	}
}

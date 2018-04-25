using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using OptionsPlay.DAL.SZKingdom.Common;
using OptionsPlay.DAL.SZKingdom.Common.Entities;
using OptionsPlay.DAL.SZKingdom.Common.Entities.Arguments;
using OptionsPlay.Web.ViewModels.MarketData.Order;
using OptionsPlay.DAL.SZKingdom.Common.Enums;
namespace OptionsPlay.Web.ViewModels.Providers.Orchestrators
{
	public class OrderOrchestrator
	{
		private IOrderManager _orderManager;

		public OrderOrchestrator(IOrderManager orderManager)
		{
			_orderManager = orderManager;
		}

		public List<IntradayOrderViewModel> GetIntrdayOptionOrders(string customerCode, string customerAccountCode)
		{
			IntradayOptionOrderArguments arguments = new IntradayOptionOrderArguments
			{
				CustomerCode = customerCode,
				CustomerAccountCode = customerAccountCode
			};
			List<IntradayOptionOrderInformation> orders = _orderManager.GetIntradayOptionOrders(arguments);

			List<IntradayOrderViewModel> results =
				Mapper.Map<List<IntradayOptionOrderInformation>, List<IntradayOrderViewModel>>(orders);

			return results;
		}

        public List<IntradayOrderViewModel> GetIntrdayOptionExercises(string customerCode, string customerAccountCode)
        {
            IntradayOptionOrderArguments arguments = new IntradayOptionOrderArguments
            {
                CustomerCode = customerCode,
                CustomerAccountCode = customerAccountCode,
                StockBusiness="406"
                                
            };
            List<IntradayOptionOrderInformation> orders = _orderManager.GetIntradayOptionExercises(arguments);

            IntradayOptionOrderArguments arguments2 = new IntradayOptionOrderArguments
            {
                CustomerCode = customerCode,
                CustomerAccountCode = customerAccountCode,
                StockBusiness = "407"

            };
            List<IntradayOptionOrderInformation> orders2 = _orderManager.GetIntradayOptionExercises(arguments2);

            List<IntradayOptionOrderInformation> ordersMerged = orders.Concat(orders2).ToList();

            var ordersMergedSort = from c in ordersMerged
                    orderby c.OrderTime descending
                    where c.IsWithdraw==IsWithdraw.NotWithdraw
                                   select c;
            List<IntradayOptionOrderInformation> lst = ordersMergedSort.ToList();                                               
            List<IntradayOrderViewModel> results =
                Mapper.Map<List<IntradayOptionOrderInformation>, List<IntradayOrderViewModel>>(lst);

            return results;
        }

		public List<IntradayTradeViewModel> GetIntrdayOptionTrades(string customerCode, string customerAccountCode)
		{
			IntradayOptionOrderArguments arguments = new IntradayOptionOrderArguments
			{
				CustomerCode = customerCode,
				CustomerAccountCode = customerAccountCode
			};
			List<IntradayOptionTradeInformation> trades = _orderManager.GetIntradayOptionTrades(arguments);

			List<IntradayOptionOrderInformation> orders = _orderManager.GetIntradayOptionOrders(arguments);

			List<IntradayTradeViewModel> results =
				Mapper.Map<List<IntradayOptionTradeInformation>, List<IntradayTradeViewModel>>(trades);

			foreach (IntradayTradeViewModel trade in results)
			{
				IntradayTradeViewModel trade1 = trade;
				IntradayOptionOrderInformation order = orders.SingleOrDefault(x => x.OrderId == trade1.OrderId);
				if (order != null)
				{
					trade.OfferReturnMessage = order.OfferReturnMessage;
				}
			}

			return results;
		}
	}
}
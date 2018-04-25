using System.Collections.Generic;
using OptionsPlay.Common.ServiceResponses;
using OptionsPlay.DAL.SZKingdom.Common.Entities;
using OptionsPlay.DAL.SZKingdom.Common.Entities.Arguments;
using OptionsPlay.DAL.SZKingdom.Common.Enums;

namespace OptionsPlay.DAL.SZKingdom.Common
{
	public interface IOrderManager
	{
		EntityResponse<OptionOrderInformation> SubmitOptionOrder(OptionOrderArguments orderArguments);

         EntityResponse<List<AssignableExerciseDetail>> AssignableExerciseDetail(AssignableExerciseDetailArguments assignableExerciseDetailArguments);

         EntityResponse<List<AssignableHistoricalExerciseDetail>> AssignableHistoricalExerciseDetail(AssignableHistoricalExerciseDetailArguments assignableExerciseDetailArguments);
		BaseResponse CancelOptionOrder(OptionOrderCancellationArguments cancellationArguments);

		EntityResponse<OptionOrderMaxQuantityInformation> GetOptionOrderMaxQuantity(OptionOrderMaxQuantityArguments maxQuantityArguments);

		EntityResponse<OrderMarginInformation> GetOptionOrderMargin(OrderMarginArguments orderArguments);

		EntityResponse<UnderlyingSecurityLockUnlockInformation> LockUnlockUnderlyingSecurity(UnderlyingSecurityLockUnlockArguments lockUnlockArguments);

		EntityResponse<List<IntradayOptionOrderInformation>> GetIntradayOptionOrders(IntradayOptionOrderArguments intradayOrderArguments);

        EntityResponse<List<IntradayOptionOrderInformation>> GetIntradayOptionExercises(IntradayOptionOrderArguments intradayOrderArguments);

		EntityResponse<List<IntradayOptionTradeInformation>> GetIntradayOptionTrades(IntradayOptionOrderArguments intradayOrderArguments);

		EntityResponse<List<IntradayOptionOrderBasicInformation>> GetCancellableOrders(IntradayOptionOrderArguments intradayOrderArguments);

		EntityResponse<List<LockableUnderlyingInformation>> GetLockableUnderlyings(StockBoard stockBoard, string tradeAccount,
			string customerCode = null, string accountCode = null);

		EntityResponse<List<HistoricalOptionOrderInformation>> GetHistoricalOptionOrders(HistoricalOptionOrdersArguments historicalOrderArguments);

		EntityResponse<List<HistoricalOptionTradeInformation>> GetHistoricalOptionTrades(HistoricalOptionOrdersArguments historicalOrderArguments);
	}
}

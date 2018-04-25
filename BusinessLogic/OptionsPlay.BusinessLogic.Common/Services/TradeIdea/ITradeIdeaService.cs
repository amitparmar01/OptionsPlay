using System;
using System.Collections.Generic;
using System.Linq;
using System.Xml.Serialization;
using OptionsPlay.Common.ServiceResponses;
using OptionsPlay.Model;

namespace OptionsPlay.BusinessLogic.Common
{
	public interface ITradeIdeaService
	{
		EntityResponse<List<TradeIdea>> GetBySecurity(string masterSecurityCode);

		TradeIdea GetLatestTradeIdeaBySecurity(string masterSecurityCode);

		List<string> GetLatestTradeIdearsSecurities();

		IQueryable<TradeIdea> GetByDate(DateTime? date = null);

		void SaveTradeIdeas(List<TradeIdea> tradeIdeas, DateTime dateOfScan, string masterSecurityCode = null);

		void SaveTradeIdea(TradeIdea tradeIdea);

		BaseResponse CalculateOptimalTradeIdea(DateTime? date = null);

		BaseResponse SetOptimalTradeIdea(string masterSecurityCode, DateTime date);

		BaseResponse ResetOptimalTradeIdea(DateTime date);

		void StoreTradeIdeasInDb();

		void DeleteTradeIdea(string masterSecurityCode, DateTime date);
	}
}
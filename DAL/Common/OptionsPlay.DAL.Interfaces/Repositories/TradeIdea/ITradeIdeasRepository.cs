using System;
using System.Collections.Generic;
using System.Linq;
using OptionsPlay.Model;

namespace OptionsPlay.DAL.Interfaces.Repositories
{
	public interface ITradeIdeasRepository : IMongoRepository<TradeIdea>
	{
		IQueryable<TradeIdea> GetBySecurity(string masterSecurityCode);

		TradeIdea GetLatestTradeIdeaBySecurity(string masterSecurityCode);

		IQueryable<TradeIdea> GetByDate(DateTime date);

		List<string> GetLatestTradeIdeasSecurities();

		void DeleteBySecurityAndDate(string masterSecurityCode, DateTime dateOfScan);

		IQueryable<TradeIdea> GetByLatestDate();

		void AddOrUpdate(List<TradeIdea> tradeIdeas, string masterSecurityCode, DateTime dateOfScan);

		void AddOrUpdate(TradeIdea tradeIdea);

		void SetDailyPlay(TradeIdea tradeIdea);

		void ResetDailyPlay(TradeIdea tradeIdea);

		TradeIdea FindOptimalTradeIdea(DateTime? date = null);

        void GetTradeIdeaFromCSV(ref System.IO.FileStream fs);

        
	}
}
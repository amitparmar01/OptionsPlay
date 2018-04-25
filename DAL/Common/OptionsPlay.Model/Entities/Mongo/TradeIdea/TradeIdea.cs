using System;
using System.Collections.Generic;
using MongoDB.Bson.Serialization.Attributes;
using OptionsPlay.Model.Enums;

namespace OptionsPlay.Model
{
	[BsonIgnoreExtraElements]
	public class TradeIdea : BaseMongoEntity
	{
		public virtual MasterSecurity MasterSecurity { get; set; }

		public string StockCode { get; set; }

		public DateTime DateOfScan { get; set; }

		public int DateOfScanTicks { get; set; }

		public double Price { get; set; }

		public double MarketCap { get; set; }

		public bool DailyPlay { get; set; }

		public string CompanyName { get; set; }

		public int? SyrahSentimentValue { get; set; }

		public int? SyrahSentimentShortTerm { get; set; }

		public List<TradeIdeaRule> RuleMatch { get; set; }

		public List<TradeIdeaRuleWrapper> RulesWithLogs { get; set; }


	}
}
using System;
using System.Collections.Generic;
using OptionsPlay.Model.Enums;

namespace OptionsPlay.Model.Extensions
{
	public static class TradeIdeaExtension
	{
		public const int Precision = 1000000000;

		public static void SetDateOfScan(this TradeIdea tradeIdea, DateTime date)
		{
			tradeIdea.DateOfScan = new DateTime(date.Year, date.Month, date.Day, 0, 0, 0, DateTimeKind.Utc);
			tradeIdea.DateOfScanTicks = Convert.ToInt32(tradeIdea.DateOfScan.Ticks / Precision);
		}

		public static int ToComparableTicks(this DateTime date)
		{
			date = date.Date;
			int result = Convert.ToInt32(date.Ticks / Precision);
			return result;
		}

		public static TradeIdeasSentiment GetSentiment(this TradeIdeaRule tradeIdeaRule)
		{
			TradeIdeasSentiment result = BullishRules.Contains(tradeIdeaRule)
				? TradeIdeasSentiment.Bullish
				: TradeIdeasSentiment.Bearish;
			return result;
		}

		public static readonly List<TradeIdeaRule> BullishRules = new List<TradeIdeaRule>
		{
			TradeIdeaRule.RsiOversoldBullishCrossover,
			TradeIdeaRule.CciOversoldBullishCrossover,
			TradeIdeaRule.StochasticOversoldBullishCrossover,
			TradeIdeaRule.WilliamsROversoldBullishCrossover,
			TradeIdeaRule.MfiOversoldBullishCrossover,
			TradeIdeaRule.RsiDipInBullishTrend,
			TradeIdeaRule.CciDipInBullishTrend
		};

		public static readonly List<TradeIdeaRule> BearishRules = new List<TradeIdeaRule>
		{
			TradeIdeaRule.RsiOverboughtBearishCrossover,
			TradeIdeaRule.CciOverboughtBearishCrossover,
			TradeIdeaRule.StochasticOverboughtBearishCrossover,
			TradeIdeaRule.WilliamsOverboughtBearishCrossover,
			TradeIdeaRule.MfiOverboughtBearishCrossover,
			TradeIdeaRule.RsiRallyInBearishTrend,
			TradeIdeaRule.CciRallyInBearishTrend
		};
	}
}
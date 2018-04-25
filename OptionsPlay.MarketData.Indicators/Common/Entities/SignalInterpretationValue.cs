namespace OptionsPlay.MarketData.Common
{
	public enum SignalInterpretationValue
	{
		Neutral,
		Overbought,
		OverboughtUnsustainable,
		BullishTurningBearish,
		BearishTurningBullish,
		Bullish,
		StrongTrendBullish,
		MildlyBullish,
		TrendingBullish,
		TrendingBearish,
		MildlyBearish,
		BullishTrendingBearish,
		TurningBearish,
		Bearish,
		StrongTrendBearish,
		Oversold,
		OversoldUnsustainable,
		Nothing,
		ExtremelyBullish,
		ExtremelyBearish
	}

	public enum SentimentInterpretationValue
	{
		Bullish = SignalInterpretationValue.Bullish,
		Bearish = SignalInterpretationValue.Bearish,
		Neutral = SignalInterpretationValue.Neutral,
		MildlyBullish = SignalInterpretationValue.MildlyBullish,
		MildlyBearish = SignalInterpretationValue.MildlyBearish,
	}
}
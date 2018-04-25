namespace OptionsPlay.Model.Enums
{
	public enum TradeIdeaRule
	{
		None = 0,
		RsiOversoldBullishCrossover = 1,
		RsiOverboughtBearishCrossover = 2,
		CciOversoldBullishCrossover = 3,
		CciOverboughtBearishCrossover = 4,

		#region NotUsed
		StochasticOversoldBullishCrossover = 5,
		StochasticOverboughtBearishCrossover = 6,
		#endregion

		WilliamsROversoldBullishCrossover = 7,
		WilliamsOverboughtBearishCrossover = 8,
		MfiOversoldBullishCrossover = 9,
		MfiOverboughtBearishCrossover = 10,
		RsiDipInBullishTrend = 11,
		RsiRallyInBearishTrend = 12,
		CciDipInBullishTrend = 13,
		CciRallyInBearishTrend = 14
	}
}
namespace OptionsPlay.TechnicalAnalysis.Entities
{
	/// <summary>
	/// all the arrays should be the same size and sorted by DaysToExpiry ascending
	/// </summary>
	public class DataForFutureOptionPrices
	{
		public int[] DaysToExpiry { get; set; }

		public double[] CallSigma1 { get; set; }

		public double[] CallSigma2 { get; set; }

		public double[] PutSigma1 { get; set; }

		public double[] PutSigma2 { get; set; }

		public double[] Strike1 { get; set; }

		public double[] Strike2 { get; set; }
	}
}
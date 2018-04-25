namespace OptionsPlay.TechnicalAnalysis.Entities
{
	public class StdDevPrices
	{
		public StdDevPrices()
		{
		}

		public StdDevPrices(double upPrice, double downPrice, double deviation)
		{
			UpPrice = upPrice;
			DownPrice = downPrice;
			Deviation = deviation;
		}

		public double Deviation { get; set; }
		public double UpPrice { get; set; }
		public double DownPrice { get; set; }
	}
}
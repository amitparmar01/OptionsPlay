using System.Collections.Generic;

namespace OptionsPlay.Web.ViewModels.Math
{
	public class PredictionViewModel
	{
		public List<double> Prices { get; set; }

		public List<double> Probabilities { get; set; }

		public double DaysInFuture { get; set; }
	}
}
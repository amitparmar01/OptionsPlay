using OptionsPlay.MarketData.Common;

namespace OptionsPlay.MarketData.Common
{
	public class SignalInterpretation
	{
		public SignalInterpretation(IIndicator indicator)
		{
			Indicator = indicator;
			SignalName = indicator.InterpretationName;
		}

		public string SignalName { get; private set; }

		public IIndicator Indicator { get; private set; }

		public SignalInterpretationValue Interpretation { get; set; }

		public SecondaryTagValue SecondaryTag { get; set; }
	}
}
using OptionsPlay.Model.Enums;

namespace OptionsPlay.Model
{
	public class TradeIdeaRuleWrapper
	{
		public TradeIdeaRule Rule { get; set; }

		public string Study { get; set; }

		public double Period { get; set; }

		public double OverBoughtLevel { get; set; }

		public double OverSoldLevel { get; set; }
	}
}
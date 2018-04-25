using OptionsPlay.TechnicalAnalysis.Entities;

namespace OptionsPlay.BusinessLogic.Common.Entities
{
	public class PortfolioGreeks : Greeks
	{
		private readonly long _optionAvailableQuantity;
		private readonly Greeks _optionGreeks;
		private readonly string _optionSide;
		private readonly long _premiumMultiplier;

		public override double Gamma
		{
			get
			{
				double value = Calculate(_optionGreeks.Gamma);
				return value;
			}
		}

		public override double Delta
		{
			get
			{
				double value = Calculate(_optionGreeks.Delta);
				return value;
			}
		}

		public override double Theta
		{
			get
			{
				double value = Calculate(_optionGreeks.Theta);
				return value;
			}
		}

		public override double Vega
		{
			get
			{
				double value = Calculate(_optionGreeks.Vega);
				return value;
			}
		}

		public override double Rho
		{
			get
			{
				double value = Calculate(_optionGreeks.Rho);
				return value;
			}
		}

		public override double RhoFx
		{
			get
			{
				double value = Calculate(_optionGreeks.RhoFx);
				return value;
			}
		}

		public override double Sigma
		{
			get
			{
				double value = Calculate(_optionGreeks.Sigma);
				return value;
			}
		}

		public PortfolioGreeks(long optionAvailableQuantity, Greeks optionGreeks, string optionSide, long premiumMultiplier)
		{
			_optionAvailableQuantity = optionAvailableQuantity;
			_optionGreeks = optionGreeks;
			_optionSide = optionSide;
			_premiumMultiplier = premiumMultiplier;
		}

		private double Calculate(double value)
		{
			long multiplier = _premiumMultiplier;
			long quantity = _optionAvailableQuantity;

			if (_optionSide == "S" || _optionSide == "C")
			{
				quantity = -quantity;
			}

			double result = value * multiplier * quantity;
			return result;
		}
	}
}

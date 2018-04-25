using System;
using MathNet.Numerics;
using MathNet.Numerics.Distributions;
using OptionsPlay.TechnicalAnalysis.Entities;

namespace OptionsPlay.TechnicalAnalysis
{
	internal class BlackScholesModel
	{
		/// <summary>
		/// To prevent infinite loops
		/// </summary>
		private const int MaxLoopsNumber = 10000;

		private const double SigmaLow = -1;
		private const double SigmaHigh = 5;
		private const double NumberOfDaysPerYear = 365.0;

		public static readonly Normal NormDistribution = new Normal();

		/// <summary>
		/// The minimum value of volatility
		/// </summary>
		private const double SignificantDoubleValue = 1e-15;

		private readonly double _maturity; // Annualized
		private readonly double _strikePrice;
		private readonly double _interestRate;
		private readonly double _spotPrice;
		private readonly double _ask;
		private readonly double _bid;
        private readonly double _lastPrice;
		private readonly LegType _callOrPut;
		private readonly double _divYield;

		public BlackScholesModel(double daysToExpiry /*T-t, maturity*/, double strike /*K*/, double interestRate /*r*/,
								double spotPrice /*S*/, double ask, double bid, double lastPrice, LegType callOrPut, double? divYield /*q*/ = null)
		{
			_maturity = daysToExpiry / NumberOfDaysPerYear;
			_strikePrice = strike;
			_interestRate = interestRate / 100.0;
			_spotPrice = spotPrice;
			_ask = ask;
			_bid = bid;
            _lastPrice = lastPrice;
			_callOrPut = callOrPut;
			_divYield = (divYield ?? 0.0) / 100.0;
		}

		private double? _sigma;
		public double Sigma
		{
			get
			{
				double sigma = _sigma ?? (_sigma = SigmaImp()).Value;
				return sigma;
			}
		}

		public double GetEuroPrice(double volatility /*sigma*/)
		{
			// Return reasonable values for expired options
			if (_maturity <= 0)
			{
				return _callOrPut == LegType.Call
							? _spotPrice - _strikePrice
							: _strikePrice - _spotPrice;
			}

			double result;
			if (_callOrPut == LegType.Call)
			{
				result = (_spotPrice * Math.Exp(-_divYield * _maturity) * NormDistribution.CumulativeDistribution(D1(volatility))) -
						(_strikePrice * Math.Exp(-_interestRate * _maturity) * NormDistribution.CumulativeDistribution(D2(volatility)));
			}
			else
			{
				result = (_strikePrice * Math.Exp(-_interestRate * _maturity) *
						NormDistribution.CumulativeDistribution(-D2(volatility))) -
						(_spotPrice * Math.Exp(-_divYield * _maturity) * NormDistribution.CumulativeDistribution(-D1(volatility)));
			}
			return result;
		}

		/// <summary>
		/// Tries to find what value of volatility x fulfill the following condition: GetEuroPrice(x) == (ask + bid) / 2
		/// </summary>
		private double SigmaImp()
		{
			// double ave = (_ask + _bid) / 2;
            double ave = _lastPrice; 

			double sigma1 = SigmaLow;
			double sigma2 = SigmaHigh;

			if (ave.AlmostEqual(0))
			{
				return (sigma1 + sigma2) / 2;
			}

			int i = 0;
			if (GetEuroPrice(0) > ave)
			{
				return 0.0001;
			}

			while (!sigma1.AlmostEqualRelative(sigma2, 1e-6))
			{
				double sigma3 = (sigma1 + sigma2) / 2;
				double x1 = GetEuroPrice(sigma1);
				double x3 = GetEuroPrice(sigma3);

				double decisionVar = (x1 - ave) * (x3 - ave);
				if (decisionVar > 0)
				{
					sigma1 = sigma3;
				}
				else if (decisionVar < 0)
				{
					sigma2 = sigma3;
				}

				if (i++ > MaxLoopsNumber)
				{
					break;
				}
			}

			double impliedVolatility = (sigma1 + sigma2) / 2;
			if (impliedVolatility < 0)
			{
				impliedVolatility = 0;
			}

			return impliedVolatility.CoerceZero(SignificantDoubleValue);
		}

		public double EuroDelta
		{
			get
			{
				//assuming no dividends
				double delta;
				switch (_callOrPut)
				{
					case LegType.Call:
						delta = NormDistribution.CumulativeDistribution(D1());
						break;
					case LegType.Put:
						delta = (NormDistribution.CumulativeDistribution(D1()) - 1);
						break;
					default:
						throw new ArgumentOutOfRangeException();
				}
				return delta;
			}
		}

		public double EuroGamma
		{
			get
			{
				if (Sigma.AlmostEqual(0) || _maturity.AlmostEqual(0))
				{
					return 0;
				}

				double gamma = NormDistribution.Density(D1()) / (_spotPrice * Sigma * Math.Sqrt(_maturity));
				return gamma;
			}
		}

		public double EuroVega
		{
			get
			{
				double vega = _spotPrice * Math.Sqrt(_maturity) * NormDistribution.Density(D1());
				return vega;
			}
		}

		public double EuroRho
		{
			get
			{
				double rho;
				switch (_callOrPut)
				{
					case LegType.Call:
						rho = _strikePrice * _maturity * Math.Exp(-_interestRate * _maturity) *
							NormDistribution.CumulativeDistribution(D2());
						break;
					case LegType.Put:
						rho = -_strikePrice * _maturity * Math.Exp(-_interestRate * _maturity) *
							NormDistribution.CumulativeDistribution(-D2());
						break;
					default:
						throw new ArgumentOutOfRangeException();
				}
				return rho;
			}
		}

		/// <summary>
		/// for currency options with respect to the foreign interest rate
		/// </summary>
		public double EuroRhoFx
		{
			get
			{
				double rho;
				switch (_callOrPut)
				{
					case LegType.Call:
						rho = -_maturity * Math.Exp(-_divYield * _maturity) * _spotPrice *
							NormDistribution.CumulativeDistribution(D1());
						break;
					case LegType.Put:
						rho = _maturity * Math.Exp(-_divYield * _maturity) * _spotPrice *
							NormDistribution.CumulativeDistribution(-D1());
						break;
					default:
						throw new ArgumentOutOfRangeException();
				}
				return rho;
			}
		}

		/// <summary>
		/// RETURNS THETA PER CALENDAR DAY!
		/// </summary>
		public double EuroTheta
		{
			get
			{
				double theta;
				switch (_callOrPut)
				{
					case LegType.Call:
						theta = (-((_spotPrice * NormDistribution.Density(D1()) * Sigma) / (2 * Math.Sqrt(_maturity))) -
								(_interestRate * _strikePrice * Math.Exp(-_interestRate * _maturity) *
								NormDistribution.CumulativeDistribution(D2(Sigma)))) / 365;
						break;
					case LegType.Put:
						theta = -(((_spotPrice * NormDistribution.Density(D1()) * Sigma) / (2 * Math.Sqrt(_maturity))) +
								(_interestRate * _strikePrice * Math.Exp(-_interestRate * _maturity) *
								NormDistribution.CumulativeDistribution(D2()))) / 365;
						break;
					default:
						throw new ArgumentOutOfRangeException();
				}
				return theta;
			}
		}

		private double? _d1;
		private double D1()
		{
			double d1 = _d1 ?? (_d1 = D1(Sigma)).Value;
			return d1;
		}

		private double? _d2;
		private double D2()
		{
			double d2 = _d2 ?? (_d2 = D2(Sigma)).Value;
			return d2;
		}

		private double D1(double volatility)
		{
			double d1 = ((Math.Log(_spotPrice / _strikePrice) +
						(_interestRate - _divYield + (volatility * volatility) / 2) * _maturity) / (volatility * Math.Sqrt(_maturity)));
			return d1;
		}

		private double D2(double volatility)
		{
			double d2 = (D1(volatility) - (volatility * Math.Sqrt(_maturity)));
			return d2;
		}
	}
}
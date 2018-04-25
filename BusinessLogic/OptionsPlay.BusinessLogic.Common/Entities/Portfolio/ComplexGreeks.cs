using System.Collections.Generic;
using System.Linq;
using OptionsPlay.BusinessLogic.Common.Extensions;

namespace OptionsPlay.BusinessLogic.Common.Entities
{
	public class ComplexGreeks : TechnicalAnalysis.Entities.Greeks
	{
		private readonly IEnumerable<PortfolioItem> _associated;
		private readonly IEnumerable<PortfolioItem> _associatedSecurities;

		public override double Gamma
		{
			get
			{
				double value = _associatedSecurities.Sum(x => x.Greeks.Gamma);
				return value;
			}
		}

		public override double Delta
		{
			get
			{
				double value = _associated.Sum(x => x.IsStock() ? 1 : x.Greeks.Delta);
				return value;
			}
		}

		public override double Theta
		{
			get
			{
				double value = _associatedSecurities.Sum(x => x.Greeks.Theta);
				return value;
			}
		}

		public override double Vega
		{
			get
			{
				double value = _associatedSecurities.Sum(x => x.Greeks.Vega);
				return value;
			}
		}

		public override double Rho
		{
			get
			{
				double value = _associatedSecurities.Sum(x => x.Greeks.Rho);
				return value;
			}
		}

		public override double RhoFx
		{
			get
			{
				double value = _associatedSecurities.Sum(x => x.Greeks.RhoFx);
				return value;
			}
		}

		public override double Sigma
		{
			get
			{
				double value = _associatedSecurities.Sum(x => x.Greeks.Sigma);
				return value;
			}
		}

		public ComplexGreeks(List<PortfolioItem> associated)
		{
			_associated = associated;
			_associatedSecurities = associated.Where(x => !x.IsStock());
		}
	}

}

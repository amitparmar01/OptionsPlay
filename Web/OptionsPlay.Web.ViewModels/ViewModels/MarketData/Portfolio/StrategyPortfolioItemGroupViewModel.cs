using System.Collections.Generic;
using OptionsPlay.Web.ViewModels.MarketData;

namespace OptionsPlay.BusinessLogic.Common.Entities
{
	public class StrategyPortfolioItemGroupViewModel : BasePortfolioItemGroupViewModel
	{
		private const string AlwaysDisplaySignFormatString = "+#;-#;0";

		public string Strategy { get; set; }

		public string UnderlyingCode { get; set; }

		public string UnderlyingName { get; set; }

		public bool AnyExpiresInTwoDaysNotToday { get; set; }

		public bool CloseVisible { get; set; }

		public string StrategyName { get; set; }

		public long? Quantity { get; set; }

		public string QuantityFormatted
		{
			get
			{
				if (!Quantity.HasValue)
				{
					return null;
				}

				string value = Quantity.Value.ToString(AlwaysDisplaySignFormatString);
				return value;
			}
		}

		public decimal? RealtimeCostBasis { get; set; }

		public double? Mark { get; set; }

		public decimal? FloatingPL { get; set; }

		public decimal? Margin { get; set; }

		public decimal? MarketValue { get; set; }

		public bool GeneratePremiumVisible { get; set; }

		public GreeksViewModel Greeks { get; set; }
	}
}

using OptionsPlay.BusinessLogic.Common.Entities;

namespace OptionsPlay.BusinessLogic.Common.Extensions
{
	public static class PortfolioItemExtension
	{
		public static PortfolioOption ToPortfolioOption(this PortfolioItem portfolioItem)
		{
			return portfolioItem as PortfolioOption;
		}

		public static PortfolioStock ToPortfolioStock(this PortfolioItem portfolioItem)
		{
			return portfolioItem as PortfolioStock;
		}

		public static bool IsStock(this PortfolioItem portfolioItem)
		{
			return portfolioItem is PortfolioStock;
		}
	}
}

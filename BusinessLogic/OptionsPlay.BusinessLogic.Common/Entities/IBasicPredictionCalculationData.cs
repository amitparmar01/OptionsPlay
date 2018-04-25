namespace OptionsPlay.BusinessLogic.Common.Entities
{
	public interface IBasicPredictionCalculationData
	{
		double InterestRate { get; }

		double LastPrice { get; }

		/// <summary>
		/// Returns volatility of prices for underlying data.
		/// </summary>
		double GetVolatility(double daysInFuture);

		/// <summary>
		/// Sets given value as default volatility. 
		/// if <paramref name="volatility"/> is not null, all calls to <see cref="GetVolatility"/> will return <paramref name="volatility"/>.
		/// If <paramref name="volatility"/> is null, <see cref="GetVolatility"/> will work as usually.
		/// </summary>
		void SetPredefinedVolatility(double? volatility);
	}
}
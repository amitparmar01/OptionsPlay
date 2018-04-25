namespace OptionsPlay.MarketData.Indicators
{
	/// <summary>
	/// Indicator which contains property 'AvgPeriod'
	/// </summary>
	public abstract class PeriodIndicator : Indicator
	{
		#region Public/Internal members

		private readonly string _name;

		protected PeriodIndicator(int avgPeriod, string nameSuffix = "")
		{
			AvgPeriod = avgPeriod;
			_name = string.Format("{0}{1}; AvgPeriod = {2}", GetType().Name, nameSuffix, avgPeriod);
		}

		public override string Name
		{
			get
			{
				return _name;
			}
		}

		public override string InterpretationName
		{
			get
			{
				string interpretationName = string.Format("{0}({1})", GetType().Name.ToUpperInvariant(), AvgPeriod);
				return interpretationName;
			}
		}

		public int AvgPeriod { get; private set; }

		#endregion Public/Internal members
	}
}
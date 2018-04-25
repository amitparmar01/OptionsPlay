using OptionsPlay.Common.Utilities;

namespace OptionsPlay.DAL.SZKingdom.DataProvider.Entities
{
	/// <summary>
	/// Specifies all supported functions from SZKingdom in enum-like way.
	/// Use this class as an Enum:
	/// <code>
	/// SZKingdomRequest r = SZKingdomRequest.SecuritiesInformation;
	/// </code>
	/// </summary>
	public class SZKingdomRequest : BaseTypeSafeEnum<string, SZKingdomRequest>
	{
		#region MarketData

		public static readonly SZKingdomRequest SecuritiesInformation = new SZKingdomRequest("L2930000", "SecuritiesInformation");
		public static readonly SZKingdomRequest QuotationInformation = new SZKingdomRequest("L2930001", "QuotationInformation");
		public static readonly SZKingdomRequest OptionBasicInformation = new SZKingdomRequest("L2930002", "OptionBasicInformation");
		public static readonly SZKingdomRequest OptionQuotationInformation = new SZKingdomRequest("L2930003", "OptionQuotationInformation");

		#endregion MarketData

		#region OrderManager

		public static readonly SZKingdomRequest OptionOrder = new SZKingdomRequest("L2933000", "OptionOrder");
		public static readonly SZKingdomRequest CancelOptionOrder = new SZKingdomRequest("L2933001", "CancelOptionOrder");
		public static readonly SZKingdomRequest OptionOrderMaxQuantity = new SZKingdomRequest("L2933002", "OptionOrderMaxQuantity");
		public static readonly SZKingdomRequest OptionOrderMargin = new SZKingdomRequest("L2934023", "OptionOrderMargin");
		public static readonly SZKingdomRequest UnderlyingSecurityLockUnlock = new SZKingdomRequest("L2933003", "UnderlyingSecurityLockUnlock");
		public static readonly SZKingdomRequest IntradayOptionOrders = new SZKingdomRequest("L2934003", "IntradayOptionOrders");
		public static readonly SZKingdomRequest IntradayOptionTrades = new SZKingdomRequest("L2934004", "IntradayOptionTrades");
		public static readonly SZKingdomRequest CancelableOptionOrders = new SZKingdomRequest("L2934006", "CancelableOptionOrders");
		public static readonly SZKingdomRequest LockableUnderlyings = new SZKingdomRequest("L2934008", "LockableUnderlyings");
		public static readonly SZKingdomRequest HistoricalOptionOrders = new SZKingdomRequest("L2912000", "HistoricalOptionOrders");
		public static readonly SZKingdomRequest HistoricalOptionTrades = new SZKingdomRequest("L2912001", "HistoricalOptionTrades");
        public static readonly SZKingdomRequest AssignableExerciseDetail = new SZKingdomRequest("L2912002", "AssignableExerciseDetail");
        public static readonly SZKingdomRequest AssignableHistoricalExerciseDetail = new SZKingdomRequest("L2912003", "AssignableHistoricalExerciseDetail");
		#endregion OrderManager

		#region PortfolioManager

		public static readonly SZKingdomRequest FundInformation = new SZKingdomRequest("L2934000", "FundInformation");
		public static readonly SZKingdomRequest OptionableStockPositions = new SZKingdomRequest("L2934001", "OptionableStockPositions");
		public static readonly SZKingdomRequest OptionPositions = new SZKingdomRequest("L2934002", "OptionPositions");
		public static readonly SZKingdomRequest AccountRiskLevel = new SZKingdomRequest("L2934007", "AccountRiskLevel");
		public static readonly SZKingdomRequest AutomaticOptionExercisingParameters = new SZKingdomRequest("L2932514", "AutomaticOptionExercisingParameters");
		public static readonly SZKingdomRequest SetAutomaticOptionExercisingParameters = new SZKingdomRequest("L2932515", "SetAutomaticOptionExercisingParameters");

		#endregion PortfolioManager

		#region AccountManager

		public static readonly SZKingdomRequest UserLogin = new SZKingdomRequest("L2935000", "UserLogin");
		public static readonly SZKingdomRequest ChangePassword = new SZKingdomRequest("L2919000", "ChangePassword");

		public static readonly SZKingdomRequest FundTransfer = new SZKingdomRequest("L2912100", "FundTransfer");
		public static readonly SZKingdomRequest InternalFundTransfer = new SZKingdomRequest("L2912101", "InternalFundTransfer");
		public static readonly SZKingdomRequest GetAccountInformation = new SZKingdomRequest("L2934005", "GetAccountInformation");

		public static readonly SZKingdomRequest GetBankCode = new SZKingdomRequest("L2912103", "GetBankCode");
		public static readonly SZKingdomRequest HistoricalFundTransfer = new SZKingdomRequest("L2912019", "GetHistoricalTransferFund");

		
		#endregion AccountManager

		private SZKingdomRequest(string internalRequestCode, string name = null)
			: base(internalRequestCode, name ?? internalRequestCode)
		{
		}

		#region Overrides of BaseTypeSafeEnum

		public override string ToString()
		{
			string result = string.Format("{0} {1}", InternalValue, DisplayName);
			return result;
		}

		#endregion
	}
}
using System;

namespace OptionsPlay.DAL.SZKingdom.DataProvider.Entities
{
	/// <summary>
	/// Core library (<seealso cref="IMarketDataLibrary"/>) accepts list of <see cref="SZKingdomArgument"/> as input parameters.
	/// Parameters for SZKingdom are tuples with <see cref="Name"/> and <see cref="Value"/>.
	/// <see cref="Name"/> is internal for SZKingdom string, representing name of a field or input argument.
	/// <see cref="Value"/> is argument value you'd like to pass to the library
	/// To use this class you should choose argument from predefined ones and pass its value to factory method.
	/// <code>
	/// SZKingdomArgument arg = SZKingdomArgument.TradeSector("10");
	/// </code>
	/// </summary>
	public class SZKingdomArgument
	{
		public static readonly Func<object, SZKingdomArgument> StockBoard = GetFactory("STKBD");
		public static readonly Func<object, SZKingdomArgument> SecurityCode = GetFactory("STK_CODE");
		public static readonly Func<object, SZKingdomArgument> OptionNumber = GetFactory("OPT_NUM");
		public static readonly Func<object, SZKingdomArgument> OptionUnderlyingCode = GetFactory("OPT_UNDL_CODE");

		public static Func<object, SZKingdomArgument> StockExchange = GetFactory("STKEX");
		public static readonly Func<object, SZKingdomArgument> CustomerCode = GetFactory("CUST_CODE");
		public static readonly Func<object, SZKingdomArgument> CustomerAccountCode = GetFactory("CUACCT_CODE");
		public static readonly Func<object, SZKingdomArgument> TradeAccount = GetFactory("TRDACCT");
		public static readonly Func<object, SZKingdomArgument> OrderPrice = GetFactory("ORDER_PRICE");
		public static readonly Func<object, SZKingdomArgument> OrderQuantity = GetFactory("ORDER_QTY");
		public static readonly Func<object, SZKingdomArgument> StockBusiness = GetFactory("STK_BIZ");
		public static readonly Func<object, SZKingdomArgument> StockBusinessAction = GetFactory("STK_BIZ_ACTION");
		public static readonly Func<object, SZKingdomArgument> TradeUnit = GetFactory("STKPBU");
		public static readonly Func<object, SZKingdomArgument> OrderBatchSerialNo = GetFactory("ORDER_BSN");
		public static readonly Func<object, SZKingdomArgument> ClientInfo = GetFactory("CLIENT_INFO");
		public static readonly Func<object, SZKingdomArgument> SecurityLevel = GetFactory("SECURITY_LEVEL");
		public static readonly Func<object, SZKingdomArgument> SecurityInfo = GetFactory("SECURITY_INFO");
		public static readonly Func<object, SZKingdomArgument> InternalOrganization = GetFactory("INT_ORG");
		public static readonly Func<object, SZKingdomArgument> OrderId = GetFactory("ORDER_ID");
		public static readonly Func<object, SZKingdomArgument> Currency = GetFactory("CURRENCY");
		public static readonly Func<object, SZKingdomArgument> ValueFlag = GetFactory("VALUE_FLAG");
		public static readonly Func<object, SZKingdomArgument> QueryPosition = GetFactory("QRY_POS");
		public static readonly Func<object, SZKingdomArgument> OptionSide = GetFactory("OPT_SIDE");
		public static readonly Func<object, SZKingdomArgument> OptionCoveredFlag = GetFactory("OPT_CVD_FLAG");

		public static readonly Func<object, SZKingdomArgument> BeginDate = GetFactory("BGN_DATE");
		public static readonly Func<object, SZKingdomArgument> EndDate = GetFactory("END_DATE");
		public static readonly Func<object, SZKingdomArgument> PageNumber = GetFactory("PAGE_RECNUM");
		public static readonly Func<object, SZKingdomArgument> PageRecordCount = GetFactory("PAGE_RECCNT");

		public static readonly Func<object, SZKingdomArgument> ExercisingStrategyType = GetFactory("STRATEGY_TYPE");
		public static readonly Func<object, SZKingdomArgument> ExercisingStrategyValue = GetFactory("STRATEGY_VAL");
		public static readonly Func<object, SZKingdomArgument> AutomaticExerciseControl = GetFactory("AUTO_EXE_CTRL");
		public static readonly Func<object, SZKingdomArgument> ExercisingQuantity = GetFactory("EXE_QTY");
		public static readonly Func<object, SZKingdomArgument> Remark = GetFactory("REMARK");

		public static readonly Func<object, SZKingdomArgument> LoginAccountType = GetFactory("ACCT_TYPE");
		public static readonly Func<object, SZKingdomArgument> LoginAccountId = GetFactory("ACCT_ID");
		public static readonly Func<object, SZKingdomArgument> PasswordUseScpose = GetFactory("USE_SCOPE");
		public static readonly Func<object, SZKingdomArgument> AuthenticationType = GetFactory("AUTH_TYPE");
		public static readonly Func<object, SZKingdomArgument> AuthenticationData = GetFactory("AUTH_DATA");
		public static readonly Func<object, SZKingdomArgument> EncryptionType = GetFactory("ENCRYPT_TYPE");
		public static readonly Func<object, SZKingdomArgument> EncryptionKey = GetFactory("ENCRYPT_KEY");
		public static readonly Func<object, SZKingdomArgument> OldAuthenticationData = GetFactory("OLD_AUTH_DATA");
		public static readonly Func<object, SZKingdomArgument> NewAuthenticationData = GetFactory("NEW_AUTH_DATA");
		public static readonly Func<object, SZKingdomArgument> UserCode = GetFactory("USER_CODE");

		public static readonly Func<object, SZKingdomArgument> FundPassword = GetFactory("FUND_PWD");
		public static readonly Func<object, SZKingdomArgument> BankCode = GetFactory("BANK_CODE");
		public static readonly Func<object, SZKingdomArgument> BankPassword = GetFactory("BANK_PWD");
		public static readonly Func<object, SZKingdomArgument> TransferType = GetFactory("TRANS_TYPE");
		public static readonly Func<object, SZKingdomArgument> TransferAmount = GetFactory("TRANS_AMT");
		public static readonly Func<object, SZKingdomArgument> PasswordFlag = GetFactory("PWD_FLAG");
		public static readonly Func<object, SZKingdomArgument> OperationRemark = GetFactory("OP_REMARK");
		
		public static readonly Func<object, SZKingdomArgument> OperatorCode = GetFactory("F_OP_USER");
		public static readonly Func<object, SZKingdomArgument> OperatorRole = GetFactory("F_OP_ROLE");
		public static readonly Func<object, SZKingdomArgument> OperatorSite = GetFactory("F_OP_SITE");
		public static readonly Func<object, SZKingdomArgument> OperateChannel = GetFactory("F_CHANNEL");
		public static readonly Func<object, SZKingdomArgument> UserSession = GetFactory("F_SESSION");
		public static readonly Func<object, SZKingdomArgument> FunctionNo = GetFactory("F_FUNCTION");
		public static readonly Func<object, SZKingdomArgument> RunTime = GetFactory("F_RUNTIME");
		public static readonly Func<object, SZKingdomArgument> OperateOrganization = GetFactory("F_OP_ORG");

		public static readonly Func<object, SZKingdomArgument> TradeDate = GetFactory("TRD_DATE");
		public static readonly Func<object, SZKingdomArgument> QueryNumer = GetFactory("QRY_NUM");

        public static readonly Func<object, SZKingdomArgument> OptionType = GetFactory("OPT_TYPE");
        public static readonly Func<object, SZKingdomArgument> ExerciseSide = GetFactory("EXEC_SIDE");
      
       
		public string Name { get; private set; }
		public string Value { get; private set; }

		private SZKingdomArgument(string name, string value)
		{
			Name = name;
			Value = value;
		}

		private static Func<object, SZKingdomArgument> GetFactory(string name)
		{
			return value =>
			{
				string strValue = value == null
					? null
					: value.ToString();
				return new SZKingdomArgument(name, strValue);
			};
		}
	}
}
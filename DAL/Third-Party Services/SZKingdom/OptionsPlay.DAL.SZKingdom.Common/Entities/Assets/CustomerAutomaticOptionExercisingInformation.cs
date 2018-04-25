using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using OptionsPlay.DAL.SZKingdom.Common.Enums;

namespace OptionsPlay.DAL.SZKingdom.Common.Entities
{
	public class CustomerAutomaticOptionExercisingInformation
	{


		[SZKingdomField("CUST_CODE")]
		public string CustomerCode { get; set; }

		[SZKingdomField("CUACCT_CODE")]
		public string CustomerAccountCode { get; set; }

		[SZKingdomField("TRDACCT")]
		public string TradingAccount { get; set; }

		[SZKingdomField("STKEX")]
		public string StockExchange { get; set; }

		[SZKingdomField("STKBD")]
		public string TradeSector { get; set; }

		[SZKingdomField("INT_ORG")]
		public string InnerOrganization { get; set; }

		[SZKingdomField("STRATEGY_TYPE")]
		public string ExercisingStrategyType { get; set; }

		[SZKingdomField("STRATEGY_VAL")]
		public decimal ExercisingStrategyValue { get; set; }

		[SZKingdomField("AUTO_EXE_CTRL")]
		public AutoExerciseControl AutomaticExcerciseControl { get; set; }

		[SZKingdomField("OPT_NUM")]
		public string ContractNumber { get; set; }

		[SZKingdomField("OPT_NAME")]
		public string ContractName { get; set; }

		[SZKingdomField("EXE_QTY")]
		public long ExercisingQuantity { get; set; }

		[SZKingdomField("REMARK")]
		public string Remark { get; set; }
	}
}

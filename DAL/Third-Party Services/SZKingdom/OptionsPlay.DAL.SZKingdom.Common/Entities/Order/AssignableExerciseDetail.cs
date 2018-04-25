using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OptionsPlay.DAL.SZKingdom.Common.Entities
{
    public class AssignableExerciseDetail
    {

        [SZKingdomField("QRY_POS")]
        public string QueryPosition { get; set; }

        [SZKingdomField("CUST_CODE")]
        public string OptionCode { get; set; }

        [SZKingdomField("USER_NAME")]
        public string UserName { get; set; }

        [SZKingdomField("CUACCT_CODE")]
        public string CustomerAccountCode { get; set; }

        [SZKingdomField("CURRENCY")]
        public string Currency { get; set; }

        [SZKingdomField("INT_ORG")]
        public string InternationOrganization { get; set; }

        [SZKingdomField("TRDACCT")]
        public string TradeAccount { get; set; }


        [SZKingdomField("SUBACCT_CODE")]
        public string SubAccountCode { get; set; }


        [SZKingdomField("OPT_TRDACCT")]
        public string OptionTradeAccount { get; set; }


        [SZKingdomField("OPT_NUM")]
        public string OptionNumber { get; set; }


        [SZKingdomField("OPT_NAME")]
        public string OptionName { get; set; }


        [SZKingdomField("OPT_TYPE")]
        public string OptionType { get; set; }

        [SZKingdomField("OPT_UNDL_CODE")]
        public string OptionUnderlyingCode { get; set; }

        [SZKingdomField("EXEC_SIDE")]
        public string ExerciseSide { get; set; }

        [SZKingdomField("OPT_EFFECT")]
        public string OptionEffect { get; set; }

        [SZKingdomField("STK_EFFECT")]
        public string StockEffect { get; set; }

        [SZKingdomField("FUND_EFFECT")]
        public string FundEffect { get; set; }

        [SZKingdomField("EXEC_PRICE")]
        public string ExercisePrice { get; set; }
    }
}

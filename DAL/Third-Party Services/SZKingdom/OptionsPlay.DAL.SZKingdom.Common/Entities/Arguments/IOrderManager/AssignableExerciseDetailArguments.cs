using OptionsPlay.DAL.SZKingdom.Common.Enums;

namespace OptionsPlay.DAL.SZKingdom.Common.Entities.Arguments
{
    public class AssignableExerciseDetailArguments
    {
        	public AssignableExerciseDetailArguments()
		{
			//Assign default value
			StockBoard = StockBoard.SHStockOptions;
            Currency = Currency.ChineseYuan;
            //SecurityLevel = SecurityLevel.PasswordAuthentication;
		}

        public string CustomerCode { get; set; }
		public string CustomerAccountCode { get; set; }
        public Currency Currency { get; set; }
		public StockBoard StockBoard { get; set; }
       
		public string TradeAccount { get; set; }
		public string OptionNumber { get; set; }
        public string OptionUnderlyingCode { get; set; }
        public OptionType OptionType { get; set; }

        public OptionCoveredFlag OptionCoveredFlag { get; set; }

        public ExerciseSide ExerciseSide { get; set; }
        public string QueryPosition { get; set; }
        public string QueryNumer { get; set; }

     
		
        //public string Password { get; set; }
	

      
     

     
    }
}

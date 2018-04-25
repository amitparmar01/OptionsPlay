using OptionsPlay.DAL.SZKingdom.Common.Enums;


namespace OptionsPlay.DAL.SZKingdom.Common.Entities.Arguments
{
    public class AssignableHistoricalExerciseDetailArguments : AssignableExerciseDetailArguments
    {
        public AssignableHistoricalExerciseDetailArguments()
		{
			//Assign default value
			StockBoard = StockBoard.SHStockOptions;
            Currency = Currency.ChineseYuan;
            //SecurityLevel = SecurityLevel.PasswordAuthentication;
            QueryPosition = "1";
            QueryNumer = "1000";
		}


        public System.DateTime BeginDate { get; set; }
        public System.DateTime EndDate { get; set; }

     
    }
}

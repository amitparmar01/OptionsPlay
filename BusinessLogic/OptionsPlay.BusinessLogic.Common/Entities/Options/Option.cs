using OptionsPlay.TechnicalAnalysis.Entities;
using OptionsPlay.DAL.SZKingdom.Common.Enums;

namespace OptionsPlay.BusinessLogic.Common.Entities
{
	public class Option : OptionQuotation
	{
		public Option(OptionPair rootPair, string optionNumber, string optionCode)
			: base(optionNumber)
		{
            if (rootPair != null)
            {
                RootPair = rootPair;
                SecurityCode = rootPair.SecurityCode;
            }
            OptionCode = optionCode;
		}

		public string OptionCode { get; private set; }

		public OptionPair RootPair { get; private set; }

		public LegType LegType { get; set; }
		
		public long OpenInterest { get; set; }

		public double PreviousClose { get; set; }
		// in Chinese.
		public string Name { get; set; }
       
        // Additional attributes from OptionBasicInformation
        public OptionType TypeOfOption { get; set; }
        public decimal LimitDownPrice { get; set; }
        public decimal LimitUpPrice { get; set; }
        public long OptionUnit { get; set; }
        public string OptionUnderlyingCode { get; set; }
        public string OptionUnderlyingName { get; set; }
	}
}
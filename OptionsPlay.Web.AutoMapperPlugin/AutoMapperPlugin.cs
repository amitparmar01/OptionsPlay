using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using OptionsPlay.BusinessLogic.Common.Entities;
using OptionsPlay.Web.ViewModels.MarketData;
using OptionsPlay.DAL.SZKingdom.Common.Enums;
namespace OptionsPlay.Web.AutoMapperPlugin
{
    public class AutoMapperPlugin
    {
        public static OptionChainViewModel AutoMapperConverterOptionChain(OptionChain optionChain)
        {
            OptionChainViewModel ocvm = new OptionChainViewModel();
            List<OptionPair> interVariable = optionChain.ToList();
            List<OptionPairViewModel> resVariable = new List<OptionPairViewModel>();

            for (int i = 0; i < interVariable.Count; i++)
            {

                OptionPairViewModel opvm = new OptionPairViewModel();
                OptionViewModel CallOption = new OptionViewModel();
                opvm.CallOption = CallOption;
                OptionViewModel PutOption = new OptionViewModel();
                opvm.PutOption = PutOption;
                DateAndNumberOfDaysUntilViewModel expire = new DateAndNumberOfDaysUntilViewModel();
                opvm.Expiry = expire;
                //convert type option named CallOption into  type OptionPairViewModel named CallOption 
                opvm.CallOption.Ask = interVariable[i].CallOption.Ask;
                opvm.CallOption.Ask2 = interVariable[i].CallOption.Ask2;
                opvm.CallOption.Ask3 = interVariable[i].CallOption.Ask3;
                opvm.CallOption.Ask4 = interVariable[i].CallOption.Ask4;
                opvm.CallOption.Ask5 = interVariable[i].CallOption.Ask5;
                opvm.CallOption.AskVolume = interVariable[i].CallOption.AskVolume;
                opvm.CallOption.AskVolume2 = interVariable[i].CallOption.AskVolume2;
                opvm.CallOption.AskVolume3 = interVariable[i].CallOption.AskVolume3;
                opvm.CallOption.AskVolume4 = interVariable[i].CallOption.AskVolume4;
                opvm.CallOption.AskVolume5 = interVariable[i].CallOption.AskVolume5;
                opvm.CallOption.AuctionReferencePrice = interVariable[i].CallOption.AuctionReferencePrice;
                opvm.CallOption.AuctionReferenceQuantity = interVariable[i].CallOption.AuctionReferenceQuantity;
                opvm.CallOption.Bid = interVariable[i].CallOption.Bid;
                opvm.CallOption.Bid2 = interVariable[i].CallOption.Bid2;
                opvm.CallOption.Bid3 = interVariable[i].CallOption.Bid3;
                opvm.CallOption.Bid4 = interVariable[i].CallOption.Bid4;
                opvm.CallOption.Bid5 = interVariable[i].CallOption.Bid5;
                opvm.CallOption.BidVolume = interVariable[i].CallOption.BidVolume;
                opvm.CallOption.BidVolume2 = interVariable[i].CallOption.BidVolume2;
                opvm.CallOption.BidVolume3 = interVariable[i].CallOption.BidVolume3;
                opvm.CallOption.BidVolume4 = interVariable[i].CallOption.BidVolume4;
                opvm.CallOption.BidVolume5 = interVariable[i].CallOption.BidVolume5;
                opvm.CallOption.Change = interVariable[i].CallOption.Change;
                opvm.CallOption.ChangePercentage = interVariable[i].CallOption.ChangePercentage;
                opvm.CallOption.Greeks = interVariable[i].CallOption.Greeks;
                opvm.CallOption.HighestPrice = interVariable[i].CallOption.HighestPrice;
                opvm.CallOption.LatestTradedPrice = interVariable[i].CallOption.LatestTradedPrice;
                opvm.CallOption.LimitDownPrice = interVariable[i].CallOption.LimitDownPrice;
                opvm.CallOption.LimitUpPrice = interVariable[i].CallOption.LimitUpPrice;
                opvm.CallOption.LowestPrice = interVariable[i].CallOption.LowestPrice;
                opvm.CallOption.Name = interVariable[i].CallOption.Name;
                opvm.CallOption.OpeningPrice = interVariable[i].CallOption.OpeningPrice;
                opvm.CallOption.OpenInterest = interVariable[i].CallOption.OpenInterest;
                opvm.CallOption.OptionCode = interVariable[i].CallOption.OptionCode;
                opvm.CallOption.OptionName = interVariable[i].CallOption.OptionName;
                opvm.CallOption.OptionNumber = interVariable[i].CallOption.OptionNumber;
                opvm.CallOption.OptionUnderlyingCode = interVariable[i].CallOption.OptionUnderlyingCode;
                opvm.CallOption.OptionUnderlyingName = interVariable[i].CallOption.OptionUnderlyingName;
                opvm.CallOption.OptionUnit = interVariable[i].CallOption.OptionUnit;
                opvm.CallOption.PreviousClose = interVariable[i].CallOption.PreviousClose;
                opvm.CallOption.PreviousSettlementPrice = interVariable[i].CallOption.PreviousSettlementPrice;
                opvm.CallOption.SecurityCode = interVariable[i].CallOption.SecurityCode;
                opvm.CallOption.TradeDate = interVariable[i].CallOption.TradeDate;
                opvm.CallOption.Turnover = interVariable[i].CallOption.Turnover;
                opvm.CallOption.TypeOfOption = interVariable[i].CallOption.TypeOfOption;
                opvm.CallOption.UncoveredPositionQuantity = interVariable[i].CallOption.UncoveredPositionQuantity;
                opvm.CallOption.Volume = interVariable[i].CallOption.Volume;
                //convert type option named PutOption into  type OptionPairViewModel named PutOption
                opvm.PutOption.Ask = interVariable[i].PutOption.Ask;
                opvm.PutOption.Ask2 = interVariable[i].PutOption.Ask2;
                opvm.PutOption.Ask3 = interVariable[i].PutOption.Ask3;
                opvm.PutOption.Ask4 = interVariable[i].PutOption.Ask4;
                opvm.PutOption.Ask5 = interVariable[i].PutOption.Ask5;
                opvm.PutOption.AskVolume = interVariable[i].PutOption.AskVolume;
                opvm.PutOption.AskVolume2 = interVariable[i].PutOption.AskVolume2;
                opvm.PutOption.AskVolume3 = interVariable[i].PutOption.AskVolume3;
                opvm.PutOption.AskVolume4 = interVariable[i].PutOption.AskVolume4;
                opvm.PutOption.AskVolume5 = interVariable[i].PutOption.AskVolume5;
                opvm.PutOption.AuctionReferencePrice = interVariable[i].PutOption.AuctionReferencePrice;
                opvm.PutOption.AuctionReferenceQuantity = interVariable[i].PutOption.AuctionReferenceQuantity;
                opvm.PutOption.Bid = interVariable[i].PutOption.Bid;
                opvm.PutOption.Bid2 = interVariable[i].PutOption.Bid2;
                opvm.PutOption.Bid3 = interVariable[i].PutOption.Bid3;
                opvm.PutOption.Bid4 = interVariable[i].PutOption.Bid4;
                opvm.PutOption.Bid5 = interVariable[i].PutOption.Bid5;
                opvm.PutOption.BidVolume = interVariable[i].PutOption.BidVolume;
                opvm.PutOption.BidVolume2 = interVariable[i].PutOption.BidVolume2;
                opvm.PutOption.BidVolume3 = interVariable[i].PutOption.BidVolume3;
                opvm.PutOption.BidVolume4 = interVariable[i].PutOption.BidVolume4;
                opvm.PutOption.BidVolume5 = interVariable[i].PutOption.BidVolume5;
                opvm.PutOption.Change = interVariable[i].PutOption.Change;
                opvm.PutOption.ChangePercentage = interVariable[i].PutOption.ChangePercentage;
                opvm.PutOption.Greeks = interVariable[i].PutOption.Greeks;
                opvm.PutOption.HighestPrice = interVariable[i].PutOption.HighestPrice;
                opvm.PutOption.LatestTradedPrice = interVariable[i].PutOption.LatestTradedPrice;
                opvm.PutOption.LimitDownPrice = interVariable[i].PutOption.LimitDownPrice;
                opvm.PutOption.LimitUpPrice = interVariable[i].PutOption.LimitUpPrice;
                opvm.PutOption.Name = interVariable[i].PutOption.Name;
                opvm.PutOption.OpeningPrice = interVariable[i].PutOption.OpeningPrice;
                opvm.PutOption.OpenInterest = interVariable[i].PutOption.OpenInterest;
                opvm.PutOption.OptionCode = interVariable[i].PutOption.OptionCode;
                opvm.PutOption.OptionName = interVariable[i].PutOption.OptionName;
                opvm.PutOption.OptionNumber = interVariable[i].PutOption.OptionNumber;
                opvm.PutOption.OptionUnderlyingCode = interVariable[i].PutOption.OptionUnderlyingCode;
                opvm.PutOption.OptionUnderlyingName = interVariable[i].PutOption.OptionUnderlyingName;
                opvm.PutOption.OptionUnit = interVariable[i].PutOption.OptionUnit;
                opvm.PutOption.PreviousClose = interVariable[i].PutOption.PreviousClose;
                opvm.PutOption.PreviousSettlementPrice = interVariable[i].PutOption.PreviousSettlementPrice;
                opvm.PutOption.SecurityCode = interVariable[i].PutOption.SecurityCode;
                opvm.PutOption.TradeDate = interVariable[i].PutOption.TradeDate;
                opvm.PutOption.Turnover = interVariable[i].PutOption.Turnover;
                opvm.PutOption.TypeOfOption = interVariable[i].PutOption.TypeOfOption;
                opvm.PutOption.UncoveredPositionQuantity = interVariable[i].PutOption.UncoveredPositionQuantity;
                opvm.PutOption.Volume = interVariable[i].PutOption.Volume;
                //Convert named Expiry belonging to OpitonPairViewModel into DateAndNumberOfDaysUntil belonging to Entities
                opvm.Expiry.Date = interVariable[i].Expiry.FutureDate;
                opvm.Expiry.TotalNumberOfDaysUntilExpiry = interVariable[i].Expiry.TotalNumberOfDaysUntilExpiry;
                //
                opvm.PremiumMultiplier = interVariable[i].PremiumMultiplier;
                opvm.SecurityCode = interVariable[i].SecurityCode;
                opvm.SecurityName = interVariable[i].SecurityName;
                opvm.StrikePrice = interVariable[i].StrikePrice;

                resVariable.Add(opvm);

            }

            List<decimal> StrikePrices = new List<decimal>();
            for (int i = 0; i < optionChain.StrikePrices.Count; i++)
            {
                StrikePrices.Add(decimal.Parse(optionChain.StrikePrices[i].ToString()));
            }

            List<DateAndNumberOfDaysUntilViewModel> ExpirationDates = new List<DateAndNumberOfDaysUntilViewModel>();
            for (int i = 0; i < optionChain.ExpirationDates.Count; i++)
            {
                DateAndNumberOfDaysUntilViewModel dnduvm = new DateAndNumberOfDaysUntilViewModel();
                dnduvm.Date = optionChain.ExpirationDates[i].FutureDate;
                dnduvm.TotalNumberOfDaysUntilExpiry = optionChain.ExpirationDates[i].TotalNumberOfDaysUntilExpiry;
                ExpirationDates.Add(dnduvm);
            }

            double UnderlyingCurrentPrice = optionChain.UnderlyingCurrentPrice;
            ocvm.Chains = resVariable;
            ocvm.ExpirationDates = ExpirationDates;
            ocvm.StrikePrices = StrikePrices;
            ocvm.UnderlyingCurrentPrice = UnderlyingCurrentPrice;
            //result.Chains = optionChain.ToList();
            return ocvm;

        }
        public static SecurityQuotationViewModel AutoMapperConverterSecurityQuotation(SecurityQuotation securityQuotation)
        {
            SecurityQuotationViewModel result = new SecurityQuotationViewModel();
            result.BuyPrice2 = securityQuotation.BuyPrice2;
            result.BuyPrice3 = securityQuotation.BuyPrice3;
            result.BuyPrice4 = securityQuotation.BuyPrice4;
            result.BuyPrice5 = securityQuotation.BuyPrice5;
            result.BuyVolume1 = securityQuotation.BuyVolume1;
            result.BuyVolume2 = securityQuotation.BuyVolume2;
            result.BuyVolume3 = securityQuotation.BuyVolume3;
            result.BuyVolume4 = securityQuotation.BuyVolume4;
            result.BuyVolume5 = securityQuotation.BuyVolume5;
            result.Currency = securityQuotation.Currency.ToString();
            result.CurrentAskPrice = securityQuotation.CurrentAskPrice;
            result.CurrentBidPrice = securityQuotation.CurrentBidPrice;
            result.HasOptions = securityQuotation.HasOptions;
            result.HighPrice = securityQuotation.HighPrice;
            result.LastPrice = securityQuotation.LastPrice;
            result.LimitDownPrice = securityQuotation.LimitDownPrice;
            result.LimitUpPrice = securityQuotation.LimitUpPrice;
            result.LotFlag = securityQuotation.LotFlag.ToString();
            result.LotSize = long.Parse(securityQuotation.LotSize.ToString());
            result.LowPrice = securityQuotation.LowPrice;
            result.OpenPrice = securityQuotation.OpenPrice;
            result.PERatio = securityQuotation.PERatio;
            result.PreviousClose = securityQuotation.PreviousClose;
            result.SecurityClass = securityQuotation.SecurityClass;
            result.SecurityCode = securityQuotation.SecurityCode;
            result.SecurityLevel = securityQuotation.SecurityLevel;
            result.SecurityName = securityQuotation.SecurityName;
            result.SecurityStatus = securityQuotation.SecurityStatus.ToString();
            result.SecuritySubClass = securityQuotation.SecuritySubClass;
            result.SellPrice2 = securityQuotation.SellPrice2;
            result.SellPrice3 = securityQuotation.SellPrice3;
            result.SellPrice4 = securityQuotation.SellPrice4;
            result.SellPrice5 = securityQuotation.SellPrice5;
            result.SellVolume1 = securityQuotation.SellVolume1;
            result.SellVolume2 = securityQuotation.SellVolume2;
            result.SellVolume3 = securityQuotation.SellVolume3;
            result.SellVolume4 = securityQuotation.SellVolume4;
            result.SellVolume5 = securityQuotation.SellVolume5;
            result.StockExchange = securityQuotation.StockExchange.ToString();
            result.SuspendedFlag = securityQuotation.SuspendedFlag.ToString();
            result.TradeDate = securityQuotation.TradeDate;
            result.TradeSector = securityQuotation.TradeSector.DisplayName;
            result.Turnover = securityQuotation.Turnover;
            result.UnderlyinSecurityCode = securityQuotation.UnderlyinSecurityCode;
            result.Volume = securityQuotation.Volume;




            return result;
        }


    }
}

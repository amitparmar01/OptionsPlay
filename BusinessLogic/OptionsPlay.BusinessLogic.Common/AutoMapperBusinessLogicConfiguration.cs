using System;
using AutoMapper;
using OptionsPlay.Model;

namespace OptionsPlay.BusinessLogic.Common
{
	public static class AutoMapperBusinessLogicConfigurator
	{
		public static void Configure()
		{
			Mapper.CreateMap<StockQuoteInfo, HistoricalQuote>()
				.ForMember(h => h.StockCode, m => m.MapFrom(s => s.SecurityCode))
				.ForMember(h => h.StockName, m => m.MapFrom(s => s.SecurityName))
				//.ForMember(h => h.TradeDate, m => m.MapFrom(s => DateTime.UtcNow.Date))
                .ForMember(h => h.TradeDate, m => m.MapFrom(s => s.TradeDate))
				.ForMember(h => h.SourceType, m => m.Ignore())
				.ForMember(h => h.PriceAscend, m => m.Ignore())
				.ForMember(h => h.OpenPrice, m => m.MapFrom(s => s.OpenPrice))
				.ForMember(h => h.MatchSum, m => m.Ignore())
				.ForMember(h => h.MatchQuantity, m => m.MapFrom(s => s.Volume))
				.ForMember(h => h.MarketCode, m => m.Ignore())
				.ForMember(h => h.LowPrice, m => m.MapFrom(s => s.LowPrice))
				.ForMember(h => h.LastModify, m => m.MapFrom(s => DateTime.UtcNow))
				.ForMember(h => h.LastClosePrice, m => m.MapFrom(s => s.PreviousClose))
				.ForMember(h => h.HighPrice, m => m.MapFrom(s => s.HighPrice))
				.ForMember(h => h.DealPieces, m => m.Ignore())
				.ForMember(h => h.ClosePrice, m => m.MapFrom(s => s.LastPrice));
		}
	}
}

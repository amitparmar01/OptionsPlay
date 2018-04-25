using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using OptionsPlay.BusinessLogic.Common;
using OptionsPlay.BusinessLogic.Common.Entities;
using OptionsPlay.Common.ObjectJsonSerialization;
using OptionsPlay.Common.Utilities;
using OptionsPlay.DAL.SZKingdom.Common.Entities;
using OptionsPlay.DAL.SZKingdom.Common.Enums;
using OptionsPlay.Model;
using OptionsPlay.TechnicalAnalysis.Entities;
using OptionsPlay.Web.ViewModels.Configuration;
using OptionsPlay.Web.ViewModels.MarketData;
using OptionsPlay.Web.ViewModels.MarketData.Order;
using OptionsPlay.Web.ViewModels.MarketData.SZKingdom;
using OptionsPlay.Web.ViewModels.Math;
using OptionsPlay.Web.ViewModels.ViewModels.MarketData;
using System.Globalization;
using OptionsPlay.MarketData.Common;
using OptionsPlay.Web.ViewModels.ViewModels.Signals;

namespace OptionsPlay.Web.ViewModels.Providers
{

    /// <summary>
    /// Try not to use <see cref="AutomapperExtensions.IgnoreAllNonExisting{TSource,TDestination}"/> extension in your mappings.
    /// better to explicitly exclude particular field from mapping if you don't want it to be set:
    /// <example>
    /// Mapper.CreateMap{Model, ViewModel>().ForMember(vm => vm.FieldIDontWantToBeSet, e => e.Ignore());
    /// </example>
    /// Using <see cref="AutomapperExtensions.IgnoreAllNonExisting{TSource,TDestination}"/> extension might hide bugs in your mapping logic.
    /// </summary>
    public static class AutoMapperWebConfiguration
    {
        public static void Configure()
        {
            ConfigureMarketDataMapping();
            ConfigureConfigurationMapping();
            ConfigureStrategiesMapping();
            ConfigureBusinessLogicMarketDataMapping();
            ConfigureMathEntitiesMapping();
            ConfigureSignalsMapping();

            AutoMapperBusinessLogicConfigurator.Configure();

            Mapper.AssertConfigurationIsValid();
        }

        private static void ConfigureMarketDataMapping()
        {
            Mapper.CreateMap<HistoricalQuote, HistoricalQuoteViewModel>();

            Mapper.CreateMap<SecurityInformation, SecurityInformationViewModel>();
            Mapper.CreateMap<OptionBasicInformation, OptionBasicInformationViewModel>();
            Mapper.CreateMap<OptionBasicInformation, OptionQuotation>().IgnoreAllNonExisting();
            //TODO: Need verification-----------------------------------------------------------------------------------
            Mapper.CreateMap<OptionQuoteInfo, OptionQuotationInformationViewModel>()
                .ForMember(vm => vm.PreviousClosingPrice, e => e.MapFrom(q => q.PreviousSettlementPrice))
                .ForMember(vm => vm.PreviousSettlementPrice, e => e.MapFrom(q => q.PreviousSettlementPrice))
                .ForMember(vm => vm.TotalAmount, e => e.MapFrom(q => q.Turnover))
                .ForMember(vm => vm.CurrentPrice, e => e.MapFrom(q => q.LatestTradedPrice))
                .IgnoreAllNonExisting();

            Mapper.CreateMap<OptionQuoteInfo, OptionQuotationInformationPerMinuteViewModel>()
                .ForMember(vm => vm.OptionNumber, e => e.MapFrom(q => q.OptionNumber))
                .ForMember(vm => vm.LatestTradedPrice, e => e.MapFrom(q => q.LatestTradedPrice))
                .ForMember(vm => vm.TradeDate, e => e.MapFrom(q => string.Format("{0:yyyy-MM-dd HH:mm}", q.TradeDate.ToLocalTime().ToString())))
                .ForMember(vm => vm.TradeQuantity, e => e.MapFrom(q => q.TradeQuantity))
                .IgnoreAllNonExisting();

            Mapper.CreateMap<StockQuoteInfo, StockQuotationInformationPerMinuteViewModel>()
              .ForMember(vm => vm.SecurityCode, e => e.MapFrom(q => q.SecurityCode))
              .ForMember(vm => vm.TradeDate, e => e.MapFrom(q => string.Format("{0:yyyy-MM-dd HH:mm}", q.TradeDate.ToLocalTime())))
              .ForMember(vm => vm.Volume, e => e.MapFrom(q => q.Volume))
              .ForMember(vm => vm.LastPrice, e => e.MapFrom(q => q.LastPrice))
              .ForMember(vm => vm.PreviousClose, e => e.MapFrom(q => q.PreviousClose))
              .IgnoreAllNonExisting();


            Mapper.CreateMap<OptionQuotation, OptionViewModel>()
                .ForMember(vm => vm.Name, e => e.MapFrom(q => q.OptionName))
                .IgnoreAllNonExisting();

            Mapper.CreateMap<OptionQuoteInfo, OptionViewModel>().IgnoreAllNonExisting();

            Mapper.CreateMap<OptionQuotation, Option>().IgnoreAllNonExisting();

            //Mapper.CreateMap<OptionQuotation, Option>()
            //    .ForMember(vm => vm.OptionCode, e => e.MapFrom(q => q.OptionCode))
            //    .ForMember(vm => vm.OptionName, e => e.MapFrom(q => q.OptionName))
            //    .IgnoreAllNonExisting();

            Mapper.CreateMap<OptionPair, OptionPairViewModel>();
            Mapper.CreateMap<Option, OptionViewModel>();
            Mapper.CreateMap<DateAndNumberOfDaysUntil, DateAndNumberOfDaysUntilViewModel>()
                .ForMember(vm => vm.Date, e => e.MapFrom(m => m.FutureDate));
            Mapper.CreateMap<OptionChain, OptionChainViewModel>()
                .ForMember(vm => vm.Chains, m => m.MapFrom(dm => dm.ToList()));

            Mapper.CreateMap<SecurityQuotation, SecurityQuotationViewModel>().IncludeEntityResponse().IgnoreAllNonExisting();

            Mapper.CreateMap<OptionPositionInformation, OptionPositionViewModel>()
                .ForMember(vm => vm.IsCovered, m => m.MapFrom(dm => dm.OptionCoveredFlag == OptionCoveredFlag.Uncovered))
                .IgnoreAllNonExisting();
            Mapper.CreateMap<OptionType, string>().ConvertUsing(r => r.DisplayName);
            Mapper.CreateMap<OptionSide, string>().ConvertUsing(r => r.DisplayName);
            Mapper.CreateMap<OptionCoveredFlag, string>().ConvertUsing(r => r.DisplayName);

            Mapper.CreateMap<StockClass, string>().ConvertUsing(r => r.DisplayName);
            Mapper.CreateMap<FundStatus, string>().ConvertUsing(r => r.DisplayName);
            Mapper.CreateMap<FundInformation, FundViewModel>()
                // set manually in PortfolioOrchestrator
                .ForMember(vm => vm.FloatingPL, e => e.Ignore())
                .ForMember(vm => vm.UsedMargin, e => e.Ignore())
                .ForMember(vm => vm.MarginRate, e => e.Ignore());

            Mapper.CreateMap<OptionableStockPositionInformation, PortfolioStock>()
                // todo: adjust ViewModel class to simplify the PortfolioItemViewModel structure.
                .ForMember(vm => vm.UnderlyingCode, e => e.MapFrom(s => s.SecurityCode))
                .ForMember(vm => vm.UnderlyingName, e => e.MapFrom(s => s.SecurityName))
                .ForMember(vm => vm.SecurityName, e => e.MapFrom(s => s.SecurityName))
                //.ForMember(vm => vm.OptionName, e => e.MapFrom(s => s.SecurityName))
                //.ForMember(vm => vm.OptionNumber, e => e.MapFrom(s => s.SecurityCode))
                .ForMember(vm => vm.OptionSide, e => e.MapFrom(s => s.AvailableBalance > 0 ? 'L' : 'S'))
                .IgnoreAllNonExisting();

            Mapper.CreateMap<BasePortfolioItemGroup, BasePortfolioItemGroupViewModel>()
                .Include<StockPortfolioItemGroup, StockPortfolioItemGroupViewModel>()
                .Include<StrategyPortfolioItemGroup, StrategyPortfolioItemGroupViewModel>();

            Mapper.CreateMap<StockPortfolioItemGroup, StockPortfolioItemGroupViewModel>()
                .IgnoreAllNonExisting();
            Mapper.CreateMap<StrategyPortfolioItemGroup, StrategyPortfolioItemGroupViewModel>()
                .IgnoreAllNonExisting();

            Mapper.CreateMap<PortfolioItem, PortfolioItemViewModel>()
                .Include<PortfolioStock, PortfolioStockViewModel>()
                .Include<PortfolioOption, PortfolioOptionViewModel>()
                .IgnoreAllNonExisting();
            Mapper.CreateMap<PortfolioStock, PortfolioStockViewModel>()
                .IgnoreAllNonExisting();
            Mapper.CreateMap<PortfolioOption, PortfolioOptionViewModel>()
                .IgnoreAllNonExisting();

            Mapper.CreateMap<Greeks, GreeksViewModel>()
                .IgnoreAllNonExisting();
            Mapper.CreateMap<PortfolioGreeks, GreeksViewModel>()
                .IgnoreAllNonExisting();
            Mapper.CreateMap<ComplexGreeks, GreeksViewModel>()
                .IgnoreAllNonExisting();

            Mapper.CreateMap<OptionPositionInformation, PortfolioItem>()
                .ForMember(vm => vm.IsCovered, m => m.MapFrom(dm => dm.OptionCoveredFlag == OptionCoveredFlag.Uncovered))
                .IgnoreAllNonExisting();
            Mapper.CreateMap<OptionPositionInformation, PortfolioOption>()
                .ForMember(vm => vm.IsCovered, m => m.MapFrom(dm => dm.OptionCoveredFlag == OptionCoveredFlag.Uncovered))
                .IgnoreAllNonExisting();


            Mapper.CreateMap<SecurityInformation, CompanyViewModel>()
                .ForMember(vm => vm.HasOptions, e => e.Ignore());

            Mapper.CreateMap<OptionOrderInformation, OptionOrderViewModel>();
            Mapper.CreateMap<HistoricalOptionOrderInformation, HistoricalOrderViewModel>().IgnoreAllNonExisting();
            Mapper.CreateMap<HistoricalOptionTradeInformation, HistoricalTradeViewModel>().IgnoreAllNonExisting();

            Mapper.CreateMap<OrderStatus, string>().ConvertUsing(r => r.DisplayName);
            Mapper.CreateMap<OrderValidFlag, string>().ConvertUsing(r => r.DisplayName);
            Mapper.CreateMap<Currency, string>().ConvertUsing(r => r.DisplayName);
            Mapper.CreateMap<IsWithdraw, bool>().ConvertUsing(r => r == IsWithdraw.Withdraw);
            Mapper.CreateMap<IsWithdrawn, bool>().ConvertUsing(r => r == IsWithdrawn.Withdrawn);
            Mapper.CreateMap<AutoExerciseControl, bool>().ConvertUsing(r => r == AutoExerciseControl.AutoExercise);
            Mapper.CreateMap<bool, AutoExerciseControl>()
                .ConvertUsing(r => r ? AutoExerciseControl.AutoExercise : AutoExerciseControl.NotAutoExercise);
            Mapper.CreateMap<MatchedType, string>().ConvertUsing(r => r.DisplayName);
            Mapper.CreateMap<IntradayOptionOrderInformation, IntradayOrderViewModel>();
            Mapper.CreateMap<IntradayOptionTradeInformation, IntradayTradeViewModel>().IgnoreAllNonExisting();
            Mapper.CreateMap<CustomerAutomaticOptionExercisingInformation, CustomerAutomaticOptionExercisingViewModel>();
            Mapper.CreateMap<CustomerAutomaticOptionExercisingViewModel, CustomerAutomaticOptionExercisingInformation>()
                .IgnoreAllNonExisting();

            Mapper.CreateMap<Greeks, GreeksViewModel>();
        }

        private static void ConfigureBusinessLogicMarketDataMapping()
        {
            Mapper.CreateMap<SecurityInformation, SecurityInformationCache>()
                .ForMember(si => si.Id, m => m.Ignore());
            Mapper.CreateMap<SecurityInformationCache, SecurityInformation>();
            Mapper.CreateMap<OptionBasicInformation, OptionBasicInformationCache>()
                .ForMember(si => si.Id, m => m.Ignore());
            Mapper.CreateMap<OptionBasicInformationCache, OptionBasicInformation>();

            Mapper.CreateMap<string, StockExchange>().ConvertUsing<TypeSafeEnumConverter<StockExchange>>();
            Mapper.CreateMap<string, OptionType>().ConvertUsing<TypeSafeEnumConverter<OptionType>>();
            Mapper.CreateMap<string, StockClass>().ConvertUsing<TypeSafeEnumConverter<StockClass>>();
            Mapper.CreateMap<string, OptionExecuteType>().ConvertUsing<TypeSafeEnumConverter<OptionExecuteType>>();
            Mapper.CreateMap<string, SuspendedFlag>().ConvertUsing<TypeSafeEnumConverter<SuspendedFlag>>();
            Mapper.CreateMap<string, StockStatus>().ConvertUsing<TypeSafeEnumConverter<StockStatus>>();
            Mapper.CreateMap<string, Currency>().ConvertUsing<TypeSafeEnumConverter<Currency>>();
            Mapper.CreateMap<string, LotFlag>().ConvertUsing<TypeSafeEnumConverter<LotFlag>>();
            Mapper.CreateMap<string, MarketValueFlag>().ConvertUsing<TypeSafeEnumConverter<MarketValueFlag>>();
            Mapper.CreateMap<string, StockBoard>().ConvertUsing<TypeSafeEnumConverter<StockBoard>>();

            Mapper.CreateMap<SecurityInformation, SecurityQuotation>().IgnoreAllNonExisting();

            Mapper.CreateMap<StockQuoteInfo, SecurityQuotation>().IgnoreAllNonExisting();
        }

        private static void ConfigureConfigurationMapping()
        {
            Mapper.CreateMap<ConfigDirectory, ConfigDirectoryViewModel>()
                .ForMember(vm => vm.ParentId, m => m.MapFrom(dm => dm.ParentDirectory.Id))
                .ForMember(vm => vm.ConfigValues, m => m.MapFrom(dm => dm.ChildValues))
                .ForMember(vm => vm.ChildDirectories, m => m.MapFrom(dm => dm.ChildDirectories));
            Mapper.CreateMap<ConfigDirectory, ConfigDirectoryReferenceViewModel>();
            Mapper.CreateMap<ConfigValue, ConfigValueViewModel>()
                .ForMember(vm => vm.ParentSectionId, m => m.MapFrom(dm => dm.ParentDirectory.Id))
                .ForMember(vm => vm.Type, m => m.MapFrom(dm => dm.SettingTypeString))
                .ForMember(vm => vm.Value, m => m.MapFrom(dm => dm.GetValue()))
                // todo: enum fields to be mapped here
                .ForMember(vm => vm.AllowedValues, m => m.Ignore());
            Mapper.CreateMap<ConfigValueUpdateViewModel, ConfigValue>().ConvertUsing(model =>
            {
                ConfigValue configValue = new ConfigValue();

                configValue.Id = model.Id;
                configValue.Description = model.Description;
                configValue.SettingTypeString = model.Type;
                configValue.SetValue(model.Value, model.GetValueType());

                return configValue;
            });
            Mapper.CreateMap<ConfigDirectoryUpdateViewModel, ConfigDirectory>().IgnoreAllNonExisting();
        }

        private static void ConfigureStrategiesMapping()
        {
            Mapper.CreateMap<Strategy, StrategyForDisplay>()
                .ForMember(vm => vm.PairStrategyName, m => m.Ignore());
            Mapper.CreateMap<StrategyDetail, StrategyDetailForDisplay>();
            Mapper.CreateMap<StrategyLeg, StrategyLegForDisplay>();
            Mapper.CreateMap<StrategyGroup, StrategyGroupForDisplay>()
                .ForMember(vm => vm.CallStrategyName, m => m.MapFrom(dm => dm.CallStrategy.Name))
                .ForMember(vm => vm.PutStrategyName, m => m.MapFrom(dm => dm.PutStrategy.Name))
                .ForMember(vm => vm.ThumbnailImage, m => m.ResolveUsing(dm => GetImageSrc(dm.ThumbnailImage)));

            Mapper.CreateMap<Strategy, StrategyViewModel>()
                .ForMember(vm => vm.PairStrategyOptions, m => m.Ignore());
            Mapper.CreateMap<StrategyDetail, StrategyDetailViewModel>()
                .ForMember(vm => vm.RiskOptions, m => m.Ignore())
                .ForMember(vm => vm.SentimentOptions, m => m.Ignore());
            Mapper.CreateMap<StrategyLeg, StrategyLegViewModel>()
                .ForMember(vm => vm.BuyOrSellOptions, m => m.Ignore())
                .ForMember(vm => vm.LegTypeOptions, m => m.Ignore());

            Mapper.CreateMap<StrategyGroup, StrategyGroupViewModel>()
                .ForMember(vm => vm.ImageFile, m => m.Ignore())
                .ForMember(vm => vm.CurrentImage, m => m.ResolveUsing(dm => GetImageSrc(dm.OriginalImage)))
                .ForMember(vm => vm.StrategyOptions, m => m.Ignore());

            Mapper.CreateMap<StrategyGroupViewModel, StrategyGroup>()
                .ForMember(dm => dm.OriginalImage, m => m.Ignore())
                .ForMember(dm => dm.ThumbnailImage, m => m.Ignore())
                .ForMember(dm => dm.CallStrategy, m => m.Ignore())
                .ForMember(dm => dm.PutStrategy, m => m.Ignore());
        }

        private static void ConfigureMathEntitiesMapping()
        {
            Mapper.CreateMap<Prediction, PredictionViewModel>().ConvertUsing(ConvertToViewModel);
            Mapper.CreateMap<DateAndStandardDeviation, DateAndStandardDeviationViewModel>()
                .ForMember(vm => vm.DateAndNumberOfDaysUntil, e => e.MapFrom(m => m.DateAndNumberOfDaysUntil))
                .ForMember(vm => vm.StdDevDown, e => e.MapFrom(m => m.StdDev.DownPrice))
                .ForMember(vm => vm.StdDevUp, e => e.MapFrom(m => m.StdDev.UpPrice))
                .ForMember(vm => vm.Deviation, e => e.MapFrom(m => m.StdDev.Deviation));
            Mapper.CreateMap<DateAndStandardDeviations, DateAndDefaultStandardDeviationsViewModel>()
                .ConvertUsing(ConvertToViewModel);
            Mapper.CreateMap<CoveredCall, CoveredCallViewModel>();
        }

        private static void ConfigureSignalsMapping()
        {
            Mapper.CreateMap<SupportAndResistance, SupportAndResistanceViewModel>().ConvertUsing(model =>
            {
                if (model == null)
                {
                    return null;
                }
                SupportAndResistanceViewModel viewModel = new SupportAndResistanceViewModel();

                List<SupportAndResistanceValueViewModel> support = new List<SupportAndResistanceValueViewModel>();
                List<SupportAndResistanceValueViewModel> resistance = new List<SupportAndResistanceValueViewModel>();
                List<SupportAndResistanceValueViewModel> gapResistance = new List<SupportAndResistanceValueViewModel>();
                List<SupportAndResistanceValueViewModel> gapSupport = new List<SupportAndResistanceValueViewModel>();

                foreach (SupportAndResistanceValue value in model.Values)
                {
                    SupportAndResistanceValueViewModel valueViewModel = Map(value);
                    switch (value.Type)
                    {
                        case SupportAndResistanceValueType.MajorSupport:
                            support.Add(valueViewModel);
                            break;
                        case SupportAndResistanceValueType.MajorResistance:
                            resistance.Add(valueViewModel);
                            break;
                        case SupportAndResistanceValueType.GapSupport:
                            gapSupport.Add(valueViewModel);
                            break;
                        case SupportAndResistanceValueType.GapResistance:
                            gapResistance.Add(valueViewModel);
                            break;
                        default:
                            throw new ArgumentOutOfRangeException();
                    }
                }

                support.SortDescending(vm => vm.Value);
                resistance.Sort(vm => vm.Value);
                gapSupport.SortDescending(vm => vm.Value);
                gapResistance.Sort(vm => vm.Value);

                viewModel.Support = support;
                viewModel.Resistance = resistance;
                viewModel.GapSupport = gapSupport;
                viewModel.GapResistance = gapResistance;

                return viewModel;
            });
        }

        #region Custom Converters

        private static PredictionViewModel ConvertToViewModel(Prediction model)
        {
            if (model == null)
            {
                return null;
            }

            PredictionViewModel viewModel = new PredictionViewModel
            {
                DaysInFuture = model.DaysInFuture,
                Prices = new List<double>(),
                Probabilities = new List<double>()
            };

            if (model.Prices.IsNullOrEmpty() || model.Probabilities.IsNullOrEmpty())
            {
                return viewModel;
            }

            for (int i = 0; i < model.Prices.Count; i++)
            {
                if (model.Probabilities[i] > 1e-5)
                {
                    viewModel.Prices.Add(model.Prices[i]);
                    viewModel.Probabilities.Add(model.Probabilities[i]);
                }
            }

            return viewModel;
        }

        private static DateAndDefaultStandardDeviationsViewModel ConvertToViewModel(DateAndStandardDeviations model)
        {
            if (model == null)
            {
                return null;
            }

            DateAndDefaultStandardDeviationsViewModel viewModel = new DateAndDefaultStandardDeviationsViewModel();

            viewModel.DateAndNumberOfDaysUntil = Mapper.Map<DateAndNumberOfDaysUntilViewModel>(model.DateAndNumberOfDaysUntil);
            int cnt = model.StdDevPrices.Count;

            double[] stdDevPricesArr = new double[cnt * 2];

            if (model.StdDevPrices != null)
            {
                for (int i = 0; i < cnt; i++)
                {
                    StdDevPrices stdDevPrices = model.StdDevPrices[i];
                    stdDevPricesArr[cnt - i - 1] = stdDevPrices.DownPrice;
                    stdDevPricesArr[cnt + i] = stdDevPrices.UpPrice;
                }
            }

            viewModel.StdDevPrices = stdDevPricesArr.ToList();
            return viewModel;
        }

        private static string GetImageSrc(Image image)
        {
            string imageSrc = image != null
                ? string.Format("data:{0};base64,{1}", image.Type, Convert.ToBase64String(image.Content))
                : null;
            return imageSrc;
        }

        private static SupportAndResistanceValueViewModel Map(SupportAndResistanceValue srValue)
        {
            SupportAndResistanceValueViewModel viewModel = new SupportAndResistanceValueViewModel(srValue.Value.CustomRound(), srValue.Date);
            return viewModel;
        }

        #endregion Custom Converters
    }
}
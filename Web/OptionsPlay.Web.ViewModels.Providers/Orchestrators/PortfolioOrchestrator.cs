using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using OptionsPlay.BusinessLogic.Common.Entities;
using OptionsPlay.Common.ServiceResponses;
using OptionsPlay.DAL.SZKingdom.Common;
using OptionsPlay.DAL.SZKingdom.Common.Entities;
using OptionsPlay.DAL.SZKingdom.Common.Entities.Arguments;
using OptionsPlay.DAL.SZKingdom.Common.Enums;
using OptionsPlay.TechnicalAnalysis.Entities;
using OptionsPlay.Web.ViewModels.MarketData;
using OptionsPlay.BusinessLogic.Common;

namespace OptionsPlay.Web.ViewModels.Providers.Orchestrators
{
	public class PortfolioOrchestrator
	{
		private readonly IPortfolioManager _portfolioManager;
		private readonly IMarketWorkTimeService _marketWorkTimeService;
		private readonly IMarketDataProviderQueryable _marketDataProviderQueryable;
		private readonly IMarketDataService _marketDataService;
		private readonly IStrategyService _strategyService;
		private readonly IAccountManager _accountManager;

		private const string DefaultTradeSector = "12";

		public PortfolioOrchestrator(
			IPortfolioManager portfolioManager,
			IMarketWorkTimeService marketWorkTimeService,
			IMarketDataProviderQueryable marketDataProviderQueryable,
			IMarketDataService marketDataService, 
			IStrategyService strategyService, 
			IAccountManager accountManager)
		{
			_portfolioManager = portfolioManager;
			_marketWorkTimeService = marketWorkTimeService;
			_marketDataProviderQueryable = marketDataProviderQueryable;
			_marketDataService = marketDataService;
			_strategyService = strategyService;
			_accountManager = accountManager;
		}

		public List<BasePortfolioItemGroupViewModel> GetPortfolioData(string customerCode, string accountCode, string tradeAccount)
		{
			#region Fetch data
			OptionPositionsArguments arguments = new OptionPositionsArguments
			{
				CustomerCode = customerCode,
				CustomerAccountCode = accountCode
			};

			EntityResponse<List<OptionPositionInformation>> optionPositions = _portfolioManager.GetOptionPositions(arguments);
			EntityResponse<List<OptionableStockPositionInformation>> stockPositions = _portfolioManager.GetOptionalStockPositions(customerCode, accountCode, tradeAccount);

			if (!optionPositions.IsSuccess || !stockPositions.IsSuccess || optionPositions.Entity.Count == 0)
			{
				return new List<BasePortfolioItemGroupViewModel>();
			}

			IEnumerable<PortfolioOption> portfolioOptions = Mapper.Map<List<OptionPositionInformation>, List<PortfolioOption>>(optionPositions.Entity);
			IEnumerable<PortfolioStock> portfolioStocks = Mapper.Map<List<OptionableStockPositionInformation>, List<PortfolioStock>>(stockPositions.Entity);
			Dictionary<string, EntityResponse<OptionChain>> optionChains = new Dictionary<string, EntityResponse<OptionChain>>();
			#endregion

			#region Fill additional information

			foreach (PortfolioOption portfolioItem in portfolioOptions)
			{
				EntityResponse<List<OptionBasicInformation>> optionBasicInformation = _marketDataProviderQueryable.GetOptionBasicInformation(optionNumber: portfolioItem.OptionNumber);

				if (optionBasicInformation.Entity == null || !optionBasicInformation.Entity.Any())
				{
					continue;
				}

				OptionBasicInformation basicInfo = optionBasicInformation.Entity.Single();

				DateTime expiryDate = basicInfo.ExpireDate;
				DateAndNumberOfDaysUntil expiry = _marketWorkTimeService.GetNumberOfDaysLeftUntilExpiry(expiryDate);

				portfolioItem.Expiry = expiry;
				portfolioItem.UnderlyingCode = basicInfo.OptionUnderlyingCode;
				portfolioItem.UnderlyingName = basicInfo.OptionUnderlyingName;
				portfolioItem.StrikePrice = basicInfo.StrikePrice;


				EntityResponse<OptionChain> optionChain;
				string underlying = portfolioItem.UnderlyingCode;

				if (optionChains.ContainsKey(underlying))
				{
					optionChain = optionChains[underlying];
				}
				else
				{
					optionChain = _marketDataService.GetOptionChain(underlying);
					optionChains.Add(underlying, optionChain);
				}

				if (optionChain == null)
				{
					continue;
				}

				Option option = optionChain.Entity[portfolioItem.OptionNumber];
				if (option == null)
				{
					portfolioItem.UnderlyingCode = null;
					continue;
				}
				Greeks greeks = option.Greeks ?? new Greeks();

				portfolioItem.LastPrice = (decimal)option.LatestTradedPrice; //optionChain.Entity.UnderlyingCurrentPrice;
				portfolioItem.PremiumMultiplier = option.RootPair.PremiumMultiplier;
				portfolioItem.Greeks = new PortfolioGreeks(portfolioItem.OptionAvailableQuantity, greeks, portfolioItem.OptionSide, portfolioItem.PremiumMultiplier);
			}

			portfolioOptions = portfolioOptions.Where(x => x.UnderlyingCode != null);

			foreach (PortfolioStock portfolioStock in portfolioStocks)
			{
				SecurityQuotation quote = _marketDataService.GetSecurityQuotation(portfolioStock.SecurityCode);
				portfolioStock.LastPrice = quote.LastPrice;
				portfolioStock.StockMarketValue = quote.LastPrice * portfolioStock.AvailableBalance;
				portfolioStock.Greeks = new PortfolioGreeks(portfolioStock.AdjustedAvailableQuantity, 
					new Greeks()
					{
						Delta = 1
					}, portfolioStock.OptionSide, 1);
			}

			#endregion

			IEnumerable<BasePortfolioItemGroup> groupedByStrategies = _strategyService.GetPortfolioItemsGroupedByStrategy(portfolioOptions, portfolioStocks);

			List<BasePortfolioItemGroupViewModel> result = 
				Mapper.Map<IEnumerable<BasePortfolioItemGroup>, IEnumerable<BasePortfolioItemGroupViewModel>>(groupedByStrategies)
				.ToList();

			return result;
		}

		public List<OptionPositionViewModel> GetOptionPositions(string customerCode, string accountCode)
		{
			OptionPositionsArguments arguments = new OptionPositionsArguments
			{
				CustomerCode = customerCode,
				CustomerAccountCode = accountCode
			};

			EntityResponse<List<OptionPositionInformation>> optionPositions = _portfolioManager.GetOptionPositions(arguments);

			List<OptionPositionViewModel> result = Mapper.Map<List<OptionPositionInformation>, List<OptionPositionViewModel>>(optionPositions.Entity);

			return result;
		}

		public FundViewModel GetFundInformation(string accountCode, string customerCode = null, Currency currency = null)
		{
			List<FundInformation> results = _portfolioManager.GetFundInformation(customerCode, accountCode, currency);
			FundInformation fund = results.First();

			FundViewModel result = Mapper.Map<FundInformation, FundViewModel>(fund);

			List<OptionPositionViewModel> positions = GetOptionPositions(customerCode, accountCode);
			decimal floatingPL = 0;
			foreach (OptionPositionViewModel position in positions)
			{
				floatingPL += position.OptionFloatingPL;
			}
			result.FloatingPL = floatingPL;

			RiskLevelInformation riskLevel = _portfolioManager.GetAccountRiskLevelInformation(accountCode, currency);
			result.UsedMargin = riskLevel.UsedMargin;
			result.MarginRate = 0;
			if (fund.AvailableFund != 0)
			{
				result.MarginRate = riskLevel.UsedMargin / fund.AvailableFund;
			}

			return result;
		}

		public List<CustomerAutomaticOptionExercisingViewModel> GetCustomerAutomaticOptionExercisingInformation(string customerCode, string customerAccountCode,string tradeAccount, List<string> optionNumbers)
		{
			List<CustomerAutomaticOptionExercisingInformation> results = _portfolioManager.GetAutomaticOptionExercisingParameters(customerCode, customerAccountCode, DefaultTradeSector, tradeAccount, optionNumbers);
			List<CustomerAutomaticOptionExercisingViewModel> viewModels = Mapper.Map<List<CustomerAutomaticOptionExercisingInformation>, List<CustomerAutomaticOptionExercisingViewModel>>(results);
			return viewModels;
		}

		public void SetCustomerAutomaticOptionExercisingInformation(string customerCode, string customerAccountCode, string tradeSector, CustomerAutomaticOptionExercisingViewModel viewModel)
		{
			CustomerAutomaticOptionExercisingInformation information = Mapper.Map<CustomerAutomaticOptionExercisingViewModel, CustomerAutomaticOptionExercisingInformation>(viewModel);

			information.CustomerCode = customerCode;
			information.CustomerAccountCode = customerAccountCode;
			information.TradeSector = tradeSector;
			information.TradingAccount = DefaultTradeSector;

			_portfolioManager.SetAutomaticOptionExercisingParameters(information);
		}

		public List<CompanyViewModel> GetPortfolioCompanies(string customerCode, string customerAccountCode, string tradeAccount)
		{
			List<string> securityCodes = GetPortfolioData(customerCode, customerAccountCode, tradeAccount)
				.Where(x => !x.IsStockGroup).Cast<StrategyPortfolioItemGroupViewModel>()
				.Select(x => x.UnderlyingCode).Distinct().ToList();

			List<SecurityInformation> securityInfomationList =
				_marketDataService.GetSecurityQuotations(securityCodes)
					.Select(x => new SecurityInformation { SecurityCode = x.Entity.SecurityCode, SecurityName = x.Entity.SecurityName })
					.ToList();

			List<CompanyViewModel> companies =
				Mapper.Map<List<SecurityInformation>, List<CompanyViewModel>>(securityInfomationList);

			return companies;

				}

		public List<BankCodeInformation> GetBankCode(string customerAccountCode, Currency currency)
		{
			List<BankCodeInformation> bankCodeInformationList = _accountManager.GetBankCodeInformation(customerAccountCode, currency);
			return bankCodeInformationList;
		}

		public void BankTransfer(string customerAccountCode, BankTransferModel bankTransferModel)
		{

			TransferFundArguments transferArguments = new TransferFundArguments();
			transferArguments.CustomerAccountCode = customerAccountCode;
			transferArguments.FundPassword = bankTransferModel.FundPassword;
			transferArguments.BankCode = bankTransferModel.BankCode.ToString();
			transferArguments.BankPassword = bankTransferModel.BankPassword;
			transferArguments.TransferType = bankTransferModel.Dir == 1 ? TransferType.AccountToBank : TransferType.BankToAccount;
			transferArguments.TransferAmount = bankTransferModel.TransferAmount;

			_accountManager.TransferFund(transferArguments);
		}

        public List<HistoricalFundTransfer> GetHistoricalBankTransfer(string customerAccountCode, string BeginDate, string EndDate,int qryPos, int qryNum)
		{

			List<HistoricalFundTransfer> fundTransferHistory = _accountManager.GetHistoricalTransferFund(customerAccountCode, BeginDate,EndDate, qryPos, qryNum);
			return fundTransferHistory;
		}

		public BaseResponse ChangePassword(string customerCode, string oldPassword, string newPassword, string useScope)
		{
			PasswordUseScope scope = useScope.Equals(PasswordUseScope.OptionTrade.InternalValue)
				? PasswordUseScope.OptionTrade
				: PasswordUseScope.OptionFund;

			return _accountManager.ChangePassword(customerCode, scope, oldPassword, newPassword);
		}

	}
}
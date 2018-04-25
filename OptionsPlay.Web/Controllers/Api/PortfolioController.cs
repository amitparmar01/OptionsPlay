using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using OptionsPlay.BusinessLogic.Common.Entities;
using OptionsPlay.Common.ServiceResponses;
using OptionsPlay.DAL.SZKingdom.Common;
using OptionsPlay.DAL.SZKingdom.Common.Entities;
using OptionsPlay.DAL.SZKingdom.Common.Entities.Arguments;
using OptionsPlay.DAL.SZKingdom.Common.Enums;
using OptionsPlay.Web.Infrastructure.Attributes.Api;
using OptionsPlay.Web.ViewModels.MarketData;
using OptionsPlay.Web.ViewModels.Providers.Orchestrators;

namespace OptionsPlay.Web.Controllers.Api
{
	[RoutePrefix("api/portfolio")]
	[ApiAuthorize]
	public class PortfolioController : BaseApiController
	{
		private readonly PortfolioOrchestrator _portfolioOrchestrator;
		public PortfolioController(PortfolioOrchestrator portfolioOrchestrator)
		{
			_portfolioOrchestrator = portfolioOrchestrator;
		}

		[Route("")]
		public List<BasePortfolioItemGroupViewModel> GetPortfolio()
		{
			List<BasePortfolioItemGroupViewModel> result =
				_portfolioOrchestrator.GetPortfolioData(
								FCIdentity.CustomerCode,
								FCIdentity.CustomerAccountCode,
								FCIdentity.TradeAccount);
			return result;
		}

		[Route("fund")]
		public FundViewModel GetFund()
		{
			FundViewModel result =
				_portfolioOrchestrator.GetFundInformation(
									FCIdentity.CustomerAccountCode,
									FCIdentity.CustomerCode,
									Currency.ChineseYuan);
			return result;
		}

		[Route("autoExerciseData")]
		public List<CustomerAutomaticOptionExercisingViewModel> GetAutoExerciseData()
		{
			//TODO: implement temporary storage for optionNumbers
			//there is not exact option numbers. for stocks this is null.
			List<string> optionNumbers = _portfolioOrchestrator.GetPortfolioData(
				FCIdentity.CustomerCode,
				FCIdentity.CustomerAccountCode,
				FCIdentity.TradeAccount).SelectMany(y => y.Items).Select(x => x.OptionNumber).ToList();

			List<CustomerAutomaticOptionExercisingViewModel> result = _portfolioOrchestrator.GetCustomerAutomaticOptionExercisingInformation(
				FCIdentity.CustomerCode,
				FCIdentity.CustomerAccountCode,
				FCIdentity.TradeAccount,
				optionNumbers);

			return result;
		}

		[HttpPost]
		[Route("autoExerciseData/update")]
		public void SetAutoExerciseData(CustomerAutomaticOptionExercisingViewModel viewModel)
		{
			_portfolioOrchestrator.SetCustomerAutomaticOptionExercisingInformation(
				FCIdentity.CustomerCode,
				FCIdentity.CustomerAccountCode,
				FCIdentity.TradeAccount,
				viewModel);
		}


		[Route("getPortfolioCompanies")]
		public IEnumerable<CompanyViewModel> GetPortfolioCompanies()
		{
			List<CompanyViewModel> companies = _portfolioOrchestrator.GetPortfolioCompanies(
				FCIdentity.CustomerCode,
				FCIdentity.CustomerAccountCode,
				FCIdentity.TradeAccount);
			return companies;
		}

		[Route("bankCode")]
		public List<BankCodeInformation> GetBankCode()
		{
			return _portfolioOrchestrator.GetBankCode(FCIdentity.CustomerAccountCode, Currency.ChineseYuan);
		}

		[HttpPost]
		[Route("bankTransfer")]
		//todo change get to post
		public void BankTransfer(BankTransferModel bankTransferModel)
		{
            if (bankTransferModel.FundPassword == null)
            {
                bankTransferModel.FundPassword = string.Empty;
            }
            if (bankTransferModel.BankPassword == null)
            {
                bankTransferModel.BankPassword = string.Empty;
            }
			_portfolioOrchestrator.BankTransfer(FCIdentity.CustomerAccountCode, bankTransferModel);
		}

		[HttpGet]
        [Route("fundTransferHistory/{BeginDate}/{EndDate}")]
		public  List<HistoricalFundTransfer> GetHistoricalBankTransfer(string BeginDate,string EndDate)
		{
            List<HistoricalFundTransfer> fundTransferHistory = _portfolioOrchestrator.GetHistoricalBankTransfer(FCIdentity.CustomerAccountCode, BeginDate, EndDate, 0, 100);
			return fundTransferHistory;
		}

		[HttpPost]
		[Route("changePassword")]
		public BaseResponse ChangePassword(ChangePasswordViewModel changePasswordModel)
		{
			return _portfolioOrchestrator.ChangePassword(FCIdentity.CustomerCode, changePasswordModel.OldPassword, changePasswordModel.NewPassword, changePasswordModel.UseScope);
		}

        [Route("getOptionPositions/{filter}")]
        public List<OptionPositionViewModel> GetOptionPositions(string filter)
        {
            List<OptionPositionViewModel> optionPositions = _portfolioOrchestrator.GetOptionPositions(FCIdentity.CustomerCode, FCIdentity.CustomerAccountCode);
            List<OptionPositionViewModel> result = optionPositions.Where(x => x.OptionNumber.Contains(filter)).ToList();
            return result;
        }
	}
}
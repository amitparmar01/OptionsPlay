using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Web.Mvc;
using OptionsPlay.Model;
using OptionsPlay.Model.Enums;
using OptionsPlay.Resources;
using OptionsPlay.Web.ViewModels.Helpers;

namespace OptionsPlay.Web.ViewModels
{
	public class StrategyDetailViewModel : StrategyDetailForDisplay
	{
		#region Overriden properties

		[Required(ErrorMessageResourceType = typeof(ErrorMessages), ErrorMessageResourceName = "Required")]
		public override Risk? Risk { get; set; }

		[Required(ErrorMessageResourceType = typeof(ErrorMessages), ErrorMessageResourceName = "Required")]
		[Display(ResourceType = typeof(DisplayNames), Name = "Sentiment")]
		public override Sentiment? FirstSentiment { get; set; }

		[Required(ErrorMessageResourceType = typeof(ErrorMessages), ErrorMessageResourceName = "Required")]
		[Range(1, 5, ErrorMessageResourceType = typeof(ErrorMessages), ErrorMessageResourceName = "Range")]
		[Display(ResourceType = typeof(DisplayNames), Name = "OccLevel")]
		public override byte? OccLevel { get; set; }

		[Required(ErrorMessageResourceType = typeof(ErrorMessages), ErrorMessageResourceName = "Required")]
		public override Risk? Reward { get; set; }

		[Display(ResourceType = typeof(DisplayNames), Name = "DisplayOrder")]
		public override int? DisplayOrder { get; set; }

		#endregion

		public List<SelectListItem> RiskOptions
		{
			get
			{
				List<SelectListItem> riskOptions = CustomEnumConverter.ToSelectList<Risk>();
				return riskOptions;
			}
		}

		public List<SelectListItem> SentimentOptions
		{
			get
			{
				List<SelectListItem> sentimentOptions = CustomEnumConverter.ToSelectList<Sentiment>();
				return sentimentOptions;
			}
		}

		public StrategyDetailViewModel()
		{
			Display = true;
		}

		public StrategyDetail ToEntity()
		{
			StrategyDetail strategyDetail = new StrategyDetail();

			strategyDetail.Id = Id;
			strategyDetail.Risk = Risk;
			strategyDetail.FirstSentiment = FirstSentiment;
			strategyDetail.SecondSentiment = SecondSentiment;
			strategyDetail.ThirdSentiment = ThirdSentiment;
			strategyDetail.OccLevel = OccLevel;
			strategyDetail.Reward = Reward;
			strategyDetail.DisplayOrder = DisplayOrder;
			strategyDetail.Display = Display;

			return strategyDetail;
		}
	}
}
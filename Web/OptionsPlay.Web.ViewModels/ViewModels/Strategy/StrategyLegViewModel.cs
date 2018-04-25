using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Web.Mvc;
using OptionsPlay.Model;
using OptionsPlay.Model.Enums;
using OptionsPlay.Resources;
using OptionsPlay.Web.ViewModels.Helpers;

namespace OptionsPlay.Web.ViewModels
{
	public class StrategyLegViewModel : StrategyLegForDisplay
	{
		#region Overriden properties

		[Required(ErrorMessageResourceType = typeof(ErrorMessages), ErrorMessageResourceName = "Required")]
		[Display(ResourceType = typeof(DisplayNames), Name = "BuyOrSell")]
		public override BuyOrSell? BuyOrSell { get; set; }

		[Required(ErrorMessageResourceType = typeof(ErrorMessages), ErrorMessageResourceName = "Required")]
		public override int Quantity { get; set; }

		[Range(-5, 5, ErrorMessageResourceType = typeof(ErrorMessages), ErrorMessageResourceName = "Range")]
		public override short? Strike { get; set; }

		[Range(1, 18, ErrorMessageResourceType = typeof(ErrorMessages), ErrorMessageResourceName = "Range")]
		public override byte? Expiry { get; set; }

		[Required(ErrorMessageResourceType = typeof(ErrorMessages), ErrorMessageResourceName = "Required")]
		[Display(ResourceType = typeof(DisplayNames), Name = "LegType")]
		public override LegType? LegType { get; set; }

		#endregion

		public List<SelectListItem> BuyOrSellOptions
		{
			get
			{
				List<SelectListItem> buyOrSellOptions = CustomEnumConverter.ToSelectList<BuyOrSell>();
				return buyOrSellOptions;
			}
		}

		public List<SelectListItem> LegTypeOptions
		{
			get
			{
				List<SelectListItem> legTypeOptions = CustomEnumConverter.ToSelectList<LegType>();
				return legTypeOptions;
			}
		}

		public StrategyLeg ToEntity(int strategyId)
		{
			StrategyLeg strategyLeg = new StrategyLeg();

			strategyLeg.Id = Id;
			strategyLeg.BuyOrSell = BuyOrSell;
			strategyLeg.Quantity = Quantity;
			strategyLeg.Strike = Strike;
			strategyLeg.Expiry = Expiry;
			strategyLeg.LegType = LegType;
			strategyLeg.StrategyId = strategyId;

			return strategyLeg;
		}
	}
}
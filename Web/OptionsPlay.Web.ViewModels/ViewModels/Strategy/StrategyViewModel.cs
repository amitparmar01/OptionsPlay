using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Web.Mvc;
using OptionsPlay.Model;
using OptionsPlay.Resources;
using OptionsPlay.Web.ViewModels.ValidationAttributes;

namespace OptionsPlay.Web.ViewModels
{
	public class StrategyViewModel : StrategyBase
	{
		#region Overriden properties

		[Required(ErrorMessageResourceType = typeof(ErrorMessages), ErrorMessageResourceName = "Required")]
		public override string Name { get; set; }

		[Required(ErrorMessageResourceType = typeof(ErrorMessages), ErrorMessageResourceName = "Required")]
		[Display(ResourceType = typeof(DisplayNames), Name = "CanCustomizeWidth")]
		public override bool CanCustomizeWidth { get; set; }

		[Required(ErrorMessageResourceType = typeof(ErrorMessages), ErrorMessageResourceName = "Required")]
		[Display(ResourceType = typeof(DisplayNames), Name = "CanCustomizeWingspan")]
		public override bool CanCustomizeWingspan { get; set; }

		[Required(ErrorMessageResourceType = typeof(ErrorMessages), ErrorMessageResourceName = "Required")]
		[Display(ResourceType = typeof(DisplayNames), Name = "CanCustomizeExpiry")]
		public override bool CanCustomizeExpiry { get; set; }

		[Display(ResourceType = typeof(DisplayNames), Name = "PairStrategy")]
		public override int? PairStrategyId { get; set; }

		#endregion Overriden properties

		[Display(ResourceType = typeof(DisplayNames), Name = "BuyDetails")]
		[Required(ErrorMessageResourceType = typeof(ErrorMessages), ErrorMessageResourceName = "Required")]
		public StrategyDetailViewModel BuyDetails { get; set; }

		[Display(ResourceType = typeof(DisplayNames), Name = "SellDetails")]
		[Required(ErrorMessageResourceType = typeof(ErrorMessages), ErrorMessageResourceName = "Required")]
		public StrategyDetailViewModel SellDetails { get; set; }

		public List<SelectListItem> PairStrategyOptions { get; set; }

		[Required(ErrorMessageResourceType = typeof(ErrorMessages), ErrorMessageResourceName = "Required")]
		[OnlyOneSecurityLeg]
		[RequiredCollection]
		public List<StrategyLegViewModel> Legs { get; set; }

		public StrategyViewModel()
		{
			BuyDetails = new StrategyDetailViewModel();
			SellDetails = new StrategyDetailViewModel();
			PairStrategyOptions = new List<SelectListItem>();
			Legs = new List<StrategyLegViewModel>
			{
				new StrategyLegViewModel()
			};
		}

		// todo: use mapper
		public Strategy ToEntity()
		{
			Strategy strategy = new Strategy();

			strategy.Id = Id;
			strategy.Name = Name;
			strategy.CanCustomizeWidth = CanCustomizeWidth;
			strategy.CanCustomizeWingspan = CanCustomizeWingspan;
			strategy.CanCustomizeExpiry = CanCustomizeExpiry;
			strategy.BuyDetails = BuyDetails.ToEntity();
			strategy.BuyDetailsId = strategy.BuyDetails.Id;
			strategy.SellDetails = SellDetails.ToEntity();
			strategy.SellDetailsId = strategy.SellDetails.Id;
			strategy.Legs = Legs.ConvertAll(m => m.ToEntity(Id));
			strategy.PairStrategyId = PairStrategyId;

			return strategy;
		}
	}
}
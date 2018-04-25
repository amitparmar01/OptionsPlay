using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.IO;
using System.Web;
using System.Web.Mvc;
using AutoMapper;
using OptionsPlay.Model;
using OptionsPlay.Resources;
using OptionsPlay.Web.ViewModels.Helpers;
using OptionsPlay.Web.ViewModels.ValidationAttributes;

namespace OptionsPlay.Web.ViewModels
{
	public class StrategyGroupViewModel : StrategyGroupBase
	{
		private const int MaxFileSizeInMb = 5;

		public StrategyGroupViewModel()
		{
			StrategyOptions = new List<SelectListItem>();
		}

		#region Overridden properties

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

		[Required(ErrorMessageResourceType = typeof(ErrorMessages), ErrorMessageResourceName = "Required")]
		public override bool Display { get; set; }

		[Required(ErrorMessageResourceType = typeof(ErrorMessages), ErrorMessageResourceName = "Required")]
		[Display(ResourceType = typeof(DisplayNames), Name = "CallStrategy")]
		[OnlyOneGroupedStrategy]
		[NotEqualTo("PutStrategyId")]
		public override int CallStrategyId { get; set; }

		[Display(ResourceType = typeof(DisplayNames), Name = "PutStrategy")]
		[OnlyOneGroupedStrategy]
		public override int? PutStrategyId { get; set; }

		[Display(ResourceType = typeof(DisplayNames), Name = "DisplayOrder")]
		public override int? DisplayOrder { get; set; }

		#endregion Overridden properties

		[Display(ResourceType = typeof(DisplayNames), Name = "CurrentImage")]
		public string CurrentImage { get; set; }

		[Display(ResourceType = typeof(DisplayNames), Name = "Image")]
		[ConditionalRequired("CurrentImage")]
		[MaxFileSize(MaxFileSizeInMb)]
		[ValidFileExtensions("jpg,png,gif")]
		public HttpPostedFileBase ImageFile { get; set; }

		public virtual Guid? OriginalImageId { get; set; }

		public virtual Guid? ThumbnailImageId { get; set; }

		public List<SelectListItem> StrategyOptions { get; set; }

		public StrategyGroup ToEntity()
		{
			StrategyGroup strategyGroup = Mapper.Map<StrategyGroupViewModel, StrategyGroup>(this);

			if (ImageFile != null)
			{
				// original image
				MemoryStream memoryStream = new MemoryStream();
				ImageFile.InputStream.CopyTo(memoryStream);
				byte[] originalImageContent = memoryStream.ToArray();
				strategyGroup.OriginalImage = new Image
				{
					Content = originalImageContent,
					Type = ImageFile.ContentType
				};

				// thumbnail image
				byte[] thumbnailImageContent = ThumbnailHelper.CreateThumbnail(originalImageContent);
				strategyGroup.ThumbnailImage = new Image
				{
					Content = thumbnailImageContent,
					Type = ImageFile.ContentType
				};
			}

			return strategyGroup;
		}
	}
}
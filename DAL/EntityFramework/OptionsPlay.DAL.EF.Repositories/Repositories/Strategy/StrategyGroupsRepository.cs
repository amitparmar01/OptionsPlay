using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using OptionsPlay.DAL.EF.Repositories.Helpers;
using OptionsPlay.DAL.Interfaces.Repositories;
using OptionsPlay.Model;

namespace OptionsPlay.DAL.EF.Repositories
{
	public class StrategyGroupsRepository : EFRepository<StrategyGroup, int>, IStrategyGroupsRepository
	{
		#region Public

		public StrategyGroupsRepository(DbContext dbContext)
			: base(dbContext)
		{
		}

		public IQueryable<StrategyGroup> GetAll(int pageNumber, out int totalCount)
		{
			IQueryable<StrategyGroup> strategyGroups = DbSet
				.OrderBy(m => m.Id)
				.GetByPageNumber(pageNumber, out totalCount);
			return strategyGroups;
		}

		public override bool Delete(int id)
		{
			StrategyGroup strategyGroup = GetById(id);
			if (strategyGroup != null)
			{
				DeleteImage(strategyGroup.ThumbnailImage);
				DeleteImage(strategyGroup.OriginalImage);
				Delete(strategyGroup);
				return true;
			}
			return false;
		}

		public override void Update(StrategyGroup entity)
		{
			StrategyGroup originalEntity = GetById(entity.Id);

			// image has not been changed
			if (entity.OriginalImage == null)
			{
				if (originalEntity.OriginalImageId != null)
				{
					entity.OriginalImageId = originalEntity.OriginalImageId;
					entity.ThumbnailImageId = originalEntity.ThumbnailImageId;
				}
			}
			else
			{
				// image has been added
				if (originalEntity.OriginalImage == null)
				{
					AddImage(entity.OriginalImage);
					AddImage(entity.ThumbnailImage);
					DbContext.SaveChanges();
					entity.OriginalImageId = entity.OriginalImage.Id;
					entity.ThumbnailImageId = entity.ThumbnailImage.Id;
				}
				// image has been changed
				else
				{
					// original image
					entity.OriginalImageId = originalEntity.OriginalImageId;
					entity.OriginalImage.Id = originalEntity.OriginalImage.Id;
					DbContext.Entry(originalEntity.OriginalImage).CurrentValues.SetValues(entity.OriginalImage);
					// thumbnail image
					entity.ThumbnailImageId = originalEntity.ThumbnailImageId;
					entity.ThumbnailImage.Id = originalEntity.ThumbnailImage.Id;
					DbContext.Entry(originalEntity.ThumbnailImage).CurrentValues.SetValues(entity.ThumbnailImage);
				}
			}

			DbContext.Entry(originalEntity).CurrentValues.SetValues(entity);
		}

		#endregion Public

		#region Private

		private void DeleteImage(Image image)
		{
			if (image == null)
			{
				return;
			}
			ChangeImageState(image, EntityState.Deleted);
		}

		private void AddImage(Image image)
		{
			ChangeImageState(image, EntityState.Added);
		}

		private void ChangeImageState(Image image, EntityState entityState)
		{
			DbEntityEntry imageEntry = DbContext.Entry(image);
			imageEntry.State = entityState;
		}

		#endregion Private
	}
}

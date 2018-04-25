using OptionsPlay.DAL.Interfaces;

namespace OptionsPlay.BusinessLogic
{
	public abstract class BaseService
	{
		protected readonly IOptionsPlayUow Uow;

		protected BaseService(IOptionsPlayUow uow)
		{
			Uow = uow;
		}
	}
}
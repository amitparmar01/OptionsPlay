namespace OptionsPlay.Model
{
	public abstract class QuoteInfo : BaseMongoEntity
	{
		protected QuoteInfo()
		{
			IsActive = false;
		}

		public bool IsActive { get; set; }
	}
}

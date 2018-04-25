namespace OptionsPlay.Model
{
	/// <summary>
	/// Interface implemented in each EF entity
	/// </summary>
	public interface IBaseEntity<T>
	{
		T Id { get; set; }
	}
}

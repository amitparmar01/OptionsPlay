namespace OptionsPlay.Cache.Core
{
	public class StringIdentityKeyObject<TEntity> : KeyObject
	{
		public StringIdentityKeyObject(string symbol)
			: base((typeof (TEntity)).Name, new[] { (object)symbol.ToUpper() })
		{
		}
	}
}
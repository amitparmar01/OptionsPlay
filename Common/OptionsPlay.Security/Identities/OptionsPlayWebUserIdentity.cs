namespace OptionsPlay.Security.Identities
{
	public class OptionsPlayWebUserIdentity : OptionsPlayIdentity
	{
		public OptionsPlayWebUserIdentity(string name): base(name) {}

		public string DisplayName { get; set; }
	}
}
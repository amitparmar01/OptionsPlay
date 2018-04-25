namespace OptionsPlay.Security.Identities
{
	public class OptionsPlayFCUserIdentity : OptionsPlayIdentity
	{
		public OptionsPlayFCUserIdentity(string name) : base(name) {}

		public string CustomerCode { get; set; }

		public string CustomerAccountCode { get; set; }

		public string TradeAccount { get; set; }

		public string AccountId { get; set; }

		public long InternalOrganization { get; set; }

		public string TradeAccountName { get; set; }
	}
}

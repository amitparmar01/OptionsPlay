using ProtoBuf;

namespace OptionsPlay.Security.AuthorizationCookie
{
	[ProtoContract]
	public class AuthCookieFCUserInfo : IAuthCookieAdditionalInfo
	{
		[ProtoMember(1)]
		public string CustomerCode { get; set; }

		[ProtoMember(2)]
		public string CustomerAccountCode { get; set; }

		[ProtoMember(3)]
		public string TradeAccount { get; set; }

		[ProtoMember(4)]
		public string AccountId { get; set; }
		
		[ProtoMember(5)]
		public string TradeAccountName { get; set; }

		[ProtoMember(6)]
		public long InternalOrganization { get; set; }
	}
}

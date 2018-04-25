using ProtoBuf;

namespace OptionsPlay.Security.AuthorizationCookie
{
	[ProtoContract]
	public class AuthCookieWebUserInfo : IAuthCookieAdditionalInfo
	{
		[ProtoMember(1)]
		public string LoginName { get; set; }

		[ProtoMember(2)]
		public string DisplayName { get; set; }
	}
}

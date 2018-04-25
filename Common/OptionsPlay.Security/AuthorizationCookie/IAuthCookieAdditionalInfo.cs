using ProtoBuf;

namespace OptionsPlay.Security.AuthorizationCookie
{
	[ProtoContract]
	[ProtoInclude(1, typeof(AuthCookieFCUserInfo))]
	[ProtoInclude(2, typeof(AuthCookieWebUserInfo))]
	public interface IAuthCookieAdditionalInfo
	{
	}
}

using System.Collections.Generic;
using ProtoBuf;

namespace OptionsPlay.Security.AuthorizationCookie
{
	[ProtoContract]
	public class AuthorizationCookieModel
	{
		[ProtoMember(1)]
		public long UserId { get; set; }

		[ProtoMember(2)]
		public int Role { get; set; }

		[ProtoMember(3)]
		public List<int> Permissions { get; set; }

		[ProtoMember(4)]
		public IAuthCookieAdditionalInfo AdditionalInfo { get; set; }
	}
}
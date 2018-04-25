using System;

namespace OptionsPlay.EF.Encryption
{
	public interface ISecurEntity
	{
		string SecurEntityData { get; set; }

		Guid SecurEntityId { get; set; }

		byte[] SecurEntityThumbprint { get; set; }
	}
}

using System;

namespace OptionsPlay.EF.Encryption
{
	public class EncryptAttribute : Attribute
	{
		public bool IsThumbprint { get; set; }
	}
}

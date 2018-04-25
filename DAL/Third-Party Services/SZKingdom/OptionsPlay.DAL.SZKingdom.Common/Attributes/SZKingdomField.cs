using System;

namespace OptionsPlay.DAL.SZKingdom.Common.Entities
{
	[AttributeUsage(AttributeTargets.Property)]
	public class SZKingdomField : Attribute
	{
		public SZKingdomField(string fileldName)
		{
			FieldName = fileldName;
		}

		public string FieldName { get; private set; }
	}
}
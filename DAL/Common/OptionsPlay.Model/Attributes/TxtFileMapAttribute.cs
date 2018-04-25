using System;

namespace OptionsPlay.Model.Attributes
{
	[AttributeUsage(AttributeTargets.Property)]
	public class TxtFileMapAttribute : Attribute
	{
		public TxtFileMapAttribute(int columnNumber)
		{
			ColumnNumber = columnNumber;
		}

		public int ColumnNumber { get; private set; }
	}
}

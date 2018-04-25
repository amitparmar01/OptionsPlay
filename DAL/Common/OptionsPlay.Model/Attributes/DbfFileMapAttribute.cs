using System;

namespace OptionsPlay.Model.Attributes
{
	[AttributeUsage(AttributeTargets.Property)]
	public class DbfFileMapAttribute : Attribute
	{
		public DbfFileMapAttribute(string columnName)
		{
			ColumnName = columnName;
		}

		public string ColumnName { get; private set; }
	}
}

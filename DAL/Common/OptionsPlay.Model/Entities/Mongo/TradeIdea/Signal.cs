using System;
using System.Diagnostics;

namespace OptionsPlay.Model
{
	[DebuggerDisplay("Name = {Name}, Value = {Value}, StockCode = {StockCode}, Exchange = {Exchange}. Date = {Date}")]
	public class Signal : BaseMongoEntity
	{
		public string StockCode { get; set; }

		public string Exchange { get; set; }

		public DateTime Date { get; set; }

		public string Name { get; set; }

		public double Value { get; set; }
	}
}
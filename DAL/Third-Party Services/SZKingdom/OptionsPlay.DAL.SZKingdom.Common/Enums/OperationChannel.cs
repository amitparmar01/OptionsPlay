using OptionsPlay.Common.Utilities;

namespace OptionsPlay.DAL.SZKingdom.Common.Enums
{
	public sealed class OperationChannel : BaseTypeSafeEnum<string, OperationChannel>
	{
		public static readonly OperationChannel Counter = new OperationChannel("0");
		public static readonly OperationChannel Web = new OperationChannel("1");

		private OperationChannel(string internalCode) 
			: base(internalCode)
		{
		}
	}
}
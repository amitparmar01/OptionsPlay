
using OptionsPlay.Common.Utilities;

namespace OptionsPlay.DAL.SZKingdom.Common.Enums
{
    public sealed class ExerciseSide: BaseTypeSafeEnum<string, ExerciseSide>
    {
        public static readonly ExerciseSide RightSide = new ExerciseSide("B");
        public static readonly ExerciseSide RightParty = new ExerciseSide("S");

        private ExerciseSide(string internalCode)
			: base(internalCode)
		{
		}
    }
}

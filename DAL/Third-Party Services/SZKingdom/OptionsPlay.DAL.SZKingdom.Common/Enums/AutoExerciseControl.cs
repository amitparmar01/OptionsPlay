using OptionsPlay.Common.Utilities;

namespace OptionsPlay.DAL.SZKingdom.Common.Enums
{
	public sealed class AutoExerciseControl : BaseTypeSafeEnum<string, AutoExerciseControl>
	{
		public static readonly AutoExerciseControl NotAutoExercise = new AutoExerciseControl("F");
		public static readonly AutoExerciseControl AutoExercise = new AutoExerciseControl("1");

		private AutoExerciseControl(string internalCode)
			: base(internalCode)
		{
		}
	}
}
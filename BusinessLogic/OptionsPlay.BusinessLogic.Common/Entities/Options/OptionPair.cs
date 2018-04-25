using MathNet.Numerics;
using OptionsPlay.Common.Utilities;

namespace OptionsPlay.BusinessLogic.Common.Entities
{
	public class OptionPair: ISecurityItem
	{
		public string SecurityCode { get; set; }

		// in Chinese.
		public string SecurityName { get; set; }

		public double StrikePrice { get; set; }

		// use to distinguish different option types (we used to see at OptionType field)
		public long PremiumMultiplier { get; set; }

		public DateAndNumberOfDaysUntil Expiry { get; set; }

		public Option CallOption { get; set; }

		public Option PutOption { get; set; }

		public override bool Equals(object obj)
		{
			if (obj == null || GetType() != obj.GetType())
			{
				return false;
			}

			OptionPair other = (OptionPair)obj;
			bool equals = SecurityCode.IgnoreCaseEquals(other.SecurityCode) && StrikePrice.AlmostEqual(other.StrikePrice)
				&& Expiry == other.Expiry && PremiumMultiplier == other.PremiumMultiplier;

			return equals;
		}

		public override int GetHashCode()
		{
			int hashCode = SecurityCode.GetHashCode() ^ StrikePrice.GetHashCode() ^
				Expiry.GetHashCode() ^ PremiumMultiplier.GetHashCode();
			return hashCode;
		}

	}
}
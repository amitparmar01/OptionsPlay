using System;

namespace OptionsPlay.BusinessLogic.Common.Entities
{
	public class DateAndNumberOfDaysUntil : IComparable<DateAndNumberOfDaysUntil>, IComparable<DateTime>
	{
		public DateTime FutureDate { get; set; }

		public double TotalNumberOfDaysUntilExpiry { get; set; }

		public int CompareTo(DateAndNumberOfDaysUntil other)
		{
			return FutureDate.CompareTo(other.FutureDate);
		}

		public int CompareTo(DateTime other)
		{
			return FutureDate.CompareTo(other);
		}

		public override bool Equals(object obj)
		{
			if (obj == null || GetType() != obj.GetType())
			{
				return false;
			}

			DateAndNumberOfDaysUntil another = (DateAndNumberOfDaysUntil)obj;
			return FutureDate.Equals(another.FutureDate);
		}

		public bool Equals(DateTime date)
		{
			return FutureDate.Equals(date);
		}

		public override int GetHashCode()
		{
			return FutureDate.GetHashCode();
		}

		public static bool operator ==(DateAndNumberOfDaysUntil x, DateAndNumberOfDaysUntil y)
		{
			if (ReferenceEquals(null, x) || ReferenceEquals(null, y))
			{
				return ReferenceEquals(x, y);
			}
			bool result = x.FutureDate == y.FutureDate;
			return result;
		}

		public static bool operator !=(DateAndNumberOfDaysUntil x, DateAndNumberOfDaysUntil y)
		{
			return !(x == y);
		}
	}
}
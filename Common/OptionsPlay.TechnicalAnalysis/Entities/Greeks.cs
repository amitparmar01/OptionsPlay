using MathNet.Numerics;

namespace OptionsPlay.TechnicalAnalysis.Entities
{
	public class Greeks
	{

		public virtual double Gamma { get; set; }

		public virtual double Delta { get; set; }

		public virtual double Theta { get; set; }

		public virtual double Vega { get; set; }

		public virtual double Rho { get; set; }

		public virtual double RhoFx { get; set; }

		/// <summary>
		/// AKA Implied Volatility
		/// </summary>
		public virtual double Sigma { get; set; }

		#region Equality members

		protected bool Equals(Greeks other)
		{
			return Gamma.AlmostEqual(other.Gamma, 4)
				&& Delta.AlmostEqual(other.Delta, 4)
				&& Theta.AlmostEqual(other.Theta, 4)
				&& Vega.AlmostEqual(other.Vega, 4)
				&& Rho.AlmostEqual(other.Rho, 4) 
				&& RhoFx.AlmostEqual(other.RhoFx, 4)
				&& Sigma.AlmostEqual(other.Sigma, 4);
		}

		#endregion

		#region Overrides of Object

		public override bool Equals(object obj)
		{
			if (ReferenceEquals(null, obj))
			{
				return false;
			}
			if (ReferenceEquals(this, obj))
			{
				return true;
			}
			if (obj.GetType() != this.GetType())
			{
				return false;
			}
			return Equals((Greeks)obj);
		}

		public override int GetHashCode()
		{
			unchecked
			{
				int hashCode = Gamma.GetHashCode();
				hashCode = (hashCode * 397) ^ Delta.GetHashCode();
				hashCode = (hashCode * 397) ^ Theta.GetHashCode();
				hashCode = (hashCode * 397) ^ Vega.GetHashCode();
				hashCode = (hashCode * 397) ^ Rho.GetHashCode();
				hashCode = (hashCode * 397) ^ RhoFx.GetHashCode();
				hashCode = (hashCode * 397) ^ Sigma.GetHashCode();
				return hashCode;
			}
		}
		#endregion
	}
}
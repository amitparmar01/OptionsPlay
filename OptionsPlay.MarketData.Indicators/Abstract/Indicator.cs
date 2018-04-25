using System;
using System.Collections.Generic;
using System.Linq;
using OptionsPlay.Logging;
using OptionsPlay.MarketData.Common;
using OptionsPlay.Model;
using TicTacTec.TA.Library;

namespace OptionsPlay.MarketData.Indicators
{
	/// <summary>
	/// Common indicator
	/// </summary>
	public abstract class Indicator : IIndicator, ICalculatableIndicator
	{
		#region IIndicator implementation

		/// <summary>
		/// NOTE: Should be ONE-TO-ONE relation with signal name and should be set in constructor. 
		/// </summary>
		public abstract string Name { get; }

		public virtual string InterpretationName { get { return GetType().Name.ToUpperInvariant(); } }

		public bool FromDatabase { get { return false; } }

		public override bool Equals(object obj)
		{
			if (obj == null || GetType() != obj.GetType())
			{
				return false;
			}

			Indicator other = (Indicator)obj;
			//Assume, that Name property is immutable
			bool eq = Name == other.Name;
			return eq;
		}

		public override int GetHashCode()
		{
			return Name.GetHashCode();
		}

		#endregion IIndicator implementation

		#region ICalculatableIndicator implementation

		SignalInterpretation ICalculatableIndicator.MakeInterpretation(List<Signal> signals, StockQuoteInfo quote)
		{
			return MakeInterpretation(signals, quote);
		}

		List<Signal> ICalculatableIndicator.GetSignals(HistoricalData historicalData, List<Signal> dependencySignals, int? last)
		{
			return GetSignals(historicalData, dependencySignals, last);
		}

		DependencyScope ICalculatableIndicator.InterpretationDependencies
		{
			get { return InterpretationDependencies; }
		}

		#endregion ICalculatableIndicator implementation

		#region Protected

		protected virtual DependencyScope InterpretationDependencies
		{
			get
			{
				DependencyScope dependencies = new DependencyScope(new Dictionary<int, List<IIndicator>>
				{
					{ 0, new List<IIndicator> { this } }
				});
				return dependencies;
			}
		}

		protected const int StartIdx = 0;

		protected void LogError(Core.RetCode retCode)
		{
			string errorMessage = string.Format("Error occurred during working with Technical Analysis Library. Method: Core.{0}, Error code: {1}", Name, retCode);
			Logger.Error(errorMessage);
		}

		//TODO: use dependencies inside each realisation to get needed signals
		protected abstract SignalInterpretation MakeInterpretation(List<Signal> signals, StockQuoteInfo quote = null);

		/// <summary>
		/// Signals returned MUST be sorted by dates descending.
		/// </summary>
		protected abstract List<Signal> GetSignalsBase(HistoricalData historicalData, List<Signal> dependencySignals = null);

		/// <summary>
		/// Override this method only if you want to provide more efficient way to take <paramref name="last"/> signals
		/// </summary>
		protected virtual List<Signal> GetSignals(HistoricalData historicalData, List<Signal> dependencySignals = null, int? last = null)
		{
			List<Signal> signals = GetSignalsBase(historicalData, dependencySignals);
			if (last.HasValue)
			{
				signals = signals.Take(last.Value).ToList();
			}

			return signals;
		}

		protected List<Signal> GetSignals(string symbol, double[] outData, DateTime[] dates, int startIndex, int elementCount)
		{
			List<Signal> signals = new List<Signal>(elementCount);

			for (int counter = 0; counter < elementCount; counter++)
			{
				Signal signal = GetSignal(symbol, outData[counter], dates[startIndex + counter]);
				signals.Insert(0, signal);
			}

			return signals;
		}

		protected Signal GetSignal(string securityCode, double outData, DateTime date)
		{
			Signal signal = new Signal
			{
				StockCode = securityCode,
				Date = date,
				Name = Name,
				Value = outData
			};

			return signal;
		}

		#endregion Protected
	}
}
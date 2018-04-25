using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text.RegularExpressions;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using OptionsPlay.Common.Utilities;
using OptionsPlay.Logging;
using OptionsPlay.MarketData.Common;
using OptionsPlay.MarketData.Indicators.Factories;
using OptionsPlay.MarketData.Indicators.Helpers;
using OptionsPlay.Resources;

namespace OptionsPlay.MarketData.Indicators
{
	public class IndicatorsBuilder : IIndicatorsBuilder
	{
		private static readonly char[] Separator = { ',' };
		private const string NameGroup = "name";
		private const string PeriodGroup = "period";

		private readonly Dictionary<Type, IIndicatorFactory> _factories = new Dictionary<Type, IIndicatorFactory>();

		private static readonly Regex IndicatorFormat =
			new Regex(string.Format(@"(?<{0}>[a-z]+)(\((?<{1}>\d+)\))?", NameGroup, PeriodGroup));

		#region Implementation of IIndicatorsBuilder

		// ReSharper disable ParameterTypeCanBeEnumerable.Local
		public IndicatorsBuilder(IEnumerable<IIndicatorFactory> factories)
		// ReSharper restore ParameterTypeCanBeEnumerable.Local
		{
			RegisterFactories(factories);

			foreach (Type periodIndicatorType in IndicatorHelper.PeriodIndicatorTypes)
			{
				if (!_factories.ContainsKey(periodIndicatorType))
				{
					RegisterFactory(new PeriodIndicatorFactory(periodIndicatorType));
				}
			}

			if (_factories.Count != IndicatorHelper.IndicatorTypes.Count)
			{
				throw new InvalidOperationException("Not all factorises specified.");
			}
		}

		/// <summary>
		/// Instanitates indicators by given string.
		/// Each indicator in string is separated by comma. 
		/// Periodical indicators may have additional period value in brackets.
		/// eg: 
		/// initializationString = "RSI(20), CCI(20), STOCH, WILLR(20), MFI(20)"
		/// if period is not given - the factory creates separate indicator instance
		///  for each default period in PeriodIndicator.DefaultAvgPeriods
		/// </summary>
		/// <param name="initializationString"></param>
		/// <param name="fromJson">If this parameter is true, <paramref name="initializationString"/> must represent valid JSON string</param>
		public List<IIndicator> Build(string initializationString, bool fromJson = false)
		{
			List<IIndicator> indicators;
			if (fromJson)
			{
				indicators = BuildFromJson(initializationString);
				return indicators;
			}

			indicators = string.IsNullOrWhiteSpace(initializationString)
											? GetDefaultIndicators()
											: BuildFromString(initializationString);
			return indicators;
		}

		/// <summary>
		/// Get List of Default Indicators
		/// </summary>
		public List<IIndicator> GetDefaultIndicators()
		{
			List<IIndicator> result = new List<IIndicator>();

			foreach (Type indicatorType in IndicatorHelper.IndicatorTypes)
			{
				IIndicatorFactory factory = _factories[indicatorType];
				IList<IIndicator> indicators = factory.Create();
				result.AddRange(indicators);
			}

			return result;
		}

		#endregion

		private List<IIndicator> BuildFromString(string indicatorsString)
		{
			if (string.IsNullOrWhiteSpace(indicatorsString))
			{
				throw new ArgumentNullException(indicatorsString);
			}

			List<IIndicator> result = new List<IIndicator>();

			string[] indicatorStrings = indicatorsString.Split(Separator, StringSplitOptions.RemoveEmptyEntries);
			foreach (string indicatorString in indicatorStrings)
			{
				string lowerCaseIndicatorName = indicatorString.Trim().ToLowerInvariant();

				Match match = IndicatorFormat.Match(lowerCaseIndicatorName);
				if (!match.Success)
				{
					string message = string.Format("Invalid indicator string format: '{0}'", indicatorString);
					Logger.Error(message);
					throw new Exception(message);
				}
				string indicatorName = match.Groups[NameGroup].Value;

				// If period has been specified
				if (match.Groups.Count > 1)
				{
					Dictionary<string, string> parameters = new Dictionary<string, string>
					{
						{
							ReflectionExtensions.GetPropertyName<PeriodIndicator>(i => i.AvgPeriod), match.Groups[PeriodGroup].Value
						}
					};

					List<IIndicator> indicatorInstances = CreateIndicatorInstances(indicatorName, parameters);
					result.AddRange(indicatorInstances);
					continue;
				}

				List<IIndicator> indicators = CreateIndicatorInstances(indicatorName, null);
				result.AddRange(indicators);
			}

			return result;
		}

		private List<IIndicator> BuildFromJson(string indicatorsJson)
		{
			JArray jArray = JsonConvert.DeserializeObject<JArray>(indicatorsJson);

			List<IIndicator> result = new List<IIndicator>();
			foreach (JObject jObject in jArray)
			{
				JToken typeToken = jObject["type"];
				if (typeToken == null)
				{
					const string errorMessage = "Property 'type' is required for each indicator";
					Logger.LogErrorAndThrow(errorMessage);
				}
				string typeValue = typeToken.Value<string>();

				Type indicatorType = IndicatorHelper.IndicatorTypes.Single(m => m.Name.ToLower().Equals(typeValue.ToLower()));
				if (indicatorType == null)
				{
					string errorMessage = string.Format(ErrorMessages.InvalidIndicator, typeValue);
					Logger.Error(errorMessage);
					throw new Exception(errorMessage);
				}

				IIndicatorFactory factory = _factories[indicatorType];
				Dictionary<string, string> properties = new Dictionary<string, string>();
				foreach (JProperty prop in jObject.Properties())
				{
					string propName = prop.Name.UppercaseFirstLetter();
					properties.Add(propName, prop.Value.Value<string>());
				}

				result.AddRange(factory.Create(properties));
			}

			return result;
		}

		private List<IIndicator> CreateIndicatorInstances(string indicatorName, Dictionary<string, string> parameters)
		{
			Type indicatorType = IndicatorHelper.IndicatorTypes.SingleOrDefault(m => m.Name.ToLowerInvariant().Equals(indicatorName));
			if (indicatorType == null)
			{
				ThrowInvalidIndicatorError(indicatorName);
			}

			Debug.Assert(indicatorType != null, "indicatorType != null");
			List<IIndicator> indicators = _factories[indicatorType].Create(parameters);

			return indicators;
		}

		private static void ThrowInvalidIndicatorError(string indicatorName)
		{
			string errorMessage = string.Format(ErrorMessages.InvalidIndicator, indicatorName);
			Logger.Error(errorMessage);
			throw new Exception(errorMessage);
		}

		private void RegisterFactory(IIndicatorFactory factory)
		{
			_factories.Add(factory.IndicatorType, factory);
		}

		private void RegisterFactories(IEnumerable<IIndicatorFactory> factories)
		{
			foreach (IIndicatorFactory indicatorFactory in factories)
			{
				RegisterFactory(indicatorFactory);
			}
		}
	}
}
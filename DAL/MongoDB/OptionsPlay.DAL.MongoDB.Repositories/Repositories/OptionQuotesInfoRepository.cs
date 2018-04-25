using System;
using System.Collections.Generic;
using System.Linq;
using MongoDB.Driver;
using MongoDB.Driver.Builders;
using OptionsPlay.DAL.Interfaces.Repositories;
using OptionsPlay.Model;
using OptionsPlay.Model.Extensions;

namespace OptionsPlay.DAL.MongoDB.Repositories.Repositories
{
	public class OptionQuotesInfoRepository : MongoRepository<OptionQuoteInfo>, IOptionQuotesInfoRepository
	{
		public OptionQuotesInfoRepository(MongoDBContext monoDBContext)
			: base(monoDBContext)
		{
			CollectionName = "OptionQuotes";
		}

		#region Implementation of IOptionQuotesInfoRepository

		public void Replace(IEnumerable<OptionQuoteInfo> items)
		{
			Add(items);

			GetCollection().Remove(Query<OptionQuoteInfo>.EQ(item => item.IsActive, true));

			GetCollection().Update(
				Query<OptionQuoteInfo>.EQ(item => item.IsActive, false),
				Update<OptionQuoteInfo>.Set(item => item.IsActive, true), 
				UpdateFlags.Multi);
		}

		public void Update(List<OptionQuoteInfo> newItems, List<OptionQuoteInfo> previousItems)
		{
			if (previousItems != null && previousItems.Any())
			{
				List<string> newOptionNumbers = newItems.Select(item => item.OptionNumber).ToList();
				List<string> previousOptionNumbers = previousItems.Select(item => item.OptionNumber).ToList();

				//Drop removed in new version quotes
				IEnumerable<OptionQuoteInfo> removedQuotes = previousItems.Where(item => !newOptionNumbers.Contains(item.OptionNumber));
				foreach (OptionQuoteInfo removedQuote in removedQuotes)
				{
					GetCollection().Remove(Query<OptionQuoteInfo>.EQ(item => item.OptionNumber, removedQuote.OptionNumber));
				}

				//Add new quotes
				List<OptionQuoteInfo> addedQuotes = newItems
					.Where(item => !previousOptionNumbers.Contains(item.OptionNumber))
					.ToList();
				if (addedQuotes.Count > 0)
				{
					addedQuotes.ForEach(item => { item.IsActive = true; });
					Add(addedQuotes);
				}

				//Update option quotes with the same OptionNumber
				//Tuple<previous, new>
				List<Tuple<OptionQuoteInfo, OptionQuoteInfo>> quotesComparisons = previousItems
					.Where(item => newOptionNumbers.Contains(item.OptionNumber))
					.Select(item => new Tuple<OptionQuoteInfo, OptionQuoteInfo>(item, newItems.First(newItem => newItem.OptionNumber == item.OptionNumber)))
					.ToList();

				foreach (Tuple<OptionQuoteInfo, OptionQuoteInfo> quotesComparison in quotesComparisons)
				{
					if (!quotesComparison.Item1.IsEquals(quotesComparison.Item2))
					{
						Update(quotesComparison.Item1.Id, quotesComparison.Item2);
					}
				}
			}
			else
			{
				Replace(newItems);
			}
		}

       

		#endregion
	}
}

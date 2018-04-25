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
	public class StockQuotesInfoRepository : MongoRepository<StockQuoteInfo>, IStockQuotesInfoRepository
	{
		public StockQuotesInfoRepository(MongoDBContext monoDBContext)
			: base(monoDBContext)
		{
			CollectionName = "StockQuotes";
		}

		#region Implementation of IStockQuotesInfoRepository

		public void Replace(IEnumerable<StockQuoteInfo> items)
		{
			Add(items);

			GetCollection().Remove(Query<StockQuoteInfo>.EQ(item => item.IsActive, true));

			GetCollection().Update(
				Query<StockQuoteInfo>.EQ(item => item.IsActive, false),
				Update<StockQuoteInfo>.Set(item => item.IsActive, true),
				UpdateFlags.Multi);
		}

		public void Update(List<StockQuoteInfo> newItems, List<StockQuoteInfo> previousItems)
		{
			if (previousItems != null && previousItems.Any())
			{
				List<string> newStockCodes = newItems.Select(item => item.SecurityCode).ToList();
				List<string> previousStockCodes = previousItems.Select(item => item.SecurityCode).ToList();

				//Drop removed in new version quotes
				IEnumerable<StockQuoteInfo> removedQuotes = previousItems.Where(item => !newStockCodes.Contains(item.SecurityCode));
				foreach (StockQuoteInfo removedQuote in removedQuotes)
				{
					GetCollection().Remove(Query<StockQuoteInfo>.EQ(item => item.SecurityCode, removedQuote.SecurityCode));
				}

				//Add new quotes
				List<StockQuoteInfo> addedQuotes = newItems
					.Where(item => !previousStockCodes.Contains(item.SecurityCode))
					.ToList();
				if (addedQuotes.Count > 0)
				{
					addedQuotes.ForEach(item => { item.IsActive = true; });
					Add(addedQuotes);
				}

				//Update option quotes with the same OptionNumber
				//Tuple<previous, new>
				List<Tuple<StockQuoteInfo, StockQuoteInfo>> quotesComparisons = previousItems
					.Where(item => newStockCodes.Contains(item.SecurityCode))
					.Select(item => new Tuple<StockQuoteInfo, StockQuoteInfo>(item, newItems.First(newItem => newItem.SecurityCode == item.SecurityCode)))
					.ToList();

				foreach (Tuple<StockQuoteInfo, StockQuoteInfo> quotesComparison in quotesComparisons)
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

using System;
using System.Collections.Generic;
using System.Linq;
using MongoDB.Driver.Builders;
using OptionsPlay.Common.Utilities;
using OptionsPlay.DAL.Interfaces.Repositories;
using OptionsPlay.Model;
using OptionsPlay.Model.Extensions;
using System.IO;

namespace OptionsPlay.DAL.MongoDB.Repositories.Repositories
{
	public class TradeIdeasRepository : MongoRepository<TradeIdea>, ITradeIdeasRepository
	{
		private const int BatchSizeForTradeIdeas = 300;

		public TradeIdeasRepository(MongoDBContext monoDBContext) : base(monoDBContext)
		{
		}

		#region Implementation of ITradeIdeasRepository

		public IQueryable<TradeIdea> GetBySecurity(string masterSecurityCode)
		{
			IQueryable<TradeIdea> tradeIdeas = GetAll()
				.Where(m => m.MasterSecurity.MasterSecurityCode.Equals(masterSecurityCode));
			return tradeIdeas;
		}

		public TradeIdea GetLatestTradeIdeaBySecurity(string masterSecurityCode)
		{
			DateTime latestDate = GetLatestComparableDate();
			return GetAll().SingleOrDefault(item => 
				item.DateOfScan == latestDate
				&& item.MasterSecurity.MasterSecurityCode.IgnoreCaseEquals(masterSecurityCode));
		}

		public IQueryable<TradeIdea> GetByDate(DateTime date)
		{
			int comparableTicks = date.ToComparableTicks();

			return GetAll().Where(m => m.DateOfScanTicks == comparableTicks);
		}

		public List<string> GetLatestTradeIdeasSecurities()
		{
			DateTime latestDate = GetLatestComparableDate();
			return GetAll().Where(item => item.DateOfScan == latestDate)
				.Select(item => item.MasterSecurity.MasterSecurityCode).ToList();
		}

		public void DeleteBySecurityAndDate(string masterSecurityCode, DateTime dateOfScan)
		{
			dateOfScan = DateTime.SpecifyKind(dateOfScan, DateTimeKind.Utc);
			Delete(Query.And(Query<TradeIdea>.EQ(e => e.DateOfScan, dateOfScan), Query<TradeIdea>.EQ(e => e.MasterSecurity.MasterSecurityCode, masterSecurityCode)));
		}

		public IQueryable<TradeIdea> GetByLatestDate()
		{
			DateTime latestComparableDate = GetLatestComparableDate();

			IQueryable<TradeIdea> tradeIdeas = GetCollection().Find(Query<TradeIdea>.EQ(idea => idea.DateOfScan, latestComparableDate))
				.SetBatchSize(BatchSizeForTradeIdeas)
				.AsQueryable();
			return tradeIdeas;
		}

		public void AddOrUpdate(List<TradeIdea> tradeIdeas, string masterSecurityCode, DateTime dateOfScan)
		{
			int comparableTicks = dateOfScan.ToComparableTicks();

			// delete unused data
			Delete(Query.And(Query<TradeIdea>.EQ(e => e.DateOfScanTicks, comparableTicks),
				Query<TradeIdea>.EQ(e => e.MasterSecurity.MasterSecurityCode, masterSecurityCode)));

			// make symbol lowercase in order to ease comparison in the future
			foreach (TradeIdea tradeIdea in tradeIdeas)
			{
				tradeIdea.DateOfScan = DateTime.SpecifyKind(tradeIdea.DateOfScan, DateTimeKind.Utc);
			}

			// fill in with new data
			Add(tradeIdeas);
		}

		public void AddOrUpdate(TradeIdea tradeIdea)
		{
			tradeIdea.DateOfScan = DateTime.SpecifyKind(tradeIdea.DateOfScan, DateTimeKind.Utc);
			tradeIdea.SetDateOfScan(tradeIdea.DateOfScan);

			Delete(Query.And(Query<TradeIdea>.EQ(e => e.DateOfScan, tradeIdea.DateOfScan),
				Query<TradeIdea>.EQ(e => e.MasterSecurity.MasterSecurityCode, tradeIdea.MasterSecurity.MasterSecurityCode)));

			Add(tradeIdea);
		}

		public void SetDailyPlay(TradeIdea tradeIdea)
		{
			Update(Query<TradeIdea>.EQ(e => e.Id, tradeIdea.Id), Update<TradeIdea>.Set(idea => idea.DailyPlay, true));
		}

		public void ResetDailyPlay(TradeIdea tradeIdea)
		{
			Update(Query<TradeIdea>.EQ(e => e.Id, tradeIdea.Id), Update<TradeIdea>.Set(idea => idea.DailyPlay, false));
		}

		public TradeIdea FindOptimalTradeIdea(DateTime? date = null)
		{
			TradeIdea result;

			if (date.HasValue)
			{
				int comparableTicks = date.Value.ToComparableTicks();

				result = GetCollection()
					.Find(Query.And(Query<TradeIdea>.EQ(e => e.DateOfScanTicks, comparableTicks),
						Query<TradeIdea>.Exists(e => e.RuleMatch[1])))
					.SetSortOrder(SortBy<TradeIdea>.Descending(item => item.MarketCap))
					.FirstOrDefault();
			}
			else
			{
				result = GetCollection()
					.Find(Query<TradeIdea>.Exists(e => e.RuleMatch[1]))
					.SetSortOrder(SortBy<TradeIdea>.Descending(item => item.DateOfScanTicks).Descending(item => item.MarketCap))
					.FirstOrDefault();
			}

			return result;
		}

		#endregion


		private DateTime GetLatestComparableDate()
		{
			DateTime latestComparableDate = GetAll().OrderByDescending(i => i.DateOfScan).Select(i => i.DateOfScan).FirstOrDefault();
			return latestComparableDate;
		}

        public void GetTradeIdeaFromCSV(ref System.IO.FileStream fs)
        {
            
           
                System.Data.DataTable mycsvdt = new System.Data.DataTable();
             
                bool returnValue = VerifyTypeOfCSV( mycsvdt, fs);
                if (returnValue == true)
                {
                    System.Diagnostics.Process p = new System.Diagnostics.Process();
                    p.StartInfo.FileName ="D:\\mongodb\\bin\\mongoimport";
                    p.StartInfo.UseShellExecute = false;
                    p.StartInfo.RedirectStandardInput = true;
                    p.StartInfo.RedirectStandardOutput = true;
                    p.StartInfo.RedirectStandardError = true;
                    p.StartInfo.CreateNoWindow = true;
                    p.StartInfo.Arguments = " -d fcmarketdata -c HistoricalQuotes -type csv -fields TradeDate,OpenPrice,HighPrice,LowPrice,ClosePrice,MatchQuantity,StockCode -file " + fs.Name + " -headerline";
                    p.Start();


                }
           
        }
        private bool VerifyTypeOfCSV( System.Data.DataTable mycsvdt,System.IO.FileStream fs)
        {
         
            try
            {
                int intColCount = 0;
                bool blnFlag = true;

                System.Data.DataColumn mydc;
                System.Data.DataRow mydr;

                string strline;
                string[] aryline;
                using (System.IO.StreamReader mysr = new System.IO.StreamReader(fs))
                {
                    while ((strline = mysr.ReadLine()) != null)
                    {
                        aryline = strline.Split(new char[] { ',' });
                        //add column name to datatable instance
                        if (blnFlag)
                        {
                            blnFlag = false;
                            intColCount = aryline.Length;
                            int col = 0;
                            for (int i = 0; i < aryline.Length; i++)
                            {
                                col = i + 1;
                                mydc = new System.Data.DataColumn(col.ToString());
                                mycsvdt.Columns.Add(mydc);
                            }
                        }
                        //fill data into datatable
                        mydr = mycsvdt.NewRow();
                        for (int i = 0; i < intColCount; i++)
                        {
                            mydr[i] = aryline[i];
                        }
                        mycsvdt.Rows.Add(mydr);
                    }

                    return true;
                }
            }
            catch (Exception ex)
            {


                return false;
            }
        }

        //public IQueryable<TradeIdea> GetTradeIdea(string securityCode)
        //{
            //result = GetCollection()
            //            .Find(Query.And(Query<TradeIdea>.EQ(e => e.DateOfScanTicks, comparableTicks),
            //                Query<TradeIdea>.Exists(e => e.RuleMatch[1])))
            //            .SetSortOrder(SortBy<TradeIdea>.Descending(item => item.MarketCap))
            //            .FirstOrDefault();
        
        //}
      
	}
}
using System;
using System.Collections.Generic;
using System.Linq;
using OptionsPlay.BusinessLogic.Common;
using OptionsPlay.Common.ServiceResponses;
using OptionsPlay.DAL.Interfaces;
using OptionsPlay.Model;
using System.IO;
using System.Text.RegularExpressions;

namespace OptionsPlay.BusinessLogic
{
	public class TradeIdeaService : BaseService, ITradeIdeaService
	{
        private readonly ITradeIdeaService _iTradeIdeaService;
        private readonly IOptionsPlayUow _uow;
		public TradeIdeaService(IOptionsPlayUow uow)
			: base(uow)
		{
            _uow = uow;
		}

		#region Implementation of ITradeIdeaService

		public EntityResponse<List<TradeIdea>> GetBySecurity(string masterSecurityCode)
		{
			throw new NotImplementedException();
		}

		public TradeIdea GetLatestTradeIdeaBySecurity(string masterSecurityCode)
		{
			throw new NotImplementedException();
		}

		public List<string> GetLatestTradeIdearsSecurities()
		{
			throw new NotImplementedException();
		}

		public IQueryable<TradeIdea> GetByDate(DateTime? date = null)
		{
			throw new NotImplementedException();
		}

		public void SaveTradeIdeas(List<TradeIdea> tradeIdeas, DateTime dateOfScan, string masterSecurityCode = null)
		{
			throw new NotImplementedException();
		}

		public void SaveTradeIdea(TradeIdea tradeIdea)
		{
			throw new NotImplementedException();
		}

		public BaseResponse CalculateOptimalTradeIdea(DateTime? date = null)
		{
			throw new NotImplementedException();
		}

		public BaseResponse SetOptimalTradeIdea(string masterSecurityCode, DateTime date)
		{
			throw new NotImplementedException();
		}

		public BaseResponse ResetOptimalTradeIdea(DateTime date)
		{
			throw new NotImplementedException();
		}

		public void StoreTradeIdeasInDb()
		{

            //First judge .CSV file is correct or not,
            //the next step is to delete the record that the column name named  the stock number is existance in the HistoricalQuotes table
            //the final step is to use mongoimport commond-line
           
            string path = @"d:\";
            DirectoryInfo Dir = new DirectoryInfo(path);
            if(Directory.GetFiles(path).Where(s => Regex.IsMatch(s, "\\.(csv)$", RegexOptions.IgnoreCase)).Count()!=0)
            {
                foreach (FileInfo f in Dir.GetFiles("*.csv"))
                {
                    FileStream fs = new FileStream(f.FullName, FileMode.Open);
                    _uow.HistoricalQuotes.DeleteTradeIdeaByFileName(ref fs, f.FullName);
                    _uow.TradeIdeasRepository.GetTradeIdeaFromCSV(ref fs);
                    //_uow.HistoricalQuotes.UpdateStringAsISODate(ref fs, f.FullName);

                }
            }
             
			//throw new NotImplementedException();
		}

		public void DeleteTradeIdea(string masterSecurityCode, DateTime date)
		{
			throw new NotImplementedException();
		}

		#endregion
	}
}
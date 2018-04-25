using OptionsPlay.BusinessLogic.Common.Entities;
using OptionsPlay.Common.Options;
using OptionsPlay.DAL.SZKingdom.Common.Entities;
using OptionsPlay.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OptionsPlay.Optimization
{
    public static class MemoryCache
    {
        public static String ALL_OPTIONS = "ALL_OPTIONS";
        public static Dictionary<string, ListOptionBasicInformation> OptionBasicInformationCache = new Dictionary<string, ListOptionBasicInformation>();

        public static Dictionary<string, ListSecurityInformation> SecurityInformationCache = new Dictionary<string, ListSecurityInformation>();

        public static Dictionary<string, ListOptionChain> OptionChainCache = new Dictionary<string, ListOptionChain>();

        public static Dictionary<string, ListStockQuoteInfo> StockQuoteInfoCache = new Dictionary<string, ListStockQuoteInfo>();

        private static bool Expire(DateTime? dt, int hours)
        {
            return dt.Value.Add(TimeSpan.FromHours(hours)) > DateTime.UtcNow ? false : true;
        }

        public static void AddOrUpdateSecurityInformationCache(string securityCode, List<SecurityInformation> mappedResult)
        {
            if (securityCode == null)
                return;

            if (!MemoryCache.SecurityInformationCache.ContainsKey(securityCode))
            {
                ListSecurityInformation lsi = new ListSecurityInformation
                {
                    SecurityInformationLastUpdate = DateTime.UtcNow,
                    SecurityInformations = mappedResult
                };
                MemoryCache.SecurityInformationCache.Add(securityCode, lsi);
            }
            else
            {
                MemoryCache.SecurityInformationCache[securityCode].SecurityInformations = mappedResult;
                MemoryCache.SecurityInformationCache[securityCode].SecurityInformationLastUpdate = DateTime.UtcNow;
            }
        }

        public static void AddOrUpdateOptionBasicInformationCache(string underlyingCode, List<OptionBasicInformation> mappedResult)
        {
            if (underlyingCode == null)
                underlyingCode = ALL_OPTIONS;

            if (!MemoryCache.OptionBasicInformationCache.ContainsKey(underlyingCode))
            {
                ListOptionBasicInformation lb = new ListOptionBasicInformation
                {
                    OptionBasicInformationLastUpdate = DateTime.UtcNow,
                    OptionBasicInformations = mappedResult
                };
                MemoryCache.OptionBasicInformationCache.Add(underlyingCode, lb);
            }
            else
            {
                MemoryCache.OptionBasicInformationCache[underlyingCode].OptionBasicInformations = mappedResult;
                MemoryCache.OptionBasicInformationCache[underlyingCode].OptionBasicInformationLastUpdate = DateTime.UtcNow;
            }
        }

        public static void AddOrUpdateOptionChainCache(string underlying, OptionChain chain)
        {
            if (underlying == null)
                return;

            if (MemoryCache.OptionChainCache.ContainsKey(underlying))
            {
                MemoryCache.OptionChainCache[underlying].OptionChains = chain;
                MemoryCache.OptionChainCache[underlying].OptionChainLastUpdate = DateTime.UtcNow;
            }
            else
            {
                ListOptionChain loc = new ListOptionChain
                {
                    OptionChainLastUpdate = DateTime.UtcNow,
                    OptionChains = chain
                };
                MemoryCache.OptionChainCache.Add(underlying, loc);
            }
        }

        public static void AddOrUpdateStockQuoteInfoCache(string underlying, StockQuoteInfo info) 
        {
            if (underlying == null) return;
            if (MemoryCache.StockQuoteInfoCache.ContainsKey(underlying))
            {
                MemoryCache.StockQuoteInfoCache[underlying].StockQuoteInfos = info;
                MemoryCache.StockQuoteInfoCache[underlying].StockQuoteInfoLastUpdate = DateTime.UtcNow;
            }
            else 
            {
                ListStockQuoteInfo lsqi = new ListStockQuoteInfo 
                {
                    StockQuoteInfoLastUpdate = DateTime.UtcNow,
                    StockQuoteInfos = info
                };
                MemoryCache.StockQuoteInfoCache.Add(underlying, lsqi);
            }
        }

        public static bool IsOptionBasicInfomationCacheExpired(string underlyingCode) 
        {
            if (underlyingCode == null)
                underlyingCode = ALL_OPTIONS;

            if (MemoryCache.OptionBasicInformationCache != null 
                && MemoryCache.OptionBasicInformationCache.ContainsKey(underlyingCode)
                && MemoryCache.OptionBasicInformationCache[underlyingCode].OptionBasicInformationLastUpdate.HasValue
                && !MemoryCache.Expire(MemoryCache.OptionBasicInformationCache[underlyingCode].OptionBasicInformationLastUpdate, AppConfigManager.OptionBasicInformationExpiration))
            {
                return false;
            }
            else 
            {
                return true;
            }
        }

        public static bool IsSecurityInformationCacheExpired(string securityCode)
        {
            if (securityCode!=null 
                && MemoryCache.SecurityInformationCache != null 
                && MemoryCache.SecurityInformationCache.ContainsKey(securityCode)
                && MemoryCache.SecurityInformationCache[securityCode].SecurityInformationLastUpdate.HasValue
                && !MemoryCache.Expire(MemoryCache.SecurityInformationCache[securityCode].SecurityInformationLastUpdate, AppConfigManager.SecurityInformationExpiration)) 
            {
                return false;
            }
            else
            {
                return true;
            }
        }

        public static bool IsOptionChainCacheExpired(string underlying)
        {
            if (MemoryCache.OptionChainCache != null && MemoryCache.OptionChainCache.ContainsKey(underlying)
               && MemoryCache.OptionChainCache[underlying].OptionChainLastUpdate.HasValue
               && !MemoryCache.Expire(MemoryCache.OptionChainCache[underlying].OptionChainLastUpdate, AppConfigManager.OptionBasicInformationExpiration))
            {
                return false;
            }
            else
            {
                return true;
            }
        }

        public static bool IsStockQuoteInfoCacheExpired(string underlying) 
        {
            if (MemoryCache.StockQuoteInfoCache != null && MemoryCache.StockQuoteInfoCache.ContainsKey(underlying)
                && MemoryCache.StockQuoteInfoCache[underlying].StockQuoteInfoLastUpdate.HasValue
                && !MemoryCache.Expire(MemoryCache.StockQuoteInfoCache[underlying].StockQuoteInfoLastUpdate, AppConfigManager.StockQuoteInfoExpiration))
            {
                return false;
            }
            else 
            {
                return true;
            }
        }
    }

    public class ListOptionBasicInformation
    {
        public List<OptionBasicInformation> OptionBasicInformations { get; set; }

        public DateTime? OptionBasicInformationLastUpdate { get; set; }
    }

    public class ListSecurityInformation
    {
        public List<SecurityInformation> SecurityInformations { get; set; }

        public DateTime? SecurityInformationLastUpdate { get; set; }
    }

    public class ListOptionChain
    {
        public OptionChain OptionChains { get; set; }

        public DateTime? OptionChainLastUpdate { get; set; }
    }

    public class ListStockQuoteInfo 
    {
        public StockQuoteInfo StockQuoteInfos { get; set; }

        public DateTime? StockQuoteInfoLastUpdate { get; set; }
    }
}

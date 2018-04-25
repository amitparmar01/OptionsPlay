using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using OptionsPlay.DAL.SZKingdom.Common.Configuration;
using OptionsPlay.DAL.SZKingdom.Common.Enums;
using OptionsPlay.DAL.SZKingdom.DataProvider.Entities;

namespace OptionsPlay.DAL.SZKingdom.DataProvider
{
    public static class SZKingdomPool
    {
          //static List<KCBPConnectionOptions> SZKingdomFactory = new List<KCBPConnectionOptions>();
          static SZKingdomPoolConfiguration poolConfiguration = SZKingdomPoolConfiguration.LoadConfiguration();
         
          static Dictionary<int, Dictionary<KCBPConnectionOptions, SZKingdomConfiguration>> SZKingdomFactory = new Dictionary<int, Dictionary<KCBPConnectionOptions, SZKingdomConfiguration>>();
          static int ConnectionOptionsIndex = 0;

      
        public static void InitializeSZkongdom()
        {
            SZKingdomConfiguration Configuration;
            for (int i = 0; i < poolConfiguration.Size; i++)
            {
                Configuration = SZKingdomConfiguration.LoadConfiguration("SZKingdomConfiguration"+i);
                KCBPConnectionOptions _connectionOptions = new KCBPConnectionOptions();
                Dictionary<KCBPConnectionOptions, SZKingdomConfiguration> collections = new Dictionary<KCBPConnectionOptions, SZKingdomConfiguration>();
                _connectionOptions.Address = Configuration.IpAddress;
                _connectionOptions.ServerName = Configuration.ServerName;
                _connectionOptions.Protocol = Configuration.Protocol;
                _connectionOptions.Port = Configuration.Port;
                _connectionOptions.SendQName = Configuration.SendQName;
                _connectionOptions.ReceiveQName = Configuration.ReceiveQName;
                //SZKingdomFactory.Add(_connectionOptions);
                collections.Add(_connectionOptions, Configuration);
                SZKingdomFactory.Add(i, collections);
                
            }
        }

        public static  Dictionary<KCBPConnectionOptions, SZKingdomConfiguration> GetAvailableSZKingdom()
        {
            lock (SZKingdomFactory)
            {
                if (SZKingdomFactory.Count == 0)
                {
                    InitializeSZkongdom();
                }
                //return SZKingdomFactory[ConnectionOptionsIndex++ % SZKingdomFactory.Count];
                return SZKingdomFactory[ConnectionOptionsIndex++ % SZKingdomFactory.Count];
            }
        }
    }
}

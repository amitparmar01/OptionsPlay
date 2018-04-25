using OptionsPlay.BusinessLogic;
using OptionsPlay.BusinessLogic.Common;
using StructureMap.Configuration.DSL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using OptionsPlay.MarketData.Common;
using OptionsPlay.MarketData;
using OptionsPlay.BusinessLogic.Common.Indicators;
using OptionsPlay.BusinessLogic.Indicators;

namespace OptionsPlay.IoC.Registries
{
    public class CommonRegistry : Registry
    {
        public CommonRegistry()
        {
            For<ISignalsCalculator>().Use<SignalsCalculator>();
            For<ITechnicalRankService>().Use<TechnicalRankService>();
        }
    }
}

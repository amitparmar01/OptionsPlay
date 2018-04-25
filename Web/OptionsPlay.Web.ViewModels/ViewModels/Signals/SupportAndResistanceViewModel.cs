using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OptionsPlay.Web.ViewModels.ViewModels.Signals
{
    public class SupportAndResistanceViewModel
    {
        public List<SupportAndResistanceValueViewModel> Support { get; set; }

        public List<SupportAndResistanceValueViewModel> Resistance { get; set; }

        public List<SupportAndResistanceValueViewModel> GapSupport { get; set; }

        public List<SupportAndResistanceValueViewModel> GapResistance { get; set; }

    }
}

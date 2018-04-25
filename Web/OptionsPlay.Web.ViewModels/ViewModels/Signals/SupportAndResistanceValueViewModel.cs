using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OptionsPlay.Web.ViewModels.ViewModels.Signals
{
    public class SupportAndResistanceValueViewModel
    {
        public SupportAndResistanceValueViewModel(double value, DateTime date)
        {
            Date = date.Date;
            Value = value;
        }

        public double Value { get; set; }

        public DateTime Date { get; set; }
    }
}

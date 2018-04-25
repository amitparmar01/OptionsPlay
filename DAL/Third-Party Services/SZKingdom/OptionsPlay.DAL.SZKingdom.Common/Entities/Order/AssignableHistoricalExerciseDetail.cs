using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OptionsPlay.DAL.SZKingdom.Common.Entities
{
    public class AssignableHistoricalExerciseDetail : AssignableExerciseDetail
    {
        [SZKingdomField("OCCUR_DATE")]
        public Decimal? OccurDate { get; set; }
    }
}

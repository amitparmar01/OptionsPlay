using OptionsPlay.BusinessLogic.Common.Cache;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OptionsPlay.BusinessLogic.Common.Services.Cache
{
    public interface IMemoryCacheService
    {
        IQueryable<TEntity> Get<TEntity>(out DBCacheStatus status);
    }
}

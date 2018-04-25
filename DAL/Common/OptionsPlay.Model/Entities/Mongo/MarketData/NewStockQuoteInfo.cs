using OptionsPlay.Model.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OptionsPlay.Model
{
    public class NewStockQuoteInfo : QuoteInfo
    {
        /// <summary>
        /// 行情数据类型
        /// </summary>
        [TxtFileMap(0)]
        public string MDStreamID { get; set; }
        /// <summary>
        /// 产品代码
        /// </summary>
        [TxtFileMap(1)]
        public string SecurityID { get; set; }
        /// <summary>
        /// 产品名称
        /// </summary>
        [TxtFileMap(2)]
        public string Symbol { get; set; }
        /// <summary>
        /// 成交数量
        /// </summary>
        [TxtFileMap(3)]
        public decimal TradeVolume { get; set; }
        /// <summary>
        /// 成交金额
        /// </summary>
        [TxtFileMap(4)]
        public decimal TotalValueTraded { get; set; }
        /// <summary>
        /// 昨日收盘价
        /// </summary>
        [TxtFileMap(5)]
        public decimal PreClosePx { get; set; }
        /// <summary>
        /// 今日开盘价
        /// </summary>
        [TxtFileMap(6)]
        public decimal OpenPrice { get; set; }
        /// <summary>
        /// 最高价
        /// </summary>
        [TxtFileMap(7)]
        public decimal HighPrice { get; set; }
        /// <summary>
        /// 最低价
        /// </summary>
        [TxtFileMap(8)]
        public decimal LowPrice { get; set; }
        /// <summary>
        /// 最新价
        /// </summary>
        [TxtFileMap(9)]
        public decimal TradePrice { get; set; }
        /// <summary>
        /// 今收盘价
        /// </summary>
        [TxtFileMap(10)]
        public decimal ClosePx { get; set; }
        /// <summary>
        /// 申买价一
        /// </summary>
        [TxtFileMap(11)]
        public decimal BuyPrice1 { get; set; }
        /// <summary>
        /// 申买量一
        /// </summary>
        [TxtFileMap(12)]
        public decimal BuyVolume1 { get; set; }
        /// <summary>
        /// 申卖价一
        /// </summary>
        [TxtFileMap(13)]
        public decimal SellPrice1 { get; set; }
        /// <summary>
        /// 申卖量一
        /// </summary>
        [TxtFileMap(14)]
        public decimal SellVolume1 { get; set; }
        /// <summary>
        /// 申买价二
        /// </summary>
        [TxtFileMap(15)]
        public decimal BuyPrice2 { get; set; }
        /// <summary>
        /// 申买量二
        /// </summary>
        [TxtFileMap(16)]
        public decimal BuyVolume2 { get; set; }
        /// <summary>
        /// 申卖价二
        /// </summary>
        [TxtFileMap(17)]
        public decimal SellPrice2 { get; set; }
        /// <summary>
        /// 申卖量二
        /// </summary>
        [TxtFileMap(18)]
        public decimal SellVolume2 { get; set; }
        /// <summary>
        /// 申买价三
        /// </summary>
        [TxtFileMap(19)]
        public decimal BuyPrice3 { get; set; }
        /// <summary>
        /// 申买量三
        /// </summary>
        [TxtFileMap(20)]
        public decimal BuyVolume3{ get; set; }
        /// <summary>
        /// 申卖价三
        /// </summary>
        [TxtFileMap(21)]
        public decimal SellPrice3 { get; set; }
        /// <summary>
        /// 申卖量三
        /// </summary>
        [TxtFileMap(22)]
        public decimal SellVolume3 { get; set; }
        /// <summary>
        /// 申买价四
        /// </summary>
        [TxtFileMap(23)]
        public decimal BuyPrice4 { get; set; }
        /// <summary>
        /// 申买量四
        /// </summary>
        [TxtFileMap(24)]
        public decimal BuyVolume4 { get; set; }
        /// <summary>
        /// 申卖价四
        /// </summary>
        [TxtFileMap(25)]
        public decimal SellPrice4 { get; set; }
        /// <summary>
        /// 申卖量四
        /// </summary>
        [TxtFileMap(26)]
        public decimal SellVolume4 { get; set; }
        /// <summary>
        /// 申买价五
        /// </summary>
        [TxtFileMap(27)]
        public decimal BuyPrice5 { get; set; }
        /// <summary>
        /// 申买量五
        /// </summary>
        [TxtFileMap(28)]
        public decimal BuyVolume5 { get; set; }
        /// <summary>
        /// 申卖价五
        /// </summary>
        [TxtFileMap(29)]
        public decimal SellPrice5 { get; set; }
        /// <summary>
        /// 申卖量五
        /// </summary>
        [TxtFileMap(30)]
        public decimal SellVolume5 { get; set; }
        /// <summary>
        /// 段及标志
        /// </summary>
        [TxtFileMap(31)]
        public string TradingPhaseCode { get; set; }
        /// <summary>
        /// 时间戳
        /// </summary>
        [TxtFileMap(32)]
        public DateTime Timestamp { get; set; }
    }
}

namespace OptionsPlay.Model.Enums
{
	public enum PermissionCollection
	{
		NotAuthenticatedAccessOnly = -1,

		#region Configurations 100

		ManageConfigurationsData = 10001,

		#endregion Configurations 100

		#region Strategies 101

		ViewStrategies = 10101,
		ManageStrategies = 10102,

		#endregion Strategies 101

		#region Trades 108

		ViewTrades = 10801,
		ViewAllTrades = 10802,
		CreateTrades = 10803,
		DeleteTrades = 10804,

		#endregion

		#region TradeIdeas 109

		ViewTradeIdeas = 10901,
		ManageTradeIdeas = 10902,

		#endregion TradeIdeas

		#region Logs 112

		ViewLogs = 11201,

		#endregion Logs

		#region UserActivities 118

		ViewUserActivities = 11801,

		#endregion UserActivities 118
	}
}

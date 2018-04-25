using System.Collections.Generic;
using OptionsPlay.DAL.EF.Core.Helpers;

namespace OptionsPlay.DAL.EF.Core.Migrations
{
	public partial class MigrateDataForStrategiesFromAlpha : DbMigration
	{
		#region Scripts

		private const string UpdatePairStrategyId = @"
			UPDATE [Strategies]
					SET [PairStrategyId] = {0}
				WHERE Id = {1}";

		#endregion Scripts

		#region Objects for Insert

		internal class StrategyDetail
		{
			public int Id { get; set; }

			public int Risk { get; set; }

			public int FirstSentiment { get; set; }

			public int? SecondSentiment { get; set; }

			public byte OccLevel { get; set; }

			public int Reward { get; set; }

			public int DisplayOrder { get; set; }

			public bool Display { get; set; }
		}

		internal class Strategy
		{
			public Strategy()
			{
				Image = "Empty";
			}

			public int Id { get; set; }

			public string Image { get; set; }

			public string Name { get; set; }

			public int BuyDetailsId { get; set; }

			public int SellDetailsId { get; set; }

			public bool CanCustomizeWidth { get; set; }

			public bool CanCustomizeWingspan { get; set; }

			public bool CanCustomizeExpiry { get; set; }

			public int? PairStrategyId { get; set; }
		}

		internal class StrategyLeg
		{
			public int Id { get; set; }

			public int? BuyOrSell { get; set; }

			public int? Quantity { get; set; }

			public short? Strike { get; set; }

			public byte? Expiry { get; set; }

			public int? LegType { get; set; }

			public int StrategyId { get; set; }
		}

		internal class StrategyGroup
		{
			public int Id { get; set; }

			public string Name { get; set; }

			public bool CanCustomizeWidth { get; set; }

			public bool CanCustomizeWingspan { get; set; }

			public bool CanCustomizeExpiry { get; set; }

			public bool Display { get; set; }

			public int CallStrategyId { get; set; }

			public int? PutStrategyId { get; set; }

			public int? DisplayOrder { get; set; }
		}

		#endregion Objects for Insert

		private readonly List<StrategyDetail> _strategyDetails = new List<StrategyDetail>();
		private readonly List<StrategyLeg> _strategyLegs = new List<StrategyLeg>();
		private readonly List<StrategyGroup> _strategyGroups = new List<StrategyGroup>();
		private readonly List<Strategy> _strategies = new List<Strategy>();

		public override void Up()
		{
			SqlExecute.ExecuteNonQuery("DELETE FROM dbo.StrategyGroups");
			SqlExecute.ExecuteNonQuery("DELETE FROM dbo.Strategies");
			SqlExecute.ExecuteNonQuery("DELETE FROM dbo.StrategyDetails");
			SqlExecute.ExecuteNonQuery("DELETE FROM dbo.StrategyLegs");

			//Insert StrategyDetails to DB
			InitializeStrategyDetails();
			foreach (StrategyDetail strategyDetail in _strategyDetails)
			{
				strategyDetail.Id = SqlExecute.InsertAndGetInt32Identity("StrategyDetails", strategyDetail);
			}

			//Insert Strategies to DB
			InitializeStrategies();
			foreach (Strategy strategy in _strategies)
			{
				strategy.BuyDetailsId = _strategyDetails[strategy.BuyDetailsId - 1].Id;
				strategy.SellDetailsId = _strategyDetails[strategy.SellDetailsId - 1].Id;

				strategy.Id = SqlExecute.InsertAndGetInt32Identity("Strategies", strategy);
			}

			foreach (Strategy strategy in _strategies)
			{
				if (strategy.PairStrategyId.HasValue)
				{
					strategy.PairStrategyId = _strategies[strategy.PairStrategyId.Value - 1].Id;

					SqlExecute.ExecuteNonQuery(string.Format(UpdatePairStrategyId,
						strategy.PairStrategyId,
						strategy.Id));
				}
			}

			//Insert StrategyLegs to DB
			InitializeStrategyLegs();
			foreach (StrategyLeg strategyLeg in _strategyLegs)
			{
				strategyLeg.StrategyId = _strategies[strategyLeg.StrategyId - 1].Id;
				strategyLeg.Id = SqlExecute.InsertAndGetInt32Identity("StrategyLegs", strategyLeg);
			}

			//Insert StrategyGroups to DB
			InitializeStrategyGroups();
			foreach (StrategyGroup strategyGroup in _strategyGroups)
			{
				strategyGroup.CallStrategyId = _strategies[strategyGroup.CallStrategyId - 1].Id;
				if (strategyGroup.PutStrategyId.HasValue)
				{
					strategyGroup.PutStrategyId = _strategies[strategyGroup.PutStrategyId.Value - 1].Id;
				}

				strategyGroup.Id = SqlExecute.InsertAndGetInt32Identity("StrategyGroups", strategyGroup);
			}
		}

		public override void Down()
		{
			Sql("DELETE FROM [StrategyGroups]");
			Sql("DELETE FROM [StrategyLegs]");
			Sql("DELETE FROM [Strategies]");
			Sql("DELETE FROM [StrategyDetails]");
		}

		#region InitializeStrategyGroups

		private void InitializeStrategyGroups()
		{
			_strategyGroups.Add(new StrategyGroup
			{
				Name = "Vertical",
				CanCustomizeWidth = true,
				CanCustomizeWingspan = false,
				CanCustomizeExpiry = false,
				DisplayOrder = 2,
				Display = true,
				CallStrategyId = 1,
				PutStrategyId = 2
			});
			_strategyGroups.Add(new StrategyGroup
			{
				Name = "Call/Put",
				CanCustomizeWidth = false,
				CanCustomizeWingspan = false,
				CanCustomizeExpiry = false,
				DisplayOrder = 1,
				Display = true,
				CallStrategyId = 21,
				PutStrategyId = 22
			});
			_strategyGroups.Add(new StrategyGroup
			{
				Name = "Ratio 1x2",
				CanCustomizeWidth = true,
				CanCustomizeWingspan = false,
				CanCustomizeExpiry = false,
				DisplayOrder = 3,
				Display = true,
				CallStrategyId = 9,
				PutStrategyId = 10
			});
			_strategyGroups.Add(new StrategyGroup
			{
				Name = "Straddle",
				CanCustomizeWidth = false,
				CanCustomizeWingspan = false,
				CanCustomizeExpiry = false,
				DisplayOrder = 5,
				Display = true,
				CallStrategyId = 4,
				PutStrategyId = null
			});
			_strategyGroups.Add(new StrategyGroup
			{
				Name = "Strangle",
				CanCustomizeWidth = true,
				CanCustomizeWingspan = false,
				CanCustomizeExpiry = false,
				DisplayOrder = 6,
				Display = true,
				CallStrategyId = 5,
				PutStrategyId = null
			});
			_strategyGroups.Add(new StrategyGroup
			{
				Name = "Butterfly",
				CanCustomizeWidth = false,
				CanCustomizeWingspan = true,
				CanCustomizeExpiry = false,
				DisplayOrder = 7,
				Display = true,
				CallStrategyId = 6,
				PutStrategyId = 7
			});
			_strategyGroups.Add(new StrategyGroup
			{
				Name = "Iron Butterfly",
				CanCustomizeWidth = false,
				CanCustomizeWingspan = true,
				CanCustomizeExpiry = false,
				DisplayOrder = 8,
				Display = true,
				CallStrategyId = 8,
				PutStrategyId = null
			});
			_strategyGroups.Add(new StrategyGroup
			{
				Name = "Condor",
				CanCustomizeWidth = true,
				CanCustomizeWingspan = true,
				CanCustomizeExpiry = false,
				DisplayOrder = 9,
				Display = true,
				CallStrategyId = 13,
				PutStrategyId = 14
			});
			_strategyGroups.Add(new StrategyGroup
			{
				Name = "Iron Condor",
				CanCustomizeWidth = true,
				CanCustomizeWingspan = true,
				CanCustomizeExpiry = false,
				DisplayOrder = 10,
				Display = true,
				CallStrategyId = 15,
				PutStrategyId = null
			});
			_strategyGroups.Add(new StrategyGroup
			{
				Name = "Synthetic Stock",
				CanCustomizeWidth = false,
				CanCustomizeWingspan = false,
				CanCustomizeExpiry = false,
				DisplayOrder = 12,
				Display = true,
				CallStrategyId = 16,
				PutStrategyId = null
			});
			_strategyGroups.Add(new StrategyGroup
			{
				Name = "Collar",
				CanCustomizeWidth = true,
				CanCustomizeWingspan = false,
				CanCustomizeExpiry = false,
				DisplayOrder = 13,
				Display = true,
				CallStrategyId = 17,
				PutStrategyId = null
			});
			_strategyGroups.Add(new StrategyGroup
			{
				Name = "Vertical Spread Spread",
				CanCustomizeWidth = true,
				CanCustomizeWingspan = true,
				CanCustomizeExpiry = false,
				DisplayOrder = 14,
				Display = false,
				CallStrategyId = 18,
				PutStrategyId = null
			});
			_strategyGroups.Add(new StrategyGroup
			{
				Name = "Calendar",
				CanCustomizeWidth = false,
				CanCustomizeWingspan = false,
				CanCustomizeExpiry = true,
				DisplayOrder = 15,
				Display = true,
				CallStrategyId = 19,
				PutStrategyId = 20
			});
			_strategyGroups.Add(new StrategyGroup
			{
				Name = "Diagonal",
				CanCustomizeWidth = true,
				CanCustomizeWingspan = false,
				CanCustomizeExpiry = true,
				DisplayOrder = 16,
				Display = true,
				CallStrategyId = 23,
				PutStrategyId = 24
			});
			_strategyGroups.Add(new StrategyGroup
			{
				Name = "Ratio 2x3",
				CanCustomizeWidth = true,
				CanCustomizeWingspan = false,
				CanCustomizeExpiry = false,
				DisplayOrder = 4,
				Display = true,
				CallStrategyId = 11,
				PutStrategyId = 12
			});
			_strategyGroups.Add(new StrategyGroup
			{
				Name = "Double Diagonal",
				CanCustomizeWidth = true,
				CanCustomizeWingspan = true,
				CanCustomizeExpiry = true,
				DisplayOrder = 17,
				Display = true,
				CallStrategyId = 27,
				PutStrategyId = null
			});
			_strategyGroups.Add(new StrategyGroup
			{
				Name = "Covered Call",
				CanCustomizeWidth = false,
				CanCustomizeWingspan = false,
				CanCustomizeExpiry = false,
				DisplayOrder = 11,
				Display = true,
				CallStrategyId = 3,
				PutStrategyId = 28
			});
			//_strategyGroups.Add(new StrategyGroup
			//	{
			//		Name = "dgfsrgf",
			//		CanCustomizeWidth = false,
			//		CanCustomizeWingspan = false,
			//		CanCustomizeExpiry = false,
			//		DisplayOrder = 34,
			//		Display = false,
			//		CallStrategyId = 25,
			//		PutStrategyId = 26
			//	});
		}

		#endregion InitializeStrategyGroups

		#region InitializeStrategyLegs

		// NOTE: change default security quantities to 1000.
		private void InitializeStrategyLegs()
		{
			_strategyLegs.Add(new StrategyLeg
			{
				LegType = 0,
				BuyOrSell = 0,
				Quantity = 1,
				Strike = -1,
				StrategyId = 1,
				Expiry = 1
			});
			_strategyLegs.Add(new StrategyLeg
			{
				LegType = 0,
				BuyOrSell = 1,
				Quantity = 1,
				Strike = 1,
				StrategyId = 1,
				Expiry = 1
			});
			_strategyLegs.Add(new StrategyLeg
			{
				LegType = 1,
				BuyOrSell = 0,
				Quantity = 1,
				Strike = 0,
				StrategyId = 2,
				Expiry = 1
			});
			_strategyLegs.Add(new StrategyLeg
			{
				LegType = 1,
				BuyOrSell = 1,
				Quantity = 1,
				Strike = -1,
				StrategyId = 2,
				Expiry = 1
			});
			_strategyLegs.Add(new StrategyLeg
			{
				LegType = 2,
				BuyOrSell = 0,
				Quantity = 1000,
				Strike = null,
				StrategyId = 3,
				Expiry = null
			});
			_strategyLegs.Add(new StrategyLeg
			{
				LegType = 0,
				BuyOrSell = 1,
				Quantity = 1,
				Strike = 0,
				StrategyId = 3,
				Expiry = 1
			});
			_strategyLegs.Add(new StrategyLeg
			{
				LegType = 0,
				BuyOrSell = 0,
				Quantity = 1,
				Strike = 0,
				StrategyId = 4,
				Expiry = 1
			});
			_strategyLegs.Add(new StrategyLeg
			{
				LegType = 1,
				BuyOrSell = 0,
				Quantity = 1,
				Strike = 0,
				StrategyId = 4,
				Expiry = 1
			});
			_strategyLegs.Add(new StrategyLeg
			{
				LegType = 0,
				BuyOrSell = 0,
				Quantity = 1,
				Strike = 0,
				StrategyId = 5,
				Expiry = 1
			});
			_strategyLegs.Add(new StrategyLeg
			{
				LegType = 1,
				BuyOrSell = 0,
				Quantity = 1,
				Strike = -1,
				StrategyId = 5,
				Expiry = 1
			});
			_strategyLegs.Add(new StrategyLeg
			{
				LegType = 0,
				BuyOrSell = 0,
				Quantity = 1,
				Strike = -1,
				StrategyId = 6,
				Expiry = 1
			});
			_strategyLegs.Add(new StrategyLeg
			{
				LegType = 0,
				BuyOrSell = 1,
				Quantity = 2,
				Strike = 0,
				StrategyId = 6,
				Expiry = 1
			});
			_strategyLegs.Add(new StrategyLeg
			{
				LegType = 0,
				BuyOrSell = 0,
				Quantity = 1,
				Strike = 1,
				StrategyId = 6,
				Expiry = 1
			});
			_strategyLegs.Add(new StrategyLeg
			{
				LegType = 1,
				BuyOrSell = 0,
				Quantity = 1,
				Strike = -1,
				StrategyId = 7,
				Expiry = 1
			});
			_strategyLegs.Add(new StrategyLeg
			{
				LegType = 1,
				BuyOrSell = 1,
				Quantity = 2,
				Strike = 0,
				StrategyId = 7,
				Expiry = 1
			});
			_strategyLegs.Add(new StrategyLeg
			{
				LegType = 1,
				BuyOrSell = 0,
				Quantity = 1,
				Strike = 1,
				StrategyId = 7,
				Expiry = 1
			});
			_strategyLegs.Add(new StrategyLeg
			{
				LegType = 1,
				BuyOrSell = 1,
				Quantity = 1,
				Strike = -1,
				StrategyId = 8,
				Expiry = 1
			});
			_strategyLegs.Add(new StrategyLeg
			{
				LegType = 0,
				BuyOrSell = 0,
				Quantity = 1,
				Strike = 0,
				StrategyId = 8,
				Expiry = 1
			});
			_strategyLegs.Add(new StrategyLeg
			{
				LegType = 1,
				BuyOrSell = 0,
				Quantity = 1,
				Strike = 0,
				StrategyId = 8,
				Expiry = 1
			});
			_strategyLegs.Add(new StrategyLeg
			{
				LegType = 0,
				BuyOrSell = 1,
				Quantity = 1,
				Strike = 1,
				StrategyId = 8,
				Expiry = 1
			});
			_strategyLegs.Add(new StrategyLeg
			{
				LegType = 0,
				BuyOrSell = 1,
				Quantity = 1,
				Strike = -1,
				StrategyId = 9,
				Expiry = 1
			});
			_strategyLegs.Add(new StrategyLeg
			{
				LegType = 0,
				BuyOrSell = 0,
				Quantity = 2,
				Strike = 0,
				StrategyId = 9,
				Expiry = 1
			});
			_strategyLegs.Add(new StrategyLeg
			{
				LegType = 1,
				BuyOrSell = 0,
				Quantity = 2,
				Strike = -1,
				StrategyId = 10,
				Expiry = 1
			});
			_strategyLegs.Add(new StrategyLeg
			{
				LegType = 1,
				BuyOrSell = 1,
				Quantity = 1,
				Strike = 0,
				StrategyId = 10,
				Expiry = 1
			});
			_strategyLegs.Add(new StrategyLeg
			{
				LegType = 0,
				BuyOrSell = 1,
				Quantity = 2,
				Strike = -1,
				StrategyId = 11,
				Expiry = 1
			});
			_strategyLegs.Add(new StrategyLeg
			{
				LegType = 0,
				BuyOrSell = 0,
				Quantity = 3,
				Strike = 0,
				StrategyId = 11,
				Expiry = 1
			});
			_strategyLegs.Add(new StrategyLeg
			{
				LegType = 1,
				BuyOrSell = 0,
				Quantity = 3,
				Strike = -1,
				StrategyId = 12,
				Expiry = 1
			});
			_strategyLegs.Add(new StrategyLeg
			{
				LegType = 1,
				BuyOrSell = 1,
				Quantity = 2,
				Strike = 0,
				StrategyId = 12,
				Expiry = 1
			});
			_strategyLegs.Add(new StrategyLeg
			{
				LegType = 0,
				BuyOrSell = 0,
				Quantity = 1,
				Strike = -2,
				StrategyId = 13,
				Expiry = 1
			});
			_strategyLegs.Add(new StrategyLeg
			{
				LegType = 0,
				BuyOrSell = 1,
				Quantity = 1,
				Strike = -1,
				StrategyId = 13,
				Expiry = 1
			});
			_strategyLegs.Add(new StrategyLeg
			{
				LegType = 0,
				BuyOrSell = 1,
				Quantity = 1,
				Strike = 0,
				StrategyId = 13,
				Expiry = 1
			});
			_strategyLegs.Add(new StrategyLeg
			{
				LegType = 0,
				BuyOrSell = 0,
				Quantity = 1,
				Strike = 1,
				StrategyId = 13,
				Expiry = 1
			});
			_strategyLegs.Add(new StrategyLeg
			{
				LegType = 1,
				BuyOrSell = 0,
				Quantity = 1,
				Strike = -2,
				StrategyId = 14,
				Expiry = 1
			});
			_strategyLegs.Add(new StrategyLeg
			{
				LegType = 1,
				BuyOrSell = 1,
				Quantity = 1,
				Strike = -1,
				StrategyId = 14,
				Expiry = 1
			});
			_strategyLegs.Add(new StrategyLeg
			{
				LegType = 1,
				BuyOrSell = 1,
				Quantity = 1,
				Strike = 0,
				StrategyId = 14,
				Expiry = 1
			});
			_strategyLegs.Add(new StrategyLeg
			{
				LegType = 1,
				BuyOrSell = 0,
				Quantity = 1,
				Strike = 1,
				StrategyId = 14,
				Expiry = 1
			});
			_strategyLegs.Add(new StrategyLeg
			{
				LegType = 1,
				BuyOrSell = 1,
				Quantity = 1,
				Strike = -2,
				StrategyId = 15,
				Expiry = 1
			});
			_strategyLegs.Add(new StrategyLeg
			{
				LegType = 1,
				BuyOrSell = 0,
				Quantity = 1,
				Strike = -1,
				StrategyId = 15,
				Expiry = 1
			});
			_strategyLegs.Add(new StrategyLeg
			{
				LegType = 0,
				BuyOrSell = 0,
				Quantity = 1,
				Strike = 0,
				StrategyId = 15,
				Expiry = 1
			});
			_strategyLegs.Add(new StrategyLeg
			{
				LegType = 0,
				BuyOrSell = 1,
				Quantity = 1,
				Strike = 1,
				StrategyId = 15,
				Expiry = 1
			});
			_strategyLegs.Add(new StrategyLeg
			{
				LegType = 0,
				BuyOrSell = 0,
				Quantity = 1,
				Strike = 0,
				StrategyId = 16,
				Expiry = 1
			});
			_strategyLegs.Add(new StrategyLeg
			{
				LegType = 1,
				BuyOrSell = 1,
				Quantity = 1,
				Strike = 0,
				StrategyId = 16,
				Expiry = 1
			});
			_strategyLegs.Add(new StrategyLeg
			{
				LegType = 2,
				BuyOrSell = 0,
				Quantity = 1000,
				Strike = null,
				StrategyId = 17,
				Expiry = null
			});
			_strategyLegs.Add(new StrategyLeg
			{
				LegType = 0,
				BuyOrSell = 1,
				Quantity = 1,
				Strike = 0,
				StrategyId = 17,
				Expiry = 1
			});
			_strategyLegs.Add(new StrategyLeg
			{
				LegType = 1,
				BuyOrSell = 0,
				Quantity = 1,
				Strike = -1,
				StrategyId = 17,
				Expiry = 1
			});
			_strategyLegs.Add(new StrategyLeg
			{
				LegType = 1,
				BuyOrSell = 0,
				Quantity = 1,
				Strike = -2,
				StrategyId = 18,
				Expiry = 1
			});
			_strategyLegs.Add(new StrategyLeg
			{
				LegType = 1,
				BuyOrSell = 1,
				Quantity = 1,
				Strike = -1,
				StrategyId = 18,
				Expiry = 1
			});
			_strategyLegs.Add(new StrategyLeg
			{
				LegType = 0,
				BuyOrSell = 0,
				Quantity = 1,
				Strike = 0,
				StrategyId = 18,
				Expiry = 1
			});
			_strategyLegs.Add(new StrategyLeg
			{
				LegType = 0,
				BuyOrSell = 1,
				Quantity = 1,
				Strike = 2,
				StrategyId = 18,
				Expiry = 1
			});
			_strategyLegs.Add(new StrategyLeg
			{
				LegType = 0,
				BuyOrSell = 1,
				Quantity = 1,
				Strike = 0,
				StrategyId = 19,
				Expiry = 1
			});
			_strategyLegs.Add(new StrategyLeg
			{
				LegType = 0,
				BuyOrSell = 0,
				Quantity = 1,
				Strike = 0,
				StrategyId = 19,
				Expiry = 2
			});
			_strategyLegs.Add(new StrategyLeg
			{
				LegType = 1,
				BuyOrSell = 1,
				Quantity = 1,
				Strike = 0,
				StrategyId = 20,
				Expiry = 1
			});
			_strategyLegs.Add(new StrategyLeg
			{
				LegType = 1,
				BuyOrSell = 0,
				Quantity = 1,
				Strike = 0,
				StrategyId = 20,
				Expiry = 2
			});
			_strategyLegs.Add(new StrategyLeg
			{
				LegType = 0,
				BuyOrSell = 0,
				Quantity = 1,
				Strike = -1,
				StrategyId = 21,
				Expiry = 1
			});
			_strategyLegs.Add(new StrategyLeg
			{
				LegType = 1,
				BuyOrSell = 0,
				Quantity = 1,
				Strike = 0,
				StrategyId = 22,
				Expiry = 1
			});
			_strategyLegs.Add(new StrategyLeg
			{
				LegType = 0,
				BuyOrSell = 1,
				Quantity = 1,
				Strike = 1,
				StrategyId = 23,
				Expiry = 1
			});
			_strategyLegs.Add(new StrategyLeg
			{
				LegType = 0,
				BuyOrSell = 0,
				Quantity = 1,
				Strike = 0,
				StrategyId = 23,
				Expiry = 3
			});
			_strategyLegs.Add(new StrategyLeg
			{
				LegType = 1,
				BuyOrSell = 1,
				Quantity = 1,
				Strike = -2,
				StrategyId = 24,
				Expiry = 1
			});
			_strategyLegs.Add(new StrategyLeg
			{
				LegType = 1,
				BuyOrSell = 0,
				Quantity = 1,
				Strike = -1,
				StrategyId = 24,
				Expiry = 3
			});
			_strategyLegs.Add(new StrategyLeg
			{
				LegType = 1,
				BuyOrSell = 1,
				Quantity = 1,
				Strike = -3,
				StrategyId = 25,
				Expiry = 1
			});
			_strategyLegs.Add(new StrategyLeg
			{
				LegType = 0,
				BuyOrSell = 0,
				Quantity = 1,
				Strike = 1,
				StrategyId = 25,
				Expiry = 1
			});
			_strategyLegs.Add(new StrategyLeg
			{
				LegType = 0,
				BuyOrSell = 1,
				Quantity = 1,
				Strike = 2,
				StrategyId = 25,
				Expiry = 1
			});
			_strategyLegs.Add(new StrategyLeg
			{
				LegType = 2,
				BuyOrSell = 0,
				Quantity = 1000,
				Strike = null,
				StrategyId = 26,
				Expiry = null
			});
			_strategyLegs.Add(new StrategyLeg
			{
				LegType = 1,
				BuyOrSell = 0,
				Quantity = 1,
				Strike = -2,
				StrategyId = 27,
				Expiry = 3
			});
			_strategyLegs.Add(new StrategyLeg
			{
				LegType = 1,
				BuyOrSell = 1,
				Quantity = 1,
				Strike = -1,
				StrategyId = 27,
				Expiry = 1
			});
			_strategyLegs.Add(new StrategyLeg
			{
				LegType = 0,
				BuyOrSell = 1,
				Quantity = 1,
				Strike = 2,
				StrategyId = 27,
				Expiry = 1
			});
			_strategyLegs.Add(new StrategyLeg
			{
				LegType = 0,
				BuyOrSell = 0,
				Quantity = 1,
				Strike = 1,
				StrategyId = 27,
				Expiry = 3
			});
			_strategyLegs.Add(new StrategyLeg
			{
				LegType = 2,
				BuyOrSell = 0,
				Quantity = 1000,
				Strike = null,
				StrategyId = 28,
				Expiry = null
			});
			_strategyLegs.Add(new StrategyLeg
			{
				LegType = 1,
				BuyOrSell = 0,
				Quantity = 1,
				Strike = -1,
				StrategyId = 28,
				Expiry = 1
			});
		}

		#endregion InitializeStrategyLegs

		#region InitializeStrategies

		private void InitializeStrategies()
		{
			_strategies.Add(new Strategy
			{
				Name = "Call Vertical",
				CanCustomizeWidth = true,
				CanCustomizeWingspan = false,
				CanCustomizeExpiry = false,
				BuyDetailsId = 1,
				SellDetailsId = 2,
				PairStrategyId = 2
			});

			_strategies.Add(new Strategy
			{
				Name = "Put Vertical",
				CanCustomizeWidth = true,
				CanCustomizeWingspan = false,
				CanCustomizeExpiry = false,
				BuyDetailsId = 3,
				SellDetailsId = 4,
				PairStrategyId = 1
			});

			_strategies.Add(new Strategy
			{
				Name = "Covered Call",
				CanCustomizeWidth = false,
				CanCustomizeWingspan = false,
				CanCustomizeExpiry = false,
				BuyDetailsId = 5,
				SellDetailsId = 6,
				PairStrategyId = 28
			});

			_strategies.Add(new Strategy
			{
				Name = "Straddle",
				CanCustomizeWidth = false,
				CanCustomizeWingspan = false,
				CanCustomizeExpiry = false,
				BuyDetailsId = 9,
				SellDetailsId = 10,
				PairStrategyId = null
			});

			_strategies.Add(new Strategy
			{
				Name = "Strangle",
				CanCustomizeWidth = true,
				CanCustomizeWingspan = false,
				CanCustomizeExpiry = false,
				BuyDetailsId = 11,
				SellDetailsId = 12,
				PairStrategyId = null
			});

			_strategies.Add(new Strategy
			{
				Name = "Call Butterfly",
				CanCustomizeWidth = false,
				CanCustomizeWingspan = true,
				CanCustomizeExpiry = false,
				BuyDetailsId = 13,
				SellDetailsId = 14,
				PairStrategyId = 7
			});

			_strategies.Add(new Strategy
			{
				Name = "Put Butterfly",
				CanCustomizeWidth = false,
				CanCustomizeWingspan = true,
				CanCustomizeExpiry = false,
				BuyDetailsId = 15,
				SellDetailsId = 16,
				PairStrategyId = 6
			});

			_strategies.Add(new Strategy
			{
				Name = "Iron Butterfly",
				CanCustomizeWidth = false,
				CanCustomizeWingspan = true,
				CanCustomizeExpiry = false,
				BuyDetailsId = 17,
				SellDetailsId = 18,
				PairStrategyId = null
			});

			_strategies.Add(new Strategy
			{
				Name = "Call Ratio 1x2",
				CanCustomizeWidth = true,
				CanCustomizeWingspan = false,
				CanCustomizeExpiry = false,
				BuyDetailsId = 19,
				SellDetailsId = 20,
				PairStrategyId = 10
			});

			_strategies.Add(new Strategy
			{
				Name = "Put Ratio 1x2",
				CanCustomizeWidth = true,
				CanCustomizeWingspan = false,
				CanCustomizeExpiry = false,
				BuyDetailsId = 21,
				SellDetailsId = 22,
				PairStrategyId = 9
			});

			_strategies.Add(new Strategy
			{
				Name = "Call Ratio 2x3",
				CanCustomizeWidth = true,
				CanCustomizeWingspan = false,
				CanCustomizeExpiry = false,
				BuyDetailsId = 23,
				SellDetailsId = 24,
				PairStrategyId = 12
			});

			_strategies.Add(new Strategy
			{
				Name = "Put Ratio 2x3",
				CanCustomizeWidth = true,
				CanCustomizeWingspan = false,
				CanCustomizeExpiry = false,
				BuyDetailsId = 25,
				SellDetailsId = 26,
				PairStrategyId = 11
			});

			_strategies.Add(new Strategy
			{
				Name = "Call Condor",
				CanCustomizeWidth = true,
				CanCustomizeWingspan = true,
				CanCustomizeExpiry = false,
				BuyDetailsId = 27,
				SellDetailsId = 28,
				PairStrategyId = 14
			});

			_strategies.Add(new Strategy
			{
				Name = "Put Condor",
				CanCustomizeWidth = true,
				CanCustomizeWingspan = true,
				CanCustomizeExpiry = false,
				BuyDetailsId = 29,
				SellDetailsId = 30,
				PairStrategyId = 13
			});

			_strategies.Add(new Strategy
			{
				Name = "Iron Condor",
				CanCustomizeWidth = true,
				CanCustomizeWingspan = true,
				CanCustomizeExpiry = false,
				BuyDetailsId = 31,
				SellDetailsId = 32,
				PairStrategyId = null
			});

			_strategies.Add(new Strategy
			{
				Name = "Synthetic Stock",
				CanCustomizeWidth = false,
				CanCustomizeWingspan = false,
				CanCustomizeExpiry = false,
				BuyDetailsId = 33,
				SellDetailsId = 34,
				PairStrategyId = null
			});

			_strategies.Add(new Strategy
			{
				Name = "Collar",
				CanCustomizeWidth = true,
				CanCustomizeWingspan = false,
				CanCustomizeExpiry = false,
				BuyDetailsId = 35,
				SellDetailsId = 36,
				PairStrategyId = null
			});

			_strategies.Add(new Strategy
			{
				Name = "Vertical Spread Spread",
				CanCustomizeWidth = true,
				CanCustomizeWingspan = true,
				CanCustomizeExpiry = false,
				BuyDetailsId = 37,
				SellDetailsId = 38,
				PairStrategyId = null
			});

			_strategies.Add(new Strategy
			{
				Name = "Call Calendar",
				CanCustomizeWidth = false,
				CanCustomizeWingspan = false,
				CanCustomizeExpiry = true,
				BuyDetailsId = 39,
				SellDetailsId = 40,
				PairStrategyId = 20
			});

			_strategies.Add(new Strategy
			{
				Name = "Put Calendar",
				CanCustomizeWidth = false,
				CanCustomizeWingspan = false,
				CanCustomizeExpiry = true,
				BuyDetailsId = 41,
				SellDetailsId = 42,
				PairStrategyId = 19
			});

			_strategies.Add(new Strategy
			{
				Name = "Call",
				CanCustomizeWidth = false,
				CanCustomizeWingspan = false,
				CanCustomizeExpiry = false,
				BuyDetailsId = 43,
				SellDetailsId = 44,
				PairStrategyId = 22
			});

			_strategies.Add(new Strategy
			{
				Name = "Put",
				CanCustomizeWidth = false,
				CanCustomizeWingspan = false,
				CanCustomizeExpiry = false,
				BuyDetailsId = 45,
				SellDetailsId = 46,
				PairStrategyId = 21
			});

			_strategies.Add(new Strategy
			{
				Name = "Call Diagonal",
				CanCustomizeWidth = true,
				CanCustomizeWingspan = false,
				CanCustomizeExpiry = true,
				BuyDetailsId = 47,
				SellDetailsId = 48,
				PairStrategyId = 24
			});

			_strategies.Add(new Strategy
			{
				Name = "Put Diagonal",
				CanCustomizeWidth = true,
				CanCustomizeWingspan = false,
				CanCustomizeExpiry = true,
				BuyDetailsId = 49,
				SellDetailsId = 50,
				PairStrategyId = 23
			});

			_strategies.Add(new Strategy
			{
				Name = "Financed Vertical",
				CanCustomizeWidth = true,
				CanCustomizeWingspan = true,
				CanCustomizeExpiry = false,
				BuyDetailsId = 53,
				SellDetailsId = 54,
				PairStrategyId = null
			});

			_strategies.Add(new Strategy
			{
				Name = "Stock",
				CanCustomizeWidth = false,
				CanCustomizeWingspan = false,
				CanCustomizeExpiry = false,
				BuyDetailsId = 55,
				SellDetailsId = 56,
				PairStrategyId = null
			});

			_strategies.Add(new Strategy
			{
				Name = "Double Diagonal",
				CanCustomizeWidth = true,
				CanCustomizeWingspan = true,
				CanCustomizeExpiry = true,
				BuyDetailsId = 57,
				SellDetailsId = 58,
				PairStrategyId = null
			});

			_strategies.Add(new Strategy
			{
				Name = "Protective Put",
				CanCustomizeWidth = false,
				CanCustomizeWingspan = false,
				CanCustomizeExpiry = false,
				BuyDetailsId = 59,
				SellDetailsId = 60,
				PairStrategyId = 3
			});
		}

		#endregion InitializeStrategies

		#region InitializeStrategyDetails

		private void InitializeStrategyDetails()
		{
			_strategyDetails.Add(new StrategyDetail
			{
				Risk = 0,
				OccLevel = 3,
				Reward = 0,
				FirstSentiment = 0,
				DisplayOrder = 4,
				Display = true
			});

			_strategyDetails.Add(new StrategyDetail
			{
				Risk = 0,
				OccLevel = 4,
				Reward = 0,
				FirstSentiment = 1,
				DisplayOrder = 33,
				Display = true
			});

			_strategyDetails.Add(new StrategyDetail
			{
				Risk = 0,
				OccLevel = 3,
				Reward = 0,
				FirstSentiment = 1,
				DisplayOrder = 5,
				Display = true
			});

			_strategyDetails.Add(new StrategyDetail
			{
				Risk = 0,
				OccLevel = 4,
				Reward = 0,
				FirstSentiment = 0,
				DisplayOrder = 34,
				Display = true
			});

			_strategyDetails.Add(new StrategyDetail
			{
				Risk = 1,
				OccLevel = 1,
				Reward = 0,
				FirstSentiment = 2,
				DisplayOrder = 19,
				Display = true
			});

			_strategyDetails.Add(new StrategyDetail
			{
				Risk = 0,
				OccLevel = 2,
				Reward = 1,
				FirstSentiment = 1,
				DisplayOrder = 48,
				Display = false
			});

			_strategyDetails.Add(new StrategyDetail
			{
				Risk = 1,
				OccLevel = 2,
				Reward = 1,
				FirstSentiment = 0,
				DisplayOrder = 20,
				Display = true
			});

			_strategyDetails.Add(new StrategyDetail
			{
				Risk = 1,
				OccLevel = 5,
				Reward = 0,
				FirstSentiment = 1,
				SecondSentiment = 2,
				DisplayOrder = 48,
				Display = true
			});

			_strategyDetails.Add(new StrategyDetail
			{
				Risk = 0,
				OccLevel = 2,
				Reward = 1,
				FirstSentiment = 3,
				DisplayOrder = 10,
				Display = true
			});

			_strategyDetails.Add(new StrategyDetail
			{
				Risk = 1,
				OccLevel = 5,
				Reward = 0,
				FirstSentiment = 2,
				DisplayOrder = 39,
				Display = true
			});

			_strategyDetails.Add(new StrategyDetail
			{
				Risk = 0,
				OccLevel = 2,
				Reward = 1,
				FirstSentiment = 3,
				DisplayOrder = 11,
				Display = true
			});

			_strategyDetails.Add(new StrategyDetail
			{
				Risk = 1,
				OccLevel = 5,
				Reward = 0,
				FirstSentiment = 2,
				DisplayOrder = 40,
				Display = true
			});

			_strategyDetails.Add(new StrategyDetail
			{
				Risk = 0,
				OccLevel = 3,
				Reward = 0,
				FirstSentiment = 2,
				DisplayOrder = 12,
				Display = true
			});

			_strategyDetails.Add(new StrategyDetail
			{
				Risk = 0,
				OccLevel = 4,
				Reward = 0,
				FirstSentiment = 3,
				DisplayOrder = 41,
				Display = true
			});

			_strategyDetails.Add(new StrategyDetail
			{
				Risk = 0,
				OccLevel = 3,
				Reward = 0,
				FirstSentiment = 2,
				DisplayOrder = 13,
				Display = true
			});

			_strategyDetails.Add(new StrategyDetail
			{
				Risk = 0,
				OccLevel = 4,
				Reward = 0,
				FirstSentiment = 3,
				DisplayOrder = 42,
				Display = true
			});

			_strategyDetails.Add(new StrategyDetail
			{
				Risk = 0,
				OccLevel = 3,
				Reward = 0,
				FirstSentiment = 3,
				DisplayOrder = 14,
				Display = true
			});

			_strategyDetails.Add(new StrategyDetail
			{
				Risk = 0,
				OccLevel = 4,
				Reward = 0,
				FirstSentiment = 2,
				DisplayOrder = 43,
				Display = true
			});

			_strategyDetails.Add(new StrategyDetail
			{
				Risk = 0,
				OccLevel = 3,
				Reward = 1,
				FirstSentiment = 0,
				SecondSentiment = 3,
				DisplayOrder = 6,
				Display = true
			});

			_strategyDetails.Add(new StrategyDetail
			{
				Risk = 1,
				OccLevel = 5,
				Reward = 0,
				FirstSentiment = 2,
				DisplayOrder = 35,
				Display = false
			});

			_strategyDetails.Add(new StrategyDetail
			{
				Risk = 0,
				OccLevel = 3,
				Reward = 1,
				FirstSentiment = 1,
				SecondSentiment = 3,
				DisplayOrder = 7,
				Display = true
			});

			_strategyDetails.Add(new StrategyDetail
			{
				Risk = 1,
				OccLevel = 5,
				Reward = 0,
				FirstSentiment = 2,
				DisplayOrder = 36,
				Display = false
			});

			_strategyDetails.Add(new StrategyDetail
			{
				Risk = 0,
				OccLevel = 3,
				Reward = 1,
				FirstSentiment = 0,
				SecondSentiment = 3,
				DisplayOrder = 8,
				Display = true
			});

			_strategyDetails.Add(new StrategyDetail
			{
				Risk = 1,
				OccLevel = 5,
				Reward = 0,
				FirstSentiment = 2,
				DisplayOrder = 37,
				Display = false
			});

			_strategyDetails.Add(new StrategyDetail
			{
				Risk = 0,
				OccLevel = 3,
				Reward = 1,
				FirstSentiment = 1,
				SecondSentiment = 3,
				DisplayOrder = 9,
				Display = true
			});

			_strategyDetails.Add(new StrategyDetail
			{
				Risk = 1,
				OccLevel = 5,
				Reward = 0,
				FirstSentiment = 2,
				DisplayOrder = 38,
				Display = false
			});

			_strategyDetails.Add(new StrategyDetail
			{
				Risk = 0,
				OccLevel = 3,
				Reward = 0,
				FirstSentiment = 2,
				DisplayOrder = 16,
				Display = true
			});

			_strategyDetails.Add(new StrategyDetail
			{
				Risk = 0,
				OccLevel = 4,
				Reward = 0,
				FirstSentiment = 3,
				DisplayOrder = 45,
				Display = true
			});

			_strategyDetails.Add(new StrategyDetail
			{
				Risk = 0,
				OccLevel = 3,
				Reward = 0,
				FirstSentiment = 2,
				DisplayOrder = 17,
				Display = true
			});

			_strategyDetails.Add(new StrategyDetail
			{
				Risk = 0,
				OccLevel = 4,
				Reward = 0,
				FirstSentiment = 3,
				DisplayOrder = 46,
				Display = true
			});

			_strategyDetails.Add(new StrategyDetail
			{
				Risk = 0,
				OccLevel = 3,
				Reward = 0,
				FirstSentiment = 3,
				DisplayOrder = 18,
				Display = true
			});

			_strategyDetails.Add(new StrategyDetail
			{
				Risk = 0,
				OccLevel = 4,
				Reward = 0,
				FirstSentiment = 2,
				DisplayOrder = 47,
				Display = true
			});

			_strategyDetails.Add(new StrategyDetail
			{
				Risk = 1,
				OccLevel = 4,
				Reward = 1,
				FirstSentiment = 0,
				SecondSentiment = 3,
				DisplayOrder = 21,
				Display = true
			});

			_strategyDetails.Add(new StrategyDetail
			{
				Risk = 1,
				OccLevel = 5,
				Reward = 1,
				FirstSentiment = 1,
				SecondSentiment = 3,
				DisplayOrder = 50,
				Display = true
			});

			_strategyDetails.Add(new StrategyDetail
			{
				Risk = 0,
				OccLevel = 2,
				Reward = 0,
				FirstSentiment = 0,
				DisplayOrder = 22,
				Display = true
			});

			_strategyDetails.Add(new StrategyDetail
			{
				Risk = 0,
				OccLevel = 4,
				Reward = 0,
				FirstSentiment = 1,
				DisplayOrder = 51,
				Display = true
			});

			_strategyDetails.Add(new StrategyDetail
			{
				Risk = 0,
				OccLevel = 3,
				Reward = 0,
				FirstSentiment = 0,
				DisplayOrder = 23,
				Display = true
			});

			_strategyDetails.Add(new StrategyDetail
			{
				Risk = 0,
				OccLevel = 4,
				Reward = 0,
				FirstSentiment = 1,
				DisplayOrder = 52,
				Display = true
			});

			_strategyDetails.Add(new StrategyDetail
			{
				Risk = 0,
				OccLevel = 3,
				Reward = 0,
				FirstSentiment = 2,
				SecondSentiment = 0,
				DisplayOrder = 24,
				Display = true
			});

			_strategyDetails.Add(new StrategyDetail
			{
				Risk = 0,
				OccLevel = 5,
				Reward = 0,
				FirstSentiment = 3,
				DisplayOrder = 53,
				Display = false
			});

			_strategyDetails.Add(new StrategyDetail
			{
				Risk = 0,
				OccLevel = 3,
				Reward = 0,
				FirstSentiment = 2,
				SecondSentiment = 1,
				DisplayOrder = 25,
				Display = true
			});

			_strategyDetails.Add(new StrategyDetail
			{
				Risk = 0,
				OccLevel = 4,
				Reward = 0,
				FirstSentiment = 3,
				DisplayOrder = 54,
				Display = false
			});

			_strategyDetails.Add(new StrategyDetail
			{
				Risk = 0,
				OccLevel = 2,
				Reward = 1,
				FirstSentiment = 0,
				DisplayOrder = 2,
				Display = true
			});

			_strategyDetails.Add(new StrategyDetail
			{
				Risk = 1,
				OccLevel = 5,
				Reward = 0,
				FirstSentiment = 1,
				SecondSentiment = 2,
				DisplayOrder = 31,
				Display = true
			});

			_strategyDetails.Add(new StrategyDetail
			{
				Risk = 0,
				OccLevel = 2,
				Reward = 1,
				FirstSentiment = 1,
				DisplayOrder = 3,
				Display = true
			});

			_strategyDetails.Add(new StrategyDetail
			{
				Risk = 1,
				OccLevel = 4,
				Reward = 0,
				FirstSentiment = 0,
				SecondSentiment = 2,
				DisplayOrder = 32,
				Display = true
			});

			_strategyDetails.Add(new StrategyDetail
			{
				Risk = 0,
				OccLevel = 3,
				Reward = 0,
				FirstSentiment = 2,
				SecondSentiment = 0,
				DisplayOrder = 26,
				Display = true
			});

			_strategyDetails.Add(new StrategyDetail
			{
				Risk = 0,
				OccLevel = 5,
				Reward = 0,
				FirstSentiment = 3,
				DisplayOrder = 55,
				Display = false
			});

			_strategyDetails.Add(new StrategyDetail
			{
				Risk = 0,
				OccLevel = 3,
				Reward = 0,
				FirstSentiment = 2,
				SecondSentiment = 1,
				DisplayOrder = 27,
				Display = true
			});

			_strategyDetails.Add(new StrategyDetail
			{
				Risk = 0,
				OccLevel = 4,
				Reward = 0,
				FirstSentiment = 3,
				DisplayOrder = 56,
				Display = false
			});

			_strategyDetails.Add(new StrategyDetail
			{
				Risk = 0,
				OccLevel = 2,
				Reward = 1,
				FirstSentiment = 0,
				SecondSentiment = 2,
				DisplayOrder = 20,
				Display = true
			});

			_strategyDetails.Add(new StrategyDetail
			{
				Risk = 1,
				OccLevel = 4,
				Reward = 0,
				FirstSentiment = 1,
				SecondSentiment = 2,
				DisplayOrder = 46,
				Display = true
			});


			_strategyDetails.Add(new StrategyDetail
			{
				Risk = 1,
				OccLevel = 4,
				Reward = 0,
				FirstSentiment = 0,
				DisplayOrder = 30,
				Display = false
			});

			_strategyDetails.Add(new StrategyDetail
			{
				Risk = 0,
				OccLevel = 5,
				Reward = 1,
				FirstSentiment = 2,
				DisplayOrder = 59,
				Display = false
			});

			_strategyDetails.Add(new StrategyDetail
			{
				Risk = 1,
				OccLevel = 1,
				Reward = 1,
				FirstSentiment = 0,
				SecondSentiment = 3,
				DisplayOrder = 1,
				Display = true
			});

			_strategyDetails.Add(new StrategyDetail
			{
				Risk = 1,
				OccLevel = 1,
				Reward = 1,
				FirstSentiment = 1,
				SecondSentiment = 3,
				DisplayOrder = 60,
				Display = true
			});

			_strategyDetails.Add(new StrategyDetail
			{
				Risk = 0,
				OccLevel = 4,
				Reward = 0,
				FirstSentiment = 2,
				DisplayOrder = 28,
				Display = true
			});

			_strategyDetails.Add(new StrategyDetail
			{
				Risk = 0,
				OccLevel = 5,
				Reward = 0,
				FirstSentiment = 3,
				DisplayOrder = 57,
				Display = false
			});

			_strategyDetails.Add(new StrategyDetail
			{
				Risk = 0,
				OccLevel = 2,
				Reward = 1,
				FirstSentiment = 0,
				SecondSentiment = 2,
				DisplayOrder = 20,
				Display = false
			});

			_strategyDetails.Add(new StrategyDetail
			{
				Risk = 1,
				OccLevel = 4,
				Reward = 0,
				FirstSentiment = 1,
				SecondSentiment = 2,
				DisplayOrder = 46,
				Display = false
			});
		}

		#endregion InitializeStrategyDetails
	}
}

using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Core.Objects;
using System.Data.Entity.Infrastructure;
using OptionsPlay.Logging;

namespace OptionsPlay.SecurEntityLib
{
	public class DbContextHelper
	{
		public ObjectContext Context { get; set; }

		void oc_SavingChanges(object sender, EventArgs e)
		{
			Dictionary<Guid, bool> encryptedItems = new Dictionary<Guid, bool>();
			bool keepEncrypting = true;

			//
			// The encrypt loop can cause additional items (i.e. not already in the OSM) 
			// to be read from the database. If those items aren't caught in the 
			// encrypt loop, they'll be written back as plaintext. So we keep looping
			// until we don't find any cached plaintext SecurEntity objects.
			// 

			while (keepEncrypting)
			{
				keepEncrypting = false;
				foreach (ObjectStateEntry entry in
					((ObjectContext)sender).ObjectStateManager.GetObjectStateEntries(EntityState.Added | EntityState.Modified))
				{
					if (!entry.IsRelationship && entry.Entity is SecurEntity &&
						!encryptedItems.ContainsKey(((SecurEntity)entry.Entity).SecurEntityID))
					{
						((SecurEntity)entry.Entity).Encrypt();
						encryptedItems.Add(((SecurEntity)entry.Entity).SecurEntityID, true);
						keepEncrypting = true;
					}
				}
			}
		}

		void oc_ObjectMaterialized(object sender, ObjectMaterializedEventArgs e)
		{
			if (e.Entity is SecurEntity)
			{
				((SecurEntity)e.Entity).Decrypt();
			}
		}

		public DbContextHelper()
		{
		}

		public DbContextHelper(DbContext db)
		{
			Context = ((IObjectContextAdapter)db).ObjectContext;
			Context.ObjectMaterialized += oc_ObjectMaterialized;
			Context.SavingChanges += oc_SavingChanges;
		}

		public static void Initialize(DbContext db)
		{
			try
			{
				DbContextHelper dbContextHelper = new DbContextHelper(db);
				dbContextHelper.Context = ((IObjectContextAdapter)db).ObjectContext;
				dbContextHelper.Context.ObjectMaterialized += dbContextHelper.oc_ObjectMaterialized;
				dbContextHelper.Context.SavingChanges += dbContextHelper.oc_SavingChanges;
			}
			catch (Exception e)
			{
				Logger.Error("Error during DB init.", e);
				throw;
			}
		}
	}
}
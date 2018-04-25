using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Core.Objects;
using System.Data.Entity.Infrastructure;

namespace OptionsPlay.EF.Encryption
{
	//TODO: think about more deep refactoring
	public class DbContextHelper
	{
		static void OcSavingChanges(object sender, EventArgs e)
		{
			Dictionary<Guid, bool> encryptedItems = new Dictionary<Guid, bool>();
			bool keepEncrypting = true;

			//
			// The encrypt loop can cause additional items (i.e. not already in the OSM) 
			// to be read from the database. If those items aren't caught in the 
			// encrypt loop, they'll be written back as plaintext. So we keep looping
			// until we don't find any cached plaintext ISecurEntity objects.
			//

			while (keepEncrypting)
			{
				keepEncrypting = false;
				IEnumerable<ObjectStateEntry> objectStateEntries = 
					((ObjectContext)sender).ObjectStateManager.GetObjectStateEntries(EntityState.Added | EntityState.Modified);

				foreach (ObjectStateEntry entry in objectStateEntries)
				{
					if (!entry.IsRelationship
						&& entry.Entity is ISecurEntity 
						&& !encryptedItems.ContainsKey(((ISecurEntity)entry.Entity).SecurEntityId))
					{
						((ISecurEntity)entry.Entity).Encrypt();
						encryptedItems.Add(((ISecurEntity)entry.Entity).SecurEntityId, true);
						keepEncrypting = true;
					}
				}
			}
		}

		static void OcObjectMaterialized(object sender, ObjectMaterializedEventArgs e)
		{
			ISecurEntity entity = e.Entity as ISecurEntity;
			if (entity != null)
			{
				entity.Decrypt();
			}
		}

		public static void Initialize(DbContext db)
		{
			ObjectContext context = ((IObjectContextAdapter)db).ObjectContext;
			context.ObjectMaterialized += OcObjectMaterialized;
			context.SavingChanges += OcSavingChanges;
		}
	}
}

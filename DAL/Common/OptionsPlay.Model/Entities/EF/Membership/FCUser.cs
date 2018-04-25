using System;
using System.ComponentModel.DataAnnotations.Schema;
using OptionsPlay.EF.Encryption;

namespace OptionsPlay.Model
{
	[Table("FCUsers")]
	public class FCUser : User, ISecurEntity
	{
		[Encrypt(IsThumbprint = true)]
		public string CustomerCode { get; set; }

		[Encrypt]
		public string CustomerAccountCode { get; set; }

		public long InternalOrganization { get; set; }

		public string StockExchange { get; set; }

		public string StockBoard { get; set; }

		[Encrypt]
		public string TradeAccount { get; set; }

		public string TradeAccountStatus { get; set; }

		public string TradeUnit { get; set; }

		public string LoginAccountType { get; set; }

		[Encrypt]
		public string AccountId { get; set; }

		public string TradeAccountName { get; set; }

		public DateTime UpdateDate { get; set; }

		[Encrypt]
		public string Password { get; set; }

		#region Implementation of ISecurEntity

		public string SecurEntityData { get; set; }
		public Guid SecurEntityId { get; set; }
		public byte[] SecurEntityThumbprint { get; set; }

		#endregion
	}
}

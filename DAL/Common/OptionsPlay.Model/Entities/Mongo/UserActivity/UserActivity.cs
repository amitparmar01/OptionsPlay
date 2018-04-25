using System;
using System.Net;
using MongoDB.Bson.Serialization.Attributes;
using OptionsPlay.Model.Enums;
using Environment = OptionsPlay.Model.Enums.Environment;

namespace OptionsPlay.Model
{
	[BsonIgnoreExtraElements]
	[BsonDiscriminator(RootClass = true)]
	[BsonKnownTypes(typeof(UiActivity))]
	public class UserActivity : BaseMongoEntity
	{
		public long UserId { get; set; }

		public string User { get; set; }

		public string ClientId { get; set; }

		public bool IsEmbedded { get; set; }
		
		public UserActivityType Type { get; set; }

		//[BsonDateTimeOptions(Kind = DateTimeKind.Local)]
		public DateTime DateAndTimeOfAccess { get; set; }

		public IPAddress IpAddress { get; set; }

		public string SessionId { get; set; }

		public Environment Environment { get; set; }

		public string SymbolContext { get; set; }
	}
}
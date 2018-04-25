using System;
using MongoDB.Bson.Serialization.Attributes;
using OptionsPlay.Model.Enums;

namespace OptionsPlay.Model
{
	public class Log : BaseMongoEntity
	{
		[BsonElement("application")]
		public string Application { get; set; }

		[BsonElement("applicationType")]
		public ApplicationType ApplicationType { get; set; }

		[BsonElement("level")]
		public LogLevel Level { get; set; }

		[BsonElement("date")]
		public DateTime Date { get; set; }

		[BsonElement("message")]
		public string Message { get; set; }

		[BsonElement("exception")]
		public string Exception { get; set; }

		[BsonElement("userName")]
		public string UserName { get; set; }

		[BsonElement("machineName")]
		public string MachineName { get; set; }
	}
}
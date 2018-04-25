using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace OptionsPlay.Model
{
	/// <summary>
	/// Base class of each mongo entity
	/// </summary>
	[BsonIgnoreExtraElements]
	public class BaseMongoEntity
	{
		public ObjectId Id { get; set; }
	}
}

using MongoDB.Bson;
using MongoDB.Bson.IO;
using MongoDB.Bson.Serialization;
using MongoDB.Bson.Serialization.Serializers;
using Newtonsoft.Json.Linq;
using System;

namespace OptionsPlay.Common.Serializers
{
	//TODO:find alternate method
	public class CustomBsonSerializer : BsonBaseSerializer
	{
		public override void Serialize(BsonWriter bsonWriter, Type nominalType, object value, IBsonSerializationOptions options)
		{
			//TODO: find more elegant solution
			if (value is JObject)
			{
				BsonDocument doc = BsonDocument.Parse(value.ToString());
				doc.WriteTo(bsonWriter);
			}
			else if (value is JArray)
			{
				BsonArray array = new BsonArray();
				foreach (JToken item in value as JArray)
				{
					array.Add(BsonValue.Create(item.ToString()));
				}
				array.WriteTo(bsonWriter);
			}
			else
			{
				BsonSerializer.Serialize(bsonWriter, nominalType, value, options);
			}
		}

		public override object Deserialize(BsonReader bsonReader, Type nominalType, Type actualType, IBsonSerializationOptions options)
		{
			Type type = actualType;

			if (bsonReader.CurrentBsonType == BsonType.Document)
			{
				type = typeof(BsonDocument);
			}
			else if (bsonReader.CurrentBsonType == BsonType.Array)
			{
				type = typeof(BsonArray);
			}
			else if (bsonReader.CurrentBsonType == BsonType.Null)
			{
				type = typeof(object);
			}

			object result = BsonSerializer.Deserialize(bsonReader, type, options);
			return result;
		}
	}
}

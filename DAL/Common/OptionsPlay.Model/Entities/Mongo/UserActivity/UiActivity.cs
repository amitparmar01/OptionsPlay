using MongoDB.Bson.Serialization.Attributes;
using OptionsPlay.Common.Serializers;

namespace OptionsPlay.Model
{
	public class UiActivity : UserActivity
	{
		public string ControlType { get; set; }
		public string ControlName { get; set; }
		public string Event { get; set; }

		[BsonSerializer(typeof(CustomBsonSerializer))]
		public object Value { get; set; }
	}
}
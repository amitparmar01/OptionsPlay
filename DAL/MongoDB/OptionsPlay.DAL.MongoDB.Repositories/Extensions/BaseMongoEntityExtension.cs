using MongoDB.Bson;

namespace OptionsPlay.DAL.MongoDB.Repositories.Extensions
{
	internal static class BaseMongoEntityExtension
	{
		public static ObjectId ConvertToObjectId(this string objectId)
		{
			return ObjectId.Parse(objectId);
		}
	}
}

using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace backend.Layers.Models
{
    public class UserType
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }
        public string? TypeName { get; set; }
    }
}
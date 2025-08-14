using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace backend.Layers.Models
{
    public class Privilege
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }
        public string? PrivilegeName { get; set; }
        public string? Description { get; set; }
    }
}
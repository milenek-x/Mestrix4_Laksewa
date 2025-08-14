using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace backend.Layers.Models
{
    public class Service
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }
        public string? ServiceName { get; set; }
        public string? Description { get; set; }
        public string? Requirements { get; set; }
        public int ProcessingTime { get; set; }
        public decimal FeeAmount { get; set; }
        
        [BsonRepresentation(BsonType.ObjectId)]
        public string? DepartmentId { get; set; }
    }
}
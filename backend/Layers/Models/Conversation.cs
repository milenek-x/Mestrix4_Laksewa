using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;

namespace backend.Layers.Models
{
    public class Conversation
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }
        
        [BsonRepresentation(BsonType.ObjectId)]
        public string? ServiceRequestId { get; set; }
        
        public DateTime CreatedAt { get; set; }
    }
}
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;

namespace backend.Layers.Models
{
    public class Message
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }
        
        [BsonRepresentation(BsonType.ObjectId)]
        public string? ConversationId { get; set; }
        [BsonRepresentation(BsonType.ObjectId)]
        public string? SenderId { get; set; }
        
        public string? MessageText { get; set; }
        public DateTime Timestamp { get; set; }
        public string? Status { get; set; }
    }
}
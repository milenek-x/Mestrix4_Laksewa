using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;

namespace backend.Layers.Models
{
    public class ServiceRequest
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }
        
        [BsonRepresentation(BsonType.ObjectId)]
        public string? ServiceId { get; set; }
        [BsonRepresentation(BsonType.ObjectId)]
        public string? RequestedById { get; set; }
        
        public string? Status { get; set; }
        public DateTime SubmittedAt { get; set; }
        public DateTime? CompletedAt { get; set; }
    }
}
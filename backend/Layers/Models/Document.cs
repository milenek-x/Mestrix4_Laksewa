using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;

namespace backend.Layers.Models
{
    public class Document
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }
        
        [BsonRepresentation(BsonType.ObjectId)]
        public string? ServiceRequestId { get; set; }
        [BsonRepresentation(BsonType.ObjectId)]
        public string? UserId { get; set; }
        
        public string? DocumentType { get; set; }
        public string? FilePath { get; set; }
        public DateTime UploadTimestamp { get; set; }
    }
}
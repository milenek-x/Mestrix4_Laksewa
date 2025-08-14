using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;

namespace backend.Layers.Models
{
    public class RoleAssignmentLog
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }
        
        [BsonRepresentation(BsonType.ObjectId)]
        public string? UserId { get; set; }
        [BsonRepresentation(BsonType.ObjectId)]
        public string? AssignedByUserId { get; set; }
        [BsonRepresentation(BsonType.ObjectId)]
        public string? RoleId { get; set; }
        
        public DateTime AssignedAt { get; set; }
    }
}
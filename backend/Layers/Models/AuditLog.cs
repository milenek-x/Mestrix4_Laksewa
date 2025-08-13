using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;

public class AuditLog
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public required string Id { get; set; }
    
    [BsonRepresentation(BsonType.ObjectId)]
    public required string UserId { get; set; }
    
    public required string ActionType { get; set; }
    public string? Description { get; set; }
    public required DateTime Timestamp { get; set; }
}

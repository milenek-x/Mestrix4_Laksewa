using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;

public class ServiceRequest
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public required string Id { get; set; }
    
    [BsonRepresentation(BsonType.ObjectId)]
    public required string ServiceId { get; set; }
    [BsonRepresentation(BsonType.ObjectId)]
    public required string RequestedById { get; set; }
    
    public required string Status { get; set; }
    public required DateTime SubmittedAt { get; set; }
    public DateTime? CompletedAt { get; set; }
}

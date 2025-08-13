using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;

public class Conversation
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public required string Id { get; set; }
    
    [BsonRepresentation(BsonType.ObjectId)]
    public required string ServiceRequestId { get; set; }
    
    public required DateTime CreatedAt { get; set; }
}

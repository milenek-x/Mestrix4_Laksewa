using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;

public class Message
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public required string Id { get; set; }
    
    [BsonRepresentation(BsonType.ObjectId)]
    public required string ConversationId { get; set; }
    [BsonRepresentation(BsonType.ObjectId)]
    public required string SenderId { get; set; }
    
    public required string MessageText { get; set; }
    public required DateTime Timestamp { get; set; }
    public required string Status { get; set; }
}

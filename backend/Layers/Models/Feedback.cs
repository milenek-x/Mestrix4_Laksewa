using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;

public class Feedback
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public required string Id { get; set; }
    
    [BsonRepresentation(BsonType.ObjectId)]
    public required string ServiceRequestId { get; set; }
    [BsonRepresentation(BsonType.ObjectId)]
    public required string UserId { get; set; }
    
    public required int Rating { get; set; }
    public string? Comments { get; set; }
    public required DateTime SubmissionTimestamp { get; set; }
}

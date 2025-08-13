using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;

public class Document
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public required string Id { get; set; }
    
    [BsonRepresentation(BsonType.ObjectId)]
    public required string ServiceRequestId { get; set; }
    [BsonRepresentation(BsonType.ObjectId)]
    public required string UserId { get; set; }
    
    public required string DocumentType { get; set; }
    public required string FilePath { get; set; }
    public required DateTime UploadTimestamp { get; set; }
}

using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;

public class RoleAssignmentLog
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public required string Id { get; set; }
    
    [BsonRepresentation(BsonType.ObjectId)]
    public required string UserId { get; set; }
    [BsonRepresentation(BsonType.ObjectId)]
    public required string AssignedByUserId { get; set; }
    [BsonRepresentation(BsonType.ObjectId)]
    public required string RoleId { get; set; }
    
    public required DateTime AssignedAt { get; set; }
}

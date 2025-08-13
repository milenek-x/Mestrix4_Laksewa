using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

public class Role
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public required string Id { get; set; }
    public required string RoleName { get; set; }
    public string? Description { get; set; }
}

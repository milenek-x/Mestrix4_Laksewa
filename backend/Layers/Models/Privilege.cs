using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

public class Privilege
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public required string Id { get; set; }
    public required string PrivilegeName { get; set; }
    public string? Description { get; set; }
}

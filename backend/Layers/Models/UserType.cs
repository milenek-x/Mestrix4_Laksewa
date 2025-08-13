using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

public class UserType
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public required string Id { get; set; }
    public required string TypeName { get; set; }
}
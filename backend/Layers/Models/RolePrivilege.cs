using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

public class RolePrivilege
{
    [BsonRepresentation(BsonType.ObjectId)]
    public required string RoleId { get; set; }
    [BsonRepresentation(BsonType.ObjectId)]
    public required string PrivilegeId { get; set; }
}

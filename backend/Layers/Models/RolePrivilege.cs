using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace backend.Layers.Models
{
    public class RolePrivilege
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; } = string.Empty;

        [BsonElement("roleId")]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? RoleId { get; set; } = null!;

        [BsonElement("privilegeId")]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? PrivilegeId { get; set; } = null!;
    }
}
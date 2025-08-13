using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

public class Department
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public required string Id { get; set; }
    public required string DepartmentName { get; set; }
    public string? Description { get; set; }
    public string? Location { get; set; }
    
    [BsonRepresentation(BsonType.ObjectId)]
    public string? HeadOfDepartmentId { get; set; }
}

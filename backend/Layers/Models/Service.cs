using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

public class Service
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public required string Id { get; set; }
    public required string ServiceName { get; set; }
    public string? Description { get; set; }
    public string? Requirements { get; set; }
    public required int ProcessingTime { get; set; }
    public required decimal FeeAmount { get; set; }
    
    [BsonRepresentation(BsonType.ObjectId)]
    public required string DepartmentId { get; set; }
}

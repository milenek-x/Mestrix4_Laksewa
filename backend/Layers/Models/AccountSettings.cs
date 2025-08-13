using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

public class AccountSettings
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public required string Id { get; set; }
    
    [BsonRepresentation(BsonType.ObjectId)]
    public required string UserId { get; set; }
    
    public string? LanguagePreference { get; set; }
    public string? Theme { get; set; }
    public string? NotificationPreferences { get; set; }
}

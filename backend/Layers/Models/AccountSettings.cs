using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace backend.Layers.Models
{
    public class AccountSettings
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }
        
        [BsonRepresentation(BsonType.ObjectId)]
        public string? UserId { get; set; }
        
        public string? LanguagePreference { get; set; }
        public string? Theme { get; set; }
        public string? NotificationPreferences { get; set; }
    }
}
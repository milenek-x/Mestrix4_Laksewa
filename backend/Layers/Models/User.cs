using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;

namespace backend.Layers.Models
{
    public class User
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Username { get; set; }
        public string? PasswordHash { get; set; }
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }
        public string? NicNumber { get; set; }
        public string? Status { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

        // Foreign Keys
        [BsonRepresentation(BsonType.ObjectId)]
        public string? RoleId { get; set; }
        [BsonRepresentation(BsonType.ObjectId)]
        public string? DepartmentId { get; set; }
        [BsonRepresentation(BsonType.ObjectId)]
        public string? UserTypeId { get; set; }
    }
}
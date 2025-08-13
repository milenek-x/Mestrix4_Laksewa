using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;

public class User
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public required string Id { get; set; }
    public required string FirstName { get; set; }
    public required string LastName { get; set; }
    public required string Username { get; set; }
    public required string PasswordHash { get; set; }
    public required string Email { get; set; }
    public string? PhoneNumber { get; set; }
    public string? NicNumber { get; set; }
    public required string Status { get; set; }
    public required DateTime CreatedAt { get; set; }
    public required DateTime UpdatedAt { get; set; }

    // Foreign Keys
    [BsonRepresentation(BsonType.ObjectId)]
    public required string RoleId { get; set; }
    [BsonRepresentation(BsonType.ObjectId)]
    public required string DepartmentId { get; set; }
    [BsonRepresentation(BsonType.ObjectId)]
    public required string UserTypeId { get; set; }
}

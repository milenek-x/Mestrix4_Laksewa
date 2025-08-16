namespace backend.Layers.DTOs
{
    public class UserBasicInfoDto
{
    public string? Id { get; set; }
    public string? Username { get; set; } // Or email, or whatever is appropriate
    public string? DepartmentId { get; set; }
    public string? RoleId { get; set; } // If you also need the role for specific logic
}
}
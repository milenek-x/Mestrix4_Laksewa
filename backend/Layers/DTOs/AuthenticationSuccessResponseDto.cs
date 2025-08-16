namespace backend.Layers.DTOs
{
    public class AuthenticationSuccessResponseDto
    {
        public string? Message { get; set; } // e.g., "Authentication successful."
        public string? Token { get; set; }   // e.g., the JWT token

        public string? UserId { get; set; } // e.g., the ID of the authenticated user

        public string? RoleId { get; set;  }

    }
}
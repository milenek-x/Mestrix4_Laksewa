namespace backend.Layers.DTOs
{
    public class UserAuthenticationDto
    {
        public string? UsernameOrEmail { get; set; }
        public string? Password { get; set; }
    }
}
namespace backend.Layers.DTOs
{
    public class VerifyOtpRequestDto
    {
        public string? Email { get; set; }

        public string? OtpCode { get; set; }
    }
}

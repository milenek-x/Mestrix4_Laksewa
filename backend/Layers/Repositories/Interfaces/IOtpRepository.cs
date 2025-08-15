using backend.Layers.Models;
using System.Threading.Tasks;

namespace backend.Layers.Repositories
{
    public interface IOtpRepository
    {
        Task SaveOtpAsync(Otp otp);
        Task<Otp?> GetOtpAsync(string userId);
        Task DeleteOtpAsync(string otpId);
        Task DeleteExistingOtpsForUserAsync(string userId);
    }
}

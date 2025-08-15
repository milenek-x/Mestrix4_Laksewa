using backend.Layers.Models;
using System.Threading.Tasks;

namespace backend.Layers.Repositories
{
    public interface IOtpRepository
    {
        Task SaveOtpAsync(Otp otp);
    }
}

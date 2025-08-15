using backend.Layers.Database;
using backend.Layers.Models;
using backend.Layers.Repositories;
using MongoDB.Driver;
using System.Threading.Tasks;

namespace backend.Layers.Repositories
{
    public class OtpRepository : IOtpRepository
    {
        private readonly IMongoCollection<Otp> _otpCollection;

        public OtpRepository(MongoDbContext dbContext)
        {
            _otpCollection = dbContext.Database.GetCollection<Otp>("Otps");
        }

        public async Task SaveOtpAsync(Otp otp)
        {
            await _otpCollection.InsertOneAsync(otp);
        }

        public async Task<Otp?> GetOtpAsync(string userId)
        {
            return await _otpCollection.Find(o => o.UserId == userId).FirstOrDefaultAsync();
        }

        public async Task DeleteOtpAsync(string otpId)
        {
            await _otpCollection.DeleteOneAsync(o => o.Id == otpId);
        }

        public async Task DeleteExistingOtpsForUserAsync(string userId) =>
            await _otpCollection.DeleteManyAsync(otp => otp.UserId == userId);
    }
}

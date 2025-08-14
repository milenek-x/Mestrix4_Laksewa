using MongoDB.Driver;
using backend.Layers.Models; // Assuming models are in this namespace

namespace backend.Layers.Database
{
    public class MongoDbContext
    {
        private readonly IMongoDatabase _database;

        public MongoDbContext(MongoDbSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            _database = client.GetDatabase(settings.DatabaseName);
        }

        public IMongoDatabase Database => _database;

        // Optional: Expose collections directly as properties
        public IMongoCollection<User> Users => _database.GetCollection<User>("Users");
        public IMongoCollection<Role> Roles => _database.GetCollection<Role>("Roles");
        // Add more collections as needed
    }
}
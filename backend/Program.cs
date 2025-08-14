using backend.Layers.Database;
using backend.Layers.Models;
using backend.Layers.Repositories;
using backend.Layers.Services;
using backend.Layers.Services.Interfaces;
using MongoDB.Driver;
using Swashbuckle.AspNetCore.Annotations;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

// Configure MongoDB settings from appsettings.json
builder.Services.Configure<MongoDbSettings>(
    builder.Configuration.GetSection("MongoDbSettings"));

// Register MongoDbContext as a singleton. This ensures a single instance is used throughout the application.
builder.Services.AddSingleton<MongoDbContext>(sp =>
{
    var settings = builder.Configuration.GetSection("MongoDbSettings").Get<MongoDbSettings>();

    // **ADD THIS NULL CHECK**
    if (settings == null)
    {
        // Throw an exception if MongoDbSettings cannot be loaded.
        // This is a critical configuration, so failing fast is appropriate.
        throw new InvalidOperationException("MongoDB settings ('MongoDbSettings' section) are missing or invalid in appsettings.json.");
    }

    return new MongoDbContext(settings);
});

// Register IMongoDatabase as a singleton. This is the core object for interacting with MongoDB.
builder.Services.AddSingleton<IMongoDatabase>(sp =>
{
    var mongoDbContext = sp.GetRequiredService<MongoDbContext>();
    return mongoDbContext.Database;
});

// Register all Repositories as Singletons
builder.Services.AddSingleton<IAccountSettingsRepository, AccountSettingsRepository>();
builder.Services.AddSingleton<IAuditLogRepository, AuditLogRepository>();
builder.Services.AddSingleton<IConversationRepository, ConversationRepository>();
builder.Services.AddSingleton<IDepartmentRepository, DepartmentRepository>();
builder.Services.AddSingleton<IDocumentRepository, DocumentRepository>();
builder.Services.AddSingleton<IFeedbackRepository, FeedbackRepository>();
builder.Services.AddSingleton<IMessageRepository, MessageRepository>();
builder.Services.AddSingleton<IPrivilegeRepository, PrivilegeRepository>();
builder.Services.AddSingleton<IRoleAssignmentLogRepository, RoleAssignmentLogRepository>();
builder.Services.AddSingleton<IRolePrivilegeRepository, RolePrivilegeRepository>();
builder.Services.AddSingleton<IRoleRepository, RoleRepository>();
builder.Services.AddSingleton<IServiceRepository, ServiceRepository>();
builder.Services.AddSingleton<IServiceRequestRepository, ServiceRequestRepository>();
builder.Services.AddSingleton<IUserRepository, UserRepository>();
builder.Services.AddSingleton<IUserTypeRepository, UserTypeRepository>();

// Register all Services as Singletons
builder.Services.AddSingleton<IAccountSettingsService, AccountSettingsService>();
builder.Services.AddSingleton<IAuditLogService, AuditLogService>();
builder.Services.AddSingleton<IConversationService, ConversationService>();
builder.Services.AddSingleton<IDepartmentService, DepartmentService>();
builder.Services.AddSingleton<IDocumentService, DocumentService>();
builder.Services.AddSingleton<IFeedbackService, FeedbackService>();
builder.Services.AddSingleton<IMessageService, MessageService>();
builder.Services.AddSingleton<IPrivilegeService, PrivilegeService>();
builder.Services.AddSingleton<IRoleAssignmentLogService, RoleAssignmentLogService>();
builder.Services.AddSingleton<IRolePrivilegeService, RolePrivilegeService>();
builder.Services.AddSingleton<IRoleService, RoleService>();
builder.Services.AddSingleton<IServiceService, ServiceService>();
builder.Services.AddSingleton<IServiceRequestService, ServiceRequestService>();
builder.Services.AddSingleton<IUserService, UserService>();
builder.Services.AddSingleton<IUserTypeService, UserTypeService>();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle

builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo 
    { 
        Title = "Mestrix4_Kathiraya_Backend", 
        Version = "v1" 
    });
    c.EnableAnnotations();
});

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseSwagger();

app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "Mestrix4_LakSewa_Backend v1");
    c.RoutePrefix = string.Empty;
    c.DisplayRequestDuration();
    c.DocExpansion(Swashbuckle.AspNetCore.SwaggerUI.DocExpansion.None);
});

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();
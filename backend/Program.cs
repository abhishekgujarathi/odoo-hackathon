using backend.Data;
using backend.Helpers;
using backend.Middlewares;
using backend.Models.Entities;
using backend.Repositories;
using backend.Repositories.Implementation;
using backend.Services;
using backend.Services.Authorization;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

// Database
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// AppSettings (JWT config)
builder.Services.Configure<AppSettings>(builder.Configuration.GetSection("AppSettings"));

// Repositories
builder.Services.AddScoped<IRepository<User>, Repository<User>>();

// Authorization
builder.Services.AddScoped<JwtUtils>();

// Services
builder.Services.AddScoped<AuthService>();
builder.Services.AddScoped<UserService>();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// JWT Middleware — must be before UseAuthorization
app.UseMiddleware<JwtMiddleware>();

app.UseAuthorization();

app.MapControllers();

app.Run();

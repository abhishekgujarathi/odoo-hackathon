using backend.Models.Entities;
using backend.Models.Enums;
using Microsoft.EntityFrameworkCore;

namespace backend.Data.Seeds
{
    public static class UserSeed
    {
        public static void Seed(ModelBuilder modelBuilder)
        {
            var adminId = Guid.Parse("a1b2c3d4-e5f6-7890-abcd-ef1234567890");
            var procurementId = Guid.Parse("b2c3d4e5-f6a7-8901-bcde-f12345678901");
            var managerId = Guid.Parse("c3d4e5f6-a7b8-9012-cdef-123456789012");
            var vendorUserId1 = Guid.Parse("d4e5f6a7-b8c9-0123-def0-234567890123");
            var vendorUserId2 = Guid.Parse("e5f6a7b8-c9d0-1234-ef01-345678901234");

            modelBuilder.Entity<User>().HasData(
                new User
                {
                    Id = adminId,
                    FirstName = "Admin",
                    LastName = "User",
                    Email = "admin@vendorbridge.com",
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword("Admin@123"),
                    PhoneNumber = "9876543210",
                    Role = UserRole.Admin,
                    IsActive = true,
                    CreatedAt = new DateTime(2025, 1, 1, 0, 0, 0, DateTimeKind.Utc),
                },
                new User
                {
                    Id = procurementId,
                    FirstName = "Rahul",
                    LastName = "Sharma",
                    Email = "rahul.sharma@vendorbridge.com",
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword("Rahul@123"),
                    PhoneNumber = "9876543211",
                    Role = UserRole.ProcurementOfficer,
                    IsActive = true,
                    CreatedAt = new DateTime(2025, 1, 1, 0, 0, 0, DateTimeKind.Utc),
                },
                new User
                {
                    Id = managerId,
                    FirstName = "Priya",
                    LastName = "Patel",
                    Email = "priya.patel@vendorbridge.com",
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword("Priya@123"),
                    PhoneNumber = "9876543212",
                    Role = UserRole.Manager,
                    IsActive = true,
                    CreatedAt = new DateTime(2025, 1, 1, 0, 0, 0, DateTimeKind.Utc),
                },
                new User
                {
                    Id = vendorUserId1,
                    FirstName = "Amit",
                    LastName = "Kumar",
                    Email = "amit.kumar@techsupply.com",
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword("Amit@123"),
                    PhoneNumber = "9876543213",
                    Role = UserRole.Vendor,
                    IsActive = true,
                    CreatedAt = new DateTime(2025, 1, 1, 0, 0, 0, DateTimeKind.Utc),
                },
                new User
                {
                    Id = vendorUserId2,
                    FirstName = "Sneha",
                    LastName = "Desai",
                    Email = "sneha.desai@officepro.com",
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword("Sneha@123"),
                    PhoneNumber = "9876543214",
                    Role = UserRole.Vendor,
                    IsActive = true,
                    CreatedAt = new DateTime(2025, 1, 1, 0, 0, 0, DateTimeKind.Utc),
                }
            );
        }
    }
}

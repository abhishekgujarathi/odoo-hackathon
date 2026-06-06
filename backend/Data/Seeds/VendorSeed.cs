using backend.Models.Entities;
using backend.Models.Enums;
using Microsoft.EntityFrameworkCore;

namespace backend.Data.Seeds
{
    public static class VendorSeed
    {
        public static void Seed(ModelBuilder modelBuilder)
        {
            // ================== VENDOR CATEGORIES ====================
            var catITHardware = Guid.Parse("11111111-1111-1111-1111-111111111101");
            var catITSoftware = Guid.Parse("11111111-1111-1111-1111-111111111102");
            var catFurniture = Guid.Parse("11111111-1111-1111-1111-111111111103");
            var catStationery = Guid.Parse("11111111-1111-1111-1111-111111111104");
            var catLogistics = Guid.Parse("11111111-1111-1111-1111-111111111105");

            modelBuilder.Entity<VendorCategory>().HasData(
                new VendorCategory
                {
                    Id = catITHardware,
                    Name = "IT Hardware",
                    Description = "Computers, servers, networking equipment, and peripherals",
                    CreatedAt = new DateTime(2025, 1, 1, 0, 0, 0, DateTimeKind.Utc),
                },
                new VendorCategory
                {
                    Id = catITSoftware,
                    Name = "IT Software",
                    Description = "Software licenses, SaaS subscriptions, and custom development",
                    CreatedAt = new DateTime(2025, 1, 1, 0, 0, 0, DateTimeKind.Utc),
                },
                new VendorCategory
                {
                    Id = catFurniture,
                    Name = "Furniture",
                    Description = "Office desks, chairs, cabinets, and fixtures",
                    CreatedAt = new DateTime(2025, 1, 1, 0, 0, 0, DateTimeKind.Utc),
                },
                new VendorCategory
                {
                    Id = catStationery,
                    Name = "Stationery",
                    Description = "Office supplies, paper, pens, and printing materials",
                    CreatedAt = new DateTime(2025, 1, 1, 0, 0, 0, DateTimeKind.Utc),
                },
                new VendorCategory
                {
                    Id = catLogistics,
                    Name = "Logistics",
                    Description = "Shipping, warehousing, and transportation services",
                    CreatedAt = new DateTime(2025, 1, 1, 0, 0, 0, DateTimeKind.Utc),
                }
            );

            // ================== VENDORS ====================
            // Reference User IDs from UserSeed
            var vendorUserId1 = Guid.Parse("d4e5f6a7-b8c9-0123-def0-234567890123");
            var vendorUserId2 = Guid.Parse("e5f6a7b8-c9d0-1234-ef01-345678901234");

            modelBuilder.Entity<Vendor>().HasData(
                new Vendor
                {
                    Id = Guid.Parse("22222222-2222-2222-2222-222222222201"),
                    VendorCode = "VND-001",
                    CompanyName = "TechSupply India Pvt Ltd",
                    GSTNumber = "27AABCT1234F1ZH",
                    PANNumber = "AABCT1234F",
                    Email = "contact@techsupply.com",
                    Phone = "022-12345678",
                    Website = "https://www.techsupply.com",
                    AddressLine1 = "Unit 5, Tech Park",
                    AddressLine2 = "Andheri East",
                    City = "Mumbai",
                    State = "Maharashtra",
                    Country = "India",
                    PostalCode = "400069",
                    Status = VendorStatus.Approved,
                    Rating = 4.5m,
                    CategoryId = catITHardware,
                    UserId = vendorUserId1,
                    CreatedAt = new DateTime(2025, 1, 15, 0, 0, 0, DateTimeKind.Utc),
                },
                new Vendor
                {
                    Id = Guid.Parse("22222222-2222-2222-2222-222222222202"),
                    VendorCode = "VND-002",
                    CompanyName = "OfficePro Solutions",
                    GSTNumber = "24AABCO5678G1ZP",
                    PANNumber = "AABCO5678G",
                    Email = "info@officepro.com",
                    Phone = "079-98765432",
                    Website = "https://www.officepro.com",
                    AddressLine1 = "B-12, Commerce House",
                    AddressLine2 = "SG Highway",
                    City = "Ahmedabad",
                    State = "Gujarat",
                    Country = "India",
                    PostalCode = "380015",
                    Status = VendorStatus.Approved,
                    Rating = 4.2m,
                    CategoryId = catStationery,
                    UserId = vendorUserId2,
                    CreatedAt = new DateTime(2025, 2, 1, 0, 0, 0, DateTimeKind.Utc),
                }
            );
        }
    }
}

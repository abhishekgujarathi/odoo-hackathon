using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class init : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    First_Name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Last_Name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Email = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Password_Hash = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Phone_Number = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Role = table.Column<int>(type: "int", nullable: false),
                    Is_Active = table.Column<bool>(type: "bit", nullable: false),
                    Last_Login_At = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Created_At = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Created_By_Id = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    Updated_At = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Updated_By_Id = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    Is_Deleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Vendor_Categories",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Created_At = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Created_By_Id = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    Updated_At = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Updated_By_Id = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    Is_Deleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Vendor_Categories", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Vendors",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Vendor_Code = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    Company_Name = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    GST_Number = table.Column<string>(type: "nvarchar(15)", maxLength: 15, nullable: true),
                    PAN_Number = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: true),
                    Email = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Phone = table.Column<string>(type: "nvarchar(15)", maxLength: 15, nullable: true),
                    Website = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    Address_Line1 = table.Column<string>(type: "nvarchar(250)", maxLength: 250, nullable: true),
                    Address_Line2 = table.Column<string>(type: "nvarchar(250)", maxLength: 250, nullable: true),
                    City = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    State = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    Country = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    Postal_Code = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: true),
                    Status = table.Column<int>(type: "int", nullable: false),
                    Rating = table.Column<decimal>(type: "decimal(3,2)", precision: 3, scale: 2, nullable: false),
                    Category_Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    User_Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Created_At = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Created_By_Id = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    Updated_At = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Updated_By_Id = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    Is_Deleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Vendors", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Vendors_Users_User_Id",
                        column: x => x.User_Id,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Vendors_Vendor_Categories_Category_Id",
                        column: x => x.Category_Id,
                        principalTable: "Vendor_Categories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Created_At", "Created_By_Id", "Email", "First_Name", "Is_Active", "Is_Deleted", "Last_Login_At", "Last_Name", "Password_Hash", "Phone_Number", "Role", "Updated_At", "Updated_By_Id" },
                values: new object[,]
                {
                    { new Guid("a1b2c3d4-e5f6-7890-abcd-ef1234567890"), new DateTime(2025, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, "admin@vendorbridge.com", "Admin", true, false, null, "User", "$2a$11$AgisY7N5oTVKkA3P9N2Xfef1.ld8gQ9ak/r67cCHUM4nVZwrVSi8e", "9876543210", 1, null, null },
                    { new Guid("b2c3d4e5-f6a7-8901-bcde-f12345678901"), new DateTime(2025, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, "rahul.sharma@vendorbridge.com", "Rahul", true, false, null, "Sharma", "$2a$11$v7.024KDv7GAbLvlWEAjduokRrXnb6be23A3U8x7nxztEN9mrubWK", "9876543211", 2, null, null },
                    { new Guid("c3d4e5f6-a7b8-9012-cdef-123456789012"), new DateTime(2025, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, "priya.patel@vendorbridge.com", "Priya", true, false, null, "Patel", "$2a$11$LXjn125rpCm1Bnk.lr4USeiKKzDIc8khjWbadv1AOemp.MiVmoynW", "9876543212", 4, null, null },
                    { new Guid("d4e5f6a7-b8c9-0123-def0-234567890123"), new DateTime(2025, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, "amit.kumar@techsupply.com", "Amit", true, false, null, "Kumar", "$2a$11$JGImcLCOdyZtS3PLCB/ea.tjf4hJAt.DDfOewcUaM6oPBLOHuZhqC", "9876543213", 3, null, null },
                    { new Guid("e5f6a7b8-c9d0-1234-ef01-345678901234"), new DateTime(2025, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, "sneha.desai@officepro.com", "Sneha", true, false, null, "Desai", "$2a$11$7s7VI3ReSzNdorVPKQLElOoVhFpZgHXzw6JB0YyeNLecJUfLjSPdS", "9876543214", 3, null, null }
                });

            migrationBuilder.InsertData(
                table: "Vendor_Categories",
                columns: new[] { "Id", "Created_At", "Created_By_Id", "Description", "Is_Deleted", "Name", "Updated_At", "Updated_By_Id" },
                values: new object[,]
                {
                    { new Guid("11111111-1111-1111-1111-111111111101"), new DateTime(2025, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, "Computers, servers, networking equipment, and peripherals", false, "IT Hardware", null, null },
                    { new Guid("11111111-1111-1111-1111-111111111102"), new DateTime(2025, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, "Software licenses, SaaS subscriptions, and custom development", false, "IT Software", null, null },
                    { new Guid("11111111-1111-1111-1111-111111111103"), new DateTime(2025, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, "Office desks, chairs, cabinets, and fixtures", false, "Furniture", null, null },
                    { new Guid("11111111-1111-1111-1111-111111111104"), new DateTime(2025, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, "Office supplies, paper, pens, and printing materials", false, "Stationery", null, null },
                    { new Guid("11111111-1111-1111-1111-111111111105"), new DateTime(2025, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, "Shipping, warehousing, and transportation services", false, "Logistics", null, null }
                });

            migrationBuilder.InsertData(
                table: "Vendors",
                columns: new[] { "Id", "Address_Line1", "Address_Line2", "Category_Id", "City", "Company_Name", "Country", "Created_At", "Created_By_Id", "Email", "GST_Number", "Is_Deleted", "PAN_Number", "Phone", "Postal_Code", "Rating", "State", "Status", "Updated_At", "Updated_By_Id", "User_Id", "Vendor_Code", "Website" },
                values: new object[,]
                {
                    { new Guid("22222222-2222-2222-2222-222222222201"), "Unit 5, Tech Park", "Andheri East", new Guid("11111111-1111-1111-1111-111111111101"), "Mumbai", "TechSupply India Pvt Ltd", "India", new DateTime(2025, 1, 15, 0, 0, 0, 0, DateTimeKind.Utc), null, "contact@techsupply.com", "27AABCT1234F1ZH", false, "AABCT1234F", "022-12345678", "400069", 4.5m, "Maharashtra", 2, null, null, new Guid("d4e5f6a7-b8c9-0123-def0-234567890123"), "VND-001", "https://www.techsupply.com" },
                    { new Guid("22222222-2222-2222-2222-222222222202"), "B-12, Commerce House", "SG Highway", new Guid("11111111-1111-1111-1111-111111111104"), "Ahmedabad", "OfficePro Solutions", "India", new DateTime(2025, 2, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, "info@officepro.com", "24AABCO5678G1ZP", false, "AABCO5678G", "079-98765432", "380015", 4.2m, "Gujarat", 2, null, null, new Guid("e5f6a7b8-c9d0-1234-ef01-345678901234"), "VND-002", "https://www.officepro.com" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Users_Email",
                table: "Users",
                column: "Email",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Vendor_Categories_Name",
                table: "Vendor_Categories",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Vendors_Category_Id",
                table: "Vendors",
                column: "Category_Id");

            migrationBuilder.CreateIndex(
                name: "IX_Vendors_Email",
                table: "Vendors",
                column: "Email",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Vendors_User_Id",
                table: "Vendors",
                column: "User_Id");

            migrationBuilder.CreateIndex(
                name: "IX_Vendors_Vendor_Code",
                table: "Vendors",
                column: "Vendor_Code",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Vendors");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "Vendor_Categories");
        }
    }
}

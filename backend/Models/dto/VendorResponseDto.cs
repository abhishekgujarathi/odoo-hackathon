using backend.Models.Enums;

namespace backend.Models.dto
{
    public class VendorResponseDto
    {
        public Guid Id { get; set; }
        public string VendorCode { get; set; } = string.Empty;
        public string CompanyName { get; set; } = string.Empty;
        public string? GSTNumber { get; set; }
        public string? PANNumber { get; set; }
        public string Email { get; set; } = string.Empty;
        public string? Phone { get; set; }
        public string? Website { get; set; }
        public string? AddressLine1 { get; set; }
        public string? AddressLine2 { get; set; }
        public string? City { get; set; }
        public string? State { get; set; }
        public string? Country { get; set; }
        public string? PostalCode { get; set; }
        public VendorStatus Status { get; set; }
        public decimal Rating { get; set; }
        public Guid CategoryId { get; set; }
        public string? CategoryName { get; set; }
        public Guid UserId { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }
}

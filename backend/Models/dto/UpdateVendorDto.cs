using System.ComponentModel.DataAnnotations;
using backend.Models.Enums;

namespace backend.Models.dto
{
    public class UpdateVendorDto
    {
        [MaxLength(200)]
        public string? CompanyName { get; set; }

        [MaxLength(15)]
        public string? GSTNumber { get; set; }

        [MaxLength(10)]
        public string? PANNumber { get; set; }

        [EmailAddress]
        public string? Email { get; set; }

        [MaxLength(15)]
        public string? Phone { get; set; }

        [MaxLength(200)]
        public string? Website { get; set; }

        [MaxLength(250)]
        public string? AddressLine1 { get; set; }

        [MaxLength(250)]
        public string? AddressLine2 { get; set; }

        [MaxLength(100)]
        public string? City { get; set; }

        [MaxLength(100)]
        public string? State { get; set; }

        [MaxLength(100)]
        public string? Country { get; set; }

        [MaxLength(10)]
        public string? PostalCode { get; set; }

        public VendorStatus? Status { get; set; }

        public decimal? Rating { get; set; }

        public Guid? CategoryId { get; set; }
    }
}

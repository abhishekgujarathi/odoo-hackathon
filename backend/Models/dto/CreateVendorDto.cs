using System.ComponentModel.DataAnnotations;
using backend.Models.Enums;

namespace backend.Models.dto
{
    public class CreateVendorDto
    {
        [Required, MaxLength(200)]
        public string CompanyName { get; set; } = string.Empty;

        [MaxLength(15)]
        public string? GSTNumber { get; set; }

        [MaxLength(10)]
        public string? PANNumber { get; set; }

        [Required, EmailAddress]
        public string Email { get; set; } = string.Empty;

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

        [Required]
        public Guid CategoryId { get; set; }

        [Required, MaxLength(50)]
        public string ContactFirstName { get; set; } = string.Empty;

        [Required, MaxLength(50)]
        public string ContactLastName { get; set; } = string.Empty;

        [Required]
        public string Password { get; set; } = string.Empty;
    }
}

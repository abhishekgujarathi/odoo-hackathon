using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using backend.Models.Enums;

namespace backend.Models.Entities
{
    [Table("Vendors")]
    public class Vendor : BaseEntity
    {
        [Required, MaxLength(20)]
        [Column("Vendor_Code")]
        public string VendorCode { get; set; } = string.Empty;

        [Required, MaxLength(200)]
        [Column("Company_Name")]
        public string CompanyName { get; set; } = string.Empty;

        [MaxLength(15)]
        [Column("GST_Number")]
        public string? GSTNumber { get; set; }

        [MaxLength(10)]
        [Column("PAN_Number")]
        public string? PANNumber { get; set; }

        [Required, EmailAddress]
        [Column("Email")]
        public string Email { get; set; } = string.Empty;

        [MaxLength(15)]
        [Column("Phone")]
        public string? Phone { get; set; }

        [MaxLength(200)]
        [Column("Website")]
        public string? Website { get; set; }

        [MaxLength(250)]
        [Column("Address_Line1")]
        public string? AddressLine1 { get; set; }

        [MaxLength(250)]
        [Column("Address_Line2")]
        public string? AddressLine2 { get; set; }

        [MaxLength(100)]
        [Column("City")]
        public string? City { get; set; }

        [MaxLength(100)]
        [Column("State")]
        public string? State { get; set; }

        [MaxLength(100)]
        [Column("Country")]
        public string? Country { get; set; }

        [MaxLength(10)]
        [Column("Postal_Code")]
        public string? PostalCode { get; set; }

        [Required]
        [Column("Status")]
        public VendorStatus Status { get; set; } = VendorStatus.Pending;

        [Column("Rating")]
        public decimal Rating { get; set; } = 0;

        // Foreign Keys
        [Column("Category_Id")]
        public Guid CategoryId { get; set; }

        [Column("User_Id")]
        public Guid UserId { get; set; }

        // Navigation Properties
        [ForeignKey("CategoryId")]
        public VendorCategory Category { get; set; } = null!;

        [ForeignKey("UserId")]
        public User User { get; set; } = null!;
    }
}

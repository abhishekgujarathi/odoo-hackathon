using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models.Entities
{
    [Table("RFQ_Vendors")]
    public class RFQVendor
    {
        [Column("RFQ_Id")]
        public Guid RFQId { get; set; }

        [Column("Vendor_Id")]
        public Guid VendorId { get; set; }

        [Column("Invited_At")]
        public DateTime InvitedAt { get; set; } = DateTime.UtcNow;

        [Column("Invitation_Viewed")]
        public bool InvitationViewed { get; set; } = false;

        // Navigation Properties
        [ForeignKey("RFQId")]
        public RFQ RFQ { get; set; } = null!;

        [ForeignKey("VendorId")]
        public Vendor Vendor { get; set; } = null!;
    }
}

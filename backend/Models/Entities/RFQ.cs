using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using backend.Models.Enums;

namespace backend.Models.Entities
{
    [Table("RFQs")]
    public class RFQ : BaseEntity
    {
        [Required, MaxLength(30)]
        [Column("RFQ_Number")]
        public string RFQNumber { get; set; } = string.Empty;

        [Required, MaxLength(200)]
        [Column("Title")]
        public string Title { get; set; } = string.Empty;

        [Column("Description")]
        public string? Description { get; set; }

        [Required]
        [Column("Deadline")]
        public DateTime Deadline { get; set; }

        [Required]
        [Column("Status")]
        public RFQStatus Status { get; set; } = RFQStatus.Draft;

        // Foreign Keys
        [Column("Procurement_Officer_Id")]
        public Guid ProcurementOfficerId { get; set; }

        // Navigation Properties
        [ForeignKey("ProcurementOfficerId")]
        public User ProcurementOfficer { get; set; } = null!;

        public ICollection<RFQItem> Items { get; set; } = new List<RFQItem>();
        public ICollection<RFQAttachment> Attachments { get; set; } = new List<RFQAttachment>();
        public ICollection<RFQVendor> RFQVendors { get; set; } = new List<RFQVendor>();
        public ICollection<Quotation> Quotations { get; set; } = new List<Quotation>();
    }
}

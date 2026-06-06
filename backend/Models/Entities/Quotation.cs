using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using backend.Models.Enums;

namespace backend.Models.Entities
{
    [Table("Quotations")]
    public class Quotation : BaseEntity
    {
        [Required, MaxLength(30)]
        [Column("Quotation_Number")]
        public string QuotationNumber { get; set; } = string.Empty;

        [Column("Sub_Total")]
        public decimal SubTotal { get; set; }

        [Column("Tax_Amount")]
        public decimal TaxAmount { get; set; }

        [Column("Total_Amount")]
        public decimal TotalAmount { get; set; }

        [Column("Delivery_Days")]
        public int DeliveryDays { get; set; }

        [Column("Notes")]
        public string? Notes { get; set; }

        [Required]
        [Column("Status")]
        public QuotationStatus Status { get; set; } = QuotationStatus.Draft;

        [Column("Submitted_At")]
        public DateTime? SubmittedAt { get; set; }

        // Foreign Keys
        [Column("RFQ_Id")]
        public Guid RFQId { get; set; }

        [Column("Vendor_Id")]
        public Guid VendorId { get; set; }

        // Navigation Properties
        [ForeignKey("RFQId")]
        public RFQ RFQ { get; set; } = null!;

        [ForeignKey("VendorId")]
        public Vendor Vendor { get; set; } = null!;

        public ICollection<QuotationItem> Items { get; set; } = new List<QuotationItem>();
    }
}

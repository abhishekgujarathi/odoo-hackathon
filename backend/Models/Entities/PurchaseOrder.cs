using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using backend.Models.Enums;

namespace backend.Models.Entities
{
    [Table("Purchase_Orders")]
    public class PurchaseOrder : BaseEntity
    {
        [Required, MaxLength(30)]
        [Column("PO_Number")]
        public string PONumber { get; set; } = string.Empty;

        [Required]
        [Column("Status")]
        public PurchaseOrderStatus Status { get; set; } = PurchaseOrderStatus.Draft;

        [Column("Sub_Total")]
        public decimal SubTotal { get; set; }

        [Column("Tax_Amount")]
        public decimal TaxAmount { get; set; }

        [Column("Total_Amount")]
        public decimal TotalAmount { get; set; }

        [Column("Issue_Date")]
        public DateTime IssueDate { get; set; }

        // Foreign Keys
        [Column("Vendor_Id")]
        public Guid VendorId { get; set; }

        [Column("Quotation_Id")]
        public Guid QuotationId { get; set; }

        // Navigation Properties
        [ForeignKey("VendorId")]
        public Vendor Vendor { get; set; } = null!;

        [ForeignKey("QuotationId")]
        public Quotation Quotation { get; set; } = null!;

        public ICollection<PurchaseOrderItem> Items { get; set; } = new List<PurchaseOrderItem>();
        public ICollection<Invoice> Invoices { get; set; } = new List<Invoice>();
    }
}

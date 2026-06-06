using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using backend.Models.Enums;

namespace backend.Models.Entities
{
    [Table("Invoices")]
    public class Invoice : BaseEntity
    {
        [Required, MaxLength(30)]
        [Column("Invoice_Number")]
        public string InvoiceNumber { get; set; } = string.Empty;

        [Required]
        [Column("Status")]
        public InvoiceStatus Status { get; set; } = InvoiceStatus.Draft;

        [Column("Sub_Total")]
        public decimal SubTotal { get; set; }

        [Column("Tax_Amount")]
        public decimal TaxAmount { get; set; }

        [Column("Total_Amount")]
        public decimal TotalAmount { get; set; }

        [Column("Invoice_Date")]
        public DateTime InvoiceDate { get; set; }

        [Column("Sent_At")]
        public DateTime? SentAt { get; set; }

        [MaxLength(500)]
        [Column("Pdf_Url")]
        public string? PdfUrl { get; set; }

        // Foreign Keys
        [Column("Purchase_Order_Id")]
        public Guid PurchaseOrderId { get; set; }

        // Navigation Properties
        [ForeignKey("PurchaseOrderId")]
        public PurchaseOrder PurchaseOrder { get; set; } = null!;

        public ICollection<InvoiceItem> Items { get; set; } = new List<InvoiceItem>();
        public ICollection<EmailLog> EmailLogs { get; set; } = new List<EmailLog>();
    }
}

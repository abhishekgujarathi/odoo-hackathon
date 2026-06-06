using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models.Entities
{
    [Table("Invoice_Items")]
    public class InvoiceItem : BaseEntity
    {
        [Required, MaxLength(200)]
        [Column("Item_Name")]
        public string ItemName { get; set; } = string.Empty;

        [Column("Quantity")]
        public decimal Quantity { get; set; }

        [Column("Unit_Price")]
        public decimal UnitPrice { get; set; }

        [Column("Tax_Percentage")]
        public decimal TaxPercentage { get; set; }

        [Column("Total_Amount")]
        public decimal TotalAmount { get; set; }

        // Foreign Keys
        [Column("Invoice_Id")]
        public Guid InvoiceId { get; set; }

        // Navigation Properties
        [ForeignKey("InvoiceId")]
        public Invoice Invoice { get; set; } = null!;
    }
}

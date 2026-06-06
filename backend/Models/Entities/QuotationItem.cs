using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models.Entities
{
    [Table("Quotation_Items")]
    public class QuotationItem : BaseEntity
    {
        [Column("Unit_Price")]
        public decimal UnitPrice { get; set; }

        [Column("Quantity")]
        public decimal Quantity { get; set; }

        [Column("Tax_Percentage")]
        public decimal TaxPercentage { get; set; }

        [Column("Line_Total")]
        public decimal LineTotal { get; set; }

        // Foreign Keys
        [Column("Quotation_Id")]
        public Guid QuotationId { get; set; }

        [Column("RFQ_Item_Id")]
        public Guid RFQItemId { get; set; }

        // Navigation Properties
        [ForeignKey("QuotationId")]
        public Quotation Quotation { get; set; } = null!;

        [ForeignKey("RFQItemId")]
        public RFQItem RFQItem { get; set; } = null!;
    }
}

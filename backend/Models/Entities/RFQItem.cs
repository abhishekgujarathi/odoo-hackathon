using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models.Entities
{
    [Table("RFQ_Items")]
    public class RFQItem : BaseEntity
    {
        [Required, MaxLength(200)]
        [Column("Item_Name")]
        public string ItemName { get; set; } = string.Empty;

        [Column("Description")]
        public string? Description { get; set; }

        [Required]
        [Column("Quantity")]
        public decimal Quantity { get; set; }

        [Required, MaxLength(20)]
        [Column("Unit")]
        public string Unit { get; set; } = string.Empty;

        [Column("Estimated_Unit_Price")]
        public decimal EstimatedUnitPrice { get; set; }

        // Foreign Keys
        [Column("RFQ_Id")]
        public Guid RFQId { get; set; }

        // Navigation Properties
        [ForeignKey("RFQId")]
        public RFQ RFQ { get; set; } = null!;

        public ICollection<QuotationItem> QuotationItems { get; set; } = new List<QuotationItem>();
    }
}

using System.ComponentModel.DataAnnotations;

namespace backend.Models.dto
{
    public class CreateQuotationItemDto
    {
        [Required]
        public Guid RFQItemId { get; set; }

        [Required]
        public decimal UnitPrice { get; set; }

        [Required]
        public decimal Quantity { get; set; }

        public decimal TaxPercentage { get; set; } = 18;
    }

    public class CreateQuotationDto
    {
        [Required]
        public Guid RFQId { get; set; }

        [Required]
        public Guid VendorId { get; set; }

        public int DeliveryDays { get; set; }

        public string? Notes { get; set; }

        [Required]
        public List<CreateQuotationItemDto> Items { get; set; } = new();
    }
}

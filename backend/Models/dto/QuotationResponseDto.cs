using backend.Models.Enums;

namespace backend.Models.dto
{
    public class QuotationItemResponseDto
    {
        public Guid Id { get; set; }
        public string ItemName { get; set; } = string.Empty;
        public decimal UnitPrice { get; set; }
        public decimal Quantity { get; set; }
        public decimal TaxPercentage { get; set; }
        public decimal LineTotal { get; set; }
        public Guid RFQItemId { get; set; }
    }

    public class QuotationResponseDto
    {
        public Guid Id { get; set; }
        public string QuotationNumber { get; set; } = string.Empty;
        public decimal SubTotal { get; set; }
        public decimal TaxAmount { get; set; }
        public decimal TotalAmount { get; set; }
        public int DeliveryDays { get; set; }
        public string? Notes { get; set; }
        public QuotationStatus Status { get; set; }
        public DateTime? SubmittedAt { get; set; }

        // Related info
        public Guid RFQId { get; set; }
        public string RFQTitle { get; set; } = string.Empty;
        public Guid VendorId { get; set; }
        public string VendorName { get; set; } = string.Empty;

        public List<QuotationItemResponseDto> Items { get; set; } = new();

        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }
}

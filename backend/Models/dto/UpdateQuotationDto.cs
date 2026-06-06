using backend.Models.Enums;

namespace backend.Models.dto
{
    public class UpdateQuotationDto
    {
        public int? DeliveryDays { get; set; }
        public string? Notes { get; set; }
        public QuotationStatus? Status { get; set; }
    }
}

using System.ComponentModel.DataAnnotations;

namespace backend.Models.dto
{
    // ── Create ──

    public class CreateRFQDto
    {
        [Required, MaxLength(200)]
        public string Title { get; set; } = string.Empty;

        public string? Description { get; set; }

        [Required]
        public DateTime Deadline { get; set; }

        [Required]
        public List<CreateRFQItemDto> Items { get; set; } = new();

        [Required]
        public List<Guid> VendorIds { get; set; } = new();
    }

    public class CreateRFQItemDto
    {
        [Required, MaxLength(200)]
        public string ItemName { get; set; } = string.Empty;

        public string? Description { get; set; }

        [Required]
        public decimal Quantity { get; set; }

        [Required, MaxLength(20)]
        public string Unit { get; set; } = string.Empty;

        public decimal EstimatedUnitPrice { get; set; }
    }

    // ── Response ──

    public class RFQResponseDto
    {
        public Guid Id { get; set; }
        public string RFQNumber { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public string? Description { get; set; }
        public DateTime Deadline { get; set; }
        public int Status { get; set; }
        public string StatusLabel { get; set; } = string.Empty;
        public string? ProcurementOfficerName { get; set; }
        public DateTime CreatedAt { get; set; }

        public List<RFQItemResponseDto> Items { get; set; } = new();
        public List<RFQVendorResponseDto> Vendors { get; set; } = new();
    }

    public class RFQItemResponseDto
    {
        public Guid Id { get; set; }
        public string ItemName { get; set; } = string.Empty;
        public string? Description { get; set; }
        public decimal Quantity { get; set; }
        public string Unit { get; set; } = string.Empty;
        public decimal EstimatedUnitPrice { get; set; }
    }

    public class RFQVendorResponseDto
    {
        public Guid VendorId { get; set; }
        public string CompanyName { get; set; } = string.Empty;
        public string VendorCode { get; set; } = string.Empty;
        public DateTime InvitedAt { get; set; }
    }
}

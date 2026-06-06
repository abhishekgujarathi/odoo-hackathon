using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using backend.Models.Enums;

namespace backend.Models.Entities
{
    [Table("Approval_Workflows")]
    public class ApprovalWorkflow : BaseEntity
    {
        [Required]
        [Column("Status")]
        public ApprovalStatus Status { get; set; } = ApprovalStatus.Pending;

        [Column("Completed_At")]
        public DateTime? CompletedAt { get; set; }

        // Foreign Keys
        [Column("RFQ_Id")]
        public Guid RFQId { get; set; }

        [Column("Selected_Quotation_Id")]
        public Guid SelectedQuotationId { get; set; }

        // Navigation Properties
        [ForeignKey("RFQId")]
        public RFQ RFQ { get; set; } = null!;

        [ForeignKey("SelectedQuotationId")]
        public Quotation SelectedQuotation { get; set; } = null!;

        public ICollection<ApprovalStep> Steps { get; set; } = new List<ApprovalStep>();
    }
}

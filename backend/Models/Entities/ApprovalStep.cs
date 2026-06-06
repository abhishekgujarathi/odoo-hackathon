using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using backend.Models.Enums;

namespace backend.Models.Entities
{
    [Table("Approval_Steps")]
    public class ApprovalStep : BaseEntity
    {
        [Column("Step_Order")]
        public int StepOrder { get; set; }

        [Required]
        [Column("Status")]
        public ApprovalStatus Status { get; set; } = ApprovalStatus.Pending;

        [Column("Remarks")]
        public string? Remarks { get; set; }

        [Column("Action_At")]
        public DateTime? ActionAt { get; set; }

        // Foreign Keys
        [Column("Workflow_Id")]
        public Guid WorkflowId { get; set; }

        [Column("Approver_Id")]
        public Guid ApproverId { get; set; }

        // Navigation Properties
        [ForeignKey("WorkflowId")]
        public ApprovalWorkflow Workflow { get; set; } = null!;

        [ForeignKey("ApproverId")]
        public User Approver { get; set; } = null!;
    }
}

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models.Entities
{
    [Table("Email_Logs")]
    public class EmailLog : BaseEntity
    {
        [Required, MaxLength(200)]
        [Column("To_Email")]
        public string ToEmail { get; set; } = string.Empty;

        [Required, MaxLength(500)]
        [Column("Subject")]
        public string Subject { get; set; } = string.Empty;

        [Column("Body")]
        public string Body { get; set; } = string.Empty;

        [Column("Is_Success")]
        public bool IsSuccess { get; set; }

        [Column("Error_Message")]
        public string? ErrorMessage { get; set; }

        // Foreign Keys
        [Column("Invoice_Id")]
        public Guid? InvoiceId { get; set; }

        // Navigation Properties
        [ForeignKey("InvoiceId")]
        public Invoice? Invoice { get; set; }
    }
}

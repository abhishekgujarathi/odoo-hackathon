using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models.Entities
{
    [Table("RFQ_Attachments")]
    public class RFQAttachment : BaseEntity
    {
        [Required, MaxLength(255)]
        [Column("File_Name")]
        public string FileName { get; set; } = string.Empty;

        [Required, MaxLength(500)]
        [Column("File_Url")]
        public string FileUrl { get; set; } = string.Empty;

        [MaxLength(100)]
        [Column("Content_Type")]
        public string? ContentType { get; set; }

        // Foreign Keys
        [Column("RFQ_Id")]
        public Guid RFQId { get; set; }

        // Navigation Properties
        [ForeignKey("RFQId")]
        public RFQ RFQ { get; set; } = null!;
    }
}

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using backend.Models.Enums;

namespace backend.Models.Entities
{
    [Table("Activity_Logs")]
    public class ActivityLog : BaseEntity
    {
        [Required]
        [Column("Activity_Type")]
        public ActivityType ActivityType { get; set; }

        [Required, MaxLength(100)]
        [Column("Entity_Name")]
        public string EntityName { get; set; } = string.Empty;

        [Column("Entity_Id")]
        public Guid EntityId { get; set; }

        [Column("Description")]
        public string? Description { get; set; }

        [Column("Old_Values")]
        public string? OldValues { get; set; }

        [Column("New_Values")]
        public string? NewValues { get; set; }

        [MaxLength(45)]
        [Column("IP_Address")]
        public string? IPAddress { get; set; }

        // Foreign Keys
        [Column("User_Id")]
        public Guid UserId { get; set; }

        // Navigation Properties
        [ForeignKey("UserId")]
        public User User { get; set; } = null!;
    }
}

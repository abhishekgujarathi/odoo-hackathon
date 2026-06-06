using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using backend.Models.Enums;

namespace backend.Models.Entities
{
    [Table("Notifications")]
    public class Notification : BaseEntity
    {
        [Required]
        [Column("Type")]
        public NotificationType Type { get; set; }

        [Required, MaxLength(200)]
        [Column("Title")]
        public string Title { get; set; } = string.Empty;

        [Column("Message")]
        public string Message { get; set; } = string.Empty;

        [Column("Is_Read")]
        public bool IsRead { get; set; } = false;

        // Foreign Keys
        [Column("User_Id")]
        public Guid UserId { get; set; }

        // Navigation Properties
        [ForeignKey("UserId")]
        public User User { get; set; } = null!;
    }
}

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models.Entities
{
    [Table("Refresh_Tokens")]
    public class RefreshToken
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        [Column("Token")]
        public string Token { get; set; } = string.Empty;

        [Column("Expires_At")]
        public DateTime ExpiresAt { get; set; }

        [Column("Is_Revoked")]
        public bool IsRevoked { get; set; } = false;

        // Foreign Keys
        [Column("User_Id")]
        public Guid UserId { get; set; }

        // Navigation Properties
        [ForeignKey("UserId")]
        public User User { get; set; } = null!;
    }
}

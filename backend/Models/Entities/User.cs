using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models.Entities
{
    [Table("Users")]
    public class User
    {
        [Key]
        [Column("User_Id")]
        public Guid Id { get; set; }

        [Required, MaxLength(50)]
        [Column("UserName")]
        public string Username { get; set; } = string.Empty;

        [Required]
        [Column("Password")]
        public string Password { get; set; } = string.Empty;

        [Required, EmailAddress(ErrorMessage = "Enter a valid email address")]
        [Column("Email")]
        public string Email { get; set; } = string.Empty;

        [Column("Created_at")]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [Column("Updated_at")]
        public DateTime? UpdatedAt { get; set; }
    }
}

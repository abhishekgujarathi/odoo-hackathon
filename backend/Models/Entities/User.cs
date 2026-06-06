using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using backend.Models.Enums;

namespace backend.Models.Entities
{
    [Table("Users")]
    public class User : BaseEntity
    {
        [Required, MaxLength(50)]
        [Column("First_Name")]
        public string FirstName { get; set; } = string.Empty;

        [Required, MaxLength(50)]
        [Column("Last_Name")]
        public string LastName { get; set; } = string.Empty;

        [Required, EmailAddress(ErrorMessage = "Enter a valid email address")]
        [Column("Email")]
        public string Email { get; set; } = string.Empty;

        [Required]
        [Column("Password_Hash")]
        public string PasswordHash { get; set; } = string.Empty;

        [Column("Phone_Number")]
        public string? PhoneNumber { get; set; }

        [Required]
        [Column("Role")]
        public UserRole Role { get; set; }

        [Column("Is_Active")]
        public bool IsActive { get; set; } = true;

        [Column("Last_Login_At")]
        public DateTime? LastLoginAt { get; set; }
    }
}

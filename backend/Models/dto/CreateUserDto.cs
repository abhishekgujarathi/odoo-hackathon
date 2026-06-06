using System.ComponentModel.DataAnnotations;
using backend.Models.Enums;

namespace backend.Models.dto
{
    public class CreateUserDto
    {
        [Required, MaxLength(50)]
        public string FirstName { get; set; } = string.Empty;

        [Required, MaxLength(50)]
        public string LastName { get; set; } = string.Empty;

        [Required, EmailAddress(ErrorMessage = "Enter a valid email address")]
        public string Email { get; set; } = string.Empty;

        [Required]
        public string Password { get; set; } = string.Empty;

        public string? PhoneNumber { get; set; }

        [Required]
        public UserRole Role { get; set; }
    }
}
